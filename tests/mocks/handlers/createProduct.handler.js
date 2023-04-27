import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const createProductHandler = [
  rest.post(`${process.env.REACT_APP_BASE_URL}/products`, (req, res, ctx) => {
    /*  */
    const response = {
      message: 'Product created successfully',
      product: {
        id: '193fdf2c-7cb7-4846-8b04-05af3e6acc03',
        isExpired: false,
        isAvailable: false,
        wished: 0,
        name: 'High quality leather double seat sofa',
        price: 180000,
        quantity: 89,
        categoryId: '45f4d523-0718-4f7e-aab3-e954bfdc6bab',
        expiryDate: '2090-04-29T00:00:00.000Z',
        images: [
          'http://res.cloudinary.com/djg7yg23y/image/upload/v1681488149/projects/ecommerce/8e0c7ff5-f99c-4841-92e4-ed44de394e76_1681488148.891.jpg',
          'http://res.cloudinary.com/djg7yg23y/image/upload/v1681488150/projects/ecommerce/745d53b4-92fa-4ec4-aa13-138aff8e3b21_1681488150.057.jpg',
          'http://res.cloudinary.com/djg7yg23y/image/upload/v1681488151/projects/ecommerce/70cadfb2-fdf4-4b97-92b0-5cf4e07944c9_1681488151.078.jpg',
          'http://res.cloudinary.com/djg7yg23y/image/upload/v1681488153/projects/ecommerce/fa31b60d-823a-4db1-acea-ccd763cebc83_1681488152.659.jpg',
        ],
        userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
        updatedAt: '2023-04-14T16:02:34.071Z',
        createdAt: '2023-04-14T16:02:34.071Z',
        bonus: null,
      },
    };
    return res(ctx.status(201), ctx.json(response), ctx.delay(100));
  }),
];
