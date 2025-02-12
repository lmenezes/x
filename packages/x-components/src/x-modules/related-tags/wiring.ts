import {
  namespacedWireCommit,
  namespacedWireDispatch,
  namespacedWireDispatchWithoutPayload
} from '../../wiring/namespaced-wires.factory';
import { NamespacedWireCommit, NamespacedWireDispatch } from '../../wiring/namespaced-wiring.types';
import { createWiring } from '../../wiring/wiring.utils';

/**
 * `relatedTags` {@link XModuleName | XModule name}.
 *
 * @internal
 */
const moduleName = 'relatedTags';
/**
 * WireCommit for {@link RelatedTagsXModule}.
 *
 * @internal
 */
const wireCommit: NamespacedWireCommit<typeof moduleName> = namespacedWireCommit(moduleName);
/**
 * WireDispatch for {@link RelatedTagsXModule}.
 *
 * @internal
 */
const wireDispatch: NamespacedWireDispatch<typeof moduleName> = namespacedWireDispatch(moduleName);
/**
 * WireDispatchWithoutPayload for {@link RelatedTagsXModule}.
 *
 * @internal
 */
const wireDispatchWithoutPayload = namespacedWireDispatchWithoutPayload(moduleName);

/**
 * Sets the related tags state `query`.
 *
 * @public
 */
export const setRelatedTagsQuery = wireCommit('setQuery');

/**
 * Requests and stores the related tags.
 *
 * @public
 */
export const fetchAndSaveRelatedTagsWire = wireDispatchWithoutPayload('fetchAndSaveRelatedTags');

/**
 * Cancels the {@link RelatedTagsActions.fetchAndSaveRelatedTags} request promise.
 *
 * @public
 */
export const cancelFetchAndSaveRelatedTagsWire = wireDispatchWithoutPayload(
  'cancelFetchAndSaveRelatedTags'
);

/**
 * Sets the selected related tags.
 *
 * @public
 */
export const toggleRelatedTagWire = wireDispatch('toggleRelatedTag');

/**
 * Clear the selected related tags.
 *
 * @public
 */
export const clearSelectedRelatedTags = wireCommit('setSelectedRelatedTags', []);

/**
 * Clear the related tags query.
 *
 * @public
 */
export const clearRelatedTagsQuery = wireCommit('setQuery', '');

/**
 * Wiring configuration for the {@link RelatedTagsXModule | related tags module}.
 *
 * @internal
 */
export const relatedTagsWiring = createWiring({
  UserAcceptedAQuery: {
    setRelatedTagsQuery,
    clearSelectedRelatedTags
  },
  UserPickedARelatedTag: {
    toggleRelatedTagWire
  },
  RelatedTagsRequestChanged: {
    fetchAndSaveRelatedTagsWire
  },
  UserClearedQuery: {
    cancelFetchAndSaveRelatedTagsWire,
    clearRelatedTagsQuery,
    clearSelectedRelatedTags
  }
});
