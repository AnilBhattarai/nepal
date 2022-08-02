/*
 *
 * Feedback reducer
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
  one: {},
  query: {},
  loading: false,
  errors: { title: '', value: '', description: '' },
};

/* eslint-disable default-case, no-param-reassign */
const feedbackReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default feedbackReducer;
