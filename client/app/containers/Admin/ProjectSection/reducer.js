/*
 *
 * ProjectSection reducer
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
  one: {
    projects: [],
    project_type: '',
    project_title: '',
    is_active: true,
  },
  loading: false,
  projectLoading: false,
  errors: {},
  tempProjects: '',
  searchResult: {},
};

/* eslint-disable default-case, no-param-reassign */
const projectSectionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
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
            each => each._id !== action.payload.data._id,
          ),
        };
        break;

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
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.SET_PROPERTIES_VALUE:
        draft.tempProjects = action.payload;
        break;

      case types.LOAD_PROPERTY_REQUEST:
        draft.propertyLoading = true;
        break;
      case types.LOAD_PROPERTY_SUCCESS:
        draft.one.projects = [
          ...state.one.projects,
          {
            id: action.payload.data,
          },
        ];
        draft.propertyLoading = false;
        draft.searchResult = {
          ...state.searchResult,
          [action.payload.data._id]: action.payload.data,
        };

        break;
      case types.LOAD_PROPERTY_FAILURE:
        draft.propertyLoading = false;
        break;
      case types.SET_START_DATE:
        draft.one.projects[action.payload.index].start_date =
          action.payload.value;
        break;
      case types.SET_END_DATE:
        draft.one.projects[action.payload.index].end_date =
          action.payload.value;
        break;
    }
  });

export default projectSectionReducer;
