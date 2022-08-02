import produce from 'immer';
import * as types from './location.types';

const INITIAL_STATE = {
  loading: false,
  locationdata: [],
};
const reducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOCATION_DATA_SUCCESS:
        draft.locationdata = action.payload.data;
        break;
    }
  });
export default reducer;
