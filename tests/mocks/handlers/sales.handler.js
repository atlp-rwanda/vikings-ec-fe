import { rest } from 'msw';

export const getSalesHandler = [
  rest.get(
    `${process.env.REACT_APP_BASE_URL}/sales`,
    (req, res, ctx) => {
      const response = {
        message: 'All seller sales retrieved successfully',
        sellerSales: [
          {
            id: '2525bc98-52aa-4a44-a518-601523b03de6',
            orderId: '97b25d19-a342-4d41-9d6a-1d55b738349e',
            productId: '09fcad25-f3d0-4a77-8171-59fd78be01bb',
            status: 'shipping',
            quantitySold: '2',
            expectedDeliveryDate: '2023-04-20T21:30:38.762Z',
            createdAt: '2023-04-20T21:30:38.762Z',
            updatedAt: '2023-05-04T20:55:15.972Z',
            Product: {
              id: '09fcad25-f3d0-4a77-8171-59fd78be01bb',
              name: 'Beans',
              price: 1500,
              expiryDate: '2024-04-29T00:00:00.000Z',
              quantity: 3,
              images: [
                'https://dimsaleglobal.com/wp-content/uploads/2020/11/White-beans-Half-bag.jpg',
                'https://i.pinimg.com/564x/04/5c/7a/045c7ad20c34bd61c3457b43722b179b--beans.jpg',
                'https://247foods.ng/public/uploads/1595924135-h-250-white-beans-black-eye-bag.jpg',
                'https://st2.depositphotos.com/1012271/6644/i/950/depositphotos_66448059-stock-photo-white-beans-bag.jpg',
              ],
              bonus: 200,
              isExpired: false,
              isAvailable: true,
              categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
              userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
              wished: 0,
              createdAt: '2023-04-20T21:30:38.739Z',
              updatedAt: '2023-04-20T21:30:38.739Z',
            },
          },
          {
            id: '27a40bf6-99df-4fa9-8a18-33f40e75ad7f',
            orderId: 'de17c74a-2d71-4c01-9ab8-0f213d23038a',
            productId: '09fcad25-f3d0-4a77-8171-59fd78be01bb',
            status: 'declined',
            quantitySold: '3',
            expectedDeliveryDate: '2023-03-18T00:00:00.000Z',
            createdAt: '2023-04-20T21:30:38.762Z',
            updatedAt: '2023-05-04T20:56:32.476Z',
            Product: {
              id: '09fcad25-f3d0-4a77-8171-59fd78be01bb',
              name: 'Beans',
              price: 1500,
              expiryDate: '2024-04-29T00:00:00.000Z',
              quantity: 3,
              images: [
                'https://dimsaleglobal.com/wp-content/uploads/2020/11/White-beans-Half-bag.jpg',
                'https://i.pinimg.com/564x/04/5c/7a/045c7ad20c34bd61c3457b43722b179b--beans.jpg',
                'https://247foods.ng/public/uploads/1595924135-h-250-white-beans-black-eye-bag.jpg',
                'https://st2.depositphotos.com/1012271/6644/i/950/depositphotos_66448059-stock-photo-white-beans-bag.jpg',
              ],
              bonus: 200,
              isExpired: false,
              isAvailable: true,
              categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
              userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
              wished: 0,
              createdAt: '2023-04-20T21:30:38.739Z',
              updatedAt: '2023-04-20T21:30:38.739Z',
            },
          },
          {
            id: 'e210d85a-3be2-4f46-b1cf-f531f7695742',
            orderId: 'a4e48d8d-f5eb-4ebb-b1b4-da3c8a0ca8fd',
            productId: '6717e8c7-c058-4670-90c3-5c8953cc844a',
            status: 'delivered',
            quantitySold: '1',
            expectedDeliveryDate: null,
            createdAt: '2023-04-20T21:36:15.581Z',
            updatedAt: '2023-05-04T21:01:21.528Z',
            Product: {
              id: '6717e8c7-c058-4670-90c3-5c8953cc844a',
              name: 'Beans',
              price: 1500,
              expiryDate: '2024-04-29T00:00:00.000Z',
              quantity: 1,
              images: [
                'https://dimsaleglobal.com/wp-content/uploads/2020/11/White-beans-Half-bag.jpg',
                'https://i.pinimg.com/564x/04/5c/7a/045c7ad20c34bd61c3457b43722b179b--beans.jpg',
                'https://247foods.ng/public/uploads/1595924135-h-250-white-beans-black-eye-bag.jpg',
                'https://st2.depositphotos.com/1012271/6644/i/950/depositphotos_66448059-stock-photo-white-beans-bag.jpg',
              ],
              bonus: 200,
              isExpired: false,
              isAvailable: true,
              categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
              userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
              wished: 0,
              createdAt: '2023-04-20T21:30:38.739Z',
              updatedAt: '2023-04-20T21:36:15.577Z',
            },
          },
          {
            id: '379c8810-52ae-4d47-bb36-5ee0228ae6b6',
            orderId: 'eeaa32a5-4826-4f50-b508-dc7156b4a4f4',
            productId: '6717e8c7-c058-4670-90c3-5c8953cc844a',
            status: 'shipping',
            quantitySold: '1',
            expectedDeliveryDate: null,
            createdAt: '2023-04-20T21:35:22.012Z',
            updatedAt: '2023-05-04T21:14:40.982Z',
            Product: {
              id: '6717e8c7-c058-4670-90c3-5c8953cc844a',
              name: 'Beans',
              price: 1500,
              expiryDate: '2024-04-29T00:00:00.000Z',
              quantity: 1,
              images: [
                'https://dimsaleglobal.com/wp-content/uploads/2020/11/White-beans-Half-bag.jpg',
                'https://i.pinimg.com/564x/04/5c/7a/045c7ad20c34bd61c3457b43722b179b--beans.jpg',
                'https://247foods.ng/public/uploads/1595924135-h-250-white-beans-black-eye-bag.jpg',
                'https://st2.depositphotos.com/1012271/6644/i/950/depositphotos_66448059-stock-photo-white-beans-bag.jpg',
              ],
              bonus: 200,
              isExpired: false,
              isAvailable: true,
              categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
              userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
              wished: 0,
              createdAt: '2023-04-20T21:30:38.739Z',
              updatedAt: '2023-04-20T21:36:15.577Z',
            },
          },
        ],
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
