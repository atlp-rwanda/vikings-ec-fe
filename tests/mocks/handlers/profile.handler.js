import { rest } from 'msw';
import endpoints from '../../../src/utils/endpoints';

export const getProfileHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}${endpoints.profile}`, (req, res, ctx) => {
    const response = {
      id: '872526ad-76be-4f44-b5d9-8032f0925c2d',
      firstname: 'Irakoze',
      lastname: 'Yves',
      email: 'verified@gmail.com',
      phone: '+250788622754',
      password: '$2b$10$loTArhq8vmd0bvzCP73VXut779UA1eltYXCsbPBL5Xddi7Y92oDka',
      gender: 'Male',
      role: 'buyer',
      isActive: true,
      usesPassword: true,
      avatar: 'http://res.cloudinary.com/djg7yg23y/image/upload/v1681389414/projects/ecommerce/d218ebc4-ce9c-48bc-be76-bb0500bc7125_1681389404.509.jpg',
      billingAddress: {
        country: 'Congo',
        state: 'Ndjamena',
        province: 'Rwampara',
        city: 'Nyamirambo',
        streetAddress: 'KN 237 St',
        zipCode: '0000',
      },
      verified: true,
      birthdate: '2014-05-25T22:00:00.000Z',
      description: '',
      authCode: null,
      mustUpdatePassword: null,
      lastTimePasswordUpdated: null,
      createdAt: '2023-03-29T10:19:37.841Z',
      updatedAt: '2023-04-13T12:36:55.542Z',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];

export const updateProfileHandler = [
  rest.put(`${process.env.REACT_APP_BASE_URL}${endpoints.profile}`, (req, res, ctx) => {
    const response = {
      message: 'updated successful',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
