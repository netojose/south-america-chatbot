import reducer, { add, remove } from './users';

describe('Testing users slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'INVALID' })).toEqual({ items: {} });
  });

  it('Add a user', () => {
    const user = { slug: 'some-user', name: 'Some User' };
    const previousState = { items: {} };
    const expectedResult = { items: { 'some-user': { name: 'Some User' } } };
    expect(reducer(previousState, add(user))).toEqual(expectedResult);
  });

  it('Remover a user', () => {
    const previousState = { items: { 'some-user': { name: 'Some User' } } };
    const expectedResult = { items: {} };
    expect(reducer(previousState, remove('some-user'))).toEqual(expectedResult);
  });
});
