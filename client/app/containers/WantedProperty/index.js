/**
 *
 * WantedProperty
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectPurpose,
  makeSelectOpenForm,
  makeSelectFormLoading,
  makeSelectForm,
  makeSelectErrors,
  makeSelectCategory,
  makeSelectPriceLabel,
  makeSelectLocations,
  makeSelectAddress,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import user from '../../assets/img/user.svg';
import { makeSelectToken } from '../App/selectors';

import defaultImage from '../../assets/img/logo.png';
import { IMAGE_BASE } from '../App/constants';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StaticContentDiv from '../../components/StaticContentDiv/StaticContentDiv';
const key = 'wantedProperty';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-next`} onClick={onClick}>
      <i className="material-icons"> keyboard_arrow_right </i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-prev`} onClick={onClick}>
      <i className="material-icons"> keyboard_arrow_left </i>
    </div>
  );
}

export const WantedProperty = props => {
  const {
    all: { data },
    loading,
    loadAllRequest,
    push,
    purpose,
    openForm,
    form_loading,
    errors,
    form,
    setFormValue,
    setFormOpen,
    makeFormRequest,
    loadPurposeRequest,
    token,
    category,
    priceLabel,
    loadLocationRequest,
    locations: { state, district, city, allArea: area },
    address,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  console.log('data', data);

  useEffect(() => {
    loadAllRequest();
    loadPurposeRequest();
    loadLocationRequest();
  }, []);

  const showModal = () => {
    // setActive(true);
    setFormOpen(true);
  };

  const handleModal = () => {
    // setActive(false);
    setFormOpen(false);
  };

  const handleChange = name => event => {
    event.persist();
    setFormValue({ key: name, value: event.target.value });
  };

  const handleAddressChange = name => event => {
    event.persist();
    const { value } = event.target;
    setFormValue({ key: 'address', value: { ...address, [name]: value } });
  };

  const handleMakeRequest = () => {
    makeFormRequest();
  };

  let settings =
    data && data.properties
      ? {
          equalizeHeight: true,
          dots: false,
          adaptiveHeight: false,
          infinite: true,
          speed: 500,
          slidesToScroll: 1,
          slidesToShow: 4,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2,
              },
            },
          ],
        }
      : {
          dots: false,
          // dotsClass: 'slick-dots slick-thumb',
          infinite: true,
          speed: 500,
          slidesToShow: 5,
          slidesToScroll: 3,
        };
  try {
    if (settings && typeof settings === 'string') {
      settings = JSON.parse(settings);
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      {data && data.length > 0 && (
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl lg:text-3xl uppercase font-medium">
                Wanted Properties
              </h2>
              <Link
                to="/properties/wanted"
                className="w-10 h-10 inline-flex items-center justify-center shadow-lg rounded-full"
              >
                <i class="material-icons text-primary text-lg">chevron_right</i>
              </Link>
            </div>
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* <Slider {...settings}> */}
              {data &&
                data.map(each => (
                  <div
                    className="p-5 bg-white shadow rounded-lg h-full overflow-hidden relative "
                    key={each._id}
                  >
                    {/* <img style={{ maxHeight: '100%' }}
                      src={
                        each.wanted_image
                          ? `${IMAGE_BASE}${each.wanted_image.path}`
                          : defaultImage
                      }
                    /> */}

                    <div
                      className="flex flex-col justify-between"
                      key={`wantedproperty-${each._id}`}
                    >
                      {each.property_category &&
                        each.property_category.wanted_image &&
                        each.property_category.wanted_image.destination && (
                          <img
                            src={`${IMAGE_BASE}${
                              each.property_category.wanted_image.destination
                            }${each.property_category.wanted_image.filename}`}
                          />
                        )}
                      <div>
                        {each.purpose &&
                        each.purpose._id === '5d660baf7682d03f547a6c48' ? (
                          <span className="bg-orange-500 inline-block text-white font-bold rounded px-1 py-1 text-sm">
                            I Want In Rent
                          </span>
                        ) : (
                          <span className="bg-primary inline-block text-white font-bold rounded px-1 py-1 text-sm">
                            I Want To Buy
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-base py-5">
                        {each.message && each.message}
                      </h4>
                      <p className="font-bold text-sm opacity-70">
                        Targeted Location:
                      </p>
                      <p className="text-xs opacity-50">
                        {each.address.area_id.name}, {each.address.city_id.name}
                        , {each.address.district_id.name}
                      </p>
                      <p className="text-primary font-bold mt-2">
                        Upto: {each.price} (
                        {each.price_label && each.price_label.title})
                      </p>
                    </div>
                  </div>
                ))}
              {/* </Slider> */}
            </div>
          </div>
        </div>
      )}

      <div className="bg-primary text-center py-20">
        <h1 className="text-3xl text-white font-extrabold">
          Didn’t you find the property of your choice?
        </h1>
        <p className="opacity-80 text-white mt-6 font-bold">
          Tell us your requirements and get matching properties from sellers,
          agencies, developers
        </p>
        <button
          onClick={showModal}
          className="bg-white text-primary rounded px-10 py-3 mt-6 font-extrabold text-sm"
        >
          Request Property
        </button>
      </div>

      <Dialog open={openForm} onClose={handleModal}>
        <DialogTitle>
          <div className="text-base font-normal">
            <h2 className="text-xl font-bold">Make Property Request</h2>
            <p className="text-sm">
              Tell us your requirements and get matching properties.
            </p>

            <div className="mt-0">
              <label className="text-sm">Name</label>
              <input
                className="inputbox"
                id="grid-name"
                type="text"
                value={form.name}
                onChange={handleChange('name')}
              />
              <div id="component-error-text">{errors.name && errors.name}</div>
            </div>

            <div className="mt-0">
              <label className="text-sm" htmlFor="Email">
                Email
              </label>
              <input
                className="inputbox"
                id="grid-email"
                type="text"
                value={form.email}
                onChange={handleChange('email')}
              />
              <div id="component-error-text">
                {errors.email && errors.email}
              </div>
            </div>
            <div className="mt-0">
              <label className="text-sm" htmlFor="message">
                Phone number <span className="opacity-50">(optional)</span>
              </label>
              <input
                className="inputbox"
                id="grid-phone_no"
                type="text"
                value={form.phone_no}
                onChange={handleChange('phone_no')}
              />

              <div id="component-error-text">
                {errors.phone_no && errors.phone_no}
              </div>
            </div>
            <div className="mt-0">
              <label className="text-sm" htmlFor="purpose">
                Purpose
              </label>
              <div className="relative">
                <select
                  className="inputbox"
                  native="true"
                  value={form.purpose}
                  onChange={handleChange('purpose')}
                >
                  <option key="0" name="Choose Purpose" value="0">
                    Choose Purpose
                  </option>
                  {purpose.map(each => (
                    <option key={each._id} name={each.tite} value={each._id}>
                      {each.description}
                    </option>
                  ))}
                </select>
              </div>
              <div id="component-error-text">
                {errors.purpose && errors.purpose}
              </div>
            </div>

            <div className="mt-0">
              <label className="text-sm" htmlFor="message">
                Up to Price
              </label>
              <input
                className="inputbox"
                id="grid-price"
                type="text"
                value={form.price}
                onChange={handleChange('price')}
              />

              <div id="component-error-text">
                {errors.price && errors.price}
              </div>
            </div>
            <div className="mt-0">
              <label className="text-sm" htmlFor="priceLabel">
                Price Label
              </label>
              <div className="relative">
                <select
                  className="inputbox"
                  native="true"
                  value={form.price_label}
                  onChange={handleChange('price_label')}
                >
                  <option key="0" name="Choose price_label" value="0">
                    Choose Price Label
                  </option>
                  {priceLabel.map(each => (
                    <option key={each._id} name={each.tite} value={each._id}>
                      {each.title}
                    </option>
                  ))}
                </select>
              </div>
              <div id="component-error-text">
                {errors.price_label && errors.price_label}
              </div>
            </div>

            <div className="mt-0">
              <label className="text-sm">State</label>
              <select
                className="inputbox"
                native="true"
                value={address.state_id}
                onChange={handleAddressChange('state_id')}
                // inputprops={{ value: one.country || '', name: 'country' }}
              >
                <option key="0" name="Choose State" value="0">
                  Choose State
                </option>
                {state &&
                  state.map(each => (
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

            <div className="mt-0">
              <label className="text-sm" htmlFor="municipality">
                District
              </label>
              <select
                className="inputbox"
                native="true"
                value={address.district_id}
                onChange={handleAddressChange('district_id')}
                // inputprops={{ value: one.country || '', name: 'country' }}
              >
                <option key="0" name="Choose District" value="0">
                  {address.state_id ? 'Choose District' : 'Select State first'}
                </option>
                {district &&
                  district.map(each =>
                    address.state_id && address.state_id === each.state_id ? (
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

            <div className="mt-0">
              <label className="text-sm" htmlFor="city">
                City
              </label>
              <select
                className="inputbox w-full"
                native="true"
                value={address.city_id}
                onChange={handleAddressChange('city_id')}
                // inputprops={{ value: one.country || '', name: 'country' }}
              >
                <option key="0" name="Choose City" value="0">
                  {address.district_id
                    ? 'Choose City'
                    : 'Select District first'}
                </option>
                {city &&
                  city.map(each =>
                    address.district_id &&
                    address.district_id === each.district_id ? (
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

            <div className="mt-0">
              <label className="text-sm" htmlFor="area">
                Area
              </label>
              <select
                className="inputbox w-full"
                native="true"
                value={address.area_id}
                onChange={handleAddressChange('area_id')}
                // inputprops={{ value: one.country || '', name: 'country' }}
              >
                <option key="0" name="Choose Area" value="0">
                  {address.city_id ? 'Choose Area' : 'Select city first'}
                </option>
                {area &&
                  area.map(each =>
                    address.city_id &&
                    address.city_id === each.vdcmunicipality_id ? (
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

            <div className="mt-0">
              <label className="text-sm" htmlFor="streetaddress">
                Street Address <span className="opacity-50">(optional)</span>
              </label>
              <input
                className="inputbox w-full"
                native="true"
                value={address.street_address}
                onChange={handleAddressChange('street_address')}
              />

              <div id="component-error-text">
                {errors.address ? errors.address.street_address : ''}
              </div>
            </div>

            <div className="mt-0">
              <label className="text-sm" htmlFor="message">
                Message
              </label>
              <textarea
                className="inputbox"
                cols="45"
                rows="5"
                value={form.message}
                maxLength="200"
                onChange={handleChange('message')}
              />
              <div>{form.message.length} / 200</div>
              <div id="component-error-text">
                {errors.message && errors.message}
              </div>
            </div>

            <button
              type="button"
              className="py-2 px-6 block rounded mt-2 text-sm text-white bg-secondary uppercase text-white font-bold"
              onClick={handleMakeRequest}
            >
              {form_loading ? '...' : 'Request Now'}
            </button>
          </div>
        </DialogTitle>
      </Dialog>
    </>
  );
};

WantedProperty.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  purpose: makeSelectPurpose(),
  openForm: makeSelectOpenForm(),
  form_loading: makeSelectFormLoading(),
  form: makeSelectForm(),
  errors: makeSelectErrors(),
  token: makeSelectToken(),
  category: makeSelectCategory(),
  priceLabel: makeSelectPriceLabel(),
  locations: makeSelectLocations(),
  address: makeSelectAddress(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
)(WantedProperty);
