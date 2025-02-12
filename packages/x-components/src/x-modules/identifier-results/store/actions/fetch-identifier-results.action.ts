import { XPlugin } from '../../../../plugins/x-plugin';
import { IdentifierResultsXStoreModule } from '../types';

/**
 * Default implementation for the {@link IdentifierResultsActions.fetchIdentifierResults}.
 *
 * @param context - The {@link https://vuex.vuejs.org/guide/actions.html | context} of the actions,
 * provided by Vuex.
 * @returns A Promise of Result[] that resolves when it fetches identifier results or empty array
 * if the request was not made.
 *
 * @public
 */
//eslint-disable-next-line max-len
export const fetchIdentifierResults: IdentifierResultsXStoreModule['actions']['fetchIdentifierResults'] =
  ({ getters }) => {
    return getters.identifierResultsRequest
      ? XPlugin.adapter.searchById(getters.identifierResultsRequest).then(({ results }) => results)
      : [];
  };
