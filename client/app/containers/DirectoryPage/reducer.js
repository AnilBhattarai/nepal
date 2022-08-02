/*
 *
 * DirectoryPage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: {
      properties: [],
    },
    page: 1,
    size: 10,
    totaldata: 0,
  },
  categories: [],

  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const directoryPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_ENUM_SUCCESS:
        draft.categories = action.payload.data.service_category;
        break;
    }
  });

export default directoryPageReducer;
