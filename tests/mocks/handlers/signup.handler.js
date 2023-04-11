import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const signupHandler = [
  rest.post(`${process.env.REACT_APP_BASE_URL}/users/register`, (req, res, ctx) => {
    /*  */
    const response = {
      message: 'Check your email to verify your account',
      user: {
        id: '22f56043-5c83-41e2-bc49-6eaeae7e99b7',
        email: 'ad@gmail.com',
        role: 'buyer',
        lastTimePasswordUpdated: '2023-04-07T08:44:57.422Z',
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyZjU2MDQzLTVjODMtNDFlMi1iYzQ5LTZlYWVhZTdlOTliNyIsImVtYWlsIjoiYWRAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwibGFzdFRpbWVQYXNzd29yZFVwZGF0ZWQiOiIyMDIzLTA0LTA3VDA4OjQ0OjU3LjQyMloiLCJpYXQiOjE2ODA4NTcwOTcsImV4cCI6MTY4MDg2MDY5N30.2-qBp3RXHKmCNOneRZYFsvRcD6WDuGt47W1dsdb4JPQ',
    };
    return res(ctx.status(201), ctx.json(response), ctx.delay(100));
  }),
];
