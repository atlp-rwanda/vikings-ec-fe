import { loginHandler } from './login.handler';
import { welcomeHandler } from './welcome.handler';

const handlers = [...loginHandler, ...welcomeHandler];

export default handlers;
