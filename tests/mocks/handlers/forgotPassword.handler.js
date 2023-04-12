import { rest } from 'msw';
import endpoints from '../../../src/utils/endpoints';

// eslint-disable-next-line import/prefer-default-export
export const forgotPasswordHandler = [
  rest.post(`${process.env.REACT_APP_BASE_URL}${endpoints.forgotPassword}`, async (req, res, ctx) => {
    const body = await req.json();
    if (body.email === 'throw@gmail.com') {
      return res(ctx.status(404), ctx.json({ message: 'Email does not exist' }), ctx.delay(100));
    }
    const response = {
      message: 'Email sent!, check your email for next step',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
