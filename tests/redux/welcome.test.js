import { describe, expect, it } from '@jest/globals';
import { jestStore } from '../jest.setup';
import getMessage from '../../src/features/actions/welcomeAction';
import welcomeSlice from '../../src/features/auth/welcomeSlice';

describe('welcome test', () => {
  const initialState = {
    data: { message: 'welcome' },
    isLoading: false,
  };
  it('return welcome', async () => {
    const expectedActions = [
      { type: 'message/fetchMessage/pending' },
      { type: 'message/fetchMessage/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(getMessage());
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);
  it('should set loading true while action is pending', () => {
    const action = { type: getMessage.pending };
    const State = welcomeSlice(initialState, action);
    expect(State).toEqual({
      ...initialState, isLoading: true,
    });
  });
  it('should set user when action is fulfilled', () => {
    const action = {
      type: getMessage.fulfilled,
      payload: { message: 'welcome again' },
    };
    const State = welcomeSlice(initialState, action);
    expect(State).toEqual({
      data: { message: 'welcome again' },
      isLoading: false,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: getMessage.rejected };
    const State = welcomeSlice(initialState, action);
    expect(State).toEqual({
      ...initialState,
      isLoading: false,
    });
  });
});
