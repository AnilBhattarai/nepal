/*
 *
 * AgencyMessages reducer
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
  query: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const agencyMessagesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default agencyMessagesReducer;
