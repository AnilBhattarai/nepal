import produce from 'immer';
import * as types from './constants';

export const initialState = {
  one: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign, no-underscore-dangle */
const loginLogsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ONE_SUCCESS:
      draft.loading = false;
        draft.one = action.payload;
        break;
      case types.LOAD_ONE_FAILURE:
      draft.loading = false;
        break;
      case types.LOAD_ONE_REQUEST:
      draft.loading = true;
        break;
      case types.LOGOUT_SUCCESS:
        draft.one = {
          ...draft.one,
          data: draft.one.data.map(each => {
            if (action.payload.data._id === each._id)
              return action.payload.data;
            return each;
          }),
        };
        break;
    }
  });

export default loginLogsPageReducer;
