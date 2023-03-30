import { loginHandler } from './login.handler';
import { welcomeHandler } from './welcome.handler';
import { googleAuthHandler } from './auth.handler';
import { forgotPasswordHandler } from './forgotPassword.handler';
import { resetPasswordHandler } from './resetPassword.handler';
import { getProfileHandler, updateProfileHandler } from './profile.handler';

const handlers = [
  ...loginHandler,
  ...welcomeHandler,
  ...googleAuthHandler,
  ...forgotPasswordHandler,
  ...resetPasswordHandler,
  ...getProfileHandler,
  ...updateProfileHandler,
];

export default handlers;
