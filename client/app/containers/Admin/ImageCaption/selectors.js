import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the imageCaption state domain
 */

export const selectImageCaptionDomain = state =>
  state.imageCaption || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectImageCaptionDomain,
    state => state.defaultData,
  );
export const makeSelectAll = () =>
  createSelector(
    selectImageCaptionDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectImageCaptionDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectImageCaptionDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectImageCaptionDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectImageCaptionDomain,
    state => state.errors,
  );

/**
 * Default selector used by ImageCaption
 */

const makeSelectImageCaption = () =>
  createSelector(
    selectImageCaptionDomain,
    substate => substate,
  );

export default makeSelectImageCaption;
