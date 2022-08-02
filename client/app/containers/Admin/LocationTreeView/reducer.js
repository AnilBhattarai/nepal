/* eslint-disable indent */
/*
 *
 * LocationTreeView reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  location: { allState: [], allDistrict: [], allVdc: [], allArea: [] },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const locationTreeViewReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_LOCATION_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_LOCATION_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_LOCATION_SUCCESS:
        draft.location = { ...action.payload.data };
        draft.loading = false;
        break;
      case types.SET_ACTIVE_SUCCESS: {
        if (action.payload.msg === 'State') {
          draft.location.allState = state.location.allState.map(each =>
            each._id === action.payload.data._id
              ? {
                  ...each,
                  is_active: action.payload.data.is_active,
                }
              : { ...each },
          );
        } else if (action.payload.msg === 'District') {
          draft.location.allDistrict = state.location.allDistrict.map(each =>
            each._id === action.payload.data._id
              ? {
                  ...each,
                  is_active: action.payload.data.is_active,
                }
              : { ...each },
          );
        } else if (action.payload.msg === 'VDC') {
          draft.location.allVdc = state.location.allVdc.map(each =>
            each._id === action.payload.data._id
              ? {
                  ...each,
                  is_active: action.payload.data.is_active,
                }
              : { ...each },
          );
        } else if (action.payload.msg === 'Area') {
          draft.location.allArea = state.location.allArea.map(each =>
            each._id === action.payload.data._id
              ? {
                  ...each,
                  is_active: action.payload.data.is_active,
                }
              : { ...each },
          );
        }
      }
    }
  });

export default locationTreeViewReducer;
