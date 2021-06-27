import { mount } from 'enzyme';
import { useForm } from 'react-hook-form';

import Input from './Input';

const TestWrapper = ({ label, error }: { label?: string; error?: string }) => {
  const { register } = useForm<{ field: string }>();
  return <Input register={register('field')} label={label} error={error} />;
};

describe('Testing <Input /> component', () => {
  it('Check if component render', () => {
    const wrapper = mount(<TestWrapper />);
    expect(wrapper.find('input')).toBeDefined();
  });

  it('Has label', () => {
    const label = 'Some label';
    const wrapper = mount(<TestWrapper label={label} />);
    expect(wrapper.find('[data-testid="input-label"]').text()).toEqual(label);
  });

  it('Has error', () => {
    const error = 'Some error message';
    const wrapper = mount(<TestWrapper error={error} />);
    expect(wrapper.find('[data-testid="input-error"]').text()).toEqual(error);
  });
});
