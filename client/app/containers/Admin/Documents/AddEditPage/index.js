import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
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
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
import Input from '../../../../components/customComponents/Input';
import { CHANNEL } from '../constants';
import { on } from '../../../../../../server/modules/lead/leadSchema';
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
const key = 'documents';

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
    addDocumentRequest,
  } = props;

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    push('/admin/resource-manage');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleDate = date => {
    if (date === null) {
      date = '';
    }
    setOneValue({
      key: 'date',
      value: date,
    });
  };

  const handleFileUpload = files => {
    addDocumentRequest({ file: files });
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
              ? 'Edit Resource'
              : 'Add Resource'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <select
              className="inputbox"
              value={one.resource_for}
              onChange={handleChange('resource_for')}
            >
              <option value="">Resource for</option>
              <option value="agent">Agent</option>
              <option value="developer">Developer</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="Name"
              inputclassName="inputbox"
              inputid="grid-name"
              inputType="text"
              value={one.name}
              onChange={handleChange('name')}
              error={errors.name}
            />
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="Key"
              inputclassName="inputbox"
              inputid="grid-email"
              inputType="text"
              value={one.key}
              onChange={handleChange('key')}
              error={errors.key}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <Dropzone
              onDrop={file => handleFileUpload(file)}
              multiple={false}
              accept=".pdf"
            >
              {({ getRootProps, getInputProps }) => (
                <section className="btn bg-info hover:bg-secondary mr-2 cursor-pointer">
                  <div className="flex items-center " {...getRootProps()}>
                    <input {...getInputProps()} />
                    <i className="material-icons text-base mr-2">
                      add_to_photos
                    </i>
                    <span>Choose File</span>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          {one.file_id && one.file_id.filename && (
            <div className="w-full md:w-1/2 pb-4">
              <span>
                File :
                <a href={`${IMAGE_BASE}${one.file_id.path}`} target="_blank">
                  {one.file_id.filename}
                </a>
              </span>
            </div>
          )}

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
            className="text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme disabled:opacity-75"
            onClick={handleSave}
            disabled={!one.file_id && !one.file_id._id}
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
const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

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
