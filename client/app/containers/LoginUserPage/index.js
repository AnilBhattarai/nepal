/**
 *
 * LoginUserPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { createStructuredSelector } from 'reselect';
import CircularProgress from '@material-ui/core/CircularProgress';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import { FB_APP_ID, FB_APP_FIELDS, GOOGLE_CLIENT_ID } from '../App/constants';
import { makeSelectToken } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import {
  makeSelectLoading,
  makeSelectEmailError,
  makeSelectPasswordError,
} from './selectors';
import '../../assets/styles/loading.css';

const LoginUserPage = ({
  classes,
  loginRequest,
  clearStore,
  loginWithFbRequest,
  loginWithGoogleRequest,
  location,
  loading,
  token,
  emailErr,
  passwordErr,
}) => {
  useEffect(() => {
    if (!token) {
      clearStore();
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      location &&
      location.state &&
      location.state.from &&
      location.state.from.pathname
    ) {
      loginRequest(location.state.from.pathname);
    } else {
      loginRequest();
    }
  };
  return (
    <>
      <h2 className="font-bold text-xl">LOGIN</h2>{' '}
      <form className="mt-4" onSubmit={handleSubmit}>
        <UsernameInput />
        <PasswordInput />
        <button
          className="text-white py-2 px-4 rounded mt-4 w-full bg-orange-600 hover:bg-orange-700 font-bold"
          type="submit"
        >
          {loading ? (
            <CircularProgress size={16} className="text-white" />
          ) : (
            'LOGIN'
          )}
        </button>
      </form>
      <p className="text-muted text-center mt-4 mb-4 text-xs">OR LOGIN WITH</p>
      <div className="mt-5 mb-5 flex space-around">
        <FacebookLogin
          appId={FB_APP_ID}
          textButton="Facebook"
          autoLoad={false}
          fields={FB_APP_FIELDS}
          callback={loginWithFbRequest}
          onFailure={err => {
            console.log('something went wrong!', err);
          }}
          containerStyle={{
            textAlign: 'center',
            backgroundColor: '#3b5998',
            borderColor: '#3b5998',
            flex: 1,
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '4px 0 0 4px',
          }}
          buttonStyle={{
            flex: 1,
            textTransform: 'none',
            padding: '12px',
            background: 'none',
            border: 'none',
            fontSize: '13px',
          }}
          icon="fa-facebook"
        />
        <GoogleLogin
          className={`${classes.googbtn} flex jusitify-center flex-1`}
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Google"
          onSuccess={loginWithGoogleRequest}
          onFailure={err => {
            console.log('something went wrong!', err);
          }}
          cookiePolicy="single_host_origin"
          buttonStyle={{
            flex: 1,
            textTransform: 'none',
            padding: '12px',
            background: 'none',
            border: 'none',
            fontSize: '13px',
            boxShadow: 'none',
          }}
        />
      </div>
    </>
  );
};

LoginUserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginRequest: PropTypes.func.isRequired,
  loginWithFbRequest: PropTypes.func.isRequired,
  loginWithGoogleRequest: PropTypes.func.isRequired,
  clearStore: PropTypes.func.isRequired,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  emailErr: makeSelectEmailError(),
  passwordErr: makeSelectPasswordError(),
  token: makeSelectToken(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginUserPage', reducer });
const withSaga = injectSaga({ key: 'loginUserPage', saga });

const styles = {
  googbtn: {
    boxShadow: 'none!important',
    border: '1px solid #999 !important',
    borderLeft: 'none !important',
    borderRadius: '0 4px 4px 0 !important',
  },
};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginUserPage);
