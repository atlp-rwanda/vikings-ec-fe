import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import getBuyerOrderslice, { getBuyerOrders} from '../../src/features/order/getBuyerOrderslice';

describe('order slice', () => {
  const initialState = {
    data: {},
    pagination: null,
    isLoading: false,
    error: null,
  };

  it('return orderslice', async () => {
    const expectedActions = [
      { type: 'fetchOrders/pending' },
      { type: 'fetchOrders/fulfilled', payload: { data: 'mocked data' } },
    ];

    const slice = await jestStore.dispatch(getBuyerOrders({ page: 1 }));
      expect(
        jestStore
          .getActions()
          .map((each) => each.type)
          .includes(expectedActions[1].type),
      ).toBe(true);
  });

  it('should set loading true while action is pending', () => {
    const action = { type: getBuyerOrders.pending };
    const State = getBuyerOrderslice(initialState, action);
    expect(State).toEqual({
      isLoading: true, error: null, data: {}, pagination: null,
    });
  });

  it('should get orders when action is fulfilled', () => {
    const action = {
      type: getBuyerOrders.fulfilled,
      payload: {
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
    };
    const State = getBuyerOrderslice(initialState, action);
    expect(State).toEqual({
      isLoading: false,
      error: null,
      data: {
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
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: getBuyerOrders.rejected };
    const State = getBuyerOrderslice(initialState, action);
    expect(State).toEqual({
      ...initialState,
      isLoading: false,
      error: action.payload,
    });
  });

});
