import reducer, { add, clearChat } from './messages';
import { remove } from './users';

describe('Testing messages slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'INVALID' })).toEqual({ items: {} });
  });

  it('Add a message', () => {
    const previousState = { items: {} };
    const expectedResult = { items: { 'some-user': [{ id: 'some-id', type: 'user', text: 'Some message' }] } };
    expect(reducer(previousState, add({ userID: 'some-user', message: { id: 'some-id', type: 'user', text: 'Some message' } }))).toEqual(
      expectedResult
    );
  });

  it('Clear chat', () => {
    const expectedResult = { items: { 'some-user': [] } };
    expect(reducer({ items: { 'some-user': [{ id: 'a', type: 'user', text: 'some message' }] } }, clearChat('some-user'))).toEqual(expectedResult);
  });

  it('Remove user trigger', () => {
    expect(reducer({ items: { 'some-user': [{ id: 'a', type: 'user', text: 'some message' }] } }, remove('some-user'))).toEqual({ items: {} });
  });
});
