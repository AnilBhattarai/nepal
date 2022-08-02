/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import CKEditor from 'react-ckeditor-component';
import { SketchPicker } from 'react-color';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectBuilderData,
  makeSelectDevelopers,
  makeSelectLoading,
  makeSelectNewDeveloper,
} from '../selectors';
import { makeSelectUser } from '../../App/selectors';

import * as mapDispatchToProps from '../actions';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import Loading from '../../../components/Loading';
import Loader from '../../../assets/img/loader.svg';
import defaultImage from '../../../assets/img/logo.svg';

class ApplyForBuilder extends React.PureComponent {
  static propTypes = {
    applyBuilderRequest: PropTypes.func.isRequired,
    addDeveloperRequest: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    builderData: PropTypes.object.isRequired,
    errors: PropTypes.object,
    setBuilderValue: PropTypes.func.isRequired,
    setNewDeveloperValue: PropTypes.func.isRequired,
    setNewDeveloper: PropTypes.func.isRequired,
    loadDevelopersRequest: PropTypes.func.isRequired,
    builderDataRequest: PropTypes.func.isRequired,
    clearDeveloper: PropTypes.func.isRequired,
  };

  state = {
    open: false,
    openDevelopers: true,
    openDevelopersForm: false,
    tempImage: defaultImage,
    newFile: false,
    sameUser: false,
    firstLoad: true,
    newBannerFile: false,
    tempBannerImage: defaultImage,
  };

