import { mount, ReactWrapper } from 'enzyme';

import Button from './Button';

describe('Testing <Button /> component', () => {
  it('Check if component render', () => {
    const wrapper: ReactWrapper = mount(<Button label="Label" />);
    expect(wrapper.find('input')).toBeDefined();
  });

  it('Label is correct', () => {
    const label = 'Some label';
    const wrapper: ReactWrapper = mount(<Button label={label} />);
    expect(wrapper.find('input').prop('value')).toEqual(label);
  });

  it('Element colors', () => {
    const wrapper: ReactWrapper = mount(<Button label="some label" />);
    expect(wrapper.find('input').hasClass('bg-primary')).toBeTruthy();
    wrapper.setProps({ variant: 'danger' });
    expect(wrapper.find('input').hasClass('bg-danger')).toBeTruthy();
  });

  it('Trigger click', () => {
    const handler = jest.fn();
    const wrapper: ReactWrapper = mount(<Button label="click me" onClick={handler} />);
    expect(handler).not.toBeCalled();
    wrapper.find('input').simulate('click');
    expect(handler).toBeCalled();
  });
});
