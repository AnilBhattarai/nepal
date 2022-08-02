import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import UserProfileSettingsPage from '../../components/UserProfileSettings';

const styles = theme => ({});

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
    errors: {},
    showPassword: false,
  };

  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value,
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

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { errors, isValid } = this.validate();
  //   this.setState({ errors });
  //   // const { oldPassword, newPassword, newPassword2 } = this.state;
  //   // this.props.changePasswordRequest({ oldPassword, newPassword, newPassword2 });
  //   if (isValid) {
  //     const { oldPassword, newPassword, newPassword2 } = this.state;
  //     this.props.changePasswordRequest({ oldPassword, newPassword, newPassword2 });
  //   }
  // };

  handleSave = e => {
    e.preventDefault();
    const { errors, isValid } = this.validate();
    this.setState({ errors });
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
      errors,
    } = this.state;
    const { classes, loading } = this.props;

    return (
      <div className="mx-auto max-w-md p-5 md:p-16">
        <h1 className="font-bold text-2xl">Change Password</h1>
        <div className="py-5">
          <ChangePasswordPage />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'changePassword', reducer });
const withSaga = injectSaga({ key: 'changePassword', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ChangePassword);
