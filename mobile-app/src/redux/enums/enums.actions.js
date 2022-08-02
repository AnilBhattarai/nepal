import * as types from './enums.types';
import { enums } from '../../api';

export const enumsData = () => async dispatch => {
  dispatch({ type: types.ENUMS_DATA_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await enums();
    //console.log('response', response.data);
    dispatch({
      type: types.ENUMS_DATA_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.ENUMS_DATA_FAILURE, payload: err });
    throw err;
  }
};
