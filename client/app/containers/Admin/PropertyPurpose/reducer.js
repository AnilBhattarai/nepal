/*
 *
 * PropertyPurpose reducer
 *
 */
import produce from 'immer';
import * as types from './constants';
import defaultImage from '../../../assets/img/logo.png';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  one: {
    value: 1,
    order: 1,
    is_active: true,
    title: '',
    description: '',
    media: null,
  },
  query: { find_title: '', size: 10 },
  // query: { find_name: '', find_key: '', size: 10 },
  loading: false,
  errors: { title: '', value: '', description: '' },
  tempImage: defaultImage,
};

/* eslint-disable default-case, no-param-reassign */
const propertyPurposeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = ' ';
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        draft.tempImage = initialState.tempImage;

        break;
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

      case types.LOAD_ONE_REQUEST:
        draft.loading = false;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        draft.loading = false;
        break;

      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        break;

      case types.SET_TEMP_IMAGE_VALUE:
        console.log('from reducer', action.payload);
        draft.tempImage = action.payload;
        break;
    }
  });

export default propertyPurposeReducer;
