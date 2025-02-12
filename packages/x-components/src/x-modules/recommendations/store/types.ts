import { TopRecommendationsRequest } from '@empathyco/x-adapter';
import { Result } from '@empathyco/x-types';
import { XActionContext, XStoreModule } from '../../../store';
import { StatusMutations, StatusState } from '../../../store/utils/helpers/status.helpers';
import { RecommendationsConfig } from '../config.types';

/**
 * Recommendations store state.
 *
 * @public
 */
export interface RecommendationsState extends StatusState {
  /** Configuration for the `Recommendations` module. */
  config: RecommendationsConfig;
  /** Param to be sent on the recommendations request. */
  origin: string;
  /** The recommendations of the module. */
  recommendations: Result[];
}

/**
 * Recommendations store getters.
 *
 * @public
 */
export interface RecommendationsGetters {
  /** The adapter request object for retrieving the recommendations. */
  request: TopRecommendationsRequest;
}

/**
 * Recommendations store mutations.
 *
 * @public
 */
export interface RecommendationsMutations extends StatusMutations {
  /**
   * Sets the recommendations of the module.
   *
   * @param recommendations - The recommendations list.
   */
  setRecommendations(recommendations: Result[]): void;
}

/**
 * Recommendations store actions.
 *
 * @public
 */
export interface RecommendationsActions {
  /**
   * Cancels / interrupt {@link RecommendationsActions.fetchAndSaveRecommendations} synchronous
   * promise.
   */
  cancelFetchAndSaveRecommendations(): void;
  /**
   * Requests and saves to the state a list of recommendations.
   */
  fetchAndSaveRecommendations(): void;
  /**
   * Requests and returns a list of recommendations based on the module state.
   *
   * @returns A new list of results.
   */
  fetchRecommendations(): Result[];
}

/**
 * Recommendations type safe store module.
 *
 * @public
 */
export type RecommendationsXStoreModule = XStoreModule<
  RecommendationsState,
  RecommendationsGetters,
  RecommendationsMutations,
  RecommendationsActions
>;

/**
 * Alias type for actions context of the {@link RecommendationsXStoreModule}.
 *
 * @public
 */
export type RecommendationsActionContext = XActionContext<
  RecommendationsState,
  RecommendationsGetters,
  RecommendationsMutations,
  RecommendationsActions
>;
