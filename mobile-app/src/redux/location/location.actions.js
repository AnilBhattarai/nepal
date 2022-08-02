import * as types from './location.types';
import { locationGet } from '../../api';
import Toast from 'react-native-tiny-toast';

export const locationData = () => async dispatch => {
  dispatch({ type: types.LOCATION_DATA_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await locationGet(); //ani yeta line
    // console.log('response', response.data);
    dispatch({
      type: types.LOCATION_DATA_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    dispatch({ type: types.LOCATION_DATA_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
