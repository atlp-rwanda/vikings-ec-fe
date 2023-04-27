import { rest } from 'msw';

export const logoutHandler = [
  rest.post(`${process.env.REACT_APP_BASE_URL}/users/logout`, (req, res, ctx) => {
    const response = {
      message: 'Logged out',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
