import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import changeUserStatusSlice, { changeStatus } from '../../src/features/auth/changeUserStatusSlice';

describe('update status slice', () => {
    const initialState = {
      data: null,
      isLoading: false,
      error: null,
    };
  
    it('return changeUserStatusSlice', async () => {
      const expectedActions = [
        { type: 'changeStatus/pending' },
        { type: 'changeStatus/fulfilled', payload: { data :'mocked data'} },
      ];

      const ses = await jestStore.dispatch(changeStatus({ isActive: false }));
        expect(
          jestStore
            .getActions()
            .map((each) => each.type)
            .includes(expectedActions[1].type),
        ).toBe(true);
      });
  
    it('should set loading true while action is pending', () => {
      const action = { type: changeStatus.pending };
      const State = changeUserStatusSlice(initialState, action);
      expect(State).toEqual({data: null, isLoading: true, error: null,});
    });

    it('should change status when action is fulfilled', () => {
      const action = {
        type: changeStatus.fulfilled, 
        payload: { message: "Account is disabled" }, 
      };
      const State = changeUserStatusSlice(initialState, action);
      expect(State).toEqual({
        data: { message: "Account is disabled" },
        isLoading: false,
        error: null,
      });
    });
  
    it('should set error true when action is rejected', () => {
      const action = { type: changeStatus.rejected, payload: 'error message' };
      const State = changeUserStatusSlice(initialState, action);
      expect(State).toEqual({
        ...initialState,
        isLoading: false,
        error: action.payload,
      });
    });
  });