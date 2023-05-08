import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import markOneNotificationSlice, { markOneNotification } from '../../src/features/notifications/markOneNotificationSlice';
import axios from '../../src/features/api/customAxios';
import 'setimmediate';

jest.mock('../../src/features/api/customAxios');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('markOneNotificationSlice', () => {
  let store;
  beforeEach(() => {
    axios.patch.mockClear();
    store = mockStore({});
  });

  it('should handle markOneNotification.pending', () => {
    const expectedActions = [
      { type: markOneNotification.pending.type },
    ];
    store.dispatch(markOneNotification())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });

  it('should handle markOneNotification.fulfilled', () => {
    const id = 123;
    const response = { success: true };
    const expectedActions = [
      { type: markOneNotification.pending.type },
      { type: markOneNotification.fulfilled.type, payload: response },
    ];
    axios.patch.mockResolvedValueOnce({ data: response });
    store.dispatch(markOneNotification(id))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(axios.patch).toHaveBeenCalledTimes(1);
        expect(axios.patch).toHaveBeenCalledWith(
          `${Endpoints.notifications}/${id}`,
        );
      });
  });

  it('should handle markOneNotification.rejected', () => {
    const id = 123;
    const errorResponse = { message: 'Internal Server Error' };
    const expectedActions = [
      { type: markOneNotification.pending.type },
      { type: markOneNotification.rejected.type, payload: errorResponse },
    ];
    axios.patch.mockRejectedValueOnce({ response: errorResponse });
    store.dispatch(markOneNotification(id))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(axios.patch).toHaveBeenCalledTimes(1);
        expect(axios.patch).toHaveBeenCalledWith(
          `${Endpoints.notifications}/${id}`,
        );
      });
  });
});
