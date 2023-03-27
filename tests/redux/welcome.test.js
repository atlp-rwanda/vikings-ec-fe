import { describe, expect, it } from '@jest/globals';
import { jestStore } from '../jest.setup';
import getMessage from '../../src/features/actions/welcomeAction';

describe('welcome test', () => {
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
});
