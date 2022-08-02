import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import arrayMove from 'array-move';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CKEditor from 'react-ckeditor-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { IMAGE_BASE } from '../../../App/constants';
import EditorFileSelect from '../../../EditorFileSelect';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectOne,
} from '../selectors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

const DragHandle = SortableHandle(() => (
  <span className="hover:shadow-lg ease-in-out cursor-move">MOVE</span>
));

const SortableItem = SortableElement(({ value }) => (
  <div className="w-full"> {value}</div>
));

const SortableList = SortableContainer(
  ({
    items,
    handleRequirementChange,
    removeRequirement,
    handleRequirementEndDate,
    handleRequirementStartDate,
    handleSetImage,
  }) => {
    return (
      <div className="">
        {items.map((each, index) => (
          <SortableItem
            key={index}
            index={index}
            value={
              <div
                className="mb-1 bg-white p-2 border rounded"
                key={each.image && each.image._id}
              >
                <div className="flex justify-between items-center">
                  <div className="w-10 text-center my-auto border-r text-gray-700">
                    <DragHandle />
                  </div>
                  <div className="overflow-hidden mr-2">
                    {each && each.image ? (
                      <img
                        // className={_this.props.classes.media}
                        className="w-24 object-contain"
                        src={
                          typeof each.image === 'string'
                            ? ``
                            : `${IMAGE_BASE}${each.image.path}`
                        }
                        onClick={() => handleSetImage(index)}
                      />
                    ) : (
                      <button
                        type="button"
                        className="p-2 font-bold rounded border border-gray-500 border-dashed text-center hover:border-primary hover:text-primary"
                        onClick={() => handleSetImage(index)}
                      >
                        Click To Set Image
                      </button>
                    )}
                  </div>

                  <div className="w-56 mr-2">
                    <input
                      className="inputbox"
                      type="text"
                      value={each.link || ''}
                      placeholder="Link"
                      onChange={handleRequirementChange('link', index)}
                      style={{ background: '#FFF', height: '100%' }}
                    />
                  </div>
                  <div className="w-40 mr-2">
                    <DatePicker
                      className="inputbox"
                      placeholderText="Start date"
                      selected={
                        each.start_date !== '' && each.start_date !== null
                          ? new Date(each.start_date)
                          : ''
                      }
                      onChange={handleRequirementStartDate(index)}
                      isClearable
                    />
                  </div>
                  <div className="w-40 mr-2">
                    <DatePicker
                      className="inputbox z-50"
                      placeholderText="End date"
                      minDate={
                        each.start_date !== '' && each.start_date !== null
                          ? new Date(each.start_date)
                          : ''
                      }
                      selected={
                        each.end_date !== '' && each.end_date !== null
                          ? new Date(each.end_date)
                          : ''
                      }
                      onChange={handleRequirementEndDate(index)}
                      isClearable
                    />
                  </div>
                  <div className="flex-1 mr-2">
                    <textarea
                      className="inputbox"
                      type="text"
                      value={each.caption || ''}
                      placeholder="Caption"
                      onChange={handleRequirementChange('caption', index)}
                      style={{ background: '#FFF', height: '100%' }}
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      className="w-6 inline-flex justify-center items-center leading-none cursor-pointer relative"
                      onClick={() => removeRequirement(index)}
                    >
                      <span className="tbltrash text-xs text-red-400 hover:text-red-500">
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            }
          />
        ))}
      </div>
    );
  },
);

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
    setSingleRequirement,
    setSingleValue,
    setChosenIndex,
    addFromMedia,
    addRequirement,
    removeRequirement,
  } = props;

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  const [isAd, setIsAd] = useState(false);
  useEffect(() => {
    if (window.location.pathname.includes('advertisement')) {
      setIsAd(true);
    }
  }, [window.location.pathname]);

  const [newFile, setNewFile] = useState(false);
  const [state, setState] = useState({
    images: {
      imageProduct: '',
    },
    openMedia: false,
    fullWidth: true,
    maxWidth: 'lg',
  });
  const { images, open, fullWidth, maxWidth } = state;

  const handleClose = () => {
    setState({ openMedia: false });
  };

  const handleSetImage = index => {
    setState({ openMedia: true });
    setChosenIndex(index);
  };

  const handleImageChange = file => {
    addFromMedia(file);
    setState({ openMedia: false });
  };

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    if (isAd) {
      push('/admin/advertisement');
    } else {
      push('/admin/popup-setting');
    }
  };

  const handleSave = () => {
    addEditRequest({ isAd });
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleTemplateChange = name => event => {
    setSingleRequirement();
    setOneValue({ key: name, value: event.value });
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

  const handleStartDate = date => {
    if (date === null) {
      date = '';
    }
    setOneValue({
      key: 'start_date',
      value: date,
    });
  };

  const handleEndDate = date => {
    if (date === null) {
      date = '';
    }
    setOneValue({
      key: 'end_date',
      value: date,
    });
  };

  const handleRequirementChange = (name, index) => event => {
    const { value } = event.target;
    setSingleValue({ index: index, name, value });
  };

  const handleRequirementStartDate = index => date => {
    if (date === null) {
      date = '';
    }
    setSingleValue({
      name: 'start_date',
      value: date,
      index,
    });
  };

  const handleRequirementEndDate = index => date => {
    if (date === null) {
      date = '';
    }
    setSingleValue({
      name: 'end_date',
      value: date,
      index,
    });
  };

  const handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    setSingleValue({ name, value: newContent, index: 0 });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newImage = arrayMove(one.templateRequirement, oldIndex, newIndex);
    setOneValue({ key: 'templateRequirement', value: newImage });
  };

  const templateOptions = [
    { label: 'Select', value: '' },
    { label: 'Single Image', value: 'single_image' },
    // { label: 'Use slider', value: 'use_slider' },
    // {
    //   label: 'Show image one by one',
    //   value: 'show_img_one_by_one',
    // },
    // { label: 'Use CKeditor', value: 'ck_editor' },
  ];

  let listTemplatesNormalized = {};
  const listTemplates = templateOptions.map(each => {
    const obj = {
      label: each.label,
      value: each.value,
    };
    listTemplatesNormalized = {
      ...listTemplatesNormalized,
      [each.value]: obj,
    };
    return obj;
  });

  return loading ? (
    <Loading />
  ) : (
    <>
      <Dialog
        className="
    w-full h-full overflow-auto
      "
        open={state.openMedia}
        onClose={handleClose}
      >
        <DialogTitle>Select Media</DialogTitle>
        <DialogContent>
          <div>
            <EditorFileSelect
              location={location}
              selectFile={file => handleImageChange(file)}
            />
            <div className="mt-2 text-xs">
              Note: Please Double Click to open folder and select images.
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between mt-3 mb-3">
        <PageHeader>
          <IconButton
            className={` cursor-pointer`}
            onClick={handleGoBack}
            aria-label="Back"
          >
            <BackIcon />
          </IconButton>
          {match && match.params && match.params.id
            ? `Edit ${isAd ? 'Advertisement' : 'Popup'} `
            : `Add ${isAd ? 'Advertisement' : 'Popup'}`}
        </PageHeader>
      </div>
      <Helmet>
        <title>
          {match && match.params && match.params.id
            ? `Edit ${isAd ? 'Advertisement' : 'Popup'} `
            : `Add ${isAd ? 'Advertisement' : 'Popup'}`}
        </title>
      </Helmet>
      <PageContent>
        <div className="bg-white p-4 border">
          <div className="w-full md:w-1/2 pb-4">
            <label className="font-bold text-gray-700" htmlFor="grid-title">
              Title
            </label>
            <input
              label={`${isAd ? 'Advertisement' : 'Popup'} Title`}
              className="inputbox"
              inputid="slider-name"
              type="text"
              value={one.title}
              name="title"
              onChange={handleChange('title')}
              error={errors.title}
            />
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label className="font-bold text-gray-700" htmlFor="grid-title">
              Key
            </label>
            <input
              label={`${isAd ? 'Advertisement' : 'Popup'} Key`}
              className="inputbox"
              inputid="key"
              type="text"
              value={one.key}
              name="key"
              onChange={handleChange('key')}
              error={errors.key}
            />
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label className="font-bold text-gray-700" htmlFor="grid-title">
              Timer
            </label>
            <input
              className="inputbox"
              inputid="timer"
              type="number"
              value={one.timer}
              name="timer"
              onChange={handleChange('timer')}
              min="1"
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label className="font-bold text-gray-700">
              Select {isAd ? 'Advertisement' : 'Popup'} Templates
            </label>

            <Select
              styles={customStyles}
              value={listTemplatesNormalized[one.template]}
              onChange={handleTemplateChange('template')}
              options={listTemplates}
            />
          </div>

          <div className="w-full pb-4">
            {one.template === 'single_image' && (
              <div className="mb-2 bg-white p-2 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <div className="overflow-hidden mr-2">
                    {one.templateRequirement[0].image ? (
                      <img
                        // className={_this.props.classes.media}
                        className="w-24 object-contain"
                        src={
                          typeof one.templateRequirement[0].image === 'string'
                            ? `${IMAGE_BASE}${
                                state.files[one.templateRequirement[0].image]
                                  .path
                              }`
                            : `${IMAGE_BASE}${
                                one.templateRequirement[0].image.path
                              }`
                        }
                        onClick={() => handleSetImage(0)}
                      />
                    ) : (
                      <button
                        type="button"
                        className="p-2 font-bold rounded border border-gray-500 border-dashed text-center hover:border-primary hover:text-primary"
                        onClick={() => handleSetImage(0)}
                      >
                        Click To Set Image
                      </button>
                    )}
                  </div>

                  <div className="w-56 mr-2">
                    <input
                      className="inputbox"
                      type="text"
                      value={one.templateRequirement[0].link || ''}
                      placeholder="Link"
                      onChange={handleRequirementChange('link', 0)}
                      style={{ background: '#FFF', height: '100%' }}
                    />
                  </div>
                  <div className="w-40 mr-2">
                    <DatePicker
                      className="inputbox"
                      placeholderText="Start date"
                      selected={
                        one.templateRequirement[0].start_date !== '' &&
                        one.templateRequirement[0].start_date !== null
                          ? new Date(one.templateRequirement[0].start_date)
                          : ''
                      }
                      onChange={handleRequirementStartDate(0)}
                      isClearable
                    />
                  </div>
                  <div className="w-40 mr-2">
                    <DatePicker
                      className="inputbox z-50"
                      placeholderText="End date"
                      minDate={
                        one.templateRequirement[0].start_date !== '' &&
                        one.templateRequirement[0].start_date !== null
                          ? new Date(one.templateRequirement[0].start_date)
                          : ''
                      }
                      selected={
                        one.templateRequirement[0].end_date !== '' &&
                        one.templateRequirement[0].end_date !== null
                          ? new Date(one.templateRequirement[0].end_date)
                          : ''
                      }
                      onChange={handleRequirementEndDate(0)}
                      isClearable
                    />
                  </div>
                  <div className="flex-1">
                    <textarea
                      className="inputbox"
                      type="text"
                      value={one.templateRequirement[0].caption || ''}
                      placeholder="Caption"
                      onChange={handleRequirementChange('caption', 0)}
                      style={{ background: '#FFF', height: '100%' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {one.template === 'ck_editor' && (
              <div className="mb-2 bg-white p-2 border rounded">
                <CKEditor
                  name="description"
                  content={one.templateRequirement[0].description}
                  scriptUrl="https://cdn.ckeditor.com/4.6.2/full/ckeditor.js"
                  config={{
                    allowedContent: true,
                    image_previewText: ' ',
                    filebrowserBrowseUrl: '/editor-file-select',
                    filebrowserUploadUrl: '/api/media/multiple',
                  }}
                  events={{
                    change: e => handleEditorChange(e, 'description'),
                    value: one.templateRequirement[0].description,
                  }}
                />
              </div>
            )}

            {(one.template === 'show_img_one_by_one' ||
              one.template === 'use_slider') && (
              <>
                <div className="pb-4">
                  <button
                    type="button"
                    className="btn btn-waft btn-green"
                    onClick={addRequirement}
                  >
                    Add Slide
                  </button>
                </div>
                <SortableList
                  axis="xy"
                  items={one.templateRequirement}
                  onSortEnd={onSortEnd}
                  useDragHandle
                  removeRequirement={removeRequirement}
                  handleRequirementChange={handleRequirementChange}
                  handleRequirementStartDate={handleRequirementStartDate}
                  handleRequirementEndDate={handleRequirementEndDate}
                  handleSetImage={handleSetImage}
                />
                {/* {one.templateRequirement.map((each, index) => (
                ))} */}
              </>
            )}
          </div>
          {/* <div className="flex w-full md:w-1/2 justify-between px-1">
            <div className="md:w-1/2 pb-4 -ml-1">
              <label className="font-bold text-gray-700" htmlFor="grid-title">
                Start Date
              </label>
              <DatePicker
                className="inputbox"
                placeholderText="Click to select a date"
                selected={
                  one.start_date !== '' && one.start_date !== null
                    ? new Date(one.start_date)
                    : ''
                }
                onChange={handleStartDate}
                isClearable
              />
            </div>
            <div className="md:w-1/2 pb-4 -mr-1">
              <label className="font-bold text-gray-700" htmlFor="grid-title">
                End Date
              </label>
              <DatePicker
                className="inputbox z-50"
                placeholderText="Click to select a date"
                minDate={
                  one.start_date !== '' && one.start_date !== null
                    ? new Date(one.start_date)
                    : ''
                }
                selected={
                  one.end_date !== '' && one.end_date !== null
                    ? new Date(one.end_date)
                    : ''
                }
                onChange={handleEndDate}
                isClearable
              />
            </div>
          </div> */}

          <FormControlLabel
            control={
              <Checkbox
                checked={one.is_active || false}
                onClick={handleCheckedChange('is_active')}
                value="is_active"
                color="primary"
              />
            }
            label="Is Active"
          />

          <button type="button" className="btn btn-waft" onClick={handleSave}>
            Save
          </button>
        </div>
      </PageContent>
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

  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withReducer = injectReducer({ key: 'popUpSettings', reducer });
const withSaga = injectSaga({ key: 'popUpSettings', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const customStyles = {
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused || state.isSelected ? '#5897FB' : 'white',
    color: state.isFocused || state.isSelected ? 'white' : 'black',
    fontweight: 'normal',
    display: 'block',
    whitespace: 'pre',
    minheight: '1.2em',
    padding: '0px 2px 1px',
  }),

  menu: provided => ({
    ...provided,
    margin: 0,
  }),

  placeholder: provided => ({
    ...provided,
    color: '#000000',
  }),

  menuList: () => ({
    background: '#FFFFFF',
    border: '1px solid #5897FB',
  }),

  control: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #dfdfdf',
    borderRadius: '4px',
    height: '36px',
    background: '#FFFFFF',
  }),

  valueContainer: () => ({
    padding: '3px 6px',
  }),

  indicatorSeparator: () => ({
    background: 'transparent',
  }),

  container: provided => ({
    ...provided,
    width: '100%',
  }),
};

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
