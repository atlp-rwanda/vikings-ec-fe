import { loginHandler } from './login.handler';
import { welcomeHandler } from './welcome.handler';
import { googleAuthHandler } from './auth.handler';
import { forgotPasswordHandler } from './forgotPassword.handler';
import { resetPasswordHandler } from './resetPassword.handler';

const handlers = [...loginHandler, ...welcomeHandler, ...googleAuthHandler,
  ...forgotPasswordHandler, ...resetPasswordHandler];

export default handlers;
