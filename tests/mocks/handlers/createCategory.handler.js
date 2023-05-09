import { rest } from 'msw';

export const createCategoryHandler = [
  rest.post(`${process.env.REACT_APP_BASE_URL}/categories`, (req, res, ctx) => {
    const response = {
      message: 'Category added successfully',
      category: {
        id: 'bcb66bac-9b8f-41a8-ab5d-d60c94a69d3e',
        name: 'spaceships',
        updatedAt: '2023-05-09T17:31:47.929Z',
        createdAt: '2023-05-09T17:31:47.929Z',
      },
    };
    return res(ctx.status(201), ctx.json(response), ctx.delay(100));
  }),
];
