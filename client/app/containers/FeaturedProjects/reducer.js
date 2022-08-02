/*
 *
 * FeaturedProjects reducer
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
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const featuredProjectsReducer = (state = initialState, action) =>
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
    }
  });

export default featuredProjectsReducer;
