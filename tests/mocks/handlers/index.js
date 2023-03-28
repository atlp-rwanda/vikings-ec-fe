import { loginHandler } from './login.handler';
import { welcomeHandler } from './welcome.handler';
import { googleAuthHandler } from './auth.handler';

const handlers = [...loginHandler, ...welcomeHandler, ...googleAuthHandler];

export default handlers;
