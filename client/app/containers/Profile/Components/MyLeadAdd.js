import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectLeadOne,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Loading from '../../../components/Loading';
import Input from '../../../components/customComponents/Input';
import { CHANNEL } from '../constants';

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
const key = 'userPersonalInformationPage';

const AddEdit = props => {
  const {
    clearError,
    loadOneRequest,
    match,
    one,
    classes,
    loading,
    errors,
    setLeadOne,
    addLeadRequest,
    push,
  } = props;

  useEffect(() => {
    clearError();
    // if (match.params && match.params.id) {
    //   loadOneRequest(match.params.id);
    // }
  }, []);

  const handleChange = name => event => {
    event.persist();
    setLeadOne({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    push('/user/leads');
  };

  const handleSave = () => {
    addLeadRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setLeadOne({ key: name, value: event.target.checked });
  };

  const handleDate = date => {
    if (date === null) {
      date = '';
    }
    setLeadOne({
      key: 'date',
      value: date,
    });
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
              ? 'Edit My Lead'
              : 'Add My Lead'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <select
              className="inputbox"
              value={one.channel}
              onChange={handleChange('channel')}
            >
              <option value="">Choose Channel</option>
              <option value="Facebook">Facebook</option>
              <option value="Via_Phone">Via Phone</option>
            </select>
          </div>
          {one.channel === 'Facebook' && (
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Profile Link"
                inputclassName="inputbox"
                inputid="grid-name"
                inputType="text"
                value={one.profile_link}
                onChange={handleChange('profile_link')}
                error={errors.profile_link}
              />
            </div>
          )}
          {(one.channel === 'Via_Phone' ||
            one.channel === 'Contact_Form' ||
            one.channel === 'Property_Inquiries') && (
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Phone No."
                inputclassName="inputbox"
                inputid="grid-name"
                inputType="text"
                value={one.phone_no}
                onChange={handleChange('phone_no')}
                error={errors.phone_no}
              />
            </div>
          )}
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
              label="Email"
              inputclassName="inputbox"
              inputid="grid-email"
              inputType="email"
              value={one.email}
              onChange={handleChange('email')}
              error={errors.email}
            />
          </div>

          <div className="w-1/2 z-20 pb-4">
            <label className="font-bold text-gray-700" htmlFor="grid-title">
              Date
            </label>
            <DatePicker
              className="inputbox"
              placeholderText="Click to select a date"
              selected={
                one.date !== '' && one.date !== null ? new Date(one.date) : ''
              }
              onChange={handleDate}
              isClearable
            />
            {errors.date && errors.date && (
              <div id="component-error-text">{errors.date}</div>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <label className="font-bold text-gray-700" htmlFor="grid-title">
              Inquiry
            </label>
            <textarea
              className="inputbox"
              id="grid-inquiry"
              type="text"
              value={one.inquiry}
              onChange={handleChange('inquiry')}
            />
            <div id="component-error-text">{errors.inquiry}</div>
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
  addLeadRequest: PropTypes.func.isRequired,
  setLeadOne: PropTypes.func.isRequired,
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
  one: makeSelectLeadOne(),
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