  componentDidMount() {
    this.props.loadDevelopersRequest();
    this.props.builderDataRequest();
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    if (this.props.builderData.is_apply && this.state.firstLoad) {
      this.handleAppliedUser();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeBio = event => {
    this.props.setNewDeveloperValue({ key: 'bio', value: event.target.value });
  };

  handleChangeName = event => {
    this.props.setNewDeveloperValue({ key: 'name', value: event.target.value });
  };

  handleChange = name => event => {
    event.persist();
    this.props.setNewDeveloperValue({ key: name, value: event.target.value });
  };

  handleJourneyChange = (index, name) => event => {
    event.persist();
    this.props.setJourneyValue({ index, key: name, value: event.target.value });
  };

  handleFactoidChange = (index, name) => event => {
    event.persist();
    this.props.setFactoidValue({ index, key: name, value: event.target.value });
  };

  handleBusinessChange = name => event => {
    event.persist();
    this.props.setNewDeveloperValue({
      key: 'business',
      value: {
        ...this.props.newDeveloper.business,
        [name]: event.target.value,
      },
    });
  };

  handleFutureReadyChange = name => event => {
    event.persist();
    this.props.setNewDeveloperValue({
      key: 'future_ready',
      value: {
        ...this.props.newDeveloper.future_ready,
        [name]: event.target.value,
      },
    });
  };

  handleSuccessStoryChange = name => event => {
    event.persist();
    this.props.setNewDeveloperValue({
      key: 'success_story',
      value: {
        ...this.props.newDeveloper.success_story,
        [name]: event.target.value,
      },
    });
  };

  handleJourneyAdd = () => {
    this.props.addJourney();
  };

  handleFactoidAdd = () => {
    this.props.addFactoid();
  };

  handleJourneyDelete = index => () => {
    const chipData = [...this.props.newDeveloper.journey];

    chipData.splice(index, 1);
    this.props.setNewDeveloperValue({ key: 'journey', value: chipData });
  };

  handleFactoidDelete = index => () => {
    const chipData = [...this.props.newDeveloper.factoids];

    chipData.splice(index, 1);
    this.props.setNewDeveloperValue({ key: 'factoids', value: chipData });
  };

  handleDropDownChange = event => {
    this.props.setBuilderValue({ key: '_id', value: event.value });
    this.props.setBuilderValue({ key: 'developer', value: event.value });

    console.log(event.added_by);
    if (event.added_by && this.props.user.id === event.added_by) {
      this.setState({ sameUser: true });
      this.props.developers.map(each =>
        each.added_by === this.props.user.id && each.name === event.label
          ? this.props.setNewDeveloper(each)
          : null,
      );
    } else {
      this.setState({ sameUser: false });
      this.props.clearDeveloper();
    }
  };

  handleApply = () => {
    this.props.applyBuilderRequest();
    this.setState({ open: false });
  };

  handleOpenDeveloper = () => {
    this.setState({ openDevelopers: !this.state.openDevelopers });
    this.setState({ openDevelopersForm: false });
    this.handleAppliedUser();
  };

  handleOpenDeveloperForm = () => {
    this.props.clearDeveloper();
    this.setState({ openDevelopers: false });
    this.setState({ openDevelopersForm: true });
    this.setState({ sameUser: false });
  };

  handleUpdateDeveloper = () => {
    this.props.addDeveloperRequest();
    // window.location.reload();
    this.setState({ firstLoad: true });
  };

  handleNewDeveloper = () => {
    this.props.addDeveloperRequest();
    this.setState({ openDevelopersForm: false });
    this.setState({ openDevelopers: true });
    this.props.clearDeveloper();
  };

  handleChange = name => event => {
    event.persist();
    this.props.setNewDeveloperValue({ key: name, value: event.target.value });
  };

  handleColorChange = color => {
    this.props.setNewDeveloperValue({ key: 'hex_code', value: color.hex });
  };

  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.props.setNewDeveloperValue({ key: name, value: newContent });
  };

  handleAppliedUser = () => {
    // this.setState({ sameUser: true });
    this.props.developers.map(each =>
      each.added_by === this.props.user.id &&
      each._id === this.props.builderData.developer
        ? this.props.setNewDeveloper(each) && this.setState({ sameUser: true })
        : null,
    );
    this.setState({ firstLoad: false });
  };

  onDrop = (files, name) => {
    this.setState({ newFile: true });
    const file = files[0];
    console.log(file, 'file');

    this.props.setNewDeveloperValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.setState({ tempImage: reader.result });
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  onDropBanner = (files, name) => {
    this.setState({ newBannerFile: true });
    const file = files[0];
    console.log(file, 'file');

    this.props.setNewDeveloperValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.setState({ tempBannerImage: reader.result });
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  render() {
    const {
      classes,
      one,
      errors,
      builderData,
      loading,
      developers,
      newDeveloper,
      user,
    } = this.props;
    const {
      open,
      newFile,
      tempImage,
      openDevelopers,
      openDevelopersForm,
      sameUser,
      firstLoad,
      tempBannerImage,
      newBannerFile,
    } = this.state;

    let listDevelopersNormalized = {};
    const listDevelopers = developers.map(each => {
      const obj = {
        label: each.name,
        value: each._id,
        added_by: each.added_by,
      };
      listDevelopersNormalized = {
        ...listDevelopersNormalized,
        [each._id]: obj,
      };
      return obj;
    });

    if (user.email_verified === false) {
      return (
        <>
          <Helmet>
            <title>Developer</title>
          </Helmet>
          {/* {builderData.is_apply && firstLoad && this.handleAppliedUser()} */}
          <h1 className="text-2xl font-bold mb-4">Developer </h1>
          <div className="border-red-500 border text-red-600 font-bold bg-red-100 px-4 py-2 mt-10 rounded">
            Verify email first!
          </div>
        </>
      );
    }

    return (
      <div className="">
        <Helmet>
          <title>Developer</title>
        </Helmet>
        {/* {builderData.is_apply && firstLoad && this.handleAppliedUser()} */}
        <h1 className="text-2xl font-bold mb-4">
          Developer{' '}
          {openDevelopers && builderData && builderData.is_verified === true && (
            <div className="mb-4 inline-flex items-center bg-teal-200 border border-teal-400 px-2 py-1 rounded-full text-teal-600 text-sm ml-2 leading-none">
              <i className="material-icons mr-1 text-sm">verified_user</i>
              verified
            </div>
          )}
        </h1>

        {loading && loading === true ? <Loading /> : <></>}
        {loading && loading === true ? (
          <img src={Loader} style={{ width: '100px' }} alt="loading" />
        ) : (
          <>
            {builderData && builderData.is_verified === true && (
              <>
              <div className="border rounded bg-card my-4 shadow p-4 max-w-md relative">
                {developers.length > 0 &&
                  developers.map(each =>
                    each._id === this.props.builderData.developer ? (
                      <div key={each._id}>
                        <div className="flex items-center">
                          <img
                            className="h-10 mb-10"
                            src={
                              each.logo
                                ? `${IMAGE_BASE}${each.logo.path}`
                                : defaultImage
                            }
                            alt="Developer logo"
                          />
                        </div>

                        {each.address && (
                          <div className="flex items-center mb-1">
                            <i
                              className="material-icons text-base"
                              style={{ color: 'each.hex_code' }}
                            >
                              explore
                            </i>
                            <span className="pl-2">{each.address}</span>
                          </div>
                        )}

                        {each.phone && (
                          <div className="flex items-center mb-1">
                            <i
                              className="material-icons text-base"
                              style={{ color: 'each.hex_code' }}
                            >
                              call
                            </i>
                            <span className="pl-2">{each.phone}</span>
                          </div>
                        )}

                        {each.email && (
                          <div className="flex items-center mb-1">
                            <i
                              className="material-icons text-base"
                              style={{ color: 'each.hex_code' }}
                            >
                              mail
                            </i>
                            <span className="pl-2">{each.email}</span>
                          </div>
                        )}

                        {each.website && (
                          <div className="flex items-center mb-1">
                            <i
                              className="material-icons text-base"
                              style={{ color: 'each.hex_code' }}
                            >
                              wifi
                            </i>
                            <span className="pl-2">{each.website}</span>
                          </div>
                        )}

                        <Link
                          className="-mb-10 text-secondary underline text-sm absolute"
                          style={{ bottom: -12 }}
                          target="_blank"
                          to={`/developer/&developer_id=${each._id}`}
                        >
                          View Details
                        </Link>
                      </div>
                    ) : null,
                  )}
              </div>

              <div className='mt-10'>
                <h2>Registered Memebers</h2>
              </div>
              </>
            )}
            {openDevelopers && builderData.is_verified === false && (
              <>
                <div className="max-w-lg">
                  <label
                    htmlFor="company"
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                  >
                    Select Developer
                  </label>
                  <div
                  //  error={errors.agency && errors.agency.length > 0}
                  >
                    <Select
                      className="React_Select"
                      id="developer"
                      maxMenuHeight={30}
                      value={
                        listDevelopersNormalized[builderData.developer] || null
                      }
                      classNamePrefix="select"
                      // placeholder="Developer"
                      name="developer"
                      onChange={this.handleDropDownChange}
                      isSearchable
                      options={listDevelopers}
                      styles={customStyles}
                    />
                  </div>
                </div>
                {newDeveloper.is_verified && (
                  <span>
                    This developer is verified you cannot make changes to data.
                  </span>
                )}
                {this.props.builderData.developer && sameUser ? (
                  <>
                    <div className="flex flex-wrap mt-4 -mx-2">
                      <div className="w-1/3 px-2 pb-4">
                        <label
                          className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                          htmlFor="Developer name"
                        >
                          Developer Name
                        </label>
                        <input
                          className="inputbox"
                          id="name"
                          type="text"
                          value={newDeveloper.name || ''}
                          onChange={this.handleChangeName}
                          disabled={newDeveloper.is_verified}
                        />
                      </div>

                      <div className="w-1/3 pb-4 px-2">
                        <label
                          className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                          htmlFor="Developer name"
                        >
                          Website
                        </label>
                        <input
                          className="inputbox"
                          id="name"
                          type="text"
                          value={newDeveloper.website || ''}
                          onChange={this.handleChange('website')}
                          disabled={newDeveloper.is_verified}
                        />
                      </div>
                      <div className="w-1/3 pb-4 px-2">
                        <label
                          className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                          htmlFor="Developer name"
                        >
                          phone
                        </label>
                        <input
                          className="inputbox"
                          id="name"
                          type="text"
                          value={newDeveloper.phone || ''}
                          onChange={this.handleChange('phone')}
                          disabled={newDeveloper.is_verified}
                        />
                      </div>
                      <div className="w-1/3 pb-4 px-2">
                        <label
                          className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                          htmlFor="Developer name"
                        >
                          email
                        </label>
                        <input
                          className="inputbox"
                          id="name"
                          type="email"
                          value={newDeveloper.email || ''}
                          onChange={this.handleChange('email')}
                          disabled={newDeveloper.is_verified}
                        />
                      </div>
                      <div className="w-1/3 pb-4 px-2">
                        <label
                          className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                          htmlFor="Developer name"
                        >
                          office addresss
                        </label>
                        <input
                          className="inputbox"
                          id="name"
                          type="text"
                          value={newDeveloper.addresss || ''}
                          onChange={this.handleChange('addresss')}
                          disabled={newDeveloper.is_verified}
                        />
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Description"
                      >
                        Short Description
                      </label>
                      <CKEditor
                        name="bio"
                        content={newDeveloper.bio}
                        config={{ allowedContent: true }}
                        events={{
                          change: e => this.handleEditorChange(e, 'bio'),
                          value: newDeveloper.bio || '',
                        }}
                        disabled={newDeveloper.is_verified}
                      />
                    </div>

                    <div className="mt-6">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Developer name"
                      >
                        HexCode(Brand Color)
                      </label>
                      {/* <input
                        className="inputbox"
                        id="name"
                        type="text"
                        value={newDeveloper.hex_code || ''}
                        onChange={this.handleChange('hex_code')}
                      /> */}
                      <SketchPicker
                        color={newDeveloper.hex_code || ''}
                        onChangeComplete={this.handleColorChange}
                        disabled={newDeveloper.is_verified}
                      />
                    </div>

                    <div className="flex flex-wrap mt-4 -mx-2">
                      <div className="w-1/3 px-2 pb-4">
                        <label
                          className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                          htmlFor="Developer name"
                        >
                          MD Name
                        </label>
                        <input
                          className="inputbox"
                          id="name"
                          type="text"
                          value={newDeveloper.md_name || ''}
                          onChange={this.handleChange('md_name')}
                          disabled={newDeveloper.is_verified}
                        />
                      </div>

                      <div className="w-1/3 pb-4 px-2">
                        <label
                          className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                          htmlFor="Developer name"
                        >
                          MD Post
                        </label>
                        <input
                          className="inputbox"
                          id="name"
                          type="text"
                          value={newDeveloper.md_post || ''}
                          onChange={this.handleChange('md_post')}
                          disabled={newDeveloper.is_verified}
                        />
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Description"
                      >
                        MD Message
                      </label>
                      <CKEditor
                        name="md_message"
                        content={newDeveloper.md_message}
                        config={{ allowedContent: true }}
                        events={{
                          change: e => this.handleEditorChange(e, 'md_message'),
                          value: newDeveloper.md_message || '',
                        }}
                      />
                    </div>

                    <div className="mt-6">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Developer logo"
                      >
                        Developer Logo
                      </label>
                      <Dropzone
                        onDrop={files => this.onDrop(files, 'logo')}
                        disabled={newDeveloper.is_verified}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            style={{ width: '15rem', height: '15rem' }}
                            className="mt-6 text-primary hover:text-secondary text-center self-start border border-primary hover:border-secondary rounded-lg border-dashed cursor-pointer flex items-center"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {this.state.newFile ? (
                              <img
                                className="object-cover"
                                src={tempImage}
                                alt="Developer Logo"
                              />
                            ) : newDeveloper.logo && newDeveloper.logo.path ? (
                              <img
                                className="object-cover"
                                src={`${IMAGE_BASE}${newDeveloper.logo.path}`}
                                alt="Developer Logo"
                              />
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
                        )}
                      </Dropzone>
                    </div>

                    <div className="mt-6">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Developer logo"
                      >
                        Developer Banner
                      </label>
                      <Dropzone
                        onDrop={files => this.onDropBanner(files, 'banner')}
                        disabled={newDeveloper.is_verified}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            style={{ width: '15rem', height: '15rem' }}
                            className="mt-6 text-primary hover:text-secondary text-center self-start border border-primary hover:border-secondary rounded-lg border-dashed cursor-pointer flex items-center"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {this.state.newBannerFile ? (
                              <img
                                className="object-cover"
                                src={tempBannerImage}
                                alt="Developer Banner"
                              />
                            ) : newDeveloper.banner &&
                              newDeveloper.banner.path ? (
                              <img
                                className="object-cover"
                                src={`${IMAGE_BASE}${newDeveloper.banner.path}`}
                                alt="Developer Logo"
                              />
                            ) : (
                              <div className="text-center w-full">
                                <i className="material-icons text-6xl">image</i>
                                <p className>Choose File or Drag Here</p>
                                <span className="text-sm text-gray-600">
                                  (rectangular size preferred)
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </Dropzone>
                    </div>
                    {/* Journey div */}
                    <div className="mt-6">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Journey"
                      >
                        Journey
                      </label>
                      <div style={{ display: 'flex' }}>
                        <Fab
                          color="primary"
                          aria-label="Add"
                          className={classes.fab}
                          round="true"
                          onClick={this.handleJourneyAdd}
                          elevation={0}
                          disabled={newDeveloper.is_verified}
                        >
                          <AddIcon />
                        </Fab>
                      </div>
                      <div className="w-full py-4">
                        <div className="flex flex-wrap">
                          {newDeveloper.journey &&
                            newDeveloper.journey.length > 0 &&
                            newDeveloper.journey.map((each, index) => (
                              <div className="px-2 relative" key={index}>
                                <div>
                                  <label
                                    className="block font-bold text-black text-sm mb-2"
                                    htmlFor="grid-value"
                                  >
                                    Year
                                  </label>
                                  <input
                                    className="inputbox"
                                    id="grid-basic-value"
                                    type="number"
                                    value={each.year || ''}
                                    onChange={this.handleJourneyChange(
                                      index,
                                      'year',
                                    )}
                                    disabled={newDeveloper.is_verified}
                                  />
                                </div>
                                <div>
                                  <label
                                    className="block font-bold text-black text-sm mb-2"
                                    htmlFor="grid-value"
                                  >
                                    Label
                                  </label>
                                  <input
                                    className="inputbox"
                                    id="grid-basic-value"
                                    type="text"
                                    value={each.label || ''}
                                    onChange={this.handleJourneyChange(
                                      index,
                                      'label',
                                    )}
                                    disabled={newDeveloper.is_verified}
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="bg-black w-8 rounded-full h-8 text-center hover:bg-red-500"
                                  onClick={this.handleJourneyDelete(index)}
                                  disabled={newDeveloper.is_verified}
                                >
                                  <i className="material-icons text-white text-sm">
                                    delete_forever
                                  </i>
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    {/* Journey div end */}

                    {/* factoid div */}
                    <div className="mt-6">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Journey"
                      >
                        Factoids
                      </label>
                      <div style={{ display: 'flex' }}>
                        <Fab
                          color="primary"
                          aria-label="Add"
                          className={classes.fab}
                          round="true"
                          onClick={this.handleFactoidAdd}
                          elevation={0}
                          disabled={newDeveloper.is_verified}
                        >
                          <AddIcon />
                        </Fab>
                      </div>
                      <div className="w-full py-4">
                        <div className="flex flex-wrap">
                          {newDeveloper.factoids &&
                            newDeveloper.factoids.length > 0 &&
                            newDeveloper.factoids.map((each, index) => (
                              <div className="px-2 relative" key={index}>
                                <div>
                                  <label
                                    className="block font-bold text-black text-sm mb-2"
                                    htmlFor="grid-value"
                                  >
                                    Top Label
                                  </label>
                                  <input
                                    className="inputbox"
                                    id="grid-basic-value"
                                    type="text"
                                    value={each.top_label || ''}
                                    onChange={this.handleFactoidChange(
                                      index,
                                      'top_label',
                                    )}
                                    disabled={newDeveloper.is_verified}
                                  />
                                </div>
                                <div>
                                  <label
                                    className="block font-bold text-black text-sm mb-2"
                                    htmlFor="grid-value"
                                  >
                                    Value
                                  </label>
                                  <input
                                    className="inputbox"
                                    id="grid-basic-value"
                                    type="text"
                                    value={each.value || ''}
                                    onChange={this.handleFactoidChange(
                                      index,
                                      'value',
                                    )}
                                    disabled={newDeveloper.is_verified}
                                  />
                                </div>
                                <div>
                                  <label
                                    className="block font-bold text-black text-sm mb-2"
                                    htmlFor="grid-value"
                                  >
                                    Button Label
                                  </label>
                                  <input
                                    className="inputbox"
                                    id="grid-basic-value"
                                    type="text"
                                    value={each.button_label || ''}
                                    onChange={this.handleFactoidChange(
                                      index,
                                      'button_label',
                                    )}
                                    disabled={newDeveloper.is_verified}
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="bg-black w-8 rounded-full h-8 text-center hover:bg-red-500"
                                  onClick={this.handleFactoidDelete(index)}
                                  disabled={newDeveloper.is_verified}
                                >
                                  <i className="material-icons text-white text-sm">
                                    delete_forever
                                  </i>
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    {/* factoid div end */}
                    {/* business div */}
                    <div className="mt-6">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Developer logo"
                      >
                        Business
                      </label>
                      <div className="w-full">
                        <div className="flex flex-wrap">
                          <div className="p-3 ">
                            <label
                              className="block font-bold text-black text-sm mb-2"
                              htmlFor="grid-value"
                            >
                              Title
                            </label>
                            <input
                              className="inputbox"
                              id="grid-basic-value"
                              type="text"
                              value={newDeveloper.business.title || ''}
                              onChange={this.handleBusinessChange('title')}
                              disabled={newDeveloper.is_verified}
                            />
                          </div>
                          <div className="p-3 ">
                            <label
                              className="block font-bold text-black text-sm mb-2"
                              htmlFor="grid-value"
                            >
                              Value
                            </label>
                            <input
                              className="inputbox"
                              id="grid-basic-value"
                              type="text"
                              value={newDeveloper.business.sub_title || ''}
                              onChange={this.handleBusinessChange('sub_title')}
                              disabled={newDeveloper.is_verified}
                            />
                          </div>
                          <div className="p-3 ">
                            <label
                              className="block font-bold text-black text-sm mb-2"
                              htmlFor="grid-value"
                            >
                              Video Code
                              <span className="text-xs italic lowercase">
                                ( https://www.youtube.com/watch?v=`
                              </span>
                              <span className=" strong lowercase text-red-600">
                                36WS1zML7Jo
                              </span>
                              <span className="text-xs italic lowercase">
                                ` )
                              </span>
                            </label>
                            <input
                              className="inputbox"
                              id="grid-basic-value"
                              type="text"
                              value={newDeveloper.business.video_code || ''}
                              onChange={this.handleBusinessChange('video_code')}
                              disabled={newDeveloper.is_verified}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* business div end */}
                    {/* future div */}
                    <div className="mt-6">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Developer logo"
                      >
                        Future
                      </label>
                      <div className="w-full">
                        <div className="flex flex-wrap">
                          <div className="p-3 ">
                            <label
                              className="block font-bold text-black text-sm mb-2"
                              htmlFor="grid-value"
                            >
                              Title
                            </label>
                            <input
                              className="inputbox"
                              id="grid-basic-value"
                              type="text"
                              value={newDeveloper.future_ready.title || ''}
                              onChange={this.handleFutureReadyChange('title')}
                              disabled={newDeveloper.is_verified}
                            />
                          </div>
                          <div className="p-3 ">
                            <label
                              className="block font-bold text-black text-sm mb-2"
                              htmlFor="grid-value"
                            >
                              Value
                            </label>
                            <input
                              className="inputbox"
                              id="grid-basic-value"
                              type="text"
                              value={newDeveloper.future_ready.sub_title || ''}
                              onChange={this.handleFutureReadyChange(
                                'sub_title',
                              )}
                              disabled={newDeveloper.is_verified}
                            />
                          </div>
                          <div className="p-3 ">
                            <label
                              className="block font-bold text-black text-sm mb-2"
                              htmlFor="grid-value"
                            >
                              Video Code
                              <span className="text-xs italic lowercase">
                                ( https://www.youtube.com/watch?v=`
                              </span>
                              <span className=" strong lowercase text-red-600">
                                36WS1zML7Jo
                              </span>
                              <span className="text-xs italic lowercase">
                                ` )
                              </span>
                            </label>
                            <input
                              className="inputbox"
                              id="grid-basic-value"
                              type="text"
                              value={newDeveloper.future_ready.video_code || ''}
                              onChange={this.handleFutureReadyChange(
                                'video_code',
                              )}
                              disabled={newDeveloper.is_verified}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* future div end */}
                    {/* success story div */}
                    <div className="mt-6">
                      <label
                        className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                        htmlFor="Developer logo"
                      >
                        Success Story
                      </label>
                      <div className="w-full">
                        <div className="flex flex-wrap">
                          <div className="p-3 ">
                            <label
                              className="block font-bold text-black text-sm mb-2"
                              htmlFor="grid-value"
                            >
                              Title
                            </label>
                            <input
                              className="inputbox"
                              id="grid-basic-value"
                              type="text"
                              value={newDeveloper.success_story.title || ''}
                              onChange={this.handleSuccessStoryChange('title')}
                              disabled={newDeveloper.is_verified}
                            />
                          </div>
                          <div className="p-3 ">
                            <label
                              className="block font-bold text-black text-sm mb-2"
                              htmlFor="grid-value"
                            >
                              Value
                            </label>
                            <input
                              className="inputbox"
                              id="grid-basic-value"
                              type="text"
                              value={newDeveloper.success_story.sub_title || ''}
                              onChange={this.handleSuccessStoryChange(
                                'sub_title',
                              )}
                              disabled={newDeveloper.is_verified}
                            />
                          </div>
                          <div className="p-3 ">
                            <label
                              className="block font-bold text-black text-sm mb-2"
                              htmlFor="grid-value"
                            >
                              Video Code
                              <span className="text-xs italic lowercase">
                                ( https://www.youtube.com/watch?v=`
                              </span>
                              <span className=" strong lowercase text-red-600">
                                36WS1zML7Jo
                              </span>
                              <span className="text-xs italic lowercase">
                                ` )
                              </span>
                            </label>
                            <input
                              className="inputbox"
                              id="grid-basic-value"
                              type="text"
                              value={
                                newDeveloper.success_story.video_code || ''
                              }
                              onChange={this.handleSuccessStoryChange(
                                'video_code',
                              )}
                              disabled={newDeveloper.is_verified}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* success story div end */}
                  </>
                ) : (
                  <>
                    {developers.length > 0 &&
                      developers.map(each =>
                        each._id === this.props.builderData.developer ? (
                          <div
                            className="border rounded bg-card max-w-lg my-6 shadow p-4 relative"
                            key={each._id}
                          >
                            <img
                              // className=" h-8 mb-10"
                              src={
                                each.logo
                                  ? `${IMAGE_BASE}${each.logo.path}`
                                  : defaultImage
                              }
                              alt="developer logo"
                              style={{ height: '60px' }}
                            />
                            {each.address && (
                              <div className="flex items-center mb-1">
                                <i
                                  className="material-icons text-base"
                                  style={{ color: 'each.hex_code' }}
                                >
                                  explore
                                </i>
                                <span className="pl-2">{each.address}</span>
                              </div>
                            )}

                            {each.phone && (
                              <div className="flex items-center mb-1">
                                <i
                                  className="material-icons text-base"
                                  style={{ color: 'each.hex_code' }}
                                >
                                  call
                                </i>
                                <span className="pl-2">{each.phone}</span>
                              </div>
                            )}

                            {each.email && (
                              <div className="flex items-center mb-1">
                                <i
                                  className="material-icons text-base"
                                  style={{ color: 'each.hex_code' }}
                                >
                                  mail
                                </i>
                                <span className="pl-2">{each.email}</span>
                              </div>
                            )}

                            {each.website && (
                              <div className="flex items-center mb-1">
                                <i
                                  className="material-icons text-base"
                                  style={{ color: 'each.hex_code' }}
                                >
                                  wifi
                                </i>
                                <span className="pl-2">{each.website}</span>
                              </div>
                            )}

                            <Link
                              className="-mb-6 text-secondary underline text-sm left-0 absolute"
                              style={{ bottom: 0 }}
                              target="_blank"
                              to={`/developer/&developer_id=${each._id}`}
                            >
                              View Details
                            </Link>
                          </div>
                        ) : null,
                      )}
                  </>
                )}

                <div className="inline-flex justify-between items-center mt-4">
                  {sameUser ? (
                    <button
                      type="button"
                      className="text-white py-2 px-4 rounded bg-primary font-bold"
                      onClick={this.handleUpdateDeveloper}
                    >
                      Apply
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-white py-2 px-4 rounded bg-primary font-bold disabled:opacity-75 disabled:cursor-not-allowed"
                      onClick={this.handleOpen}
                      disabled={
                        builderData.developer === null ||
                        builderData.developer === undefined
                      }
                    >
                      Apply
                    </button>
                  )}

                  <button
                    type="button"
                    className="text-primary py-2 px-4 flex-1 rounded ml-4 hover:underline"
                    onClick={this.handleOpenDeveloperForm}
                  >
                    Didn't Find Developer? Add here!
                  </button>
                </div>
              </>
            )}

            {openDevelopersForm && (
              <>
                <div className="flex flex-wrap mt-4 -mx-2">
                  <div className="w-1/3 px-2 pb-4">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Developer name"
                    >
                      Developer Name
                    </label>
                    <input
                      className="inputbox"
                      id="name"
                      type="text"
                      value={newDeveloper.name || ''}
                      onChange={this.handleChangeName}
                    />
                  </div>

                  <div className="w-1/3 pb-4 px-2">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Developer name"
                    >
                      Website
                    </label>
                    <input
                      className="inputbox"
                      id="name"
                      type="text"
                      value={newDeveloper.website || ''}
                      onChange={this.handleChange('website')}
                    />
                  </div>
                  <div className="w-1/3 pb-4 px-2">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Developer name"
                    >
                      phone
                    </label>
                    <input
                      className="inputbox"
                      id="name"
                      type="text"
                      value={newDeveloper.phone || ''}
                      onChange={this.handleChange('phone')}
                    />
                  </div>
                  <div className="w-1/3 pb-4 px-2">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Developer name"
                    >
                      email
                    </label>
                    <input
                      className="inputbox"
                      id="name"
                      type="email"
                      value={newDeveloper.email || ''}
                      onChange={this.handleChange('email')}
                    />
                  </div>
                  <div className="w-1/3 pb-4 px-2">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Developer name"
                    >
                      office address
                    </label>
                    <input
                      className="inputbox"
                      id="name"
                      type="text"
                      value={newDeveloper.address || ''}
                      onChange={this.handleChange('address')}
                    />
                  </div>
                  <div className="w-1/3 pb-4 px-2">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Developer name"
                    >
                      Tagline
                    </label>
                    <input
                      className="inputbox"
                      id="name"
                      type="text"
                      value={newDeveloper.tagline || ''}
                      onChange={this.handleChange('tagline')}
                    />
                  </div>
                </div>
                <div className="w-full mt-4">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Description"
                  >
                    Short Description
                  </label>
                  <CKEditor
                    name="bio"
                    content={newDeveloper.bio}
                    config={{ allowedContent: true }}
                    events={{
                      change: e => this.handleEditorChange(e, 'bio'),
                      value: newDeveloper.bio || '',
                    }}
                  />
                </div>

                <div className="mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Developer name"
                  >
                    HexCode(Brand Color)
                  </label>
                  {/* <input
                        className="inputbox"
                        id="name"
                        type="text"
                        value={newDeveloper.hex_code || ''}
                        onChange={this.handleChange('hex_code')}
                      /> */}
                  <SketchPicker
                    color={newDeveloper.hex_code || ''}
                    onChangeComplete={this.handleColorChange}
                  />
                </div>

                <div className="flex flex-wrap mt-4 -mx-2">
                  <div className="w-1/3 px-2 pb-4">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Developer name"
                    >
                      MD Name
                    </label>
                    <input
                      className="inputbox"
                      id="name"
                      type="text"
                      value={newDeveloper.md_name || ''}
                      onChange={this.handleChange('md_name')}
                      disabled={newDeveloper.is_verified}
                    />
                  </div>

                  <div className="w-1/3 pb-4 px-2">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Developer name"
                    >
                      MD Post
                    </label>
                    <input
                      className="inputbox"
                      id="name"
                      type="text"
                      value={newDeveloper.md_post || ''}
                      onChange={this.handleChange('md_post')}
                      disabled={newDeveloper.is_verified}
                    />
                  </div>
                </div>

                <div className="w-full mt-4">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Description"
                  >
                    MD Message
                  </label>
                  <CKEditor
                    name="md_message"
                    content={newDeveloper.md_message}
                    config={{ allowedContent: true }}
                    events={{
                      change: e => this.handleEditorChange(e, 'md_message'),
                      value: newDeveloper.md_message || '',
                    }}
                  />
                </div>

                <div className="mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Developer logo"
                  >
                    Developer Logo
                  </label>
                  <Dropzone onDrop={files => this.onDrop(files, 'logo')}>
                    {({ getRootProps, getInputProps }) => (
                      <div
                        style={{ width: '15rem', height: '15rem' }}
                        className="mt-6 text-primary hover:text-secondary text-center self-start border border-primary hover:border-secondary rounded-lg border-dashed cursor-pointer flex items-center"
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        {this.state.newFile ? (
                          <img
                            className="object-cover"
                            src={tempImage}
                            alt="Developer Logo"
                          />
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
                    )}
                  </Dropzone>
                </div>

                <div className="mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Developer logo"
                  >
                    Developer Banner
                  </label>
                  <Dropzone
                    onDrop={files => this.onDropBanner(files, 'banner')}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        style={{ width: '15rem', height: '15rem' }}
                        className="mt-6 text-primary hover:text-secondary text-center self-start border border-primary hover:border-secondary rounded-lg border-dashed cursor-pointer flex items-center"
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        {this.state.newBannerFile ? (
                          <img
                            className="object-cover"
                            src={tempBannerImage}
                            alt="Developer Banner"
                          />
                        ) : (
                          <div className="text-center w-full">
                            <i className="material-icons text-6xl">image</i>
                            <p className>Choose File or Drag Here</p>
                            <span className="text-sm text-gray-600">
                              (rectangular size preferred)
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                {/* Journey div */}
                <div className="mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Journey"
                  >
                    Journey
                  </label>
                  <div style={{ display: 'flex' }}>
                    <Fab
                      color="primary"
                      aria-label="Add"
                      className={classes.fab}
                      round="true"
                      onClick={this.handleJourneyAdd}
                      elevation={0}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                  <div className="w-full py-4">
                    <div className="flex flex-wrap">
                      {newDeveloper.journey &&
                        newDeveloper.journey.length > 0 &&
                        newDeveloper.journey.map((each, index) => (
                          <div className="px-2 relative" key={index}>
                            <div>
                              <label
                                className="block font-bold text-black text-sm mb-2"
                                htmlFor="grid-value"
                              >
                                Year
                              </label>
                              <input
                                className="inputbox"
                                id="grid-basic-value"
                                type="number"
                                value={each.year || ''}
                                onChange={this.handleJourneyChange(
                                  index,
                                  'year',
                                )}
                              />
                            </div>
                            <div>
                              <label
                                className="block font-bold text-black text-sm mb-2"
                                htmlFor="grid-value"
                              >
                                Label
                              </label>
                              <input
                                className="inputbox"
                                id="grid-basic-value"
                                type="text"
                                value={each.label || ''}
                                onChange={this.handleJourneyChange(
                                  index,
                                  'label',
                                )}
                              />
                            </div>
                            <button
                              type="button"
                              className="bg-black w-8 rounded-full h-8 text-center hover:bg-red-500"
                              onClick={this.handleJourneyDelete(index)}
                            >
                              <i className="material-icons text-white text-sm">
                                delete_forever
                              </i>
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* Journey div end */}

                {/* factoid div */}
                <div className="mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Journey"
                  >
                    Factoids
                  </label>
                  <div style={{ display: 'flex' }}>
                    <Fab
                      color="primary"
                      aria-label="Add"
                      className={classes.fab}
                      round="true"
                      onClick={this.handleFactoidAdd}
                      elevation={0}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                  <div className="w-full py-4">
                    <div className="flex flex-wrap">
                      {newDeveloper.factoids &&
                        newDeveloper.factoids.length > 0 &&
                        newDeveloper.factoids.map((each, index) => (
                          <div className="px-2 relative" key={index}>
                            <div>
                              <label
                                className="block font-bold text-black text-sm mb-2"
                                htmlFor="grid-value"
                              >
                                Top Label
                              </label>
                              <input
                                className="inputbox"
                                id="grid-basic-value"
                                type="text"
                                value={each.top_label || ''}
                                onChange={this.handleFactoidChange(
                                  index,
                                  'top_label',
                                )}
                              />
                            </div>
                            <div>
                              <label
                                className="block font-bold text-black text-sm mb-2"
                                htmlFor="grid-value"
                              >
                                Value
                              </label>
                              <input
                                className="inputbox"
                                id="grid-basic-value"
                                type="text"
                                value={each.value || ''}
                                onChange={this.handleFactoidChange(
                                  index,
                                  'value',
                                )}
                              />
                            </div>
                            <div>
                              <label
                                className="block font-bold text-black text-sm mb-2"
                                htmlFor="grid-value"
                              >
                                Button Label
                              </label>
                              <input
                                className="inputbox"
                                id="grid-basic-value"
                                type="text"
                                value={each.button_label || ''}
                                onChange={this.handleFactoidChange(
                                  index,
                                  'button_label',
                                )}
                              />
                            </div>
                            <button
                              type="button"
                              className="bg-black w-8 rounded-full h-8 text-center hover:bg-red-500"
                              onClick={this.handleFactoidDelete(index)}
                            >
                              <i className="material-icons text-white text-sm">
                                delete_forever
                              </i>
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* factoid div end */}
                {/* business div */}
                <div className="mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Developer logo"
                  >
                    Business
                  </label>
                  <div className="w-full">
                    <div className="flex flex-wrap">
                      <div className="p-3 ">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Title
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={newDeveloper.business.title || ''}
                          onChange={this.handleBusinessChange('title')}
                        />
                      </div>
                      <div className="p-3 ">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Value
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={newDeveloper.business.sub_title || ''}
                          onChange={this.handleBusinessChange('sub_title')}
                        />
                      </div>
                      <div className="p-3 ">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Video Code
                          <span className="text-xs italic lowercase">
                            ( https://www.youtube.com/watch?v=`
                          </span>
                          <span className=" strong lowercase text-red-600">
                            36WS1zML7Jo
                          </span>
                          <span className="text-xs italic lowercase">` )</span>
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={newDeveloper.business.video_code || ''}
                          onChange={this.handleBusinessChange('video_code')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* business div end */}
                {/* future div */}
                <div className="mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Developer logo"
                  >
                    Future
                  </label>
                  <div className="w-full">
                    <div className="flex flex-wrap">
                      <div className="p-3 ">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Title
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={newDeveloper.future_ready.title || ''}
                          onChange={this.handleFutureReadyChange('title')}
                        />
                      </div>
                      <div className="p-3 ">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Value
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={newDeveloper.future_ready.sub_title || ''}
                          onChange={this.handleFutureReadyChange('sub_title')}
                        />
                      </div>
                      <div className="p-3 ">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Video Code
                          <span className="text-xs italic lowercase">
                            ( https://www.youtube.com/watch?v=`
                          </span>
                          <span className=" strong lowercase text-red-600">
                            36WS1zML7Jo
                          </span>
                          <span className="text-xs italic lowercase">` )</span>
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={newDeveloper.future_ready.video_code || ''}
                          onChange={this.handleFutureReadyChange('video_code')}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* future div end */}
                {/* success story div */}
                <div className="mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                    htmlFor="Developer logo"
                  >
                    Success Story
                  </label>
                  <div className="w-full">
                    <div className="flex flex-wrap">
                      <div className="p-3 ">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Title
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={newDeveloper.success_story.title || ''}
                          onChange={this.handleSuccessStoryChange('title')}
                        />
                      </div>
                      <div className="p-3 ">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Value
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={newDeveloper.success_story.sub_title || ''}
                          onChange={this.handleSuccessStoryChange('sub_title')}
                        />
                      </div>
                      <div className="p-3 ">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Video Code
                          <span className="text-xs italic lowercase">
                            ( https://www.youtube.com/watch?v=`
                          </span>
                          <span className=" strong lowercase text-red-600">
                            36WS1zML7Jo
                          </span>
                          <span className="text-xs italic lowercase">` )</span>
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={newDeveloper.success_story.video_code || ''}
                          onChange={this.handleSuccessStoryChange('video_code')}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* success story div end */}
                {builderData && builderData.is_verified === false && (
                  <>
                    <button
                      type="button"
                      className="text-white py-2 px-6 rounded mt-4 bg-primary font-bold"
                      onClick={this.handleNewDeveloper}
                    >
                      Apply for Developer
                    </button>
                    <button
                      type="button"
                      className="text-primary py-2 px-4 rounded m-4 hover:underline"
                      onClick={this.handleOpenDeveloper}
                    >
                      Go Back
                    </button>
                  </>
                )}
              </>
            )}

            <Dialog
              open={open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              maxWidth="sm"
            >
              <div className="p-4 border-b">
                Are you sure you want to apply for developer?
              </div>
              <DialogActions>
                <button
                  className="text-white py-2 px-4 rounded mt-4 w-full bg-primary font-bold"
                  onClick={() => this.handleApply()}
                  color="primary"
                >
                  Apply
                </button>
                <button
                  className="text-red-500 border border-red-500 py-2 px-4 rounded mt-4 w-full bg-white font-bold"
                  onClick={this.handleClose}
                  color="primary"
                >
                  Cancel
                </button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  builderData: makeSelectBuilderData(),
  loading: makeSelectLoading(),
  developers: makeSelectDevelopers(),
  newDeveloper: makeSelectNewDeveloper(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused || state.isSelected ? '#5897FB' : 'white',
    color: state.isFocused || state.isSelected ? 'white' : 'black',
    padding: '5px',
  }),

  menuList: () => ({
    background: '#FFFFFF',
    border: '1px solid #5897FB',
  }),

  indicatorSeparator: () => ({
    background: 'transparent',
  }),

  container: provided => ({
    ...provided,
    width: '100%',
    minWidth: '100px',
  }),
};

const styles = theme => ({});

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(ApplyForBuilder);
