/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sendMessageSlice, { sendMessage } from '../../src/features/chat/sendMessage';
import getMessagesReducer, { getMessages } from '../../src/features/chat/getMessages';
import { jestStore } from '../jest.setup';
import loginSlice, { login } from '../../src/features/auth/loginSlice';
import store from '../../src/store';
import '@testing-library/jest-dom';
import Chat from '../../src/components/chat/chats';

describe('send message', () => {
  const initialState = {
    messages: [],
    isLoading: false,
    error: null,
  };

  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        getMessages: getMessagesReducer,
      },
    });
  });

  test('fetches messages from the API', async () => {
    await store.dispatch(getMessages());

    const state = store.getState().getMessages;

    expect(state.messages).toBeDefined();
    expect(state.isLoading).toBe(false);
    // expect(state.error).toBeDefined();
  });

  it('return getMessages Slice', async () => {
    const expectedActions = [
      { type: 'getMessages/pending' },
      { type: 'getMessages/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(getMessages());
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(false);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: getMessages.pending };
    const State = getMessagesReducer(initialState, action);
    expect(State).toEqual({ isLoading: true, messages: [], error: null });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: getMessages.fulfilled,
      payload: {
        messages: {
          rows: { 0: { id: 1, message: 'John' }, 1: { id: 1, message: 'John' } },
        },
      },
    };
    const State = getMessagesReducer(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      messages: action.payload.messages.rows,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: getMessages.rejected };
    const State = getMessagesReducer(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      messages: [],
    });
  });
});

describe('send message', () => {
  const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };

  it('return sendMessage slice', async () => {
    const expectedActions = [
      { type: 'sendMessage/pending' },
      { type: 'sendMessage/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(sendMessage({}));
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(false);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: sendMessage.pending };
    const State = sendMessageSlice(initialState, action);
    expect(State).toEqual({ isLoading: true, data: null, error: null });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: sendMessage.fulfilled,
      payload: { id: 1, message: 'John' },
    };
    const State = sendMessageSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      data: action.payload,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: sendMessage.rejected };
    const State = sendMessageSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      data: null,
    });
  });
});

const mockStore = configureMockStore();

describe('Chat', () => {
  const initialState = {
    user: {},
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  it('should set user when action is fulfilled', () => {
    const action = {
      type: login.fulfilled,
      payload: {
        id: 1, name: 'John', age: 20, token: 'token',
      },
    };
    const State = loginSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      isAuthenticated: true,
      user: {},
    });

    const user = action.payload.token;

    // const { getByPlaceholderText } = render(
    //   <Provider store={store}>
    //     <Chat user={user} />
    //   </Provider>,
    // );

    // expect(getByPlaceholderText('Type message')).toBeInTheDocument();
  });
});
