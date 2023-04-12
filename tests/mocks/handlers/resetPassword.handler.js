import { rest } from 'msw';
import endpoints from '../../../src/utils/endpoints';

// eslint-disable-next-line import/prefer-default-export
export const resetPasswordHandler = [
  rest.patch(`${process.env.REACT_APP_BASE_URL}${endpoints.resetPassword}/:token`, (req, res, ctx) => {
    /*  */
    const response = {
      message: 'Password reset successfully',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
