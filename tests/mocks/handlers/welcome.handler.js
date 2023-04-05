import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const welcomeHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/`, (req, res, ctx) => {
    /*  */
    const response = {
      message: 'Welcome ',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
