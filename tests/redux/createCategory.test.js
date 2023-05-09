import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import createCategorySlice, { createCategory } from '../../src/createCategorySlice';

describe('Create category slice', () => {
  const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };

  it('Should return category slice', async () => {
    const expectedActions = [
      { type: 'createCategory/pending' },
      { type: 'createCategory/fulfilled', payload: { data: 'mocked data' } },
    ];

    await jestStore.dispatch(createCategory({
      name: 'Sweets',
    }));
    expect(
      jestStore.getActions().map((each) => each.type).includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: createCategory.pending };
    const state = createCategorySlice(initialState, action);
    expect(state).toEqual({ isLoading: true, data: null, error: null });
  });

  it('Should create a new category when action is fulfilled', () => {
    const action = {
      type: createCategory.fulfilled,
      payload: {
        name: 'Fruits',
      },
    };

    const state = createCategorySlice(initialState, action);
    expect(state).toEqual(
      {
        error: null,
        data: {
          name: 'Fruits',
        },
        isLoading: false,
      },
    );
  });
  it('Should set error true when action is rejected', () => {
    const action = { type: createCategory.rejected };
    const state = createCategorySlice(initialState, action);
    expect(state).toEqual({
      error: action.payload, isLoading: false, data: null,
    });
  });
});
