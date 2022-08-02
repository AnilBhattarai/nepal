/*
 *
 * FavoriteProperties reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  loading: false,
  loading_more: false,
};

/* eslint-disable default-case, no-param-reassign */
const favoritePropertiesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_FAVORITE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_FAVORITE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_FAVORITE_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_MORE_REQUEST:
        draft.loading_more = true;
        break;
      case types.LOAD_MORE_FAILURE:
        draft.loading_more = false;
        break;
      case types.LOAD_MORE_SUCCESS:
        const newData = draft.all.data.concat(action.payload.data);
        draft.all = { ...action.payload, data: newData };
        draft.loading_more = false;
        break;
    }
  });

export default favoritePropertiesReducer;
