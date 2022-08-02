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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectCity,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';

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
    loadCityRequest,
    city,
  } = props;

  useEffect(() => {
    clearErrors();
    loadCityRequest();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    push('/admin/home-loan');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
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
            View Details
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Full name
            </label>

            <span>{one.full_name}</span>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Email
            </label>
            <span>{one.email} </span>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-mobile"
            >
              Mobile
            </label>
            <span>{one.mobile}</span>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Type of property
            </label>
            <span>{one.type_of_property}</span>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Looking for city
            </label>
            <span>{one.looking_for_city}</span>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Resident Status
            </label>

            <span>{one.resident_status}</span>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Employment type
            </label>
            <span>{one.employment_type}</span>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Monthly income
            </label>
            <span>{one.monthly_income}</span>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Property identified?
            </label>
            <span>{one.is_identified ? 'Yes' : 'No'}</span>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Wants to add co-borrower?
            </label>
            <span>{one.is_co_borrower ? 'Yes' : 'No'}</span>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-l mb-2"
              htmlFor="grid-title"
            >
              Bank Chosen by user
            </label>
            <span>{one.bank_name ? one.bank_name : 'Not Chosen'}</span>
          </div>

          <br />
          {/* <button
            type="button"
            className="text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme"
            onClick={handleSave}
          >
            Save
          </button> */}
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
const withReducer = injectReducer({ key: 'homeLoan', reducer });
const withSaga = injectSaga({ key: 'homeLoan', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  city: makeSelectCity(),
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
