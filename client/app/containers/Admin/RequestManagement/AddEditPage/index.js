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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectPurpose,
  makeSelectLocations,
  makeSelectPrices,
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

const key = 'requestManagement';

const AddEdit = props => {
  const {
    clearErrors,
    loadOneRequest,
    loadPurposeRequest,
    match,
    one,
    classes,
    loading,
    errors,
    setOneValue,
    addEditRequest,
    push,
    purpose,
    loadLocationRequest,
    loadPriceRequest,
    locations,
    prices,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadPurposeRequest();
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
    loadLocationRequest();
    loadPriceRequest();
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

  // const handleDateChange = name => date => {
  //   setOneValue({
  //     key: name,
  //     value: moment(date).format('YYYY/MM/DD'),
  //   });
  // };

  const handleGoBack = () => {
    push('/admin/request-manage');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleAddressChange = name => event => {
    event.persist();
    const { value } = event.target;
    setOneValue({ key: 'address', value: { ...one.address, [name]: value } });
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
              ? 'Edit'
              : 'Tell us what you want'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-name"
            >
              Name
            </label>
            <input
              className="inputbox"
              id="grid-name"
              type="text"
              value={one.name}
              onChange={handleChange('name')}
            />
            <div id="component-error-text">{errors.name}</div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="inputbox"
              id="grid-email"
              type="email"
              value={one.email}
              onChange={handleChange('email')}
            />
            <div id="component-error-text">{errors.email}</div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-phone_no"
            >
              Phone No
            </label>
            <input
              className="inputbox"
              id="grid-phone_no"
              type="phone_no"
              value={one.phone_no}
              onChange={handleChange('phone_no')}
            />
            <div id="component-error-text">{errors.phone_no}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-mobile_no"
            >
              Mobile No
            </label>
            <input
              className="inputbox"
              id="grid-mobile_no"
              type="mobile_no"
              value={one.mobile_no}
              onChange={handleChange('mobile_no')}
            />
            <div id="component-error-text">{errors.mobile_no}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-message"
            >
              Message
            </label>
            <input
              className="inputbox"
              id="grid-message"
              type="text"
              value={one.message}
              onChange={handleChange('message')}
            />
            <div id="component-error-text">{errors.message}</div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-purpose"
            >
              Purpose
            </label>
            <select
              className="inputbox"
              native="true"
              value={one.purpose}
              onChange={handleChange('purpose')}
              // inputprops={{ value: one.country || '', name: 'country' }}
            >
              <option key="0" name="Choose Purpose" value="0" disabled>
                Choose Purpose
              </option>
              {purpose.map(each => (
                <option key={each._id} name={each.tite} value={each._id}>
                  {each.title}
                </option>
              ))}
            </select>
            <div id="component-error-text">{errors.purpose}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-price"
            >
              Price
            </label>
            <input
              className="inputbox"
              id="grid-price"
              type="price"
              value={one.price}
              onChange={handleChange('price')}
            />
            <div id="component-error-text">{errors.price}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-price_label"
            >
              Price Label
            </label>
            <select
              className="inputbox"
              native="true"
              value={one.price_label}
              onChange={handleChange('price_label')}
              // inputprops={{ value: one.country || '', name: 'country' }}
            >
              <option key="0" name="Choose price_label" value="0" disabled>
                Choose price_label
              </option>
              {prices.map(each => (
                <option key={each._id} name={each.tite} value={each._id}>
                  {each.title}
                </option>
              ))}
            </select>
            <div id="component-error-text">{errors.price_label}</div>
          </div>

          <div className="w-full flex justify-between">
            <div className="w-full md:w-1/3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
                State
              </label>
              <select
                className="inputbox"
                native="true"
                value={one.address && one.address.state_id}
                onChange={handleAddressChange('state_id')}
                // inputprops={{ value: one.country || '', name: 'country' }}
              >
                <option key="0" name="Choose State" value="0">
                  Choose State
                </option>
                {locations.allState &&
                  locations.allState.map(each => (
                    <option
                      key={each._id}
                      name={each.name}
                      value={each._id}
                      // onChange={() =>
                      //   StateSearch('state_id')({
                      //     target: { value: each.stateID },
                      //   })
                      // }
                    >
                      {each.name}
                    </option>
                  ))}
              </select>
              <div id="component-error-text">
                {errors.address ? errors.address.state_id : ''}
              </div>
            </div>

            <div className="w-full md:w-1/3 pb-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="municipality"
              >
                District
              </label>
              <select
                className="inputbox"
                native="true"
                value={one.address && one.address.district_id}
                onChange={handleAddressChange('district_id')}
                // inputprops={{ value: one.country || '', name: 'country' }}
              >
                <option key="0" name="Choose District" value="0">
                  {one.address.state_id
                    ? 'Choose District'
                    : 'Select State first'}
                </option>
                {locations.allDistrict &&
                  locations.allDistrict.map(each =>
                    one.address.state_id &&
                    one.address.state_id === each.state_id ? (
                      <option key={each._id} name={each.name} value={each._id}>
                        {each.name}
                      </option>
                    ) : (
                      ''
                    ),
                  )}
              </select>
              <div id="component-error-text">
                {errors.address ? errors.address.district_id : ''}
              </div>
            </div>

            <div className="w-full md:w-1/3 pb-4 -mr-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="city"
              >
                City
              </label>
              <select
                className="inputbox w-full"
                native="true"
                value={one.address && one.address.city_id}
                onChange={handleAddressChange('city_id')}
                // inputprops={{ value: one.country || '', name: 'country' }}
              >
                <option key="0" name="Choose City" value="0">
                  {one.address.district_id
                    ? 'Choose City'
                    : 'Select District first'}
                </option>
                {locations.allVdc &&
                  locations.allVdc.map(each =>
                    one.address.district_id &&
                    one.address.district_id === each.district_id ? (
                      <option key={each._id} name={each.name} value={each._id}>
                        {each.name}
                      </option>
                    ) : (
                      ''
                    ),
                  )}
              </select>
              <div id="component-error-text">
                {errors.address ? errors.address.city_id : ''}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between">
            <div className="w-full md:w-1/3 pb-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="area"
              >
                Area
              </label>
              <select
                className="inputbox w-full"
                native="true"
                value={one.address && one.address.area_id}
                onChange={handleAddressChange('area_id')}
                // inputprops={{ value: one.country || '', name: 'country' }}
              >
                <option key="0" name="Choose Area" value="0">
                  {one.address.city_id ? 'Choose Area' : 'Select city first'}
                </option>
                {locations.allArea &&
                  locations.allArea.map(each =>
                    one.address.city_id &&
                    one.address.city_id === each.vdcmunicipality_id ? (
                      <option key={each._id} name={each.name} value={each._id}>
                        {each.name}
                      </option>
                    ) : (
                      ''
                    ),
                  )}
              </select>
              <div id="component-error-text">
                {errors.address ? errors.address.area_id : ''}
              </div>
            </div>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="is_approved"
                checked={one.is_approved || false}
                onChange={handleCheckedChange('is_approved')}
              />
            }
            label="Is Approved"
          />

          <br />
          <button
            type="button"
            className="text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </PageContent>
      </div>
    </>
  );
};

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  loadPurposeRequest: PropTypes.func.isRequired,
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
  purpose: PropTypes.array.isRequired,
};

const withStyle = withStyles(styles);

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  purpose: makeSelectPurpose(),
  locations: makeSelectLocations(),
  prices: makeSelectPrices(),
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
