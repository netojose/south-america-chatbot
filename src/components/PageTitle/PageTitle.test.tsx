import { mount, ReactWrapper } from 'enzyme';
import { HelmetProvider } from 'react-helmet-async';

import PageTitle from './index';

describe('Testing <PageTitle /> component', () => {
  it('Check if component render', () => {
    const someTitle = 'Title here';
    const wrapper: ReactWrapper = mount(
      <HelmetProvider>
        <PageTitle title={someTitle} />
      </HelmetProvider>
    );
    expect(wrapper.find('[data-testid="pagetitle"]').text()).toEqual(someTitle);
  });
});
