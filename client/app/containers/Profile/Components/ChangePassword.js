import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// core components
import * as mapDispatchToProps from '../actions';
import { makeSelectErrors } from '../selectors';

const styles = theme => ({
  EyeIcon: { position: 'relative' },
});

/* eslint-disable react/prefer-stateless-function */
export class ChangePassword extends React.Component {
  static propTypes = {
    changePasswordRequest: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
    go: '',
    hi: '',
    data_errors: {
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    },
    showPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  };

  componentDidMount() {
    this.props.clearError();
  }

  static getDerivedStateFromProps = nextProps => ({ errors: nextProps.errors });

  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleTogglePassword = e => {
    e.persist();
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleToggleNewPassword = e => {
    e.persist();
    this.setState({
      showNewPassword: !this.state.showNewPassword,
    });
  };

  handleToggleConfirmPassword = e => {
    e.persist();
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword,
    });
  };

  validate = () => {
    const errors = {};
    const { oldPassword, newPassword, newPassword2 } = this.state;
    if (!oldPassword) errors.oldPassword = "Can't be empty";
    if (!newPassword) errors.newPassword = "Can't be empty";
    if (!newPassword2) errors.newPassword2 = "Can't be empty";
    return { errors, isValid: !Object.keys(errors).length };
  };

  handleSave = e => {
    e.preventDefault();
    const { errors: error, isValid } = this.validate();
    this.setState({ data_errors: error });

    if (isValid) {
      const { oldPassword, newPassword, newPassword2 } = this.state;
      this.props.changePasswordRequest({
        oldPassword,
        newPassword,
        newPassword2,
      });
    }
  };

  render() {
    const {
      oldPassword,
      newPassword,
      newPassword2,
      showPassword,
      showNewPassword,
      showConfirmPassword,
      errors,
    } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Helmet>
          <title>Change Password</title>
        </Helmet>
        <h1 className="text-2xl font-bold mb-4">Change Password</h1>
        <div className="w-full md:w-1/2 pb-4 relative">
          <label className="label" htmlFor="oldPassword">
            Old Password
          </label>
          <input
            className="inputbox"
            id="oldPassword"
            type="text"
            name="oldPassword"
            value={oldPassword}
            onChange={this.handleChange}
            type={showPassword ? 'text' : 'password'}
          />
          <span
            className={classes.EyeIcon}
            aria-label="Toggle password visibility"
            onClick={this.handleTogglePassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </span>
          {errors.oldPassword && (
            <div id="component-error-text">{errors.oldPassword}</div>
          )}
        </div>

        <div className="w-full md:w-1/2 pb-4">
          <label className="label" htmlFor="newPassword">
            New Password
          </label>
          <input
            className="inputbox"
            id="newPassword"
            type="text"
            name="newPassword"
            value={newPassword}
            onChange={this.handleChange}
            type={showNewPassword ? 'text' : 'password'}
          />
          <span
            className={classes.EyeIcon}
            aria-label="Toggle password visibility"
            onClick={this.handleToggleNewPassword}
          >
            {showNewPassword ? <Visibility /> : <VisibilityOff />}
          </span>
          {errors.newPassword && (
            <div id="component-error-text">{errors.newPassword}</div>
          )}
        </div>

        <div className="w-full md:w-1/2 pb-4">
          <label className="label" htmlFor="newPassword">
            Confirm New Password
          </label>
          <input
            className="inputbox"
            id="newPassword2"
            type="text"
            name="newPassword2"
            value={newPassword2}
            onChange={this.handleChange}
            type={showConfirmPassword ? 'text' : 'password'}
          />
          <span
            className={classes.EyeIcon}
            aria-label="Toggle password visibility"
            onClick={this.handleToggleConfirmPassword}
          >
            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
          </span>
          {errors.newPassword2 && (
            <div id="component-error-text">{errors.newPassword2}</div>
          )}
        </div>

        <button
          className="block btn bg-primary hover:bg-secondary"
          onClick={this.handleSave}
        >
          Save
        </button>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withConnect,
)(ChangePassword);
