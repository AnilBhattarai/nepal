import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectRoles,
  makeSelectErrors,
  makeSelectAgentData,
  makeSelectBuilderData,
  makeSelectAuthorData,
  makeSelectAgency,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import Loading from '../../../../components/Loading';
import { IMAGE_BASE } from '../../../App/constants';
import { makeSelectUser } from '../../../App/selectors';
import defaultImage from '../../../../assets/img/logo.png';
import Input from '../../../../components/customComponents/Input';

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  state = {
    isSecure: false,
  };

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadAllRolesRequest();
    this.props.agentDataRequest();
    this.props.builderDataRequest();
    this.props.authorDataRequest();
    this.props.loadAgencyRequest();
  }

  handleChange = name => event => {
    event.persist();
    const tempUser = { ...this.props.one.users };
    tempUser[name] = event.target.value;
    this.props.setOneValue({ key: 'users', value: tempUser });
  };

  handleVerifyAgent = () => {
    this.props.applyAgentRequest({
      id: this.props.one.users._id,
      name: this.props.one.users.name,
      email: this.props.one.users.email,
    });
  };

  handleVerifyAuthor = () => {
    this.props.applyAuthorRequest({
      id: this.props.one.users._id,
      name: this.props.one.users.name,
      email: this.props.one.users.email,
    });
  };

  handleVerifyBuilder = () => {
    this.props.applyBuilderRequest({
      id: this.props.one.users._id,
      name: this.props.one.users.name,
      email: this.props.one.users.email,
    });
  };

  handleChecked = name => event => {
    event.persist();
    const tempUser = { ...this.props.one.users };
    tempUser[name] = event.target.checked;
    this.props.setOneValue({ key: 'users', value: tempUser });
  };

  handleCheckedAgent = name => event => {
    event.persist();
    this.props.setAgentValue({
      key: 'is_verified',
      value: event.target.checked,
    });
  };

  handleCheckedBuilder = name => event => {
    event.persist();
    this.props.setBuilderValue({
      key: 'is_verified',
      value: event.target.checked,
    });
  };

  handleCheckedAuthor = name => event => {
    event.persist();
    this.props.setAuthorValue({
      key: 'is_verified',
      value: event.target.checked,
    });
  };

  handleRolesChecked = roleid => {
    const tempUser = { ...this.props.one.users };
    if (tempUser.roles.includes(roleid)) {
      const index = tempUser.roles.indexOf(roleid);
      tempUser.roles = [
        ...tempUser.roles.slice(0, index),
        ...tempUser.roles.slice(index + 1),
      ];
    } else {
      tempUser.roles = [...tempUser.roles, roleid];
    }
    this.props.setOneValue({ key: 'users', value: tempUser });
  };

  handleTogglePassword = () => {
    this.setState({ isSecure: !this.state.isSecure });
  };

  handleSave = () => {
    this.props.addEditRequest(this.props.history.goBack);
  };

  handleUpdate = () => {
    this.props.updatePasswordRequest();
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
      one: { users, rolesNormalized, roles },
      agentData,
      userId,
      authorData,
      builderData,
      agency,
      roless,
      loading,
      errors,
    } = this.props;
    console.log(userId, 'authr');
    console.log(agentData, 'build');
    console.log(users, 'agen');
    return loading && loading == true ? (
      <Loading />
    ) : (
        <>
          <Helmet>
            <title>{id ? 'Edit User' : 'Add User'}</title>
          </Helmet>

          <div className="flex justify-between mt-3 mb-3">
            <PageHeader>
              <IconButton
                className={`${classes.backbtn} cursor-pointer`}
                onClick={this.handleBack}
                aria-label="Back"
              >
                <BackIcon />
              </IconButton>
              {id ? 'Edit' : 'Add'} User
          </PageHeader>
          </div>
          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <h3 className="text-lg font-bold mb-2">Basic Information</h3>
              <Input
                label="Email"
                inputclassName="inputbox"
                inputid="email"
                inputType="text"
                value={users.email || ''}
                onChange={this.handleChange('email')}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Name"
                inputclassName="inputbox"
                inputid="name"
                inputType="text"
                value={users.name || ''}
                onChange={this.handleChange('name')}
                error={(errors && errors.name) || ''}
              />
            </div>
            {/*  <div className="w-full md:w-1/2 pb-4">
              <label className="font-bold text-gray-700">Bio</label>

              <textarea
                className="inputbox"
                id="bio"
                type="text"
                value={(users && users.bio) || ''}
                onChange={this.handleChange('bio')}
              />
            </div> */}
            {roless.map(each => (
              <FormControlLabel
                key={each._id}
                control={
                  <Checkbox
                    key={each}
                    color="primary"
                    checked={users.roles.includes(each._id)}
                    onChange={() => this.handleRolesChecked(each._id)}
                  />
                }
                label={each.role_title || ''}
              />
            ))}
            <br />
            {id ? (
              <button
                className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
                onClick={this.handleSave}
              >
                Save
            </button>
            ) : (
                <></>
              )}
            {/* {id && agentData.is_apply === true && (
              <>
                <h1>Agent</h1>
                {agency.length > 0 &&
                  agency.map(each =>
                    each._id === agentData.agency ? (
                      <>
                        <strong>{each.title || ''}</strong>
                        <div>
                          <img
                            src={
                              each.logo
                                ? `${IMAGE_BASE}${each.logo.path}`
                                : defaultImage
                            }
                          />
                        </div>
                        <div>
                          <strong>Address: </strong>
                          {each.address || ''}
                        </div>
                        <div>
                          <strong>Phone No: </strong>
                          {each.phone || ''}
                        </div>
                        <div>
                          <strong>Mobile: </strong>
                          {each.mobile || ''}
                        </div>
                        <div>
                          <strong>E-mail: </strong>
                          {each.email || ''}
                        </div>
                        <div>{each.description || ''}</div>
                      </>
                    ) : null,
                  )}
                <br />
                <div className="w-full pb-4">
                  <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                    Short Bio
                </label>
                  <FormControl className="md:w-full">
                    <textarea
                      className="inputbox"
                      rows="5"
                      id="bio"
                      type="text"
                      value={(agentData && agentData.bio) || ''}
                      disabled="true"
                    />
                  </FormControl>
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="is_verified"
                      checked={agentData.is_verified || false}
                      onChange={this.handleCheckedAgent('is_verified')}
                    />
                  }
                  label="Is Verified"
                />

                <button
                  className="text-white py-2 px-4 rounded mt-4 bg-primary font-bold"
                  onClick={this.handleVerifyAgent}
                >
                  Save
              </button>
              </>
            )}
            {id && authorData.is_apply === true && (
              <>
                <h1>Author</h1>
                <br />
                <div className="w-full pb-4">
                  <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                    Short Bio
                </label>
                  <FormControl className="md:w-full">
                    <textarea
                      className="inputbox"
                      rows="5"
                      id="bio"
                      type="text"
                      value={(authorData && authorData.bio) || ''}
                      disabled="true"
                    />
                  </FormControl>
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="is_verified"
                      checked={authorData.is_verified || false}
                      onChange={this.handleCheckedAuthor('is_verified')}
                    />
                  }
                  label="Is Verified"
                />

                <button
                  className="text-white py-2 px-4 rounded mt-4 bg-primary font-bold"
                  onClick={this.handleVerifyAuthor}
                >
                  Save
              </button>
              </>
            )}
            {id && builderData.is_apply === true && (
              <>
                <h1>Builder</h1>
                <br />
                <div className="w-full pb-4">
                  <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                    Short Bio
                </label>
                  <FormControl className="md:w-full">
                    <textarea
                      className="inputbox"
                      rows="5"
                      id="bio"
                      type="text"
                      value={(builderData && builderData.bio) || ''}
                      disabled="true"
                    />
                  </FormControl>
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="is_verified"
                      checked={builderData.is_verified || false}
                      onChange={this.handleCheckedBuilder('is_verified')}
                    />
                  }
                  label="Is Verified"
                />

                <button
                  className="text-white py-2 px-4 rounded mt-4 bg-primary font-bold"
                  onClick={this.handleVerifyBuilder}
                >
                  Save
              </button>
              </>
            )}
            <br />
            <br /> */}
            <h3 className="text-lg font-bold">Reset Password</h3>
            <br />
            <div className="w-full md:w-1/2 pb-4">
              <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                Password
            </label>
              <div className="relative">
                <input
                  className="inputbox"
                  id="password"
                  type={this.state.isSecure ? 'password' : 'text'}
                  value={users.password || ''}
                  onChange={this.handleChange('password')}
                />
                <span
                  className={classes.EyeIcon}
                  aria-label="Toggle password visibility"
                  onClick={this.handleTogglePassword}
                >
                  {this.state.isSecure ? <Visibility /> : <VisibilityOff />}
                </span>
              </div>
              <div id="component-error-text">{errors.password || ''}</div>
            </div>
            <button
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
              onClick={this.handleSave}
            >
              Save
          </button>

            {/* <h3 className="text-lg font-bold mt-3">Reset Password</h3>
            <div className="w-full md:w-1/2 pb-4">
              <label className="label">Password</label>
              <div className="relative">
                <input
                  className="inputbox"
                  id="password"
                  type={this.state.isSecure ? 'password' : 'text'}
                  value={users.password || ''}
                  onChange={this.handleChange('password')}
                />
                <span
                  className={classes.EyeIcon}
                  aria-label="Toggle password visibility"
                  onClick={this.handleTogglePassword}
                >
                  {this.state.isSecure ? <Visibility /> : <VisibilityOff />}
                </span>
              </div>
              <div id="component-error-text">{errors.password || ''}</div>
            </div>
            <button
              className="block btn bg-primary hover:bg-secondary"
              onClick={this.handleUpdate}
            >
              {id ? 'Update Password' : 'Save'}
            </button> */}
          </PageContent>
        </>
      );
  }
}

const withReducer = injectReducer({ key: 'adminUserManagePage', reducer });
const withSaga = injectSaga({ key: 'adminUserManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  roless: makeSelectRoles(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  agentData: makeSelectAgentData(),
  authorData: makeSelectAuthorData(),
  builderData: makeSelectBuilderData(),
  agency: makeSelectAgency(),
  userId: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },

  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
  EyeIcon: { position: 'absolute', right: 12, top: 6 },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AddEdit);
