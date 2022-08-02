import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Tick from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectUser, makeSelectLocation } from '../../App/selectors';
import * as mapDispatchToProps from '../actions';

import {
  makeSelectToken,
  makeSelectOne,
  makeSelectLoading,
} from '../selectors';

const App = props => {
  const { user, token, one, loading, loadOneRequest, location } = props;

  useEffect(() => {
    loadOneRequest();
  }, []);

  useEffect(() => {
    scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="rounded-l-lg sidebar mt-5" style={{ minWidth: '16rem' }}>
      {one.email_verified
        ? null
        : loading === false && (
            <NavLink
              className="my-2 mr-2 block flex justifiy-between items-center px-4 py-2 rounded bg-red-100 border border-red-200 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white"
              to="/user/profile/verify"
            >
              <i className="material-icons mr-2">mail</i>
              <span className="pr-8">Email not verified</span>
              {/* <Clear /> */}
            </NavLink>
          )}
      <div
        className="pb-4 sidebar-links"
        style={{ position: 'sticky', top: 70 }}
      >
        {/* <h3 className="text-sm uppercase mt-4 mb-2 text-gray-500 px-4">
          Profile
        </h3> */}
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/profile/dashboard"
        >
          <i className="material-icons mr-2 text-base text-secondary">
            explore
          </i>
          Dashboard
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/profile/information"
        >
          <i className="material-icons mr-2 text-base text-secondary">
            tag_faces
          </i>
          My Profile
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/leads"
        >
          <i className="material-icons mr-2 text-base text-secondary">link</i>
          My Leads
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/profile/saved-searches"
        >
          <i className="material-icons mr-2 text-base text-secondary">link</i>
          My Saved Searches
        </NavLink>
        <h3 className="text-sm uppercase mt-4 mb-2 text-gray-500 px-4">
          Roles
        </h3>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/member/agent"
        >
          <i className="material-icons mr-2 text-base text-secondary">
            person_pin
          </i>
          Agent
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/member/developer"
        >
          <i className="material-icons mr-2 text-base text-secondary">work</i>
          Developer
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/member/author"
        >
          <i className="material-icons mr-2 text-base text-secondary">
            person_pin
          </i>
          Author
        </NavLink>
        <h3 className="text-sm uppercase mt-4 mb-2 text-gray-500 px-4">
          Property/Project
        </h3>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/property"
        >
          <i className="material-icons mr-2 text-base text-secondary">home</i>
          My Properties
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/project"
        >
          <i className="material-icons mr-2 text-base text-secondary">
            business
          </i>
          My Projects
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/favorites"
        >
          <i className="material-icons mr-2 text-base text-secondary">
            favorite
          </i>
          My Favorites
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/request"
        >
          <i className="material-icons mr-2 text-base text-secondary">
            live_help
          </i>
          My Requests
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/blog"
        >
          <i className="material-icons mr-2 text-base text-secondary">
            comment
          </i>
          My Blogs
        </NavLink>

        {/* <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/comments"
        >
          Comments
        </NavLink> */}
        <h3 className="text-sm uppercase mt-4 mb-2 text-gray-500 px-4">
          Security
        </h3>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/profile/change-password"
        >
          <i className="material-icons mr-2 text-base text-secondary">lock</i>
          Change Password
        </NavLink>
        <NavLink
          className="block text-gray-800 py-2 px-4 text-sm flex items-center"
          to="/user/login-logs"
        >
          <i className="material-icons mr-2 text-base text-secondary">
            exit_to_app
          </i>
          Login Logs
        </NavLink>
      </div>
    </div>
  );
};

App.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.bool.isRequired,
};

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  token: makeSelectToken(),
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  location: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
