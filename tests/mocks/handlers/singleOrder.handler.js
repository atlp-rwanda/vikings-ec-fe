import { rest } from "msw";

// eslint-disable-next-line import/prefer-default-export
export const singleOrderHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/orders/:id`, (req, res, ctx) => {
    /*  */
    const { id } = req.params;
    const response = {
      message: "Order status retrieved successfully",
      order: {
        id: "fb23adef-b2e5-40f1-9066-07644961a0b3",
        status: "pending",
        buyerId: "872526ad-76be-4f44-b5d9-8032f0925c2d",
        products: [
          {
            quantity: 3,
            productId: "6717e8c7-c058-4670-90c3-5c8953cc844a",
          },
        ],
        fullPrice: 1000,
        paymentId: null,
        createdAt: "2023-05-03T12:42:45.035Z",
        updatedAt: "2023-05-03T12:42:45.035Z",
      },
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
