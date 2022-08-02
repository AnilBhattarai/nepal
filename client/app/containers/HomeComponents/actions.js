/*
 *
 * HomeComponents actions
 *
 */

import * as types from './constants';

export const loadPropertyCategoryRequest = payload => ({
  type: types.LOAD_PROPERTY_CATEGORY_REQUEST,
  payload,
});
export const loadPropertyCategorySuccess = payload => ({
  type: types.LOAD_PROPERTY_CATEGORY_SUCCESS,
  payload,
});
export const loadPropertyCategoryFailure = payload => ({
  type: types.LOAD_PROPERTY_CATEGORY_FAILURE,
  payload,
});

export const loadDirectoryRequest = payload => ({
  type: types.LOAD_DIRECTORY_REQUEST,
  payload,
});
export const loadDirectorySuccess = payload => ({
  type: types.LOAD_DIRECTORY_SUCCESS,
  payload,
});
export const loadDirectoryFailure = payload => ({
  type: types.LOAD_DIRECTORY_FAILURE,
  payload,
});

export const loadCollectionRequest = payload => ({
  type: types.LOAD_COLLECTION_REQUEST,
  payload,
});
export const loadCollectionSuccess = payload => ({
  type: types.LOAD_COLLECTION_SUCCESS,
  payload,
});
export const loadCollectionFailure = payload => ({
  type: types.LOAD_COLLECTION_FAILURE,
  payload,
});
