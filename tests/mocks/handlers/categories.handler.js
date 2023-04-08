/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';

export const getCategoriesHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/categories`, (_req, res, ctx) => {
    const response = {
      categories: [
        {
          id: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
          name: 'shoes',
          createdAt: '2023-04-23T17:02:19.975Z',
          updatedAt: '2023-04-23T17:02:19.975Z',
        },
        {
          id: 'e0bebe02-acb2-440d-b445-267c3c586a9f',
          name: 'clothes',
          createdAt: '2023-04-23T17:02:19.975Z',
          updatedAt: '2023-04-23T17:02:19.975Z',
        },
        {
          id: '503a3af9-8d0b-4aee-89dc-85ec36730606',
          name: 'electronics',
          createdAt: '2023-04-23T19:13:15.297Z',
          updatedAt: '2023-04-23T19:13:15.297Z',
        },
      ],
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
