import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import userSlice, { getUserActions, getUsers } from '../../src/features/auth/userSlice';

describe('User slice', () => {
  const initialState = {
    data: null,
    pagination: null,
    isLoading: false,
    errorMessage: null,
  };

  it('return userslice', () => {
    const expectedActions = [
      { type: 'user/fetchUsers/pending' },
      { type: 'user/fetchUsers/fulfilled', payload: { data: 'mocked data' } },
    ];

    return jestStore.dispatch(getUsers({ page: 1 })).then(() => {
      expect(
        jestStore
          .getActions()
          .map((each) => each.type)
          .includes(expectedActions[1].type),
      ).toBe(true);
    });
  });

  it('should set loading true while action is pending', () => {
    const action = { type: getUsers.pending };
    const State = userSlice(initialState, action);
    expect(State).toEqual({
      isLoading: true, errorMessage: null, data: null, pagination: null,
    });
  });

  it('should get users when action is fulfilled', () => {
    const action = {
      type: getUsers.fulfilled,
      payload: {
        id: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
        firstname: 'Irakoze',
        lastname: 'Yves Seller',
        email: 'irakozeyves9@gmail.com',
        role: 'admin',
        isActive: true,
      },
    };
    const State = userSlice(initialState, action);
    expect(State).toEqual({
      isLoading: false,
      errorMessage: null,
      data: {
        id: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
        firstname: 'Irakoze',
        lastname: 'Yves Seller',
        email: 'irakozeyves9@gmail.com',
        role: 'admin',
        isActive: true,
      },
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: getUsers.rejected, payload: 'error message' };
    const State = userSlice(initialState, action);
    expect(State).toEqual({
      ...initialState,
      isLoading: false,
      errorMessage: action.payload,
    });
  });

  it('changeField reducer should update the state correctly', () => {
    const initialState = {
      data: {
        data: {
          items: [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
          ],
        },
      },
      isLoading: false,
    };

    const payload = {
      userId: 1,
      field: 'name',
      value: 'Johnny',
    };

    const newState = userSlice(initialState, getUserActions.changeField(payload));

    expect(newState.data.data.items[0].name).toBe('Johnny');
  });
});
