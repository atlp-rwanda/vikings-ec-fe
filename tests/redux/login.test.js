/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import loginSlice, { login } from '../../src/features/auth/loginSlice';

describe('Login slice', () => {
  const initialState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  it('return loginslice', async () => {
    const expectedActions = [
      { type: 'login/pending' },
      { type: 'login/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(login({ email: 'admin@gmail.com', password: 'Password@123' }));
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: login.pending };
    const State = loginSlice(initialState, action);
    expect(State).toEqual({ isLoading: true, isAuthenticated: false, error: null });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: login.fulfilled,
      payload: { id: 1, name: 'John', age: 20 },
    };
    const State = loginSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      isAuthenticated: true,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: login.rejected };
    const State = loginSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      isAuthenticated: false,
    });
  });
});
