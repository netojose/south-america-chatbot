import { mount, ReactWrapper } from 'enzyme';

import Loader from './index';

describe('Testing <Loader /> component', () => {
  it('Check if component render', () => {
    const wrapper: ReactWrapper = mount(<Loader />);
    expect(wrapper.find('[data-testid="loader"]')).toBeDefined();
  });
});
