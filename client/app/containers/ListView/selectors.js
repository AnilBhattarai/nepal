import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the listView state domain
 */

export const selectListViewDomain = state => state.listView || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectListViewDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.loading,
  );

export const makeSelectLoadingOne = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.loading_one,
  );

export const makeSelectLoadingMore = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.loading_more,
  );

export const makeSelectAgency = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.agent,
  );
export const makeSelectDeveloper = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.developer,
  );

export const makeSelectOne = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.one,
  );

export const makeSelectRelated = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.related,
  );

export const makeSelectOffer = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.offer,
  );
export const makeSelectOfferForm = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.offerForm,
  );
export const makeSelectError = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.errors,
  );
export const makeSelectOfferLoading = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.offer_loading,
  );

export const makeSelectFavorite = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.favorite,
  );

export const makeSelectFavoriteLoading = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.favorite_loading,
  );

export const makeSelectFeedback = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.feedback,
  );

export const makeSelectFeedbackLoading = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.feedback_loading,
  );

export const makeSelectFeedbackErrors = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.feedbackErrors,
  );

export const makeSelectComplains = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.complain_type,
  );

export const makeSelectOptions = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.options,
  );

export const makeSelectFeedbackForm = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.feedbackForm,
  );

export const makeSelectOpenForm = () =>
  createSelector(
    selectListViewDomain,
    substate => substate.openForm,
  );
/**
 * Default selector used by ListView
 */

const makeSelectListView = () =>
  createSelector(
    selectListViewDomain,
    substate => substate,
  );

export default makeSelectListView;
