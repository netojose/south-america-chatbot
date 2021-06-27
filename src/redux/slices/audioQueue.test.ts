import reducer, { clearQueue, removeItem, setPlaying } from './audioQueue';
import { add, clearChat } from './messages';

describe('Testing audioQueue slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'INVALID' })).toEqual({ items: [] });
  });

  it('clear queue', () => {
    const previousState = { items: ['a', 'b'] };
    const expectedResult = { items: [] };
    expect(reducer(previousState, clearQueue())).toEqual(expectedResult);
  });

  it('Remove item from queue', () => {
    const previousState = { items: ['a', 'b'] };
    const expectedResult = { items: ['b'] };
    expect(reducer(previousState, removeItem())).toEqual(expectedResult);
  });

  it('Set item to play', () => {
    const previousState = { items: [] };
    const expectedResult = { items: ['b'] };
    expect(reducer(previousState, setPlaying('b'))).toEqual(expectedResult);
  });

  it('Clear chat trigger', () => {
    expect(reducer({ items: ['a', 'b', 'c'] }, clearChat('some-user'))).toEqual({ items: [] });
  });

  it('Add message trigger', () => {
    expect(
      reducer({ items: [] }, add({ userID: 'some-user', message: { id: 'some-id', type: 'speak', text: 'Some message', audio: 'base64' } }))
    ).toEqual({
      items: ['some-id'],
    });

    expect(reducer({ items: [] }, add({ userID: 'some-user', message: { id: 'some-id', type: 'user', text: 'Some message' } }))).toEqual({
      items: [],
    });
  });
});
