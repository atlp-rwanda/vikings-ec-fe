import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import updatePasswordSlice, { updatePassword } from '../../src/features/auth/updatePasswordSlice';

describe('UpdatePassword slice', () => {
  const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };

  it('return updatePasswordSlice', async () => {
    const expectedActions = [
      { type: 'updatePassword/pending' },
      { type: 'updatePassword/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(
      updatePassword({
        email: 'admin@gmail.com',
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
    const action = { type: updatePassword.pending };
    const State = updatePasswordSlice(initialState, action);
    expect(State).toEqual({ isLoading: true, data: null, error: null });
  });

  it('should return password when action is fulfilled', () => {
    const action = {
      type: updatePassword.fulfilled,
      payload: { id: 1, name: 'John', age: 20 },
    };
    const State = updatePasswordSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      data: action.payload,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: updatePassword.rejected };
    const State = updatePasswordSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      data: null,
    });
  });
});
