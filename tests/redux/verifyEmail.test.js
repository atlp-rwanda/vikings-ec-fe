import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import VerifyEmailSlice, { verifyEmail } from '../../src/features/auth/VerifyEmailSlice';

describe('verifyEmail', () => {
  const initialState = {
    message: '',
    data: null,
    error: null,
    isLoading: false,
  };
  it('should dispatch the correct actions on success', async () => {
    const expectedActions = [
      { type: 'verifyEmail/pending' },
      { type: 'verifyEmail/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(verifyEmail('someToken'));
    expect(jestStore.getActions().map((each) => {
      console.log(each, 'eachType');
      return each.type;
    })
      .includes(expectedActions[1].type)).toBe(true);
  });
  it('should set loading true while action is pending', () => {
    const action = { type: verifyEmail.pending };
    const State = VerifyEmailSlice(initialState, action);
    expect(State).toEqual({
      isLoading: true, data: null, message: '', error: null,
    });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: verifyEmail.fulfilled,
      payload: { id: 1, name: 'John', age: 20 },
    };
    const State = VerifyEmailSlice(initialState, action);
    expect(State).toEqual({
      data: { id: 1, name: 'John', age: 20 },
      error: null,
      isLoading: false,
      message: '',
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: verifyEmail.rejected };
    const State = VerifyEmailSlice(initialState, action);
    expect(State).toEqual({
      data: null,
      error: action.payload,
      isLoading: false,
      message: '',
    });
  });
});
