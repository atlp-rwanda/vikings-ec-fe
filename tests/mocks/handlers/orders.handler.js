import { rest } from "msw";

// eslint-disable-next-line import/prefer-default-export
export const ordersHandler = [
    rest.get(`${process.env.REACT_APP_BASE_URL}/orders`, (req, res, ctx) => {
      /*  */
      const response = {
        message: "All Orders retrieved successfully",
        orders: {
          items: [
            {
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
            {
              id: "915dc7f5-b871-4260-9762-0711f2422cdd",
              status: "delivered",
              buyerId: "872526ad-76be-4f44-b5d9-8032f0925c2d",
              products: [
                {
                  quantity: 3,
                  productId: "6717e8c7-c058-4670-90c3-5c8953cc844a",
                },
              ],
              fullPrice: 30000,
              paymentId: "1357affd-beb6-438d-b6e9-9e48d68bad24",
              createdAt: "2023-05-03T12:42:45.035Z",
              updatedAt: "2023-05-03T12:42:45.035Z",
            },
            {
              id: "7b2a6e49-4e48-42c8-8606-77a102a83090",
              status: "pending",
              buyerId: "872526ad-76be-4f44-b5d9-8032f0925c2d",
              products: [
                {
                  quantity: 1,
                  productId: "470b79cc-35ca-49ec-b0d8-3334bfe735a6",
                },
              ],
              fullPrice: 15000,
              paymentId: "a6d5ba90-d874-4888-9234-1f82d698846b",
              createdAt: "2023-05-05T09:15:32.816Z",
              updatedAt: "2023-05-05T09:15:32.816Z",
            },
            {
              id: "f7e8e8b3-3c5d-48dc-8525-d58e13614b33",
              status: "pending",
              buyerId: "872526ad-76be-4f44-b5d9-8032f0925c2d",
              products: [
                {
                  quantity: 1,
                  productId: "470b79cc-35ca-49ec-b0d8-3334bfe735a6",
                },
              ],
              fullPrice: 15000,
              paymentId: "824fbc7a-c9bb-4042-b5b8-86e228ef2113",
              createdAt: "2023-05-05T10:18:12.612Z",
              updatedAt: "2023-05-05T10:18:12.612Z",
            },
            {
              id: "97b25d19-a342-4d41-9d6a-1d55b738349e",
              status: "accepted",
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
              updatedAt: "2023-05-08T09:57:26.769Z",
            },
            {
              id: "dc0674d6-101d-4608-9fb0-6627aa0fff99",
              status: "pending",
              buyerId: "872526ad-76be-4f44-b5d9-8032f0925c2d",
              products: [
                {
                  quantity: 2,
                  productId: "53709ac6-5d6e-4f79-a593-193e698ababc",
                },
                {
                  quantity: 1,
                  productId: "470b79cc-35ca-49ec-b0d8-3334bfe735a6",
                },
              ],
              fullPrice: 75000,
              paymentId: "51d47e83-b45a-494f-b21f-d20590cbc243",
              createdAt: "2023-05-08T12:51:58.882Z",
              updatedAt: "2023-05-08T12:51:58.882Z",
            },
            {
              id: "9c6339fe-f84a-45f4-903c-054b453f63ff",
              status: "pending",
              buyerId: "872526ad-76be-4f44-b5d9-8032f0925c2d",
              products: [
                {
                  quantity: 1,
                  productId: "470b79cc-35ca-49ec-b0d8-3334bfe735a6",
                },
              ],
              fullPrice: 15000,
              paymentId: "1ce39d21-1c4f-4048-a5f2-708c314e7121",
              createdAt: "2023-05-08T16:05:18.926Z",
              updatedAt: "2023-05-08T16:05:18.926Z",
            },
          ],
          meta: {
            totalItems: 7,
            itemCount: 7,
            itemsPerPage: "10",
            totalPages: 1,
            currentPage: "1",
          },
        },
      };
      return res(ctx.status(200), ctx.json(response), ctx.delay(100));
    }
  ),
];
