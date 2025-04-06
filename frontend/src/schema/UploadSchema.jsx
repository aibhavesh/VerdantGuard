import * as Yup from 'yup';

const UploadSchema = Yup.object().shape({
  leafType: Yup.string().required('Leaf type is required'),
});

export default UploadSchema;
