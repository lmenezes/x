import {
  namespacedWireCommit,
  namespacedWireDispatch,
  namespacedWireDispatchWithoutPayload
} from '../../wiring/namespaced-wires.factory';
import { namespacedDebounce } from '../../wiring/namespaced-wires.operators';
import { NamespacedWireCommit, NamespacedWireDispatch } from '../../wiring/namespaced-wiring.types';
import { createWiring } from '../../wiring/wiring.utils';

/**
 * `historyQueries` {@link XModuleName | XModule name}.
 *
 * @internal
 */
const moduleName = 'historyQueries';
/**
 * WireCommit for {@link HistoryQueriesXModule}.
 *
 * @internal
 */
const wireCommit: NamespacedWireCommit<typeof moduleName> = namespacedWireCommit(moduleName);
/**
 * WireDispatch for {@link HistoryQueriesXModule}.
 *
 * @internal
 */
const wireDispatch: NamespacedWireDispatch<typeof moduleName> = namespacedWireDispatch(moduleName);
/**
 * WireDispatchWithoutPayload for {@link HistoryQueriesXModule}.
 *
 * @internal
 */
const wireDispatchWithoutPayload = namespacedWireDispatchWithoutPayload(moduleName);

/**
 * Saves a new query into the history queries.
 *
 * @public
 */
export const addQueryToHistoryQueries = wireDispatch('addQueryToHistory');

/**
 * Sets the query of the history queries module. Used for searching into the history queries.
 *
 * @public
 */
export const setHistoryQueriesQuery = wireCommit('setQuery');

/**
 * Sets the query of the history queries module to an empty string.
 *
 * @public
 */
export const clearHistoryQueriesQuery = wireCommit('setQuery', '');

/**
 * Triggers a session refresh, extending its validity for the time configured in the
 * {@link HistoryQueriesConfig.sessionTTLInMs}.
 *
 * @public
 */
export const refreshHistoryQueriesSession = wireDispatchWithoutPayload('refreshSession');

/**
 * Loads the history queries from the browser storage, saving them to the
 * {@link HistoryQueriesState.historyQueries}.
 *
 * @public
 */
export const loadHistoryQueriesFromBrowserStorageWire = wireDispatchWithoutPayload(
  'loadHistoryQueriesFromBrowserStorage'
);

/**
 * Clears the history queries.
 *
 * @public
 */
export const clearHistoryQueries = wireDispatch('setHistoryQueries', []);

/**
 * Removes a single history query from the history queries.
 *
 * @public
 */
export const removeHistoryQuery = wireDispatch('removeFromHistory');

/**
 * Debounce function for the module.
 */
const moduleDebounce = namespacedDebounce(moduleName);

/**
 * Default wiring for the {@link HistoryQueries} module.
 *
 * @internal
 */
export const historyQueriesWiring = createWiring({
  HistoryQueriesQueryChanged: {
    refreshHistoryQueriesSession
  },
  HistoryQueriesStorageKeyChanged: {
    loadHistoryQueriesFromBrowserStorageWire
  },
  UserClearedQuery: {
    clearHistoryQueriesQuery
  },
  UserAcceptedAQuery: {
    setHistoryQueriesQuery,
    addQueryToHistoryQueries
  },
  UserIsTypingAQuery: {
    setHistoryQueriesQueryDebounce: moduleDebounce(
      setHistoryQueriesQuery,
      ({ state }) => state.config.debounceInMs,
      'UserAcceptedAQuery'
    )
  },
  UserPressedClearHistoryQueries: {
    clearHistoryQueries
  },
  UserPressedRemoveHistoryQuery: {
    removeHistoryQuery
  }
});
