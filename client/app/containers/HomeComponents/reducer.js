/*
 *
 * HomeComponents reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  property_category: [],
  directories: [],
  collections: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeComponentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_PROPERTY_CATEGORY_SUCCESS:
        draft.property_category = action.payload.data;
        break;

      case types.LOAD_DIRECTORY_SUCCESS:
        let activeDirectories = [];

        for (let index = 0; index < action.payload.data.length; index++) {
          const element = action.payload.data[index];
          if (element.is_active) {
            activeDirectories.push(element);
          }
        }
        draft.directories = activeDirectories;
        break;

      case types.LOAD_COLLECTION_SUCCESS:
        let activeCollections = [];

        for (let index = 0; index < action.payload.data.length; index++) {
          const element = action.payload.data[index];
          if (element.is_active) {
            activeCollections.push(element);
          }
        }
        draft.collections = activeCollections;
        break;
    }
  });

export default homeComponentsReducer;
