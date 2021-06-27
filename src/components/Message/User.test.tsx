import { mount, ReactWrapper } from 'enzyme';

import User from './User';

describe('Testing <User /> component', () => {
  it('Check if component render', () => {
    const text = 'Some text';
    const wrapper: ReactWrapper = mount(<User text={text} />);
    expect(wrapper.find('div')).toBeDefined();
    expect(wrapper.find('div').text()).toEqual(text);
  });
});
