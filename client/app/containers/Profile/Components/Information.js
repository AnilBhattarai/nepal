/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dropzone from 'react-dropzone';
import { Helmet } from 'react-helmet';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import CheckBox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DateInput from '../../../components/DateInput';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectErrors,
  makeSelectLoading,
} from '../selectors';
import { DATE_FORMAT, IMAGE_BASE } from '../../App/constants';
import * as mapDispatchToProps from '../actions';
import Input from '../../../components/customComponents/Input';

import PageContent from '../../../components/PageContent/PageContent';

import Loader from '../../../assets/img/loader.svg';

class UserPersonalInformationPage extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addPhotoRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    errors: PropTypes.object,
  };

  componentDidMount() {
    this.props.clearError();
    this.props.loadOneRequest();
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleDateChange = name => date => {
    this.props.setOneValue({
      key: name,
      value: moment(date).format('YYYY-MM-DD'),
    });
  };

  handleSocialChange = name => event => {
    event.persist();
    this.props.setSocialValue({ key: name, value: event.target.value });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleAdd = (files, name) => {
    // console.log('file', files[0]);
    // this.props.setOneValue({
    //   key: 'image',
    //   value: files[0],
    // });
    this.props.addPhotoRequest(files[0]);
  };

  render() {
    const { classes, one, errors, loading } = this.props;
    return (
      <>
        <Helmet>
          <title>My Profile</title>
        </Helmet>
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        {loading ? (
          <img src={Loader} style={{ width: '100px' }} alt="loading" />
        ) : (
            <>
              <div className="flex">
                <div className=" w-1/2">
                  <div className="w-full pb-2">
                    <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                      Name
                  </label>
                    <FormControl
                      className="md:w-full"
                      error={errors && errors.name && errors.name.length > 0}
                    >
                      <input
                        className="inputbox"
                        id="name"
                        type="text"
                        value={one.name || ''}
                        onChange={this.handleChange('name')}
                      />
                      <FormHelperText id="component-error-text">
                        {errors.name}
                      </FormHelperText>
                    </FormControl>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                      Email
                  </label>

                    <FormControl
                      className="md:w-full"
                      error={errors && errors.email && errors.email.length > 0}
                    >
                      <input
                        disabled
                        className="inputbox"
                        id="email"
                        type="text"
                        value={one.email || ''}
                        onChange={this.handleChange('name')}
                      />
                      <FormHelperText id="component-error-text">
                        {errors.email}
                      </FormHelperText>
                    </FormControl>
                  </div>

                  {/* <div className="w-full pb-2">
                  <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                    Facebook Link
                  </label>
                  <FormControl
                    className="md:w-full"
                    error={
                      errors &&
                      errors.social_link &&
                      errors.social_link.fb &&
                      errors.social_link.fb !== ''
                    }
                  >
                    <input
                      className="inputbox"
                      id="fb"
                      type="text"
                      value={
                        (one.social_link !== null && one.social_link.fb) || ''
                      }
                      onChange={this.handleSocialChange('fb')}
                    />
                    <FormHelperText id="component-error-text">
                      {errors.social_link}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="w-full pb-2">
                  <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                    Twitter Link
                  </label>
                  <FormControl
                    className="md:w-full"
                    error={
                      errors &&
                      errors.social_link &&
                      errors.social_link.twitter &&
                      errors.social_link.twitter !== ''
                    }
                  >
                    <input
                      className="inputbox"
                      id="twitter"
                      type="text"
                      value={
                        (one.social_link !== null && one.social_link.twitter) ||
                        ''
                      }
                      onChange={this.handleSocialChange('twitter')}
                    />
                    <FormHelperText id="component-error-text">
                      {errors.social_link}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className="w-full pb-2">
                  <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                    LinkedIn Link
                  </label>
                  <FormControl
                    className="md:w-full"
                    error={
                      errors &&
                      errors.social_link &&
                      errors.social_link.linkedIn &&
                      errors.social_link.linkedIn !== ''
                    }
                  >
                    <input
                      className="inputbox"
                      id="linkedIn"
                      type="text"
                      value={
                        (one.social_link !== null &&
                          one.social_link.linkedIn) ||
                        ''
                      }
                      onChange={this.handleSocialChange('linkedIn')}
                    />
                    <FormHelperText id="component-error-text">
                      {errors.social_link}
                    </FormHelperText>
                  </FormControl>
                </div> */}

                  <div className="w-full pb-2">
                    <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                      Mobile number
                  </label>

                    <FormControl
                      className="md:w-full"
                      error={
                        errors && errors.mobile_no && errors.mobile_no.length > 0
                      }
                    >
                      <input
                        className="inputbox"
                        id="mobile_no"
                        type="text"
                        value={one.mobile_no || ''}
                        onChange={this.handleChange('mobile_no')}
                      />
                      <FormHelperText id="component-error-text">
                        {errors.mobile_no}
                      </FormHelperText>
                    </FormControl>
                  </div>

                  <div className="md:w-full pb-4">
                    <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                      Date Of Birth
                  </label>
                    <DateInput
                      onDateChange={date => {
                        this.props.setOneValue({
                          key: 'date_of_birth',
                          value: moment(date).format('YYYY-MM-DD'),
                        });
                      }}
                      birth_date={moment(one.date_of_birth).format('YYYY-M-D')}
                    />
                    <FormHelperText id="component-error-text">
                      {errors.date_of_birth}
                    </FormHelperText>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                      Your Roles:
                  </label>
                    {one.roles.map(each => (
                      <span
                        key={each._id}
                        className="rounded text-sm bg-white border border-gray-300 px-2 py-1 mr-2 inline-block mb-2"
                      >
                        {each.role_title}{' '}
                      </span>
                    ))}
                  </div>
                  <button
                    className="text-white py-2 px-6 rounded mt-4 bg-primary font-bold"
                    onClick={this.handleSave}
                  >
                    Save
                </button>
                </div>

                <Dropzone onDrop={this.handleAdd}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="w-48 h-48 ml-10 mt-6 text-primary hover:text-secondary text-center self-start border border-primary hover:border-secondary rounded-lg border-dashed cursor-pointer">
                      <div
                        className="focus:outline-none flex items-center h-full"
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        {one.image ? (
                          <div
                            className="h-full w-full"
                            key={one.image._id}
                          // className="w-full sm:w-1/3 md:1/4 xl:w-1/5 mr-2 border mb-4 rounded"
                          >
                            <img
                              className="object-cover"
                              src={`${IMAGE_BASE}${one.image.path}`}
                              alt="profile"
                            />
                          </div>
                        ) : (
                            <div className="text-center w-full">
                              <i className="material-icons text-6xl">image</i>
                              <p className>Choose File or Drag Here</p>
                              <span className="text-sm text-gray-600">
                                (square size preferred)
                          </span>
                            </div>
                          )}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </>
          )}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  errors: makeSelectErrors(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({});

const withStyle = withStyles(styles);

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withStyle,
)(UserPersonalInformationPage);
