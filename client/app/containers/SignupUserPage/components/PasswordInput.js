import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const PasswordInput = props => {
  const { password, setStoreValue, error, classes } = props;
  const [isSecure, setIsSecure] = useState();

  const handleTogglePassword = () => {
    setIsSecure(state => !state);
  };

  const handleChange = e =>
    setStoreValue({ key: 'password', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <label className="label" htmlFor="SignUpPassword">
          Password
        </label>
      </div>
      <div className="relative">
        <input
          error={error || hasError.toString()}
          onChange={handleChange}
          value={password}
          id="SignUpPassword"
          type={isSecure ? 'text' : 'password'}
          className="inputbox"
          autoComplete="new-password"
        />
        <span
          className={classes.EyeIcon}
          aria-label="Toggle password visibility"
          onClick={handleTogglePassword}
        >
          {isSecure ? <Visibility /> : <VisibilityOff />}
        </span>
        {/* <Link
          className="inline-block align-baseline text-xs text-blue-700 hover:text-blue-700-darker"
          to="/forgot-password-user"
        >
          Forgot Password?
        </Link> */}
      </div>
      {error && <div id="component-error-text">{error}</div>}
    </div>
  );
};

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  error: makeSelectPasswordError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const styles = theme => ({
  EyeIcon: { position: 'absolute', right: 12, top: 6 },
});

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(PasswordInput);
