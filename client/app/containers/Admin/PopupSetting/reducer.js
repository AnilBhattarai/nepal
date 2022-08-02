import produce from 'immer';
import * as types from './constants';

const requirement = {
  image: '',
  start_date: '',
  end_date: '',
  link: '',
  caption: '',
  description: '',
};

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totalData: 0,
  },
  one: {
    title: '',
    key: '',
    template: 'single_image',
    templateRequirement: [requirement],
    is_active: false,
    start_date: '',
    end_date: '',
    display_target: 'one_by_one',
  },

  query: { find_title: '', size: 10 },
  loading: false,
  errors: { title: '', key: '' },
  chosen_index: 0,
  chosen_popup: [],
  isAd: false,
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_QUERY_OBJ:
        draft.query = action.payload;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = '';
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_MEDIA_SUCCESS:
        draft.media = action.payload;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        break;
      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id !== action.payload.data._id,
          ),
        };
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;

      case types.ADD_EDIT_REQUEST:
        draft.isAd = action.payload.isAd;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;

      case types.SET_SINGLE_REQUIREMENT:
        draft.one.templateRequirement = [requirement];
        break;

      case types.SET_SINGLE_VALUE:
        draft.one.templateRequirement[action.payload.index][
          action.payload.name
        ] = action.payload.value;
        break;

      case types.ADD_REQUIREMENT:
        draft.one.templateRequirement = [
          ...draft.one.templateRequirement,
          requirement,
        ];
        break;

      case types.REMOVE_REQUIREMENT:
        const requirementData = [...state.one.templateRequirement];
        requirementData.splice(action.payload, 1);
        draft.one.templateRequirement = requirementData;
        break;

      case types.ADD_FROM_MEDIA:
        draft.one.templateRequirement[draft.chosen_index].image = {
          ...action.payload,
        };
        break;
      case types.SET_CHOSEN_INDEX:
        draft.chosen_index = action.payload;
        break;

      case types.ADD_CHOSEN_POPUP:
        // console.log('action paylaod', action.payload);
        const popupIndex = draft.chosen_popup.indexOf(action.payload);
        if (popupIndex >= 0) {
          const tempChosenPopup = [...draft.chosen_popup];
          tempChosenPopup.splice(popupIndex, 1);
          draft.chosen_popup = tempChosenPopup;
        } else {
          draft.chosen_popup = [...draft.chosen_popup, action.payload];
        }
        break;

      case types.ADD_ALL_CHOSEN_POPUP:
        const popupIndexForAll = draft.chosen_popup.indexOf(action.payload);
        if (popupIndexForAll >= 0) {
          null;
        } else {
          draft.chosen_popup = [...draft.chosen_popup, action.payload];
        }
        break;

      case types.CLEAR_CHOSEN_POPUP:
        draft.chosen_popup = initialState.chosen_popup;
        break;

      case types.DELETE_MULTIPLE_POPUP_REQUEST:
        draft.loading = true;
        break;
      case types.DELETE_MULTIPLE_POPUP_SUCCESS:
        draft.chosen_popup = initialState.chosen_popup;
        draft.loading = false;
        break;
      case types.DELETE_MULTIPLE_POPUP_FAILURE:
        draft.loading = false;
        break;

      case types.ACTIVE_ALL_POPUP_REQUEST:
        draft.loading = true;
        break;
      case types.ACTIVE_ALL_POPUP_SUCCESS:
        draft.chosen_popup = initialState.chosen_popup;
        draft.loading = false;
        break;
      case types.ACTIVE_ALL_POPUP_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default reducer;
