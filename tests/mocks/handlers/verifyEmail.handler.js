import { rest } from 'msw';
import endpoints from '../../../src/utils/endpoints';

// eslint-disable-next-line import/prefer-default-export
export const VerifyEmailHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}${endpoints.verifyEmail}/:token`, (req, res, ctx) => {
    /*  */
    const response = {
      message: 'Verification email sent successfully',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
