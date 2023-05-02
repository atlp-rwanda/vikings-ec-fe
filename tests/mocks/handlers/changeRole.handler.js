import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const rolesHandler = [
  rest.patch(`${process.env.REACT_APP_BASE_URL}/users/:id`, (req, res, ctx) => {
    /*  */
    const { id } = req.params;
    const response = {
        message: "Updated successfully",
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];