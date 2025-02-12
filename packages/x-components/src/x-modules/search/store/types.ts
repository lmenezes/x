import { SearchRequest, SearchResponse } from '@empathyco/x-adapter';
import {
  Banner,
  Facet,
  Filter,
  PartialResult,
  Promoted,
  RelatedTag,
  Result,
  Sort
} from '@empathyco/x-types';
import { XActionContext, XStoreModule } from '../../../store';
import { StatusMutations, StatusState } from '../../../store/utils/helpers/status.helpers';
import { Dictionary } from '../../../utils/types';
import { SearchConfig } from '../config.types';

/**
 * Search store state.
 *
 * @public
 */
export interface SearchState extends StatusState {
  /** The list of the banners, related to the `query` property of the state. */
  banners: Banner[];
  /** The configuration of the search module. */
  config: SearchConfig;
  /** The list of the facets, related to the `query` property of the state. */
  facets: Facet[];
  /** A flag to indicate if new results are append to the current instead of replacing them. */
  isAppendResults: boolean;
  /** The current page of the request. */
  page: number;
  /** The list of the partial results, related to the `query` property of the state. */
  partialResults: PartialResult[];
  /** The list of the promoted, related to the `query` property of the state. */
  promoteds: Promoted[];
  /** The internal query of the module. Used to request the search results. */
  query: string;
  /** The list of the related tags, related to the `query` property of the state. */
  relatedTags: RelatedTag[];
  /** The list of the results, related to the `query` property of the state. */
  results: Result[];
  /** The dictionary of selected filters, used to perform the search request.
   * The key is the facet id, and the value the list of filters for that facet. */
  selectedFilters: Dictionary<Filter[]>;
  /** The way of ordering the results. */
  sort: Sort;
  /** The spellcheckedQuery property of the state. */
  spellcheckedQuery: string;
  /** The total number of results, related to the `query` property of the state. */
  totalResults: number;
}

/**
 * Search store getters.
 *
 * @public
 */
export interface SearchGetters {
  /** The adapter request object for retrieving the results, or null if there is not
   * valid data to create a request. */
  request: SearchRequest | null;
}

/**
 * Search store mutations.
 *
 * @public
 */
export interface SearchMutations extends StatusMutations {
  /**
   * Append the results to the results state.
   *
   * @param results - Results array.
   */
  appendResults(results: Result[]): void;
  /**
   * Sets the banners of the module.
   *
   * @param banners - The new banners to save to the state.
   */
  setBanners(banners: Banner[]): void;
  /**
   * Sets the facets of the module.
   *
   * @param facets - The new facets to save to the state.
   */
  setFacets(facets: Facet[]): void;
  /**
   * Set the the `isAppendResuls` flag value.
   *
   * @param isAppendResults - The new flag value.
   */
  setIsAppendResults(isAppendResults: boolean): void;
  /**
   * Sets the page of the module.
   *
   * @param page - The new page.
   */
  setPage(page: number): void;
  /**
   * Sets the page size of the module.
   *
   * @param pageSize - The new page size.
   */
  setPageSize(pageSize: number): void;
  /**
   * Sets the partial results of the module.
   *
   * @param partialResults - The new partial results to save to the state.
   */
  setPartialResults(partialResults: PartialResult[]): void;
  /**
   * Sets the promoteds of the module.
   *
   * @param promoteds - The new promoted to save to the state.
   */
  setPromoteds(promoteds: Promoted[]): void;
  /**
   * Sets the query of the module, which is used to retrieve the results.
   *
   * @param newQuery - The new query to save to the state.
   */
  setQuery(newQuery: string): void;
  /**
   * Sets the related tags of the module.
   *
   * @param relatedTags - The new related tags to save to the state.
   */
  setRelatedTags(relatedTags: RelatedTag[]): void;
  /**
   * Sets the results of the module.
   *
   * @param results - The new results to save to the state.
   */
  setResults(results: Result[]): void;
  /**
   * Sets the selected filters of the module.
   *
   * @param selectedFilters - The new selected filters to save to the state.
   */
  setSelectedFilters(selectedFilters: Filter[]): void;
  /**
   * Sets the selected sort option of the module.
   *
   * @param sort - The new sort.
   */
  setSort(sort: Sort): void;
  /**
   * Sets the spellcheckedQuery of the module.
   *
   * @param spellcheckedQuery - The new spellcheck string to save to the state.
   */
  setSpellcheck(spellcheckedQuery: string): void;
  /**
   * Sets the total results of the module.
   *
   * @param totalResults - The new total results to save to the state.
   */
  setTotalResults(totalResults: number): void;
}

/**
 * Search store actions.
 *
 * @public
 */
export interface SearchActions {
  /**
   * Cancels / interrupt {@link SearchActions.fetchAndSaveSearchResponse} synchronous promise.
   */
  cancelFetchAndSaveSearchResponse(): void;
  /**
   * Fetches a new search response and stores them in the module state.
   */
  fetchAndSaveSearchResponse(): void;
  /**
   * Fetches the search response and returns them.
   *
   * @returns The new search response.
   */
  fetchSearchResponse(): SearchResponse;
  /**
   * Checks if there are more pages of results to load. If there are, then increases the page
   * number in state and set to `true` the {@link SearchState.isAppendResults} flag.
   *
   * @remarks This action is to implement the infinite scroll behaviour. To increase the page
   * for other purposes, please use the {@link SearchMutations.setPage} mutation.
   */
  increasePageAppendingResults(): void;
}

/**
 * Search type safe store module.
 *
 * @public
 */
export type SearchXStoreModule = XStoreModule<
  SearchState,
  SearchGetters,
  SearchMutations,
  SearchActions
>;

/**
 * Alias type for actions context of the {@link SearchXStoreModule}.
 *
 * @public
 */
export type SearchActionContext = XActionContext<
  SearchState,
  SearchGetters,
  SearchMutations,
  SearchActions
>;
