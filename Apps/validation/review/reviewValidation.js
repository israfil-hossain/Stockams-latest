import * as yup from 'yup';

export const ReviewValidationSchema = yup.object().shape({
    review_msg: yup.string().required('Please write something about this '),
  });
  