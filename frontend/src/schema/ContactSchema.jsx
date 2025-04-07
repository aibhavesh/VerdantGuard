import * as Yup from 'yup';

 const contactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: Yup.string().required('Email is required').email('Invalid email format'),
  message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

export default contactSchema;