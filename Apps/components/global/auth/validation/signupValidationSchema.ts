import * as yup from "yup";

export const signupValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string()
  .min(8, 'Password must be at least 8 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  )
  .required('Password is required'),
  fullName:yup.string().required("Full Name is required"),
  phoneNumber:yup.string().required("Phone Number is required"),
  dateOfBirth:yup.string().required("DateOfBirth is required"), 
//   terms:yup.bool().required("Terms are required"),
});