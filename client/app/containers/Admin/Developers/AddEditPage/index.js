import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import 'react-datepicker/dist/react-datepicker.css';
import Dropzone from 'react-dropzone';
import CKEditor from 'react-ckeditor-component';
import { SketchPicker } from 'react-color';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Chip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectTempImage,
  makeSelectBannerImage,
  makeSelectTempEmail,
  makeSelectTempPhone,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import defaultImage from '../../../../assets/img/logo.png';
import { IMAGE_BASE } from '../../../App/constants';

const styles = {
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
};

const AddEdit = props => {
  const {
    clearErrors,
    loadOneRequest,
    match,
    one,
    classes,
    loading,
    errors,
    setOneValue,
    addEditRequest,
    push,
    tempImage,
    setTempImageValue,
    bannerImage,
    setTempBannerValue,
    addJourney,
    addFactoid,
    setJourneyValue,
    setFactoidValue,
    setTempPhone,
    setTempEmail,
    tempEmail,
    tempPhone,
  } = props;

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  const [newFile, setNewFile] = useState(false);
  const [newBannerFile, setNewBannerFile] = useState(false);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleJourneyChange = (index, name) => event => {
    event.persist();
    setJourneyValue({ index, key: name, value: event.target.value });
  };

  const handleFactoidChange = (index, name) => event => {
    event.persist();
    setFactoidValue({ index, key: name, value: event.target.value });
  };

  const handleBusinessChange = name => event => {
    event.persist();
    setOneValue({
      key: 'business',
      value: { ...one.business, [name]: event.target.value },
    });
  };

  const handleFutureReadyChange = name => event => {
    event.persist();
    setOneValue({
      key: 'future_ready',
      value: { ...one.future_ready, [name]: event.target.value },
    });
  };

  const handleSuccessStoryChange = name => event => {
    event.persist();
    setOneValue({
      key: 'success_story',
      value: { ...one.success_story, [name]: event.target.value },
    });
  };

  const handleGoBack = () => {
    push('/admin/developers');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleColorChange = color => {
    setOneValue({ key: 'hex_code', value: color.hex });
  };

  const handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    setOneValue({ key: name, value: newContent });
  };

  const onDrop = (files, name) => {
    setNewFile(true);
    const file = files[0];
    setOneValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setTempImageValue(reader.result);
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  const onDropBanner = (files, name) => {
    setNewBannerFile(true);
    const file = files[0];
    setOneValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setTempBannerValue(reader.result);
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  const handleJourneyAdd = () => {
    addJourney();
  };

  const handleFactoidAdd = () => {
    addFactoid();
  };

  const handleJourneyDelete = index => () => {
    const chipData = [...one.journey];

    chipData.splice(index, 1);
    setOneValue({ key: 'journey', value: chipData });
  };

  const handleFactoidDelete = index => () => {
    const chipData = [...one.factoids];

    chipData.splice(index, 1);
    setOneValue({ key: 'factoids', value: chipData });
  };

  const handleTempPhone = e => {
    e.persist();
    setTempPhone(e.target.value);
  };

  const insertPhone = event => {
    event.preventDefault();
    if (one.phone.indexOf(tempPhone) === -1) {
      setOneValue({
        key: 'phone',
        value: [...one.phone, tempPhone],
      });
      setTempPhone('');
    }
    return { tempPhone: setTempPhone('') };
  };

  const handleDeletePhone = index => () => {
    const chipData = [...one.phone];

    chipData.splice(index, 1);
    props.setOneValue({ key: 'phone', value: chipData });
  };

  const handleTempEmail = e => {
    e.persist();
    setTempEmail(e.target.value);
  };

  const insertEmail = event => {
    event.preventDefault();

    if (one.email.indexOf(tempEmail) === -1) {
      setOneValue({
        key: 'email',
        value: [...one.email, tempEmail],
      });
      setTempEmail('');
    }
    return { tempEmail: setTempEmail('') };
  };

  const checkNull = name => {
    if (one[name] === null) {
      setOneValue({
        key: name,
        value: [],
      });
    }
  };

  const handleDeleteEmail = index => () => {
    const chipData = [...one.email];

    chipData.splice(index, 1);
    props.setOneValue({ key: 'email', value: chipData });
  };

  return loading && loading === true ? (
    <Loading />
  ) : (
    <>
      <div>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <IconButton
              className={`${classes.backbtn} cursor-pointer`}
              onClick={handleGoBack}
              aria-label="Back"
            >
              <BackIcon />
            </IconButton>
            {match && match.params && match.params.id
              ? 'Edit Developer'
              : 'Add Developer'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Name
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.name}
              onChange={handleChange('name')}
            />
            <div id="component-error-text">{errors.name && errors.name}</div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Tagline
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.tagline}
              onChange={handleChange('tagline')}
            />
            <div id="component-error-text">
              {errors.tagline && errors.tagline}
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Established year
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.established_year}
              onChange={handleChange('established_year')}
            />
            <div id="component-error-text">
              {errors.established_year && errors.established_year}
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Projects No.
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="number"
              value={one.projects_no}
              onChange={handleChange('projects_no')}
              min="0"
            />
            <div id="component-error-text">
              {errors.projects_no && errors.projects_no}
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Bio
            </label>
            {/* <textarea
              className="inputbox"
              id="grid-value"
              type="text"
              value={one.bio}
              onChange={handleChange('bio')}
            /> */}
            <CKEditor
              name="bio"
              content={one.bio}
              config={{ allowedContent: true }}
              events={{
                change: e => handleEditorChange(e, 'bio'),
                value: one.bio || '',
              }}
            />
            <div id="component-error-text">{errors.bio && errors.bio}</div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Hex Code
            </label>
            {/* <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.hex_code}
              onChange={handleChange('hex_code')}
            /> */}
            <SketchPicker
              color={one.hex_code ? one.hex_code : '#180230'}
              onChangeComplete={handleColorChange}
            />
            <div id="component-error-text">
              {errors.hex_code && errors.hex_code}
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Website
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.website}
              onChange={handleChange('website')}
            />
            <div id="component-error-text">
              {errors.website && errors.website}
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Phone
            </label>

            <form onSubmit={insertPhone}>
              <input
                className="inputbox"
                placeholder="Press enter after each phone no."
                id="blog-tags"
                type="text"
                value={tempPhone || ''}
                name="Phone"
                onChange={handleTempPhone}
                onFocus={() => checkNull('phone')}
              />
            </form>
            <div className="mt-2">
              {one.phone &&
                one.phone.length > 0 &&
                one.phone.map((number, index) => {
                  const icon = null;
                  return (
                    <Chip
                      key={`${number}-${index}`}
                      icon={icon}
                      label={number}
                      onDelete={handleDeletePhone(index)}
                      className="mb-2 mr-2"
                    />
                  );
                })}
            </div>
            <div id="component-error-text">{errors.phone && errors.phone}</div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Email
            </label>
            {/* <input
              className="inputbox"
              id="grid-title"
              type="email"
              value={one.email}
              onChange={handleChange('email')}
            /> */}
            <form onSubmit={insertEmail}>
              <input
                className="inputbox"
                placeholder="Press enter after each email."
                id="blog-tags"
                type="text"
                value={tempEmail || ''}
                name="Email"
                onChange={handleTempEmail}
                onFocus={() => checkNull('email')}
              />
            </form>
            <div className="mt-2">
              {one.email &&
                one.email.length > 0 &&
                one.email.map((mail, index) => {
                  const icon = null;
                  return (
                    <Chip
                      key={`${mail}-${index}`}
                      icon={icon}
                      label={mail}
                      onDelete={handleDeleteEmail(index)}
                      className="mb-2 mr-2"
                    />
                  );
                })}
            </div>
            <div id="component-error-text">{errors.email && errors.email}</div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Address
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.address}
              onChange={handleChange('address')}
            />
            <div id="component-error-text">
              {errors.address && errors.address}
            </div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              MD Name
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.md_name}
              onChange={handleChange('md_name')}
            />
            <div id="component-error-text">
              {errors.md_name && errors.md_name}
            </div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              MD Post
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.md_post}
              onChange={handleChange('md_post')}
            />
            <div id="component-error-text">
              {errors.md_post && errors.md_post}
            </div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              MD Message
            </label>
            {/* <textarea
              className="inputbox"
              id="grid-value"
              type="text"
              value={one.bio}
              onChange={handleChange('bio')}
            /> */}
            <CKEditor
              name="md_message"
              content={one.md_message}
              config={{ allowedContent: true }}
              events={{
                change: e => handleEditorChange(e, 'md_message'),
                value: one.md_message || '',
              }}
            />
            <div id="component-error-text">
              {errors.md_message && errors.md_message}
            </div>
          </div>

          <div className="w-full md:w-1/2 pb-4 mt-4">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
              htmlFor="Image"
            >
              Logo
            </label>
            <Dropzone onDrop={files => onDrop(files, 'logo')}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {newFile ? (
                    <img
                      className="inputbox cursor-pointer"
                      src={tempImage}
                      alt="Developerimage"
                      style={{ height: '120px', width: '60%' }}
                    />
                  ) : (
                    <img
                      className="inputbox cursor-pointer"
                      src={
                        one.logo && one.logo.path
                          ? `${IMAGE_BASE}${one.logo.path}`
                          : tempImage
                      }
                      alt="Developerimage"
                      style={{ height: '120px', width: '60%' }}
                    />
                  )}
                </div>
              )}
            </Dropzone>
          </div>

          <div className="w-full md:w-1/2 pb-4 mt-4">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
              htmlFor="Image"
            >
              Banner
            </label>
            <Dropzone onDrop={files => onDropBanner(files, 'banner')}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {newBannerFile ? (
                    <img
                      className="inputbox cursor-pointer"
                      src={bannerImage}
                      alt="Bannerimage"
                      style={{ height: '250px', width: '100%' }}
                    />
                  ) : (
                    <img
                      className="inputbox cursor-pointer"
                      src={
                        one.banner && one.banner.path
                          ? `${IMAGE_BASE}${one.banner.path}`
                          : bannerImage
                      }
                      alt="Bannerimage"
                      style={{ height: '250px', width: '100%' }}
                    />
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          {/* jOURNEY START */}
          <div className="w-full md:w-1/3 pb-4">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="Image"
            >
              Journey
            </label>
            <div style={{ display: 'flex' }}>
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                round="true"
                onClick={handleJourneyAdd}
                elevation={0}
              >
                <AddIcon />
              </Fab>
              <div id="component-error-text">
                {errors.journey ? errors.journey : ''}
              </div>
            </div>
          </div>
          <div className="w-full py-4">
            <div className="flex flex-wrap">
              {one.journey &&
                one.journey.length > 0 &&
                one.journey.map((each, index) => (
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
                        onChange={handleJourneyChange(index, 'year')}
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
                        onChange={handleJourneyChange(index, 'label')}
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-black w-8 rounded-full h-8 text-center hover:bg-red-500"
                      onClick={handleJourneyDelete(index)}
                    >
                      <i className="material-icons text-white text-sm">
                        delete_forever
                      </i>
                    </button>
                  </div>
                ))}
            </div>
          </div>
          {/* JOURNEY END */}

          {/* FACTOID START */}
          <div className="w-full md:w-1/3 pb-4">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="Image"
            >
              Factoids
            </label>
            <div style={{ display: 'flex' }}>
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                round="true"
                onClick={handleFactoidAdd}
                elevation={0}
              >
                <AddIcon />
              </Fab>
              <div id="component-error-text">
                {errors.factoids ? errors.factoids : ''}
              </div>
            </div>
          </div>
          <div className="w-full py-4">
            <div className="flex flex-wrap">
              {one.factoids &&
                one.factoids.length > 0 &&
                one.factoids.map((each, index) => (
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
                        onChange={handleFactoidChange(index, 'top_label')}
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
                        onChange={handleFactoidChange(index, 'value')}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-bold text-black text-sm mb-2"
                        htmlFor="grid-value"
                      >
                        Button label
                      </label>
                      <input
                        className="inputbox"
                        id="grid-basic-value"
                        type="text"
                        value={each.button_label || ''}
                        onChange={handleFactoidChange(index, 'button_label')}
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-black w-8 rounded-full h-8 text-center hover:bg-red-500"
                      onClick={handleFactoidDelete(index)}
                    >
                      <i className="material-icons text-white text-sm">
                        delete_forever
                      </i>
                    </button>
                  </div>
                ))}
            </div>
          </div>
          {/* FACTOID END */}

          {/* BUSINESS START */}
          <div className="w-full md:w-1/3 pb-1">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="Image"
            >
              Business
            </label>
          </div>
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
                  value={one.business.title || ''}
                  onChange={handleBusinessChange('title')}
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
                  value={one.business.sub_title || ''}
                  onChange={handleBusinessChange('sub_title')}
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
                  value={one.business.video_code || ''}
                  onChange={handleBusinessChange('video_code')}
                />
              </div>
            </div>
          </div>
          {/* BUSINESS END */}
          {/* FUTURE START */}
          <div className="w-full md:w-1/3 pb-1">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="Image"
            >
              Future Ready
            </label>
          </div>
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
                  value={one.future_ready.title || ''}
                  onChange={handleFutureReadyChange('title')}
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
                  value={one.future_ready.sub_title || ''}
                  onChange={handleFutureReadyChange('sub_title')}
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
                  value={one.future_ready.video_code || ''}
                  onChange={handleFutureReadyChange('video_code')}
                />
              </div>
            </div>
          </div>
          {/* FUTURE END */}

          {/* SUCCESS STORY START */}
          <div className="w-full md:w-1/3 pb-1">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="Image"
            >
              Success Story
            </label>
          </div>
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
                  value={one.success_story.title || ''}
                  onChange={handleSuccessStoryChange('title')}
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
                  value={one.success_story.sub_title || ''}
                  onChange={handleSuccessStoryChange('sub_title')}
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
                  value={one.success_story.video_code || ''}
                  onChange={handleSuccessStoryChange('video_code')}
                />
              </div>
            </div>
          </div>
          {/* SUCCESS STORY END */}
          <FormControlLabel
            control={
              <Checkbox
                checked={one.is_active || false}
                tabIndex={-1}
                onClick={handleCheckedChange('is_active')}
                color="primary"
              />
            }
            label="Is Active"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={one.is_verified || false}
                tabIndex={-1}
                onClick={handleCheckedChange('is_verified')}
                color="primary"
              />
            }
            label="Is Verified"
          />

          <br />
          <button
            type="button"
            className="text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme"
            onClick={handleSave}
          >
            Save
          </button>
        </PageContent>
      </div>
    </>
  );
};

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  setTempImageValue: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withStyle = withStyles(styles);
const withReducer = injectReducer({ key: 'developers', reducer });
const withSaga = injectSaga({ key: 'developers', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  tempImage: makeSelectTempImage(),
  bannerImage: makeSelectBannerImage(),
  tempPhone: makeSelectTempPhone(),
  tempEmail: makeSelectTempEmail(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
