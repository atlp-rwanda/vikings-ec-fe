import { rest } from 'msw';
import endpoints from '../../../src/utils/endpoints';

// eslint-disable-next-line import/prefer-default-export
export const cartHandler = [
  rest.get(`${process.env.REACT_APP_BASE_URL}${endpoints.cart}`, (req, res, ctx) => {
    /*  */
    const response = {
      id: '9a38d44d-df82-4272-adb1-8e83c3f88962',
      products: [
        {
          id: 'bc645027-5544-4f6a-af8c-c6aa2b1a02b5',
          name: 'Apples',
          price: 1500,
          quantity: 6,
          images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ooGD2S09SSN7qrvIGrJcnlsW-_TDt39ELA&usqp=CAU',
            'https://images.heb.com/is/image/HEBGrocery/001422652-1?jpegSize=150&hei=1400&fit=constrain&qlt=75',
            'https://oppy.com/app/uploads/2020/08/14054tjk3641-scaled-1.jpg',
            'https://img.myloview.com/posters/red-apple-with-leaves-isolated-on-white-background-red-envy-apple-on-white-background-with-clipping-path-700-231766136.jpg',
          ],
        },
        {
          id: '6717e8c7-c058-4670-90c3-5c8953cc844a',
          name: 'Beans',
          price: 1500,
          quantity: 2,
          images: [
            'https://dimsaleglobal.com/wp-content/uploads/2020/11/White-beans-Half-bag.jpg',
            'https://i.pinimg.com/564x/04/5c/7a/045c7ad20c34bd61c3457b43722b179b--beans.jpg',
            'https://247foods.ng/public/uploads/1595924135-h-250-white-beans-black-eye-bag.jpg',
            'https://st2.depositphotos.com/1012271/6644/i/950/depositphotos_66448059-stock-photo-white-beans-bag.jpg',
          ],
        },
        {
          id: '09fcad25-f3d0-4a77-8171-59fd78be01bb',
          name: 'Beans',
          price: 1500,
          quantity: 1,
          images: [
            'https://dimsaleglobal.com/wp-content/uploads/2020/11/White-beans-Half-bag.jpg',
            'https://i.pinimg.com/564x/04/5c/7a/045c7ad20c34bd61c3457b43722b179b--beans.jpg',
            'https://247foods.ng/public/uploads/1595924135-h-250-white-beans-black-eye-bag.jpg',
            'https://st2.depositphotos.com/1012271/6644/i/950/depositphotos_66448059-stock-photo-white-beans-bag.jpg',
          ],
        },
      ],
      total: 6000,
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
  rest.post(`${process.env.REACT_APP_BASE_URL}${endpoints.cart}`, async (req, res, ctx) => {
    // const body = await req.json();
    const response = {
      product: {
        id: 'bc645027-5544-4f6a-af8c-c6aa2b1a02b5',
        quantity: 2,
      },
      message: 'Item added to cart successfully',
    };
    return res(ctx.status(201), ctx.json(response), ctx.delay(100));
  }),
  rest.patch(`${process.env.REACT_APP_BASE_URL}${endpoints.cart}/:productId`, async (req, res, ctx) => {
    // const body = await req.json();
    const response = {
      id: '9a38d44d-df82-4272-adb1-8e83c3f88962',
      message: 'Item removed from cart successfully',
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(100));
  }),
];
/**
* post request to add item to cart
 * {
 *     "productId": "bc645027-5544-4f6a-af8c-c6aa2b1a02b5",
 *     "productQuantity": 2
 * }
*
*  */
