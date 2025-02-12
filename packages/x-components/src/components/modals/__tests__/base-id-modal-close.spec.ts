import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { installNewXPlugin } from '../../../__tests__/utils';
import BaseIdModalClose from '../base-id-modal-close.vue';

/**
 * Renders the {@link BaseIdModalClose} with the provided options.
 *
 * @param options - The options to render the component with.
 * @returns An small API to test the component.
 */
function renderBaseIdModalClose({
  id = 'random',
  template = `<BaseIdModalClose modalId="${id}" v-bind="$attrs"/>`
}: RenderBaseIdModalCloseOptions = {}): RenderBaseIdModalCloseAPI {
  const [, localVue] = installNewXPlugin();
  const containerWrapper = mount(
    {
      components: {
        BaseIdModalClose
      },
      template
    },
    { propsData: { modalId: id }, localVue }
  );

  const wrapper = containerWrapper.findComponent(BaseIdModalClose);
  const modalId = wrapper.props('modalId');

  return {
    wrapper,
    modalId,
    async click() {
      await wrapper.trigger('click');
    }
  };
}

describe('testing Close Button component', () => {
  it("emits UserClickedCloseModal with the component's id as payload", async () => {
    const { wrapper, modalId, click } = renderBaseIdModalClose();
    const listener = jest.fn();
    wrapper.vm.$x.on('UserClickedCloseModal').subscribe(listener);

    await click();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(modalId);
  });

  it('renders the default slot contents', () => {
    const { wrapper } = renderBaseIdModalClose({
      template: '<BaseIdModalClose modalId="modal" v-bind="$attrs">Close</BaseIdModalClose>'
    });

    expect(wrapper.text()).toEqual('Close');
  });
});

interface RenderBaseIdModalCloseOptions {
  /** Id of the modal to close. */
  id?: string;
  /** The template to render. */
  template?: string;
}

interface RenderBaseIdModalCloseAPI {
  /** The wrapper for the modal component. */
  wrapper: Wrapper<Vue>;
  /** The modal id. */
  modalId: string;
  /** Clicks the button. */
  click: () => Promise<void>;
}
