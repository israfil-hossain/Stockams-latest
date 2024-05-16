import * as yup from 'yup';

export const ProfilevalidationSchema = yup.object().shape({
    fullName:yup.string().required("Full Name is required"),
    email: yup.string().email('Invalid email').required('Email is required'),
  });
  