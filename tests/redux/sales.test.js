import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import getSalesSlice, { getSales } from '../../src/features/sales/getSalesSlice';
import changeSalesStatusSlice, { changeSalesStatus } from '../../src/features/sales/changeSalesStatusSlice';

describe('Sales slice', () => {
  const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };

  it('Should return sales slice', () => {
    const expectedActions = [
      { type: 'sales/pending' },
      { type: 'sales/fulfilled', payload: { data: 'mocked data' } },
    ];

    return jestStore.dispatch(getSales()).then(() => {
      expect(
        jestStore
          .getActions()
          .map((each) => each.type)
          .includes(expectedActions[1].type),
      ).toBe(true);
    });
  });
  it('Should set loading true while action is pending', () => {
    const action = { type: getSales.pending };
    const state = getSalesSlice(initialState, action);
    expect(state).toEqual({ isLoading: true, data: null, error: null });
  });
  it('Should return sales when action is fulfilled', () => {
    const action = {
      type: getSales.fulfilled,
      payload: {
        sales: 'Your sales are here',
      },
    };
    const state = getSalesSlice(initialState, action);
    expect(state).toEqual({
      error: null,
      data: {
        sales: 'Your sales are here',
      },
      isLoading: false,
    });
  });
  it('Should set error true when action is rejected', () => {
    const action = { type: getSales.rejected };
    const state = getSalesSlice(initialState, action);
    expect(state).toEqual({ error: action.payload, isLoading: false, data: null });
  });
  it('Should return change sale status slice', async () => {
    const expectedActions = [
      { type: 'changeSalesStatus/pending' },
      { type: 'changeSalesStatus/fulfilled', payload: { data: 'mocked data' } },
    ];
    const response = await jestStore.dispatch(changeSalesStatus({ status: 'delivered' }));
    expect(
      jestStore.getActions().map((each) => each.type).includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);

  it('Should update the sale status when action is fulfilled', () => {
    const previousState = {
      data: {
        sellerSales: [{ id: 1, status: 'pending' }],
      },
      isLoading: false,
      error: null,
    };

    const action = {
      type: changeSalesStatus.fulfilled,
      payload: { id: 1, status: 'delivered' },
    };

    const state = changeSalesStatusSlice(previousState, action);
    expect(state.data.status).toEqual('delivered');
  });
});
