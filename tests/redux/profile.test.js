import { describe, expect, it } from '@jest/globals';
import { jestStore } from '../jest.setup';
import getProfileSlice, { getProfile } from '../../src/features/profile/getProfileSlice';
import updateProfileSlice, { updateProfile } from '../../src/features/profile/updateProfileSlice';

describe('Profile test', () => {
  const initialState = {
    data: null,
    error: null,
    isLoading: false,
  };
  it('Return profile slice', async () => {
    const expectedActions = [
      { type: 'profile/pending' },
      { type: 'profile/fulfilled', payload: { data: 'mocked data' } },
    ];

    await jestStore.dispatch(getProfile());
    expect(
      jestStore.getActions().map((each) => each.type).includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: getProfile.pending };
    const state = getProfileSlice(initialState, action);
    expect(state).toEqual({ isLoading: true, data: null, error: null });
  });

  it('Should return profile when action is fulfilled', () => {
    const action = { type: getProfile.fulfilled, payload: { id: 1, firstname: 'Irakoze', lastname: 'Yves' } };
    const state = getProfileSlice(initialState, action);
    expect(state).toEqual({
      error: null,
      data: {
        firstname: 'Irakoze',
        id: 1,
        lastname: 'Yves',
      },
      isLoading: false,
    });
  });

  it('Should set error true when action is rejected', () => {
    const action = { type: getProfile.rejected };
    const state = getProfileSlice(initialState, action);
    expect(state).toEqual(
      {
        error: action.payload,
        isLoading: false,
        data: null,
      },
    );
  });

  it('Return update profile slice', async () => {
    const expectedActions = [
      { type: 'profile/updateProfile/pending' },
      { type: 'profile/updateProfile/fulfilled', payload: { data: 'mocked data' } },
    ];

    const res = await jestStore.dispatch(updateProfile({
      firstname: 'Kwizera',
      lastname: 'Tony',
      email: 'unverified@gmail.com',
    }));
    expect(
      jestStore.getActions().map((each) => each.type).includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);
  it('Should set loading true while update profile is pending', () => {
    const action = { type: updateProfile.pending };
    const state = updateProfileSlice(initialState, action);
    expect(state).toEqual({ isLoading: true, data: null, error: null });
  });
  it('Should return update message when action is fulfilled', () => {
    const action = { type: updateProfile.fulfilled, payload: { message: 'update successful' } };
    const state = updateProfileSlice(initialState, action);
    expect(state).toEqual({
      error: null,
      data: {
        message: 'update successful',
      },
      isLoading: false,
    });
  });
  it('Should set error true when action is rejected', () => {
    const action = { type: updateProfile.rejected };
    const state = updateProfileSlice(initialState, action);
    expect(state).toEqual(
      {
        error: action.payload,
        isLoading: false,
        data: null,
      },
    );
  });
});
