import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const signupHandler = [
  rest.post(`${process.env.REACT_APP_BASE_URL}/categories`, (req, res, ctx) => {
    /*  */
    const response = {
      categories: [
        {
          id: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
          name: 'shoes',
          createdAt: '2023-03-21T14:02:46.155Z',
          updatedAt: '2023-03-21T14:02:46.155Z',
        },
        {
          id: 'e0bebe02-acb2-440d-b445-267c3c586a9f',
          name: 'clothes',
          createdAt: '2023-03-21T14:02:46.155Z',
          updatedAt: '2023-03-21T14:02:46.155Z',
        },
        {
          id: '9da8d3d0-9355-4053-b0c8-b385c4cc7711',
          name: 'electronics',
          createdAt: '2023-03-31T07:54:38.893Z',
          updatedAt: '2023-03-31T07:54:38.893Z',
        },
        {
          id: '45f4d523-0718-4f7e-aab3-e954bfdc6bab',
          name: 'chairs',
          createdAt: '2023-04-04T21:00:26.159Z',
          updatedAt: '2023-04-04T21:00:26.159Z',
        },
        {
          id: '4adcbe87-d4f6-4c10-af9c-bbb96964d028',
          name: 'cosmetics',
          createdAt: '2023-04-05T20:53:25.016Z',
          updatedAt: '2023-04-05T20:53:25.016Z',
        },
      ],
    };

    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
