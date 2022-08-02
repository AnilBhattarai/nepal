import { combineReducers } from 'redux';
import appReducer from './app/app.reducer';
import authReducer from './auth/auth.reducer';
import propertyReducer from './property/property.reducer';
import newsReducer from './news/news.reducer';
import enumsReducer from './enums/enums.reducer';
import locationReducer from './location/location.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  property: propertyReducer,
  news: newsReducer,
  enums: enumsReducer,
  location: locationReducer,
});

export default rootReducer;
