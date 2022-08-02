/*
 *
 * PopUp reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  one: {
    title: '',
    key: '',
    template: 'single_image',
    templateRequirement: [],
    is_active: false,
    start_date: '',
    end_date: '',
  },
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const popUpReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_POP_UP_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_POP_UP_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_POP_UP_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        break;
    }
  });

export default popUpReducer;
