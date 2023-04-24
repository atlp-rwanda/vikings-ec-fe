import { expect, describe, it } from '@jest/globals';
import getProductsSilice, { getProductList } from '../../src/features/product/getProductsSilice';
import { jestStore } from '../jest.setup';
import singleProductSlice, { singleProduct } from '../../src/features/product/singleProductSlice';

describe('Get all products', () => {
  const initialState = {
    productsList: [],
    isLoading: false,
  };
  it('should return getProductsSlice', async () => {
    const expectedActions = [
      { type: 'products/fetchList/pending' },
      { type: 'products/fetchList/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(getProductList({ page: 1, limit: 30 }));
    expect(jestStore.getActions().map((each) => each.type)
      .includes(expectedActions[1].type)).toBe(true);
  });

  it('should set loading true while action is pending', () => {
    const action = { type: getProductList.pending };
    const state = getProductsSilice(initialState, action);
    expect(state).toEqual({
      isLoading: true, productsList: [],
    });
  });

  it('should return products when action is fulfilled', () => {
    const action = {
      type: getProductList.fulfilled,
      payload: { id: 1, product_name: 'Beans', price: 2 },
    };
    const State = getProductsSilice(initialState, action);
    expect(State).toEqual({
      productsList: {
        id: 1,
        product_name: 'Beans',
        price: 2,
      },
      isLoading: false,
    });
  });
});

describe('Get single product', () => {
  const initialState = {
    product: [],
    isLoading: false,
  };
  it('should return singleProductSlice', async () => {
    const expectedActions = [
      { type: 'singleProduct/fetchProduct/pending' },
      { type: 'singleProduct/fetchProduct/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(singleProduct('6717e8c7-c058-4670-90c3-5c8953cc844a'));
    expect(jestStore.getActions().map((each) => each.type)
      .includes(expectedActions[1].type)).toBe(true);
  });

  // it('should return error', async () => {
  //   const expectedActions = [
  //     { type: 'singleProduct/fetchProduct/pending' },
  //     { type: 'singleProduct/fetchProduct/fulfilled', payload: { data: 'mocked data' } },
  //   ];
  //   await jestStore.dispatch(singleProduct());
  //   expect(jestStore.getActions().map((each) => each.type)
  //     .includes(expectedActions[1].type)).toBe(true);
  // });

  it('should set loading true while action is pending', () => {
    const action = { type: singleProduct.pending };
    const state = singleProductSlice(initialState, action);
    expect(state).toEqual({
      isLoading: true, product: [],
    });
  });

  it('should return product when action is fulfilled', () => {
    const action = {
      type: singleProduct.fulfilled,
      payload: { id: 1, product_name: 'Beans', price: 2 },
    };
    const State = singleProductSlice(initialState, action);
    expect(State).toEqual({
      isLoading: false,
      product: { id: 1, product_name: 'Beans', price: 2 },
    });
  });

  it('should return error when action is rejected', () => {
    const action = { type: singleProduct.rejected, payload: { errorMessage: 'Error message' } };
    const state = singleProductSlice(initialState, action);
    expect(state).toEqual({
      product: [],
      isLoading: false,
      errorMessage: { errorMessage: 'Error message' },
    });
  });
});
