/**
 *
 * LoginAdminPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import withStyles from '@material-ui/core/styles/withStyles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectLoading,
  makeSelectEmailError,
  makeSelectPasswordError,
} from './selectors';
import * as mapDispatchToProps from './actions';

import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import logo from '../../assets/img/logo.png';
import bg from '../../assets/img/bg.jpg';
import '../../assets/styles/loading.css';

const LoginAdminPage = ({
  classes,
  loginRequest,
  loading,
  emailError,
  passwordError,
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };
  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-3/5 bg-blue">
        <img className="w-full h-full object-cover" src={bg} alt="" />
      </div>

      <div className="w-full md:w-2/5 relative block">
        <div
          className="absolute top-1/2 px-10 md:px-12 lg:px-16 xl:px-24 w-full"
          style={{ transform: 'translateY(-50%)' }}
        >
          <Link to="/">
            <img src={logo} alt="NepalHomes" className="w-2/3" />
          </Link>
          <form className="mt-4" onSubmit={handleSubmit}>
            <UsernameInput />
            <PasswordInput />
            <button
              className="btn mt-4 w-full bg-primary hover:bg-secondary"
              type="submit"
            >
              {loading ? (
                <div className="btn_loading">
                  <div />
                  <div />
                  <div />
                  <div />
                  <span className="ml-2">Login</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginAdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  emailError: makeSelectEmailError(),
  passwordError: makeSelectPasswordError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginAdminPage', reducer });
const withSaga = injectSaga({ key: 'loginAdminPage', saga });

const styles = {};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginAdminPage);
