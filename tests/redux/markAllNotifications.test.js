import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import markAllNotificationsSlice, {
  markAllNotifications,
} from '../../src/features/notifications/markAllNotificationsSlice';
import axios from '../../src/features/api/customAxios';
import 'setimmediate';

jest.mock('../../src/features/api/customAxios');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('markAllNotificationsSlice', () => {
  let store;
  beforeEach(() => {
    axios.patch.mockClear();
    store = mockStore({});
  });

  it('should handle markAllNotifications.pending', () => {
    const expectedActions = [
      { type: markAllNotifications.pending.type },
    ];
    store.dispatch(markAllNotifications())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });

  it('should handle markAllNotifications.fulfilled', () => {
    const response = { success: true };
    const expectedActions = [
      { type: markAllNotifications.pending.type },
      { type: markAllNotifications.fulfilled.type, payload: response },
    ];
    axios.patch.mockResolvedValueOnce({ data: response });
    store.dispatch(markAllNotifications())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(axios.patch).toHaveBeenCalledTimes(1);
        expect(axios.patch).toHaveBeenCalledWith(
          Endpoints.notifications,
        );
      });
  });

  it('should handle markAllNotifications.rejected', () => {
    const errorResponse = { message: 'Internal Server Error' };
    const expectedActions = [
      { type: markAllNotifications.pending.type },
      { type: markAllNotifications.rejected.type, payload: errorResponse },
    ];
    axios.patch.mockRejectedValueOnce({ response: errorResponse });
    store.dispatch(markAllNotifications())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(axios.patch).toHaveBeenCalledTimes(1);
        expect(axios.patch).toHaveBeenCalledWith(
          Endpoints.notifications,
        );
      });
  });
});
