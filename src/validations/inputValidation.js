import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});
export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
});
export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.newPassword === value;
    }),
});

export const registerSchema = yup.object().shape({
  firstname: yup.string().min(3).trim().required(),
  lastname: yup.string().min(3).trim().required(),
  email: yup.string().email().lowercase().trim()
    .required(),
  phone: yup.string().matches(/^\+?[1-9][0-9]{7,14}$/),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character')
    .matches(/[0-9]/, 'Password must contain at least one numeric character')
    .required('Password is required')
    .trim(),
});

export const accountSchema = yup.object().shape({
  firstname: yup.string().min(3).trim().required(),
  lastname: yup.string().min(3).trim().required(),
  email: yup.string().email().lowercase().trim()
    .required(),
  gender: yup.string().required('Your gender is required').oneOf(['Male', 'Female']),
  birthdate: yup.date()
    .required('Your birthdate is required')
    .max(new Date(), 'You can not be born in the future'),
  phone: yup.string().matches(/^\+?[1-9][0-9]{7,14}$/),
});

export const addressSchema = yup.object().shape({
  country: yup.string().required('Country is required'),
  state: yup.string(),
  province: yup.string(),
  city: yup.string(),
  streetAddress: yup.string().required('Street is required'),
  zipCode: yup.string(),
});
export const updatePasswordSchema = yup.object().shape({
  old_password: yup.string().required('Password is required'),
  new_password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character')
    .matches(/[0-9]/, 'Password must contain at least one numeric character')
    .required('Password is required')
    .trim(),
});

export const ratingSchema = yup.object().shape({
  Feedback: yup
    .string()
    .min(2, 'Feedback must be at least 2 characters')
    .required(),
});
export const messageSchema = yup.object().shape({
  message: yup.string().min(3).trim().required(),
});
