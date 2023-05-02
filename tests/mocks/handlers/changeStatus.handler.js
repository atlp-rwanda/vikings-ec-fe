import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const statusHandler = [
  rest.put(`${process.env.REACT_APP_BASE_URL}/users/:id`, (req, res, ctx) => {
    /*  */
    const { id } = req.params;
    const response = {
        message: "Account is disabled",
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
