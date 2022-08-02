import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import 'react-datepicker/dist/react-datepicker.css';
import Dropzone from 'react-dropzone';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectTempImage,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import Input from '../../../../components/customComponents/Input';
import { IMAGE_BASE } from '../../../App/constants';
import EditorFileSelect from '../../../EditorFileSelect';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import OpenWithIcon from '@material-ui/icons/OpenWith';

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

const key = 'propertyCategory';

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
    addFromMedia,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  // const handleEditorChange = (e, name) => {
  //   const newContent = e.editor.getData();
  //   setOneValue({ key: name, value: newContent });
  // };

  // const handleCheckedChange = name => event => {
  //   event.persist();
  //   setOneValue({ key: name, value: event.target.checked });
  // };

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const [newFile, setNewFile] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  // const handleDateChange = name => date => {
  //   setOneValue({
  //     key: name,
  //     value: moment(date).format('YYYY/MM/DD'),
  //   });
  // };

  const handleGoBack = () => {
    push('/admin/property-category');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
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

  const handleSetImage = () => {
    setOpenMedia(true);
  };

  const handleImageChange = file => {
    addFromMedia(file);
    setOpenMedia(false);
  };

  const handleClose = () => {
    setOpenMedia(false);
  };

  return loading && loading === true ? (
    <Loading />
  ) : (
      <>
        {/* <Helmet>
        <title>
          {match && match.params && match.params.id
            ? 'Edit Country'
            : 'Add Country'}
        </title>
      </Helmet> */}
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
                ? 'Edit Property Category'
                : 'Add Property Category'}
            </PageHeader>
          </div>
          <PageContent>
            <Dialog
              open={openMedia}
              onClose={handleClose}
              fullWidth={true}
              maxWidth={'lg'}
            >
              <DialogTitle>Select Image</DialogTitle>
              <DialogContent>
                <EditorFileSelect
                  location={location}
                  selectFile={file => handleImageChange(file)}
                />
                <div className="mt-2 text-xs">
                  Note: Please Double Click to open folder and select images.
              </div>
              </DialogContent>
            </Dialog>
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Title"
                inputclassName="inputbox"
                inputid="grid-title"
                inputType="text"
                value={one.title}
                onChange={handleChange('title')}
                error={errors.title}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Order"
                inputclassName="inputbox"
                inputid="grid-value"
                inputType="number"
                value={one.order}
                onChange={handleChange('order')}
                error={errors.order}
              />
            </div>

            <div className="w-full md:w-1/2">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="grid-country-code-2"
              >
                Description
            </label>
              <textarea
                className="inputbox"
                id="grid-description"
                type="text"
                value={one.description}
                onChange={handleChange('description')}
              />
              <div id="component-error-text">{errors.key}</div>
            </div>
            <div className="w-full md:w-1/2 pb-4 mt-4">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                htmlFor="Image"
              >
                Image
            </label>
              <Dropzone onDrop={files => onDrop(files, 'media')}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {newFile ? (
                      <img
                        className="inputbox cursor-pointer"
                        src={tempImage}
                        alt="Property Category"
                        style={{ height: '120px', width: '120px' }}
                      />
                    ) : (
                        <img
                          className="inputbox cursor-pointer"
                          src={
                            one.media && one.media.path
                              ? `${IMAGE_BASE}${one.media.path}`
                              : tempImage
                          }
                          alt="Property Category"
                          style={{ height: '120px', width: '120px' }}
                        />
                      )}
                  </div>
                )}
              </Dropzone>
            </div>

            {/* <div className="w-full  pb-4 -mr-2">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
              htmlFor="Image"
            >
              Wanted Image
            </label>
            <section
              onClick={handleSetImage}
              style={{ width: '100%' }}
              className="text-black hover:text-primary text-center self-start py-3 px-4 border border-gray-500 rounded-lg border-dashed cursor-pointer"
            >
              <button
                type="button"
                className="text-black py-2 px-4 rounded font-bold bg-waftprimary hover:text-primary"
              >
                Upload Image from Media
              </button>
            </section>
            {errors && errors.wanted_image && (
              <div id="component-error-text">{errors.wanted_image}</div>
            )}
            {one.wanted_image && one.wanted_image._id && (
              <img src={`${IMAGE_BASE}${one.wanted_image.path}`} alt="wanted" />
            )}
          </div> */}

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
// const withReducer = injectReducer({ key: 'propertyCategory', reducer });
// const withSaga = injectSaga({ key: 'propertyCategory', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  tempImage: makeSelectTempImage(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withRouter,
  withStyle,
  // withReducer,
  // withSaga,
  withConnect,
)(AddEdit);
