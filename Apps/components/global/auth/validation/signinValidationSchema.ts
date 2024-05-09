import * as yup from "yup";

export const signinValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string()
  .min(8, 'Password must be at least 8 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  )
  .required('Password is required'),
});
