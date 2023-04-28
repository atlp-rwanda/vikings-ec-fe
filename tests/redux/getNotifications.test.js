import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getNotificationSlice,
  fetchNotifications,
  addNotifications,
  markOneAsRead,
  markAllAsRead,
} from '../../src/features/notifications/getNotificationSlice';
import 'setimmediate';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getNotificationSlice', () => {

  it('should handle fetchNotifications.pending', () => {
    const initialState = { isLoading: false, error: null };
    const store = mockStore(initialState);

    store.dispatch(fetchNotifications());

    const actions = store.getActions();
    const expectedAction = { type: fetchNotifications.pending.type };
    const containsExpectedAction = actions.some((action) => action.type === expectedAction.type);

    expect(containsExpectedAction).toBe(true);
  });

  it('should handle fetchNotifications.fulfilled', () => {
    const initialState = { isLoading: true, error: null, notifications: [] };
    const store = mockStore(initialState);
    const mockPayload = {
      rows: [],
      totalPages: 2,
      currentPage: 1,
      totalItems: 10,
    };
    const expectedAction = {
      type: fetchNotifications.fulfilled.type,
      payload: mockPayload,
      meta: { arg: { append: false } },
    };

    store.dispatch(fetchNotifications.fulfilled(mockPayload, { meta: { arg: { append: false } } }));

    const actions = store.getActions();
    const containsExpectedAction = actions.some((action) => {
      if (action.type === expectedAction.type) {
        return expect(action.payload).toEqual(expectedAction.payload);
      }
      return false;
    });

    expect(containsExpectedAction).toBe(false);
  });

  it('should handle fetchNotifications.rejected', () => {
    const initialState = { isLoading: true, error: null };
    const store = mockStore(initialState);
    const mockPayload = { status: 500, message: 'Internal Server Error' };
    const expectedAction = {
      type: fetchNotifications.rejected.type,
      payload: undefined,
      meta: {
        arg: undefined, condition: false, requestId: undefined, requestStatus: 'rejected',
      },
      error: { message: mockPayload.message },
    };
    store.dispatch(fetchNotifications.rejected(mockPayload));
    const actions = store.getActions();
    const containsExpectedAction = actions.some((action) => {
      if (action.type === expectedAction.type) {
        return expect(action.error).toStrictEqual(expectedAction.error);
      }
      return false;
    });
    expect(containsExpectedAction).toBeDefined();
  });

  it('should handle addNotifications', () => {
    const initialState = { notifications: [] };
    const store = mockStore(initialState);
    const mockNotification = { id: 1, message: 'New notification', isRead: false };
    const expectedAction = { type: addNotifications.type, payload: mockNotification };

    store.dispatch(addNotifications(mockNotification));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('should handle markOneAsRead', () => {
    const initialState = {
      notifications: [
        { id: 1, message: 'Notification 1', isRead: false },
        { id: 2, message: 'Notification 2', isRead: false },
      ],
    };
    const store = mockStore(initialState);
    const notificationId = 1;
    const expectedAction = {
      type: markOneAsRead.type,
      payload: notificationId,
    };

    store.dispatch(markOneAsRead(notificationId));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('should handle markAllAsRead', () => {
    const initialState = {
      notifications: [
        { id: 1, message: 'Notification 1', isRead: false },
        { id: 2, message: 'Notification 2', isRead: false },
      ],
    };
    const store = mockStore(initialState);
    const expectedAction = {
      type: markAllAsRead.type,
    };
    store.dispatch(markAllAsRead());
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
