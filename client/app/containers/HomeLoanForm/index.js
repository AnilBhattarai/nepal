/**
 *
 * HomeLoanForm
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectCity,
  makeSelectBankName,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const key = 'homeLoanForm';

export const HomeLoanForm = props => {
  const {
    one,
    loading,
    addEditRequest,
    setOneValue,
    errors,
    clearOne,
    clearErrors,
    loadCityRequest,
    city,
    bank,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    clearErrors();
    clearOne();
    loadCityRequest();
  }, []);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleIncomeChange = name => event => {
    event.persist();
    if (event.target.value < 0) {
      setOneValue({ key: name, value: 0 });
    } else {
      setOneValue({ key: name, value: event.target.value });
    }
  };

  const handleSave = () => {
    addEditRequest();
  };

  return (
    <div className="px-4 py-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl text-center font-bold my-5">
          Apply For Home Loan {bank && <span>of {bank}</span>}
        </h3>
        <div className="flex flex-wrap -mx-4 mt-4">
          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              className="inputbox"
              value={one.full_name}
              onChange={handleChange('full_name')}
            />
            {errors && errors.full_name && (
              <div id="component-error-text">{errors.full_name}</div>
            )}
          </div>

          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              className="inputbox"
              value={one.email}
              onChange={handleChange('email')}
            />
            {errors && errors.email && (
              <div id="component-error-text"> {errors.email}</div>
            )}
          </div>

          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold" htmlFor="mobile">
              Mobile No.
            </label>
            <input
              type="text"
              className="inputbox"
              value={one.mobile}
              onChange={handleChange('mobile')}
            />
            {errors && errors.mobile && (
              <div id="component-error-text">{errors.mobile}</div>
            )}
          </div>

          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold" htmlFor="property">
              Have you identified a property?
            </label>

            <div className="inline-flex items-center mr-4 my-2">
              <input
                onChange={handleChange('is_identified')}
                id="yes"
                type="radio"
                name="identified"
                value="Yes"
                className="hidden"
                checked={one.is_identified === 'Yes'}
              />
              <label
                htmlFor="yes"
                className="flex items-center cursor-pointer leading-none"
              >
                <span className="w-4 h-4 inline-block mr-2 rounded-full radio" />
                Yes
              </label>
            </div>

            <div className="inline-flex items-center mr-4 my-2">
              <input
                onChange={handleChange('is_identified')}
                id="no"
                type="radio"
                name="identified"
                value="No"
                className="hidden"
                checked={one.is_identified === 'No'}
              />
              <label
                htmlFor="no"
                className="flex items-center cursor-pointer leading-none"
              >
                <span className="w-4 h-4 inline-block mr-2 rounded-full radio" />
                No
              </label>
            </div>

            {errors && errors.is_identified && (
              <div id="component-error-text">{errors.is_identified}</div>
            )}
          </div>
          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold" htmlFor="property">
              What type of property are you seeking loan for?
            </label>
            <select
              className="inputbox bg-white"
              value={one.type_of_property}
              onChange={handleChange('type_of_property')}
            >
              <option>Choose type</option>

              <option>Home Purchase</option>
              <option>Home Construction</option>
              <option>Refinance</option>
              <option>Loan Against Property</option>
              <option>Plot Purchase</option>
            </select>
            <div id="component-error-text">
              {errors && errors.type_of_property && errors.type_of_property}
            </div>
          </div>

          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold" htmlFor="city">
              What is the city you are seeking loan for?
            </label>
            <select
              className="inputbox bg-white"
              value={one.looking_for_city}
              onChange={handleChange('looking_for_city')}
            >
              <option key="1" name="choose" value="1">
                Choose city
              </option>
              {city &&
                city.map(each => (
                  <option key={each._id} name={each.name} value={each.name}>
                    {each.name}
                  </option>
                ))}
            </select>
            <div id="component-error-text">
              {errors && errors.looking_for_city && errors.looking_for_city}
            </div>
          </div>

          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold mb-2" htmlFor="property">
              Resident Status
            </label>

            <div className="flex items-center mr-4 mb-4">
              <input
                onChange={handleChange('resident_status')}
                id="radio1"
                type="radio"
                name="resident_status"
                value="Resident Nepalese"
                className="hidden"
                checked={one.resident_status === 'Resident Nepalese'}
              />
              <label
                htmlFor="radio1"
                className="flex items-center cursor-pointer leading-none"
              >
                <span className="w-4 h-4 inline-block mr-2 rounded-full radio" />
                Resident Nepalese
              </label>
            </div>

            <div className="flex items-center mr-4 mb-4">
              <input
                onChange={handleChange('resident_status')}
                id="radio2"
                type="radio"
                name="resident_status"
                value="Non Resident Nepalese"
                className="hidden"
                checked={one.resident_status === 'Non Resident Nepalese'}
              />
              <label
                htmlFor="radio2"
                className="flex items-center cursor-pointer leading-none"
              >
                <span className="w-4 h-4 inline-block mr-2 rounded-full radio" />
                Non Resident Nepalese
              </label>
            </div>

            {errors && errors.resident_status && (
              <div id="component-error-text">{errors.resident_status}</div>
            )}
          </div>

          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold mb-2" htmlFor="property">
              Employment Type
            </label>

            <div className="flex items-center mr-4 mb-4">
              <input
                onChange={handleChange('employment_type')}
                id="radio3"
                type="radio"
                name="employment_type"
                value="Salaried"
                className="hidden"
                checked={one.employment_type === 'Salaried'}
              />
              <label
                htmlFor="radio3"
                className="flex items-center cursor-pointer leading-none"
              >
                <span className="w-4 h-4 inline-block mr-2 rounded-full radio" />
                Salaried
              </label>
            </div>

            <div className="flex items-center mr-4 mb-4">
              <input
                onChange={handleChange('employment_type')}
                id="radio4"
                type="radio"
                name="employment_type"
                value="Self Employed"
                className="hidden"
                checked={one.employment_type === 'Self Employed'}
              />
              <label
                htmlFor="radio4"
                className="flex items-center cursor-pointer leading-none"
              >
                <span className="w-4 h-4 inline-block mr-2 rounded-full radio" />
                Self Employed
              </label>
            </div>

            {errors && errors.employment_type && (
              <div id="component-error-text">{errors.employment_type}</div>
            )}
          </div>

          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold" htmlFor="income">
              Monthly Income
            </label>
            <input
              type="number"
              className="inputbox"
              value={one.monthly_income}
              onChange={handleIncomeChange('monthly_income')}
            />
            <div id="component-error-text">
              {errors && errors.monthly_income && errors.monthly_income}
            </div>
          </div>

          <div className="w-full lg:w-1/2 mb-4 px-4">
            <label className="block font-bold" htmlFor="property">
              Add A Co-Borrower?
            </label>
            <div className="inline-flex items-center mr-4 my-2">
              <input
                onChange={handleChange('is_co_borrower')}
                id="radio5"
                type="radio"
                name="is_co_borrower"
                value="Yes"
                className="hidden"
                checked={one.is_co_borrower === 'Yes'}
              />
              <label
                htmlFor="radio5"
                className="flex items-center cursor-pointer leading-none"
              >
                <span className="w-4 h-4 inline-block mr-2 rounded-full radio" />
                Yes
              </label>
            </div>

            <div className="inline-flex items-center mr-4 my-2">
              <input
                onChange={handleChange('is_co_borrower')}
                id="radio6"
                type="radio"
                name="is_co_borrower"
                value="No"
                className="hidden"
                checked={one.is_co_borrower === 'No'}
              />
              <label
                htmlFor="radio6"
                className="flex items-center cursor-pointer leading-none"
              >
                <span className="w-4 h-4 inline-block mr-2 rounded-full radio" />
                No
              </label>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mb-4 px-4">
            <button
              type="button"
              className="bg-secondary px-4 py-2 w-full rounded block text-white font-bold"
              onClick={handleSave}
            >
              {loading ? '...' : 'Submit Form'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

HomeLoanForm.propTypes = {
  addEditRequest: PropTypes.func.isRequired,
  one: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  city: makeSelectCity(),
  bank: makeSelectBankName(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(HomeLoanForm);
