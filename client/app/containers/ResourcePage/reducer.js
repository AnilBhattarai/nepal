/*
 *
 * Documents reducer
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
    msg: '',
  },
  one: {
    name: '',
    key: '',
    file_id: '',
    resource_for: '', //  enum: ['agent', 'developer'] ,
    is_active: false,
  },
  query: {},
  loading: false,
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const documentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;

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

export default documentsReducer;
