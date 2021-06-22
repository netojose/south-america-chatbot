import kebabCase from 'lodash/kebabCase';

const makeSlug = (text: string): string => kebabCase(text);

export default makeSlug;
