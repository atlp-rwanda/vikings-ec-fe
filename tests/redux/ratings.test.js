/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import provideRatingsSlice, { provideRatings } from '../../src/features/ratings/ratingsSlice';

describe('ProvideRatings slice', () => {
  const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };

  it('return provideRatingSSlice', async () => {
    const expectedActions = [
      { type: 'provideRatings/pending' },
      { type: 'provideRatings/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(
      provideRatings({
        rate: 2,
        Feedback: 'Thanks',
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
    const action = { type: provideRatings.pending };
    const State = provideRatingsSlice(initialState, action);
    expect(State).toEqual({ isLoading: true, data: null, error: null });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: provideRatings.fulfilled,
      payload: { id: 1, name: 'John', age: 20 },
    };
    const State = provideRatingsSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      data: action.payload,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: provideRatings.rejected };
    const State = provideRatingsSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      data: null,
    });
  });
});
