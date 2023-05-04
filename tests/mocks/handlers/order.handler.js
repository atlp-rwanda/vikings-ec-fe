/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';

export const orderHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/orders/:id`, (_req, res, ctx) => {
    const response = [
      {
        product: {
          id: 1,
          name: 'Product 1',
          price: 10,
          images: ['image1.jpg'],
        },
      },
      {
        order: {
          quantity: 1,
          productId: 1,
        },
      },
      {
        totalPrice: 10,
      },
    ];
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
