import makeSlug from './makeSlug';

describe('Testing <Loader /> component', () => {
  it('Check if component render', () => {
    const expectedResult = 'jose-neto';
    const result = makeSlug('José Neto');
    expect(result).toEqual(expectedResult);
  });
});
