import { createSelector } from 'reselect';

const selectEnums = state => state.enums;
// const selectProperty = state => state.property;

export const selectEnumsData = createSelector(
  [selectEnums],
  enums => enums.enumsData,
);
