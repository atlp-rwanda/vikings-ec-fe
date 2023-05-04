import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import logoutSlice, { logout } from '../../src/features/auth/logoutSlice';

describe('Logout slice', () => {
  const initialState = {
    isAuthenticated: true,
    isLoading: false,
    error: null,
  };

  it('Should return logoutSlice', async () => {
    const expectedActions = [
      {
        type: 'logout/pending',
      },
      { type: 'logout/fulfilled' },
    ];

    await jestStore.dispatch(logout());

    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);
});
