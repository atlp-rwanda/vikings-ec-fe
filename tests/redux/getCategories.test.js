import { expect, describe, it } from '@jest/globals';
import { jestStore } from '../jest.setup';
import getCategoriesSlice, { fetchCategories } from '../../src/features/categorySlice';

describe('Get all categories', () => {
  const initialState = {
    categories: [],
    status: 'idle',
    error: null,
  };
  it('should return getCategoriesSlice', async () => {
    const expectedActions = [
      { type: 'fetchCategories/pending' },
      { type: 'fetchCategories/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(fetchCategories());
    expect(jestStore.getActions().map((each) => each.type)
      .includes(expectedActions[1].type)).toBe(true);
  });

  it('should set loading true while action is pending', () => {
    const action = { type: fetchCategories.pending };
    const state = getCategoriesSlice(initialState, action);
    expect(state).toEqual({
      categories: [],
      status: 'loading',
      error: null,
    });
  });

  it('should return categories when action is fulfilled', () => {
    const action = {
      type: fetchCategories.fulfilled,
      payload: { id: 1, name: 'Beans' },
    };
    const State = getCategoriesSlice(initialState, action);
    expect(State).toEqual({
      categories: {
        id: 1,
        name: 'Beans',
      },
      error: null,
      status: 'succeeded',
    });
  });

  it('should handle getCategories.rejected', () => {
    const error = 'Failed to get categories';
    const action = fetchCategories.rejected(error);
    const state = getCategoriesSlice(initialState, action);
    expect(state.status).toBe('failed');
  });
});
