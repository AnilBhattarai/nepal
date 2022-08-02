import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
  },
  listing: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  loading: false,
  loading_more: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageDeveloperReducer = (state = initialState, action) =>
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
      case types.LOAD_LISTING_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_LISTING_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_LISTING_SUCCESS:
        draft.listing = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_MORE_REQUEST:
        draft.loading_more = true;
        break;
      case types.LOAD_MORE_FAILURE:
        draft.loading_more = false;
        break;
      case types.LOAD_MORE_SUCCESS:
        const newData = draft.listing.data.concat(action.payload.data);
        draft.listing = { ...action.payload, data: newData };
        draft.loading_more = false;
        break;
    }
  });

export default homePageDeveloperReducer;
