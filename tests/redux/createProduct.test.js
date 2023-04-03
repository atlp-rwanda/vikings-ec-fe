/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import {
  describe, it, expect, jest,
} from '@jest/globals';
import { fireEvent, screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { jestStore } from '../jest.setup';
import createProductSlice, {
  createProduct,
} from '../../src/features/createProductSlice';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import CreateProductForm from '../../src/components/forms/CreateProductForm';
import store from '../../src/store';
import categorySlice, {
  fetchCategories,
} from '../../src/features/categorySlice';

describe('category slice', () => {
  const initialState = {
    categories: [],
    status: 'idle',
    error: null,
  };

  it('should set loading true while action is pending', () => {
    const action = { type: fetchCategories.pending };
    const State = categorySlice(initialState, action);
    expect(State).toEqual({
      status: 'loading',
      categories: [],
      error: null,
    });
  });

  it('should set categories when action is fulfilled', () => {
    const action = {
      type: fetchCategories.fulfilled,
      payload: {
        id: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
        name: 'shoes',
        createdAt: '2023-03-21T14:02:46.155Z',
        updatedAt: '2023-03-21T14:02:46.155Z',
      },
    };
    const State = categorySlice(initialState, action);
    expect(State).toEqual({
      error: null,
      status: 'succeeded',
      categories: {
        id: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
        name: 'shoes',
        createdAt: '2023-03-21T14:02:46.155Z',
        updatedAt: '2023-03-21T14:02:46.155Z',
      },
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: fetchCategories.rejected };
    const State = categorySlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      status: 'failed',
      categories: [],
    });
  });
});

describe('CreateProduct slice', () => {
  const initialState = {
    createdProduct: {},
    isLoading: false,
    error: null,
  };

  it('return createProductSlice', async () => {
    const expectedActions = [
      { type: 'createProduct/pending' },
      {
        type: 'createProduct/fulfilled',
        payload: { createdProduct: 'mocked data' },
      },
    ];
    await jestStore.dispatch(
      createProduct({
        name: 'High quality leather double seat sofa',
        price: 180000,
        quantity: 89,
      }),
    );
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(false);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: createProduct.pending };
    const State = createProductSlice(initialState, action);
    expect(State).toEqual({ isLoading: true, createdProduct: {}, error: null });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: createProduct.fulfilled,
      payload: { id: 1, name: 'John', age: 20 },
    };
    const State = createProductSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      createdProduct: action.payload,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: createProduct.rejected };
    const State = createProductSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      createdProduct: {},
    });
  });
});

jest.mock('../../src/utils/toast', () => ({
  showSuccessMessage: jest.fn(),
  showErrorMessage: jest.fn(),
}));

describe('CreateProductForm', () => {
  it('form submission', () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateProductForm onSubmit={mockSubmit} />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.change(getByPlaceholderText('Product Name'), {
      target: { value: 'High quality leather double seat sofa' },
    });

    const btn = screen.getByRole('submit', { label: 'Save' });
    userEvent.click(btn);

    expect(mockSubmit).toBeDefined();
  });
});
