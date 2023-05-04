import { loginHandler } from './login.handler';
import { welcomeHandler } from './welcome.handler';
import { googleAuthHandler } from './auth.handler';
import { forgotPasswordHandler } from './forgotPassword.handler';
import { resetPasswordHandler } from './resetPassword.handler';
import { getProfileHandler, updateProfileHandler } from './profile.handler';
import { VerifyEmailHandler } from './verifyEmail.handler';
import { updatePasswordHandler } from './updatePassword.handler';
import { productHandler, singleProductHandler, getProductRatings } from './product.handler';
import { getCategoriesHandler } from './categories.handler';
import { cartHandler } from './cart.handler';
import { userHandler } from './User.handler';
import {rolesHandler} from './changeRole.handler'
import { statusHandler } from './changeStatus.handler';
import { orderHandler } from './order.handler';

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
  ...getProductRatings,
  ...getCategoriesHandler,
  ...getProductRatings,
  ...cartHandler,
  ...userHandler,
  ...rolesHandler,
  ...statusHandler,
  ...orderHandler
];

export default handlers;
