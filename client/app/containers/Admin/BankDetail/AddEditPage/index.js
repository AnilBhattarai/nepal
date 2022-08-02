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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
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
  } = props;

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  const [newFile, setNewFile] = useState(false);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    push('/admin/banks');
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
              ? 'Edit Bank'
              : 'Add Bank'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Bank Name
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.Bank_Name}
              onChange={handleChange('Bank_Name')}
            />
            <div id="component-error-text">
              {errors.Bank_Name && errors.Bank_Name}
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Rate of Interest
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.Rate_Of_interest}
              onChange={handleChange('Rate_Of_interest')}
            />
            <div id="component-error-text">
              {errors.Rate_Of_interest && errors.Rate_Of_interest}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Processing fees
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.Processing_Fees}
              onChange={handleChange('Processing_Fees')}
            />
            <div id="component-error-text">
              {errors.Processing_Fees && errors.Processing_Fees}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Max tenure
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="number"
              value={one.Max_Tenure}
              onChange={handleChange('Max_Tenure')}
            />
            <div id="component-error-text">
              {errors.Max_Tenure && errors.Max_Tenure}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Min tenure
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="number"
              value={one.Min_Tenure}
              onChange={handleChange('Min_Tenure')}
            />
            <div id="component-error-text">
              {errors.Min_Tenure && errors.Min_Tenure}
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-4 mt-4">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
              htmlFor="Image"
            >
              Image
            </label>
            <Dropzone onDrop={files => onDrop(files, 'Logo')}>
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
                        one.Logo && one.Logo.path
                          ? `${IMAGE_BASE}${one.Logo.path}`
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

          <FormControlLabel
            control={
              <Checkbox
                checked={one.IS_Include_VAT || false}
                tabIndex={-1}
                onClick={handleCheckedChange('IS_Include_VAT')}
                color="primary"
              />
            }
            label="Is Active"
          />
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
const withReducer = injectReducer({ key: 'bankDetail', reducer });
const withSaga = injectSaga({ key: 'bankDetail', saga });

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
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
