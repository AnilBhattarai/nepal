import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import 'react-datepicker/dist/react-datepicker.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import defaultImage from '../../../../assets/img/logo-icon.png';
import { IMAGE_BASE } from '../../../App/constants';
import EditorFileSelect from '../../../EditorFileSelect';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

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
  } = props;

  // state = {
  //   images: {
  //     logo: defaultImage,
  //   },
  // };

  const [state, setState] = useState({
    images: {
      logo: defaultImage,
    },
  });
  const { images } = state;

  const [openImg, setOpenImg] = useState(false);

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  useEffect(() => {
    if (one.logo && one.logo.fieldname) {
      const logo = one.logo && one.logo.path && `${IMAGE_BASE}${one.logo.path}`;
      setState({
        ...one,
        images: { logo },
      });
    }
  }, [one]);

  // UNSAFE_componentWillReceiveProps(nextProps) {
  // if (one !== nextProps.one) {
  //   const { one } = nextProps;
  //   if (one.logo && one.logo.fieldname) {
  //     const logo =
  //       one.logo && one.logo.path && `${IMAGE_BASE}${one.logo.path}`;
  //     this.setState({
  //       ...one,
  //       images: { logo },
  //     });
  //   }
  // }
  // }

  const onDrop = (files, name) => {
    const file = files[0];
    setOneValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setState({ images: { logo: reader.result } });
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleTitleChange = event => {
    const {
      target: { value },
    } = event;
    setOneValue({ key: 'title', value });
    const slug = value
      .trim()
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace('.', '')
      .replace(',', '')
      .replace('!', '')
      .replace('#', '')
      .replace('@', '-');
    setOneValue({ key: 'slug_url', value: slug });
  };

  const handleGoBack = () => {
    push('/admin/agency-manage');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const showImage = () => {
    setOpenImg(true);
  };

  const hideImage = () => {
    setOpenImg(false);
  };

  const selectImage = file => {
    setOneValue({ key: 'background_image', value: file });
    setOpenImg(false);
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
              ? 'Edit Agency'
              : 'Add Agency'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Title
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.title || ''}
              onChange={handleTitleChange}
            />
            <div id="component-error-text">{errors && errors.title}</div>
          </div>
          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Slug Url
            </label>
            <input
              className="inputbox"
              id="grid-slug-url"
              type="text"
              value={one.slug_url || ''}
              onChange={handleChange('slug_url')}
            />
            <div id="component-error-text">{errors && errors.slug_url}</div>
          </div>
          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              E-mail
            </label>
            <input
              className="inputbox"
              id="grid-email"
              type="text"
              value={one.email || ''}
              onChange={handleChange('email')}
            />
            <div id="component-error-text">{errors && errors.email}</div>
          </div>
          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Fb link
            </label>
            <input
              className="inputbox"
              id="grid-fb"
              type="text"
              value={one.fb_link || ''}
              onChange={handleChange('fb_link')}
            />
            <div id="component-error-text">{errors && errors.fb_link}</div>
          </div>

          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Website Link
            </label>
            <input
              className="inputbox"
              id="grid-website"
              type="text"
              value={one.website || ''}
              onChange={handleChange('website')}
            />
            <div id="component-error-text">{errors && errors.website}</div>
          </div>
          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Address
            </label>
            <input
              className="inputbox"
              id="grid-address"
              type="text"
              value={one.address || ''}
              onChange={handleChange('address')}
            />
            <div id="component-error-text">{errors && errors.address}</div>
          </div>
          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Phone No.
            </label>
            <input
              className="inputbox"
              id="grid-phone"
              type="text"
              value={one.phone || ''}
              onChange={handleChange('phone')}
            />
            <div id="component-error-text">{errors && errors.phone}</div>
          </div>
          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Mobile
            </label>
            <input
              className="inputbox"
              id="grid-mobile"
              type="text"
              value={one.mobile || ''}
              onChange={handleChange('mobile')}
            />
            <div id="component-error-text">{errors && errors.mobile}</div>
          </div>
          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Description
            </label>
            <textarea
              className="inputbox"
              multiline="true"
              rows="7"
              id="grid-description"
              type="text"
              value={one.description || ''}
              onChange={handleChange('description')}
            />
            <div id="component-error-text">{errors && errors.description}</div>
          </div>
          <div className="flex w-32 pb-4">
            <img src={images.logo || defaultImage} alt="Agency" />
          </div>
          <div className="flex pb-4">
            <Dropzone onDrop={files => onDrop(files, 'logo')} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  <button
                    type="button"
                    className="text-black py-2 px-4 rounded font-bold bg-waftprimary hover:bg-waftsecondary-dark"
                  >
                    Upload Agency Logo
                  </button>
                </div>
              )}
            </Dropzone>
          </div>

          <div className="w-full md:w-1/2 pb-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Background Image
            </label>
            {one.background_image && one.background_image.path ? (
              <img
                src={`${IMAGE_BASE}${one.background_image.path}`}
                className="w-24 h-24"
              />
            ) : (
              <button
                className="p-2 text-white bg-secondary rounded cursor-pointer"
                onClick={showImage}
              >
                Choose Image
              </button>
            )}
            <div id="component-error-text">
              {errors && errors.background_image}
            </div>
          </div>

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
                checked={one.is_approved || false}
                tabIndex={-1}
                onClick={handleCheckedChange('is_approved')}
                color="primary"
              />
            }
            label="Is Approved"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={one.premium || false}
                tabIndex={-1}
                onClick={handleCheckedChange('premium')}
                color="primary"
              />
            }
            label="Is Premium"
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
        <Dialog open={openImg} onClose={hideImage}>
          <DialogTitle>Choose Image</DialogTitle>
          <DialogContent>
            <EditorFileSelect
              location={location}
              selectFile={file => selectImage(file)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
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
const withReducer = injectReducer({ key: 'agency', reducer });
const withSaga = injectSaga({ key: 'agency', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
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
