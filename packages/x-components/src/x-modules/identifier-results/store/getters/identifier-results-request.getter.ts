import { IdentifierResultsXStoreModule } from '../types';
/**
 * Default implementation for the {@link IdentifierResultsGetters.identifierResultsRequest} getter.
 *
 * @param state - Current {@link https://vuex.vuejs.org/guide/state.html | state} of the identifier
 * results module.
 * @returns The identifier results request to fetch data from the API.
 *
 * @public
 */
// eslint-disable-next-line max-len
export const identifierResultsRequest: IdentifierResultsXStoreModule['getters']['identifierResultsRequest'] =
  ({ query, config }) => {
    return query.trim()
      ? {
          query,
          rows: config.maxItemsToRequest,
          start: 0,
          origin: 'default' //TODO Remove origin parameter when added as optional in search adapter.
        }
      : null;
  };
