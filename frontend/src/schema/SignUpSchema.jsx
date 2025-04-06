import * as Yup from 'yup';
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  contact: Yup.string().required('Contact is required').matches(/^\d+$/, 'Contact must be a number'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters long'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  address: Yup.string().required('Address is required'),
});

export default SignUpSchema;
