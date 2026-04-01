# ruff: noqa

import io
import os
import sys
import types
import json
import tempfile
import importlib
import numpy as np
from PIL import Image

import pytest


def _install_dummy_tf(monkeypatch, predict_vector=None):
    """
    Install a lightweight dummy 'tensorflow' module into sys.modules before importing the target module.
    predict_vector: optional numpy array-like used by DummyModel.predict to return deterministic outputs.
    """
    dummy_tf = types.SimpleNamespace()
    # preprocessing.image.img_to_array -> convert PIL Image to np.array
    preprocessing_image = types.SimpleNamespace(
        img_to_array=lambda img: np.array(img)
    )
    preprocessing = types.SimpleNamespace(image=preprocessing_image)

    class DummyModel:
        def __init__(self, vec=None):
            self._vec = np.array(vec if vec is not None else [0.8, 0.1, 0.1], dtype=float).reshape(1, -1)

        def predict(self, _arr):
            return self._vec

    models = types.SimpleNamespace(
        load_model=lambda _: DummyModel(predict_vector)
    )

    keras = types.SimpleNamespace(preprocessing=preprocessing, models=models)
    dummy_tf.keras = keras

    # Inject into sys.modules
    monkeypatch.setitem(sys.modules, 'tensorflow', dummy_tf)
    return dummy_tf


def _import_target(monkeypatch, predict_vector=None, reload=False):
    """
    Import model.test_api4 with a stubbed tensorflow present.
    """
    _install_dummy_tf(monkeypatch, predict_vector=predict_vector)
    # Ensure a clean import
    if 'model.test_api4' in sys.modules and reload:
        del sys.modules['model.test_api4']
    return importlib.import_module('model.test_api4')


class TestPureFunctions:
    def test_example_function_basic(self, monkeypatch):
        m = _import_target(monkeypatch)
        assert m.example_function(2, 3) == 5

    def test_example_function_with_negatives(self, monkeypatch):
        m = _import_target(monkeypatch)
        assert m.example_function(-7, 2) == -5
        assert m.example_function(-7, -3) == -10
        assert m.example_function(0, 0) == 0

    @pytest.mark.parametrize(
        "filename,expected",
        [
            ("image.png", True),
            ("photo.jpg", True),
            ("scan.jpeg", True),
            ("UPPER.JPG", True),      # case-insensitive
            ("weird.name.with.dots.jpeg", True),
            ("no_extension", False),
            (".hiddenfile", False),
            ("bad.bmp", False),
            ("script.py", False),
            ("image.PNG", True),       # case-insensitive
        ],
    )
    def test_allowed_file_various(self, monkeypatch, filename, expected):
        m = _import_target(monkeypatch)
        assert m.allowed_file(filename) is expected


class TestPreprocessAndPredict:
    def test_preprocess_image_returns_expected_shape(self, monkeypatch):
        m = _import_target(monkeypatch)
        # Create a small RGB image in a temp file
        with tempfile.TemporaryDirectory() as tmp:
            path = os.path.join(tmp, "img.jpg")
            img = Image.new("RGB", (32, 32), color=(123, 45, 67))
            img.save(path, format="JPEG")

            arr = m.preprocess_image(path)
            assert isinstance(arr, np.ndarray)
            # Should be (1, 256, 256, 3) after resize + expand_dims
            assert arr.shape == (1, 256, 256, 3)

    def test_predict_maps_to_class_and_confidence(self, monkeypatch):
        # Configure dummy model to favor index 1 ("Late Blight")
        vec = np.array([[0.2, 0.6, 0.2]])
        m = _import_target(monkeypatch, predict_vector=vec, reload=True)

        # Patch preprocess_image to avoid real IO and speed up
        monkeypatch.setattr(m, "preprocess_image", lambda _: np.zeros((1, 256, 256, 3), dtype=np.uint8))

        predicted_class, confidence = m.predict("dummy_path.jpg")
        assert predicted_class in m.CLASS_NAMES
        assert predicted_class == "Late Blight"
        assert isinstance(confidence, float)
        assert confidence == 60.0


