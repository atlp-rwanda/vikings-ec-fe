import { loginHandler } from './login.handler';
import { welcomeHandler } from './welcome.handler';
import { googleAuthHandler } from './auth.handler';
import { forgotPasswordHandler } from './forgotPassword.handler';
import { resetPasswordHandler } from './resetPassword.handler';
import { getProfileHandler, updateProfileHandler } from './profile.handler';
import { VerifyEmailHandler } from './verifyEmail.handler';

const handlers = [
  ...loginHandler,
  ...welcomeHandler,
  ...googleAuthHandler,
  ...forgotPasswordHandler,
  ...resetPasswordHandler,
  ...getProfileHandler,
  ...updateProfileHandler,
  ...VerifyEmailHandler,
];

export default handlers;
