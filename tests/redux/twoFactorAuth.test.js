/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import twoFactorAuthSlice, {
  verifyAuth,
} from '../../src/features/auth/twoFactorAuth';

describe('Two factor auth slice', () => {
  const initialState = {
    data: null,
    isLoading: false,
  };

  it('return twoFactorAuthslice', async () => {
    const expectedActions = [
      { type: 'user/verifyAuth/pending' },
      {
        type: 'user/verifyAuth/rejected',
        payload: { data: 'Code does not match. Try again' },
      },
    ];
    await jestStore.dispatch(verifyAuth({ authCode: '123456' }));
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: verifyAuth.pending };
    const State = twoFactorAuthSlice(initialState, action);
    expect(State.isLoading).toEqual(true);
  });

  it('should set data when action is fulfilled', () => {
    const action = { type: verifyAuth.fulfilled };
    const State = twoFactorAuthSlice(initialState, action);
    expect(State).toEqual({
      data: action.payload,
      isLoading: false,
      isAuthenticated: true,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: verifyAuth.rejected };
    const State = twoFactorAuthSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      data: null,
    });
  });
});
