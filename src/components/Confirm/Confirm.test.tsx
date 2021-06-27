import { mount, ReactWrapper } from 'enzyme';

import Confirm from './index';

describe('Testing <Confirm /> component', () => {
  it('Check if component render', () => {
    const wrapper: ReactWrapper = mount(
      <Confirm isOpen={true} title="some title" text="some text" onRequestConfirm={jest.fn()} onRequestCancel={jest.fn()} />
    );
    expect(wrapper.find('p').length).toBe(1);
  });

  it('Avoid rendering when isOpen is false', () => {
    const wrapper: ReactWrapper = mount(
      <Confirm isOpen={false} title="some title" text="some text" onRequestConfirm={jest.fn()} onRequestCancel={jest.fn()} />
    );
    expect(wrapper.find('p').length).toBe(0);
  });

  it('Check modal content', () => {
    const content = 'Some text';
    const wrapper: ReactWrapper = mount(
      <Confirm isOpen={true} title="some title" text={content} onRequestConfirm={jest.fn()} onRequestCancel={jest.fn()} />
    );
    expect(wrapper.find('[data-testid="confirm-text"]').text()).toEqual(content);
  });

  it('Check modal content', () => {
    const content = 'Some text';
    const wrapper: ReactWrapper = mount(
      <Confirm isOpen={true} title="some title" text={content} onRequestConfirm={jest.fn()} onRequestCancel={jest.fn()} />
    );
    expect(wrapper.find('[data-testid="confirm-text"]').text()).toEqual(content);
  });

  it('Check trigger buttons', () => {
    const spyConfirm = jest.fn();
    const spyCancel = jest.fn();
    const wrapper: ReactWrapper = mount(
      <Confirm isOpen={true} title="some title" text="Some content" onRequestConfirm={spyConfirm} onRequestCancel={spyCancel} />
    );

    expect(spyConfirm).not.toHaveBeenCalled();
    wrapper
      .find('Button')
      .findWhere((el) => el.prop('label') === 'Ok')
      .simulate('click');
    expect(spyConfirm).toHaveBeenCalled();

    expect(spyCancel).not.toHaveBeenCalled();
    wrapper
      .find('Button')
      .findWhere((el) => el.prop('label') === 'Cancel')
      .simulate('click');
    expect(spyCancel).toHaveBeenCalled();
  });
});
