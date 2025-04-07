import * as Yup from 'yup';

const UploadSchema = Yup.object().shape({
  leafType: Yup.string().required('Leaf type is required'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'File size is too large', (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2MB limit
    })
    .test('fileFormat', 'Unsupported file format', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    }),
});

export default UploadSchema;
