import {
  expect, describe, it,
} from '@jest/globals';
import googleSlice, { googleRedirect } from '../../src/features/auth/googleAuthSlice';
import { jestStore } from '../jest.setup';

describe('googleRedirect', () => {
  const initialState = {
    message: '',
    data: null,
    error: null,
    isLoading: false,
  };
  it('should dispatch the correct actions on success', async () => {
    const expectedActions = [
      { type: 'googleAuth/google_redirect/pending' },
      { type: 'googleAuth/google_redirect/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(googleRedirect('?sear=s'));
    expect(jestStore.getActions().map((each) => each.type)
      .includes(expectedActions[1].type)).toBe(true);
  });
  it('should set loading true while action is pending', () => {
    const action = { type: googleRedirect.pending };
    const State = googleSlice(initialState, action);
    expect(State).toEqual({
      isLoading: true, data: null, message: '', error: null,
    });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: googleRedirect.fulfilled,
      payload: { id: 1, name: 'John', age: 20 },
    };
    const State = googleSlice(initialState, action);
    expect(State).toEqual({
      data: { id: 1, name: 'John', age: 20 },
      error: null,
      isLoading: false,
      isAuthenticated: true,
      message: '',
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: googleRedirect.rejected };
    const State = googleSlice(initialState, action);
    expect(State).toEqual({
      data: null,
      error: action.payload,
      isLoading: false,
      message: '',
    });
  });
});
