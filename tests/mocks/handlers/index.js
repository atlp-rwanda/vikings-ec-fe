import { loginHandler } from './login.handler';
import { welcomeHandler } from './welcome.handler';
import { googleAuthHandler } from './auth.handler';
import { forgotPasswordHandler } from './forgotPassword.handler';
import { resetPasswordHandler } from './resetPassword.handler';
import { getProfileHandler, updateProfileHandler } from './profile.handler';
import { VerifyEmailHandler } from './verifyEmail.handler';
import { updatePasswordHandler } from './updatePassword.handler';
import { productHandler, singleProductHandler, getProductRatings } from './product.handler';

const handlers = [
  ...loginHandler,
  ...welcomeHandler,
  ...googleAuthHandler,
  ...forgotPasswordHandler,
  ...resetPasswordHandler,
  ...getProfileHandler,
  ...updateProfileHandler,
  ...VerifyEmailHandler,
  ...updatePasswordHandler,
  ...updateProfileHandler, 
  ...productHandler,
  ...singleProductHandler,
  ...getProductRatings
];

export default handlers;
