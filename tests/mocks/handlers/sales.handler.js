import { rest } from 'msw';

export const getSalesHandler = [
  rest.get(
    `${process.env.REACT_APP_BASE_URL}/sales`,
    (req, res, ctx) => {
      const response = {
        message: 'All seller sales retrieved successfully',
        sales: [
          {
            id: 'd3019e16-ba68-4208-b755-4a22e02d69b7',
            orderId: 'd4c10358-ceb0-45c6-98cf-a578a8e49317',
            productId: '94968373-fb85-4b82-ba82-7415d1f83ece',
            status: 'pending',
            quantitySold: '1',
            expectedDeliveryDate: null,
            createdAt: '2023-05-10T15:40:30.461Z',
            updatedAt: '2023-05-10T15:40:30.461Z',
            Product: {
              id: '94968373-fb85-4b82-ba82-7415d1f83ece',
              name: 'Techrise 3D VR Glasses',
              price: 400000,
              expiryDate: '2403-06-11T00:00:00.000Z',
              quantity: 76,
              images: [
                'http://res.cloudinary.com/djg7yg23y/image/upload/v1683642042/projects/ecommerce/60ef041b-a2d9-4c77-a47d-8da0bcef3ad9_1683642035.722.jpg',
                'http://res.cloudinary.com/djg7yg23y/image/upload/v1683642048/projects/ecommerce/df376e5b-db3a-44ba-8e1e-d1473cc3b229_1683642042.555.webp',
                'http://res.cloudinary.com/djg7yg23y/image/upload/v1683642055/projects/ecommerce/c6f797d8-82ca-455d-bfdd-3a42b93226c8_1683642049.114.jpg',
                'http://res.cloudinary.com/djg7yg23y/image/upload/v1683642062/projects/ecommerce/2cc0688e-3497-4bfe-abe8-126cc18349be_1683642055.675.jpg',
              ],
              bonus: 0,
              isExpired: false,
              isAvailable: true,
              categoryId: 'e0bebe02-acb2-440d-b445-267c3c586a9f',
              userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
              wished: 0,
              createdAt: '2023-05-09T14:21:03.592Z',
              updatedAt: '2023-05-10T15:40:30.449Z',
            },
          },
          {
            id: '547b8f91-df0a-4d7c-80d7-19e47e66bc27',
            orderId: 'c1967691-ad60-4c28-9179-74c42959b29c',
            productId: '94968373-fb85-4b82-ba82-7415d1f83ece',
            status: 'pending',
            quantitySold: '5',
            expectedDeliveryDate: null,
            createdAt: '2023-05-10T15:20:34.242Z',
            updatedAt: '2023-05-10T15:20:34.242Z',
            Product: {
              id: '94968373-fb85-4b82-ba82-7415d1f83ece',
              name: 'Techrise 3D VR Glasses',
              price: 400000,
              expiryDate: '2403-06-11T00:00:00.000Z',
              quantity: 76,
              images: [
                'http://res.cloudinary.com/djg7yg23y/image/upload/v1683642042/projects/ecommerce/60ef041b-a2d9-4c77-a47d-8da0bcef3ad9_1683642035.722.jpg',
                'http://res.cloudinary.com/djg7yg23y/image/upload/v1683642048/projects/ecommerce/df376e5b-db3a-44ba-8e1e-d1473cc3b229_1683642042.555.webp',
                'http://res.cloudinary.com/djg7yg23y/image/upload/v1683642055/projects/ecommerce/c6f797d8-82ca-455d-bfdd-3a42b93226c8_1683642049.114.jpg',
                'http://res.cloudinary.com/djg7yg23y/image/upload/v1683642062/projects/ecommerce/2cc0688e-3497-4bfe-abe8-126cc18349be_1683642055.675.jpg',
              ],
              bonus: 0,
              isExpired: false,
              isAvailable: true,
              categoryId: 'e0bebe02-acb2-440d-b445-267c3c586a9f',
              userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
              wished: 0,
              createdAt: '2023-05-09T14:21:03.592Z',
              updatedAt: '2023-05-10T15:40:30.449Z',
            },
          },
        ],
        meta: {
          totalItems: 19,
          itemCount: 10,
          itemsPerPage: '10',
          totalPages: 2,
          currentPage: '1',
        },
      };
      return res(ctx.status(200), ctx.json(response), ctx.delay(100));
    },
  ),
];

export const updateSalesHandler = [
  rest.patch(`${process.env.REACT_APP_BASE_URL}/sales/:saleId/status`, (req, res, ctx) => {
    const { saleId } = req.params;
    const response = {
      message: 'Product order status has been changed successfully',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
