/* eslint-disable indent */
import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import * as mapDispatchToProps from '../actions';
import {
  makeSelectErrors,
  makeSelectPrice,
  makeSelectEnum,
  makeSelectAll,
  makeSelectQuery,
  makeSelectOne,
} from '../selectors';
import Table from '../../../../components/Table';

const Price = props => {
  const {
    all: { data, page, size, totaldata },
    price,
    errors,
    setOneValue,
    enums,
    loadAllRequest,
    query,
    showHistory,
    one,
  } = props;

  const handlePriceChange = name => event => {
    const { value } = event.target;
    setOneValue({ key: 'price', value: { ...price, [name]: value } });
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({
      key: 'price',
      value: { ...price, [name]: event.target.checked },
    });
  };

  const tableData = data.map(({ added_at, added_by }) => [
    added_at,
    added_by,
    price.value,
  ]);

  return Object.keys(enums).length > 0 ? (
    <div className="flex w-full max-w-lg -mx-2">
      <div className="w-full md:w-2/3 p-2">
        <label
          className="block font-bold text-black text-sm mb-2"
          htmlFor="Price"
        >
          Price
        </label>
        <div className="flex justify-between px-2">
          <div className="w-2/3">
            <input
              className="inputbox -ml-2"
              id="grid-value"
              type="number"
              value={price.value}
              onChange={handlePriceChange('value')}
            />

            {errors.price ? (
              <div id="component-error-text">{errors.price.value}</div>
            ) : (
              ''
            )}
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={one.price.is_price_on_call || false}
                    tabIndex={-1}
                    onClick={handleCheckedChange('is_price_on_call')}
                    color="primary"
                  />
                }
                label="Price On Call"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={one.price.is_starting_from || false}
                    tabIndex={-1}
                    onClick={handleCheckedChange('is_starting_from')}
                    color="primary"
                  />
                }
                label="Price Starting from"
              />
            </div>
          </div>
          <div className="w-1/3">
            <select
              className="m-auto inputbox"
              native="true"
              value={price.currency}
              onChange={handlePriceChange('currency')}
              // inputprops={{ value: country || '', name: 'country' }}
            >
              <option key="0" name="choose" value="choose">
                Choose currency
              </option>
              {enums.currency.map(each => (
                <option key={each._id} name={each.title} value={each._id}>
                  {each.title}
                </option>
              ))}
            </select>

            {errors.price ? (
              <div id="component-error-text">{errors.price.currency}</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 p-2">
        <label
          className="block font-bold text-black text-sm mb-2"
          htmlFor="Price On"
        >
          Price On
        </label>
        <select
          className="inputbox"
          native="true"
          value={price.label}
          onChange={handlePriceChange('label')}
        >
          <option key="0" name="choose" value="label">
            Choose Price label
          </option>
          {enums.price_label.map(each => (
            <option key={each._id} name={each.title} value={each._id}>
              {each.title}
            </option>
          ))}
        </select>
        <div id="component-error-text">
          {errors.price ? errors.price.label : ''}
        </div>
      </div>

      {/* {!showHistory &&
      (window.location.pathname === '/user/property/add' ||
        window.location.pathname === '/admin/property/add') ? (
        ' '
      ) : (
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs">
            Price History
          </label>
          <Table
            style={{ width: '100%' }}
            tableHead={['Date', 'Updated by', 'Price']}
            tableData={tableData}
          />
        </div>
      )} */}
    </div>
  ) : (
    'Loading...'
  );
};

const mapStateToProps = createStructuredSelector({
  price: makeSelectPrice(),
  enums: makeSelectEnum(),
  errors: makeSelectErrors(),
  all: makeSelectAll(),
  query: makeSelectQuery(),
  one: makeSelectOne(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Price);
