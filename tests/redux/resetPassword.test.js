import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import resetPasswordSlice, { resetPassword } from '../../src/features/auth/resetPasswordSlice';

describe('Rest Password Slice', () => {
  const initialState = {
    isLoading: false,
    error: null,
  };

  it('return reset Password Slice', async () => {
    const expectedActions = [
      { type: 'resetPassword/pending' },
      { type: 'resetPassword/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(resetPassword({ newPassword: 'Password@100', token: 'someToken' }));
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: resetPassword.pending };
    const State = resetPasswordSlice(initialState, action);
    expect(State).toEqual({ isLoading: true, error: null });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: resetPassword.fulfilled,
      payload: { },
    };
    const State = resetPasswordSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: resetPassword.rejected };
    const State = resetPasswordSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
    });
  });
});
