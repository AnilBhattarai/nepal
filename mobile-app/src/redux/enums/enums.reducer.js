import produce from 'immer';
import * as types from './enums.types';

const INITIAL_STATE = {
  loading: false,
  enumsData: {},
};
const reducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.ENUMS_DATA_SUCCESS:
        draft.enumsData = action.payload.data;
        break;
    }
  });
export default reducer;
