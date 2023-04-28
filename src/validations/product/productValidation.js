import * as yup from 'yup';

const productSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.string().required(),
  quantity: yup.string().required(),
  bonus: yup.string().required(),
  categoryId: yup.string().required(),
  expiryDate: yup.date().required(),
});

export default productSchema;