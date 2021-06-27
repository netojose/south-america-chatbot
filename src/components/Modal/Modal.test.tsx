import { mount, ReactWrapper } from 'enzyme';

import Modal from './index';

const WRAPPER_FINDER = '[data-testid="modal-wrapper"]';
const TITLE_FINDER = '[data-testid="modal-title"]';
const CONTENT_FINDER = '[data-testid="modal-content"]';
const CLOSE_BTN_FINDER = '[data-testid="modal-close-btn"]';

describe('Testing <Modal /> component', () => {
  it('Check content', () => {
    const content = 'Modal children';
    const wrapper: ReactWrapper = mount(
      <Modal title="Some title" isOpen>
        {content}
      </Modal>
    );
    expect(wrapper.find(CONTENT_FINDER).text()).toEqual(content);
  });

  it('Check if Title', () => {
    const modalTitle = 'Modal title';
    const wrapper: ReactWrapper = mount(
      <Modal title={modalTitle} isOpen>
        Content
      </Modal>
    );
    expect(wrapper.find(TITLE_FINDER).text()).toEqual(modalTitle);
  });

  it('Avoid renreding when isOpen is false', () => {
    const wrapper: ReactWrapper = mount(
      <Modal title="Some title" isOpen={false}>
        Content
      </Modal>
    );
    expect(wrapper.find(WRAPPER_FINDER)).toHaveLength(0);
  });

  it("Don't show close button", () => {
    const wrapper: ReactWrapper = mount(
      <Modal title="Some title" isOpen>
        Content
      </Modal>
    );

    expect(wrapper.find(CLOSE_BTN_FINDER)).toHaveLength(1);

    wrapper.setProps({ showCloseBtn: false });

    expect(wrapper.find(CLOSE_BTN_FINDER)).toHaveLength(0);
  });

  it('Request close when click on overlay', () => {
    const spy = jest.fn();
    const wrapper: ReactWrapper = mount(
      <Modal title="Some title" isOpen onRequestClose={spy}>
        Content
      </Modal>
    );
    expect(spy).not.toHaveBeenCalled();
    wrapper.find('[data-testid="modal-overlay"]').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('Request close when click on close button', () => {
    const spy = jest.fn();
    const wrapper: ReactWrapper = mount(
      <Modal title="Some title" isOpen onRequestClose={spy}>
        Content
      </Modal>
    );
    expect(spy).not.toHaveBeenCalled();
    wrapper.find(CLOSE_BTN_FINDER).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
