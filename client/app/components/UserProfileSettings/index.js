import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import { logoutRequest } from '../../containers/App/actions';
import { makeSelectUser } from '../../containers/App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class UserProfileSettingsPage extends React.PureComponent {
  render() {
    const { user, children } = this.props;
    return (
      <div className="flex justify-between px-5 userProf">
        <div className="usersidemenuleft w-full md:w-1/4 -ml-5 bg-white">
          <React.Fragment>
            <div className="w-full border-b border-grey-lighter">
              <div className="w-full pb-2 text-base text-lg">
                <b>{user.name}</b>
              </div>
              <div className="w-full pb-4 text-base text-lg">
                <b>{user.email}</b>
              </div>
            </div>
            <div className="mt-5">
              <div className="pb-3">
                <NavLink
                  className="text-gray-800 hover:text-black no-underline"
                  to="/user/profile"
                >
                  Personal Information
                </NavLink>
              </div>

              <div className="pb-3">
                <NavLink
                  className="text-gray-800 hover:text-black no-underline"
                  to="/user/change-password"
                >
                  Change Password
                </NavLink>
              </div>
              <div className="pb-3">
                <NavLink
                  className="text-gray-800 hover:text-black no-underline"
                  to="/user/login-logs"
                >
                  Login Logs
                </NavLink>
              </div>
              <div className="pb-3">
                <NavLink
                  className="text-gray-800 hover:text-black no-underline"
                  to="/user/blogs"
                >
                  My Blogs
                </NavLink>
              </div>
            </div>
            <div className="pb-2">
              <NavLink
                className="text-gray-800 hover:text-black"
                to="/user/change-password"
              >
                Change Password
              </NavLink>
            </div>
            <button
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
              onClick={() => this.props.logoutRequest()}
            >
              LogOut
            </button>{' '}
            */}
          </React.Fragment>
        </div>
        <div className="p-4 divboxShadow bg-white usersidemenuRight w-full md:w-3/4 -mr-4">
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  root: {
    flexGrow: 1,
  },
  success: {
    backgroundColor: green[600],
  },
});

const withStyle = withStyles(styles);

UserProfileSettingsPage.propTypes = {
  // logoutRequest: PropTypes.func.isRequired,
};

export default compose(
  withConnect,
  withStyle,
)(UserProfileSettingsPage);