class TestFlaskEndpoints:
    def _client(self, monkeypatch):
        # Use deterministic model output and import app
        vec = np.array([[0.1, 0.7, 0.2]])  # predict "Late Blight"
        m = _import_target(monkeypatch, predict_vector=vec, reload=True)
        m.app.config["TESTING"] = True
        return m, m.app.test_client()

    def _make_image_file(self, fmt="JPEG"):
        bio = io.BytesIO()
        img = Image.new("RGB", (10, 10), color=(0, 255, 0))
        img.save(bio, format=fmt)
        bio.seek(0)
        return bio

    def test_healthcheck_root(self, monkeypatch):
        m, client = self._client(monkeypatch)
        res = client.get("/")
        assert res.status_code == 200
        data = res.get_json()
        assert data == {"message": "Potato Disease Classification API is running"}

    def test_missing_both_image_and_leaf_type(self, monkeypatch):
        m, client = self._client(monkeypatch)
        res = client.post("/predict", data={})
        assert res.status_code == 400
        assert res.get_json().get("message") == "Missing image or leaf type"

    def test_missing_image_only(self, monkeypatch):
        m, client = self._client(monkeypatch)
        res = client.post("/predict", data={"leafType": "potato"})
        assert res.status_code == 400
        assert res.get_json().get("message") == "Missing image or leaf type"

    def test_missing_leaf_type_only(self, monkeypatch):
        m, client = self._client(monkeypatch)
        img = self._make_image_file()
        data = {"image": (img, "sample.jpg")}
        res = client.post("/predict", data=data, content_type="multipart/form-data")
        assert res.status_code == 400
        assert res.get_json().get("message") == "Missing image or leaf type"

    def test_empty_filename(self, monkeypatch):
        m, client = self._client(monkeypatch)
        img = self._make_image_file()
        with tempfile.TemporaryDirectory() as tmpdir:
            m.app.config["UPLOAD_FOLDER"] = tmpdir
            res = client.post(
                "/predict",
                data={"image": (img, ""), "leafType": "potato"},
                content_type="multipart/form-data",
            )
        assert res.status_code == 400
        assert res.get_json().get("message") == "No selected file"

    def test_unsupported_file_type(self, monkeypatch):
        m, client = self._client(monkeypatch)
        bad = io.BytesIO(b"not-an-image")
        with tempfile.TemporaryDirectory() as tmpdir:
            m.app.config["UPLOAD_FOLDER"] = tmpdir
            res = client.post(
                "/predict",
                data={"image": (bad, "note.txt"), "leafType": "potato"},
                content_type="multipart/form-data",
            )
        assert res.status_code == 400
        assert res.get_json().get("message") == "Unsupported file type"

    def test_happy_path_returns_prediction(self, monkeypatch):
        m, client = self._client(monkeypatch)
        # Override predict to return known values and avoid TF path
        monkeypatch.setattr(m, "predict", lambda _: ("Healthy", 95.12))
        img = self._make_image_file()
        with tempfile.TemporaryDirectory() as tmpdir:
            m.app.config["UPLOAD_FOLDER"] = tmpdir
            res = client.post(
                "/predict",
                data={"image": (img, "leaf.jpg"), "leafType": "potato"},
                content_type="multipart/form-data",
            )
        assert res.status_code == 200
        data = res.get_json()
        assert data["predicted_class"] == "Healthy"
        assert data["confidence"] == "95.12%"

    def test_internal_error_bubbles_as_500(self, monkeypatch):
        m, client = self._client(monkeypatch)
        # Force predict to raise
        def boom(_):
            raise RuntimeError("model failure")
        monkeypatch.setattr(m, "predict", boom)

        img = self._make_image_file()
        with tempfile.TemporaryDirectory() as tmpdir:
            m.app.config["UPLOAD_FOLDER"] = tmpdir
            res = client.post(
                "/predict",
                data={"image": (img, "leaf.jpg"), "leafType": "potato"},
                content_type="multipart/form-data",
            )
        assert res.status_code == 500
        data = res.get_json()
        assert "error" in data
        assert "model failure" in data["error"]