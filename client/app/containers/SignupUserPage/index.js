/**
 *
 * SignupUserPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import LinkBoth from '../../components/LinkBoth/index';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import withStyles from '@material-ui/core/styles/withStyles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import NameInput from './components/NameInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import { FB_APP_ID, FB_APP_FIELDS, GOOGLE_CLIENT_ID } from '../App/constants';
import LoginUser from '../LoginUserPage/Loadable';
import StaticContentDiv from '../../components/StaticContentDiv';
import {
  makeSelectLoading,
  makeSelectErrors,
  makeSelectMobile,
} from './selectors';
import { makeSelectToken } from '../App/selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const SignupUserPage = ({
  classes,
  signupRequest,
  clearStore,
  token,
  signupWithFbRequest,
  signupWithGoogleRequest,
  loading,
  location,
  errors,
  mobile_no,
  setStoreValue,
}) => {
  useEffect(() => {
    if (!token) {
      clearStore();
    }
    window.scrollTo(0, 0);
  }, []);

  const handleChange = e =>
    setStoreValue({ key: 'mobile_no', value: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (
      location &&
      location.state &&
      location.state.from &&
      location.state.from.pathname
    ) {
      signupRequest(location.state.from.pathname);
    } else {
      signupRequest();
    }
  };
  return (
    <>
      <div className="bg-white">
        {/* <StaticContentDiv contentKey="signup-page-top" /> */}
        <div className="container mx-auto py-10 flex flex-wrap">
          <div className="hidden lg:block w-full lg:w-1/3 px-2 lg:px-10">
            <StaticContentDiv contentKey="signup-page-left" />
          </div>

          <div className="px-2 lg:px-10 w-full lg:w-1/3">
            {/* <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
    <Tab label="LOGIN" {...a11yProps(0)} />
    <Tab label="SIGN UP" {...a11yProps(1)} />
  </Tabs>
<TabPanel value={value} index={0}> */}
            <h2 className="font-bold text-xl">SIGN UP</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
              <NameInput />
              <EmailInput />
              <div className="mb-4">
                <label className="label" htmlFor="mobile">
                  Mobile no.
                </label>
                <div className="relative">
                  <span
                    className="absolute"
                    style={{
                      top: 7,
                      left: 10,
                      fontSize: '14px',
                    }}
                  >
                    +977
                  </span>
                  <input
                    onChange={handleChange}
                    value={mobile_no}
                    className="inputbox"
                    type="text"
                    style={{ paddingLeft: 45 }}
                    autoComplete="off"
                  />
                </div>

                {errors && (
                  <div id="component-error-text">{errors.mobile_no}</div>
                )}
              </div>
              <PasswordInput />

              <p className="mb-2 text-xs">
                By clicking sign up, you agree to{' '}
                <LinkBoth
                  className="text-secondary underline"
                  to="term-and-condition"
                  target="_blank"
                >
                  the terms and conditions
                </LinkBoth>
                ,{' '}
                <LinkBoth
                  className="text-secondary underline"
                  to="/privacy-policy"
                  target="_blank"
                >
                  privacy policy
                </LinkBoth>{' '}
                of NepalHomes.com
              </p>
              <button
                className="text-white py-2 px-4 rounded mt-4 w-full bg-secondary"
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={16} color="#fff" />
                ) : (
                  'Sign up'
                )}
              </button>
            </form>
          </div>
          <div className="px-2 lg:px-10 w-full lg:w-1/3 mt-10 lg:mt-0">
            <LoginUser location={location} />
          </div>
        </div>
      </div>
    </>
  );
};

SignupUserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  signupRequest: PropTypes.func.isRequired,
  clearStore: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  token: makeSelectToken(),
  errors: makeSelectErrors(),
  mobile_no: makeSelectMobile(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signupUserPage', reducer });
const withSaga = injectSaga({ key: 'signupUserPage', saga });

const styles = {
  googbtn: {
    boxShadow: 'none!important',
    border: '1px solid gainsboro!important',
    borderLeft: 'none!important',
  },
};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(SignupUserPage);
