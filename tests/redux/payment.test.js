import { expect, describe, it } from '@jest/globals';
import { jestStore } from '../jest.setup';
import getOrderDetailsSlice, { getOrderDetails } from '../../src/features/order/orderSlice';
import PaymentCheckoutSlice, { createPaymentsSession } from '../../src/features/payments/PaymentsSlice';

describe('Get paid orders', () => {
  const initialState = {
    data: null,
    isLoading: false,
  };
  it('should return getOrderDetailsSlice', async () => {
    const expectedActions = [
      { type: 'order/fetchOrderDetails/pending ' },
      { type: 'order/fetchOrderDetails/fulfilled ', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(getOrderDetails('6717e8c7-c058-4670-90c3-5c8953cc844a'));
  });

  it('should set loading true while action is pending', () => {
    const action = { type: getOrderDetails.pending };
    const state = getOrderDetailsSlice(initialState, action);
    expect(state).toEqual({
      isLoading: true, data: null,
    });
  });

  it('should return ordered when action is fulfilled', () => {
    const action = {
      type: getOrderDetails.fulfilled,
      payload: { id: 1, product_name: 'Beans', price: 2 },
    };
    const State = getOrderDetailsSlice(initialState, action);
  });
  it('should return error when action is rejected', () => {
    const action = { type: getOrderDetails.rejected, payload: { errorMessage: 'Error message' } };
    const state = getOrderDetailsSlice(initialState, action);
  });
});

describe('Get payment session', () => {
  const initialState = {
    data: null,
    isLoading: false,
  };
  it('should return paymentCheckoutSlice', async () => {
    const expectedActions = [
      { type: 'pay/createCheckoutSession/pending ' },
      { type: 'pay/createCheckoutSession/fulfilled ', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(createPaymentsSession());
  });

  it('should set loading true while action is pending', () => {
    const action = { type: createPaymentsSession.pending };
    const state = PaymentCheckoutSlice(initialState, action);
    expect(state).toEqual({
      isLoading: true, data: null,
    });
  });

  it('should return ordered when action is fulfilled', () => {
    const action = {
      type: createPaymentsSession.fulfilled,
      payload: { id: 1, product_name: 'Beans', price: 2 },
    };
    const State = PaymentCheckoutSlice(initialState, action);
  });
  it('should return error when action is rejected', () => {
    const action = { type: createPaymentsSession.rejected, payload: { errorMessage: 'Error message' } };
    const state = PaymentCheckoutSlice(initialState, action);
  });
});