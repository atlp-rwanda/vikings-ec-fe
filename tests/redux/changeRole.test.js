import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import rolesSlice, { updateRole } from '../../src/features/auth/rolesSlice';

describe('update role slice', () => {
    const initialState = {
      data: null,
      isLoading: false,
      error: null,
    };
  
    it('return rolesSlice', async () => {
      const expectedActions = [
        { type: 'updateRole/pending' },
        { type: 'updateRole/fulfilled', payload: { data :'mocked data'} },
      ];

      await jestStore.dispatch(updateRole({ role: "seller" }));
        expect(
          jestStore
            .getActions()
            .map((each) => each.type)
            .includes(expectedActions[1].type),
        ).toBe(true);
      });
  
    it('should set loading true while action is pending', () => {
      const action = { type: updateRole.pending };
      const State = rolesSlice(initialState, action);
      expect(State).toEqual({data: null, isLoading: true, error: null,});
    });

    it('should update role when action is fulfilled', () => {
      const action = {
        type: updateRole.fulfilled, 
        payload: { message: "Updated successfully" }, 
      };
      const State = rolesSlice(initialState, action);
      expect(State).toEqual({
        data: { message: "Updated successfully" },
        isLoading: false,
        error: null,
      });
    });
  
    it('should set error true when action is rejected', () => {
      const action = { type: updateRole.rejected, payload: 'error message' };
      const State = rolesSlice(initialState, action);
      expect(State).toEqual({
        ...initialState,
        isLoading: false,
        error: action.payload,
      });
    });
  });