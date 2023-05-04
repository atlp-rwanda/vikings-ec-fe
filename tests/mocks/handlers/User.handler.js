import { rest } from 'msw';

// eslint-disable-next-line import/prefer-default-export
export const userHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/users?limit=${10}&page=${1}`, (req, res, ctx) => {
    const response = {
      status: 200,
      message: 'All Users retrieved successfully',
      data: {
        meta: {
          totalItems: 6,
          itemCount: 6,
          itemsPerPage: '10',
          totalPages: 1,
          currentPage: '1',
        },
        items: [
          {
            id: '76432d88-a891-4c4f-9b8f-aca96513f4dd',
            firstname: 'Aline',
            lastname: 'Doe',
            email: 'unverified@gmail.com',
            phone: '0987654321',
            password: '$2b$10$V18ICOCv3sSBMYpONxTH6.iLeG6f7xL57oLz/ZwqMXyO521qi1XBK',
            gender: null,
            role: 'buyer',
            isActive: true,
            usesPassword: null,
            avatar: null,
            billingAddress: null,
            verified: false,
            birthdate: null,
            description: null,
            authCode: null,
            mustUpdatePassword: null,
            lastTimePasswordUpdated: null,
            createdAt: '2023-04-13T19:54:24.096Z',
            updatedAt: '2023-04-14T11:03:55.356Z',
          },
          {
            id: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
            firstname: 'Irakoze',
            lastname: 'Yves Seller',
            email: 'irakozeyves9@gmail.com',
            phone: '0987654321',
            password: '$2b$10$loTArhq8vmd0bvzCP73VXut779UA1eltYXCsbPBL5Xddi7Y92oDka',
            gender: null,
            role: 'admin',
            isActive: true,
            usesPassword: null,
            avatar: null,
            billingAddress: null,
            verified: true,
            birthdate: null,
            description: null,
            authCode: null,
            mustUpdatePassword: null,
            lastTimePasswordUpdated: null,
            createdAt: '2023-04-13T19:54:24.096Z',
            updatedAt: '2023-04-14T13:21:25.250Z',
          },
          {
            id: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
            firstname: 'Admin',
            lastname: 'Doe',
            email: 'admin@gmail.com',
            phone: '0987654321',
            password: '$2b$10$UZX4Fy9x4yJp4rTgiw0imelLLg.7JnGrrHqoPvbq9ThUlOu8e4n1e',
            gender: null,
            role: 'admin',
            isActive: true,
            usesPassword: null,
            avatar: null,
            billingAddress: null,
            verified: true,
            birthdate: null,
            description: null,
            authCode: null,
            mustUpdatePassword: null,
            lastTimePasswordUpdated: null,
            createdAt: '2023-04-13T19:54:24.096Z',
            updatedAt: '2023-04-14T18:32:22.447Z',
          },
          {
            id: '5e9713e3-7a39-4538-9998-4f3a534bea1f',
            firstname: 'paterne',
            lastname: 'Samuel Seller',
            email: 'paterne@gmail.com',
            phone: '0987654321',
            password: '$2b$10$9AhkGEt2V1aYAVlgqGBsYuG4vJPip8kxQcFcEnXki9mYqc2yKsmBS',
            gender: null,
            role: 'seller',
            isActive: true,
            usesPassword: null,
            avatar: null,
            billingAddress: null,
            verified: true,
            birthdate: null,
            description: null,
            authCode: null,
            mustUpdatePassword: true,
            lastTimePasswordUpdated: '2021-12-31T22:00:00.000Z',
            createdAt: '2023-04-13T19:54:24.096Z',
            updatedAt: '2023-04-14T12:27:29.866Z',
          },
          {
            id: 'b53278a7-daf3-4c6a-99ef-7579d9b43c32',
            firstname: 'Kwizera',
            lastname: 'Samuel Seller',
            email: 'kwizsam@gmail.com',
            phone: '0987654321',
            password: '$2b$10$loTArhq8vmd0bvzCP73VXut779UA1eltYXCsbPBL5Xddi7Y92oDka',
            gender: null,
            role: 'seller',
            isActive: true,
            usesPassword: null,
            avatar: null,
            billingAddress: null,
            verified: true,
            birthdate: null,
            description: null,
            authCode: null,
            mustUpdatePassword: null,
            lastTimePasswordUpdated: null,
            createdAt: '2023-04-13T19:54:24.096Z',
            updatedAt: '2023-04-14T12:44:01.920Z',
          },
          {
            id: '872526ad-76be-4f44-b5d9-8032f0925c2d',
            firstname: 'Jane',
            lastname: 'Doe',
            email: 'verified@gmail.com',
            phone: '0987654321',
            password: '$2b$10$loTArhq8vmd0bvzCP73VXut779UA1eltYXCsbPBL5Xddi7Y92oDka',
            gender: null,
            role: 'seller',
            isActive: true,
            usesPassword: true,
            avatar: null,
            billingAddress: null,
            verified: true,
            birthdate: null,
            description: null,
            authCode: null,
            mustUpdatePassword: null,
            lastTimePasswordUpdated: null,
            createdAt: '2023-04-13T19:54:24.096Z',
            updatedAt: '2023-04-14T12:47:21.245Z',
          },
        ],
      },
    };
    return res(ctx.status(201), ctx.json(response), ctx.delay(100));
  }),
];
