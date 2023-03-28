import { rest } from 'msw';
import endpoints from '../../../src/utils/endpoints';

// eslint-disable-next-line import/prefer-default-export
export const googleAuthHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}${endpoints.googleRedirect}`, (req, res, ctx) => {
    /*  */
    const response = {
      message: 'Thanks for logging in',
      user: {
        id: 'd7e79e21-c84d-4829-aa63-7f7ae2c30755',
        email: 'paternenught@gmail.com',
        role: 'buyer',
        iat: 1680186222,
        exp: 1711743822,
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ3ZTc5ZTIxLWM4NGQtNDgyOS1hYTYzLTdmN2FlMmMzMDc1NSIsImVtYWlsIjoicGF0ZXJuZW51Z2h0QGdtYWlsLmNvbSIsInJvbGUiOiJidXllciIsImlhdCI6MTY4MDE4NjIyMiwiZXhwIjoxNzExNzQzODIyfQ.RMAklhV2MJGGrhvd4I0q8RKES3yL8-9NeR9nj0lMngs',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
