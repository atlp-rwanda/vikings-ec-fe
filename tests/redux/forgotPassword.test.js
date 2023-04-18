import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import forgotPasswordSlice, { forgotPassword } from '../../src/features/auth/forgotPasswordSlice';

describe('Forgot Password Slice', () => {
  const initialState = {
    isLoading: false,
    error: null,
  };

  it('return forgotPasswordSlice', async () => {
    const expectedActions = [
      { type: 'forgotPassword/pending' },
      { type: 'forgotPassword/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(forgotPassword({ email: 'admin@gmail.com' }));
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);
  it('throw error', async () => {
    const expectedActions = [
      { type: 'forgotPassword/pending' },
      { type: 'forgotPassword/rejected', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(forgotPassword({ email: 'throw@gmail.com' }));
    expect(
      jestStore
        .getActions()
        .map((each) => {
          return each.type;
        })
        .includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: forgotPassword.pending };
    const State = forgotPasswordSlice(initialState, action);
    expect(State).toEqual({ isLoading: true, error: null });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: forgotPassword.fulfilled,
      payload: { },
    };
    const State = forgotPasswordSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: forgotPassword.rejected };
    const State = forgotPasswordSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
    });
  });
});
