/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import signupSlice, { signup } from '../../src/features/auth/signupSlice';

describe('Signup slice', () => {
  const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };

  it('return signupSlice', async () => {
    const expectedActions = [
      { type: 'signup/pending' },
      { type: 'signup/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(
      signup({
        firstname: 'vikings',
        lastname: 'team',
        email: 'ad@gmail.com',
        password: 'Password@123',
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
    const action = { type: signup.pending };
    const State = signupSlice(initialState, action);
    expect(State).toEqual({ isLoading: true, data: null, error: null });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: signup.fulfilled,
      payload: { id: 1, name: 'John', age: 20 },
    };
    const State = signupSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      data: action.payload,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: signup.rejected };
    const State = signupSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      data: null,
    });
  });
});
