import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const loginHandler = [
  rest.post(`${process.env.REACT_APP_BASE_URL}/users/login`, (req, res, ctx) => {
    /*  */
    const response = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNGM2NWQwLWFiZTktNDA1YS1hMmY0LTViNzFhMjMzOGNkZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpudWxsLCJpYXQiOjE2ODA2Mzg4NTMsImV4cCI6MTcxMjE3NDg1M30.8WWqT1u_1WLbbZOcD8wtxVUv7U51vUDWCNmkw1QUe_E',
      message: 'Login successful',
      user: {
        id: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
        email: 'admin@gmail.com',
        role: 'admin',
        mustUpdatePassword: null,
      },
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
