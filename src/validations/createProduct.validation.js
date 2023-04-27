import * as yup from 'yup';

const createProductSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3),
  categoryId: yup.string().required('Category is required'),
  price: yup
    .number()
    .typeError('Price is required and must be a number')
    .required()
    .positive()
    .integer()
    .min(1),
  quantity: yup
    .number()
    .typeError('Quantity is required and must be a number')
    .required()
    .positive()
    .integer()
    .min(1),
  bonus: yup
    .number('Bonus must be a number')
    .notRequired()
    .nullable()
    .transform((value) => value || 0),
  expiryDate: yup
    .date()
    .typeError('Expiry date is required and must be a valid future date')
    .required(),
  images: yup
    .array()
    .of(yup.mixed().required('Images are required'))
    .min(4, 'At least 4 images are required')
    .max(8, 'Maximum 8 images are allowed'),
});

export default createProductSchema;
