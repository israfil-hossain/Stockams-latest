import * as yup from "yup";

export const changePasswordValidationSchema = yup.object().shape({
  oldPassword: yup.string()
  .min(8, 'Password may be at least 8 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password may contain at least one uppercase letter, one lowercase letter, and one number'
  )
  .required('Old Password is required'),
  newPassword: yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('New Password is required'),
  retypePassword: yup.string()
    .oneOf(
      [yup.ref('newPassword')],
      'Retyped password does not match'
    )
    .required('Retype Password is required')
});
