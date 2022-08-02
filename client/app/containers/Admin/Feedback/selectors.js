import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the feedback state domain
 */

export const selectFeedbackDomain = state => state.feedback || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectFeedbackDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectFeedbackDomain,
    state => state.all,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectFeedbackDomain,
    state => state.loading,
  );
/**
 * Default selector used by Feedback
 */

const makeSelectFeedback = () =>
  createSelector(
    selectFeedbackDomain,
    substate => substate,
  );

export default makeSelectFeedback;
