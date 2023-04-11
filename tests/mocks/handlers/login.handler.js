import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const loginHandler = [
  rest.post(`${process.env.REACT_APP_BASE_URL}/users/login`, (req, res, ctx) => {
    /*  */
    const response = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxM2JjMGZhLWMwNjktNDlhYi05ZjlmLTk2YTkxMmJhYzU3YyIsImVtYWlsIjoidmlraW5nc2F0bHBAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpmYWxzZSwiaWF0IjoxNjgxNDY4MTE2LCJleHAiOjE3MTMwMDQxMTZ9.eGUBlyDIqRW4JIjsGaT66X5Zs9hmRM3GfSTYpiSasBM',
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
