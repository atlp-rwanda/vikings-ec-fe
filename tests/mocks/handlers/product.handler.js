import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const productHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/products`, (_req, res, ctx) => {
    const response = {
      products: {
        totalPages: 2,
        totalItems: 7,
        currentPage: 1,
        rows: [
          {
            id: '6717e8c7-c058-4670-90c3-5c8953cc844a',
            name: 'Beans',
            price: 1500,
            expiryDate: '2024-04-29T00:00:00.000Z',
            quantity: 3,
            images: [
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800915/projects/ecommerce/f258e7aa-b540-469d-b866-fd13747c81ce_1676800912.287.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800917/projects/ecommerce/e2f9d092-324d-42e1-9afe-97eda06c62c6_1676800915.589.jpg',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800918/projects/ecommerce/3b61b563-7451-4d6b-973a-b8fda5b90d1d_1676800917.439.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800921/projects/ecommerce/daf580b9-306c-4e6c-a403-ac51317642e7_1676800918.739.webp',
            ],
            bonus: 200,
            isExpired: false,
            isAvailable: true,
            categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
            userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
            wished: 0,
            createdAt: '2023-04-07T10:07:05.171Z',
            updatedAt: '2023-04-07T10:07:05.171Z',
            seller: {
              id: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
              firstname: 'Admin',
              lastname: 'Doe',
              email: 'admin@gmail.com',
              phone: '0987654321',
              gender: null,
              role: 'admin',
              isActive: true,
              usesPassword: null,
              avatar: null,
              billingAddress: null,
              verified: true,
              birthdate: null,
              description: null,
              createdAt: '2023-04-07T10:07:05.029Z',
              updatedAt: '2023-04-07T10:07:05.029Z',
            },
            Category: {
              id: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
              name: 'shoes',
              createdAt: '2023-04-07T10:07:05.111Z',
              updatedAt: '2023-04-07T10:07:05.111Z',
            },
          },
          {
            id: 'bc645027-5544-4f6a-af8c-c6aa2b1a02b5',
            name: 'Beans Cart',
            price: 1500,
            expiryDate: '2024-04-29T00:00:00.000Z',
            quantity: 3,
            images: [
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800915/projects/ecommerce/f258e7aa-b540-469d-b866-fd13747c81ce_1676800912.287.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800917/projects/ecommerce/e2f9d092-324d-42e1-9afe-97eda06c62c6_1676800915.589.jpg',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800918/projects/ecommerce/3b61b563-7451-4d6b-973a-b8fda5b90d1d_1676800917.439.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800921/projects/ecommerce/daf580b9-306c-4e6c-a403-ac51317642e7_1676800918.739.webp',
            ],
            bonus: 200,
            isExpired: false,
            isAvailable: true,
            categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
            userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
            wished: 0,
            createdAt: '2023-04-07T10:07:05.171Z',
            updatedAt: '2023-04-07T10:07:05.171Z',
            seller: {
              id: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
              firstname: 'Admin',
              lastname: 'Doe',
              email: 'admin@gmail.com',
              phone: '0987654321',
              gender: null,
              role: 'admin',
              isActive: true,
              usesPassword: null,
              avatar: null,
              billingAddress: null,
              verified: true,
              birthdate: null,
              description: null,
              createdAt: '2023-04-07T10:07:05.029Z',
              updatedAt: '2023-04-07T10:07:05.029Z',
            },
            Category: {
              id: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
              name: 'shoes',
              createdAt: '2023-04-07T10:07:05.111Z',
              updatedAt: '2023-04-07T10:07:05.111Z',
            },
          },
        ],
      },
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];

export const singleProductHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/products/:productId`, (req, res, ctx) => {
    /*  */
    const response = {
      product: {
        id: '6717e8c7-c058-4670-90c3-5c8953cc844a',
        name: 'Beans',
        price: 1500,
        expiryDate: '2024-04-29T00:00:00.000Z',
        quantity: 3,
        images: [
          'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800915/projects/ecommerce/f258e7aa-b540-469d-b866-fd13747c81ce_1676800912.287.webp',
          'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800917/projects/ecommerce/e2f9d092-324d-42e1-9afe-97eda06c62c6_1676800915.589.jpg',
          'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800918/projects/ecommerce/3b61b563-7451-4d6b-973a-b8fda5b90d1d_1676800917.439.webp',
          'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800921/projects/ecommerce/daf580b9-306c-4e6c-a403-ac51317642e7_1676800918.739.webp',
        ],
        bonus: 200,
        isExpired: false,
        isAvailable: true,
        categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
        userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
        wished: 0,
        createdAt: '2023-04-07T10:07:05.171Z',
        updatedAt: '2023-04-07T10:07:05.171Z',
      },
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];

export const getProductRatings = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/products/:productId/ratings`, (req, res, ctx) => {
    /*  */
    const response = {
      message: 'Ratings retrived successfully',
      ratings: [
        {
          id: '7ca2e728-a0e0-40b1-9f74-0e39b99e01cc',
          buyerId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
          productId: 'bc645027-5544-4f6a-af8c-c6aa2b1a02b5',
          rate: 2,
          feedback: 'Thank you for quality of this product',
          createdAt: '2023-04-20T15:34:18.861Z',
          updatedAt: '2023-04-21T07:23:02.693Z',
          buyer: {
            id: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
            firstname: 'Admin',
            lastname: 'Doe',
            email: 'admin@gmail.com',
            phone: '+250788765432',
            gender: 'Male',
            role: 'admin',
            isActive: true,
            usesPassword: null,
            avatar: 'http://res.cloudinary.com/djg7yg23y/image/upload/v1682003607/projects/ecommerce/60a8d593-2cca-46c1-b851-ea8eab2c57ab_1682003606.505.jpg',
            billingAddress: null,
            verified: true,
            birthdate: '1995-03-10T22:00:00.000Z',
            description: null,
            createdAt: '2023-04-20T14:59:43.516Z',
            updatedAt: '2023-04-20T15:13:28.306Z',
          },
        },
        {
          id: 'afb6cc62-31a6-499f-b858-a23e18a4bd24',
          buyerId: '6740c4ce-abf1-4380-b985-274286f95d31',
          productId: 'bc645027-5544-4f6a-af8c-c6aa2b1a02b5',
          rate: 4,
          feedback: 'Reliable service',
          createdAt: '2023-04-21T10:18:23.177Z',
          updatedAt: '2023-04-21T10:18:23.177Z',
          buyer: {
            id: '6740c4ce-abf1-4380-b985-274286f95d31',
            firstname: 'Jay',
            lastname: 'Rwanda',
            email: 'jayrwanda035@gmail.com',
            phone: '+25087654321',
            gender: null,
            role: 'buyer',
            isActive: true,
            usesPassword: true,
            avatar: null,
            billingAddress: null,
            verified: true,
            birthdate: null,
            description: null,
            createdAt: '2023-04-21T10:04:16.814Z',
            updatedAt: '2023-04-21T10:08:54.119Z',
          },
        },
      ],
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
