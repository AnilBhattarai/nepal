/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { FacebookProvider, CustomChat } from 'react-facebook';

import saga from './saga';
import RoutesPublic from '../../layouts/Public';
import RoutesAdmin from '../../layouts/Admin';
import RoutesUser from '../../layouts/User';

// import GlobalStyle from '../../global-styles';
import AdminRoute from '../../components/Routes/AdminRoute';
import UserRoute from '../../components/Routes/UserRoute';
import ErrorBoundary from '../../components/ErrorBoundary';
import Notifier from './components/Notifier';
import { enqueueSnackbar } from './actions';
import { makeSelectLocation } from './selectors';
import { FB_APP_ID } from './constants';

const App = ({ location }) => (
  <ErrorBoundary>
    <Notifier />
    <Switch location={location}>
      <UserRoute path="/post-property" component={RoutesUser} />
      <UserRoute path="/user" component={RoutesUser} />
      <AdminRoute path="/admin" component={RoutesAdmin} />
      <Route path="/" component={RoutesPublic} />
    </Switch>
    {/* <GlobalStyle /> */}
    {/* {location && location.pathname !== '/properties/featured' && ( */}
    <div className="hidden lg:block">
      <FacebookProvider appId={FB_APP_ID} chatSupport>
        <CustomChat pageId="2355163344755354" minimized={true} />
      </FacebookProvider>
    </div>
    {/* )} */}
  </ErrorBoundary>
);

const withSaga = injectSaga({ key: 'global', saga });

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});
const withConnect = connect(
  mapStateToProps,
  { enqueueSnackbar },
);

export default compose(
  withSaga,
  withConnect,
)(App);
