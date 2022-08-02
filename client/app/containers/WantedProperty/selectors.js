import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the wantedProperty state domain
 */

export const selectWantedPropertyDomain = state =>
  state.wantedProperty || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectWantedPropertyDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.all,
  );

export const makeSelectListing = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.listing,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.loading,
  );
export const makeSelectForm = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.form,
  );

export const makeSelectAddress = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.form.address,
  );

export const makeSelectOpenForm = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.openForm,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.errors,
  );
export const makeSelectFormLoading = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.form_loading,
  );
export const makeSelectPurpose = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.purpose,
  );

export const makeSelectCategory = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.category,
  );

export const makeSelectPriceLabel = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.priceLabel,
  );

export const makeSelectLocations = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate.locations,
  );
/**
 * Default selector used by WantedProperty
 */

const makeSelectWantedProperty = () =>
  createSelector(
    selectWantedPropertyDomain,
    substate => substate,
  );

export default makeSelectWantedProperty;
