import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const getNotificationsHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/notifications`, (req, res, ctx) => {
    /*  */
    const response = {
      message: 'Fetched all notifications',
      notifications: {
        totalPages: 4,
        currentPage: '1',
        totalItems: 34,
        rows: [
          {
            id: '1eca817c-4712-439d-a5cf-775c6890b796',
            isRead: false,
            receiverId: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
            message: 'Jordan has been expired',
            type: 'product-expired',
            createdAt: '2023-05-04T22:00:06.361Z',
            updatedAt: '2023-05-04T22:00:06.361Z',
            receiver: {
              id: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
              firstname: 'Irakoze',
              lastname: 'Yves Seller',
              email: 'irakozeyves9@gmail.com',
              phone: '0987654321',
              gender: null,
              role: 'seller',
              isActive: true,
              usesPassword: null,
              avatar: null,
              billingAddress: null,
              verified: true,
              birthdate: null,
              description: null,
              createdAt: '2023-05-03T12:42:42.768Z',
              updatedAt: '2023-05-05T13:41:20.664Z',
            },
          },
          {
            id: 'bbffb302-51dc-4f81-80b5-0bcc565e103c',
            isRead: false,
            receiverId: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
            message: 'Your product Jordan with 4',
            type: 'product-rating',
            createdAt: '2023-05-04T12:16:34.632Z',
            updatedAt: '2023-05-04T12:16:34.632Z',
            receiver: {
              id: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
              firstname: 'Irakoze',
              lastname: 'Yves Seller',
              email: 'irakozeyves9@gmail.com',
              phone: '0987654321',
              gender: null,
              role: 'seller',
              isActive: true,
              usesPassword: null,
              avatar: null,
              billingAddress: null,
              verified: true,
              birthdate: null,
              description: null,
              createdAt: '2023-05-03T12:42:42.768Z',
              updatedAt: '2023-05-05T13:41:20.664Z',
            },
          },
          {
            id: 'bb32d608-9186-4e1a-90f8-892a89d2abcb',
            isRead: false,
            receiverId: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
            message: 'Your product Jordan with 4',
            type: 'product-rating',
            createdAt: '2023-05-04T12:16:22.958Z',
            updatedAt: '2023-05-04T12:16:22.958Z',
            receiver: {
              id: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
              firstname: 'Irakoze',
              lastname: 'Yves Seller',
              email: 'irakozeyves9@gmail.com',
              phone: '0987654321',
              gender: null,
              role: 'seller',
              isActive: true,
              usesPassword: null,
              avatar: null,
              billingAddress: null,
              verified: true,
              birthdate: null,
              description: null,
              createdAt: '2023-05-03T12:42:42.768Z',
              updatedAt: '2023-05-05T13:41:20.664Z',
            },
          },
        ],
      },
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];

export const markOneNotificationHandler = [
  rest.patch(`${process.env.REACT_APP_BASE_URL}/notifications/:id`, (req, res, ctx) => {
    const { id } = req.params;
    /*  */
    const response = {
      message: 'Marked one notification successfully',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];

export const markAllNotificationHandler = [
  rest.patch(`${process.env.REACT_APP_BASE_URL}/notifications`, (req, res, ctx) => {
    /*  */
    const response = {
      message: 'Marked all notifications successfully',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
