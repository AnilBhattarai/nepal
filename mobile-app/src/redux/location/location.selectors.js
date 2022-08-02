import { createSelector } from 'reselect';

const selectLocation = state => state.location;

export const selectLocationData = createSelector(
  [selectLocation],
  location => location.locationdata,
);
