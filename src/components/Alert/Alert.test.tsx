import { mount, ReactWrapper } from 'enzyme';

import Alert from './index';

describe('Testing <Alert /> component', () => {
  it('Check if component render', () => {
    const wrapper: ReactWrapper = mount(<Alert show message="Some message" />);
    expect(wrapper.find('[data-testid="alert-message"]').length).toEqual(1);
  });

  it('Avoid component render when show is false', () => {
    const wrapper: ReactWrapper = mount(<Alert show={false} message="Some message" />);
    expect(wrapper.find('[data-testid="alert-message"]').length).toEqual(0);
  });

  it('Test color success class', () => {
    const wrapper: ReactWrapper = mount(<Alert show message="Some message" />);
    expect(wrapper.find('[data-testid="alert-wrapper"]').hasClass('bg-green-100')).toBeTruthy();
  });

  it('Test color error class', () => {
    const wrapper: ReactWrapper = mount(<Alert show message="Some message" type="error" />);
    expect(wrapper.find('[data-testid="alert-wrapper"]').hasClass('bg-red-100')).toBeTruthy();
  });
});
