import * as yup from 'yup';

const authCodeSchema = yup.object().shape({
  authCode: yup
    .string()
    .required('Authcode is required')
    .min(6, 'Authcode must be 6 characters')
    .max(6, 'Authcode must be 6 characters'),
});

export default authCodeSchema;
