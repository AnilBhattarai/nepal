import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
// import { GoogleMap, Marker } from 'react-google-maps';
import Maps from './maps';

import {
  makeSelectAddress,
  makeSelectEnum,
  makeSelectErrors,
  makeSelectQuery,
  makeSelectDistrict,
  makeSelectMunicipality,
  makeSelectArea,
  makeSelectAddressLoading,
  makeSelectTempAddress,
  makeSelectLocations,
  makeSelectBasic,
  makeSelectIsLand,
  makeSelectOne,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import Loading from '../../../../components/Loading';

const Address = props => {
  const {
    address,
    errors,
    setOneValue,
    query,
    setQueryValue,
    setTempAddress,
    classes,
    state,
    loadDistrictRequest,
    district,
    loadMunicipalityRequest,
    municipality,
    loadAreaRequest,
    area,
    address_loading,
    temp_address,
    match,
    locations,
    is_land,
    one,
  } = props;

  const [map, setMap] = useState('');

  const handleAddressChange = name => event => {
    event.persist();
    const { value } = event.target;
    setOneValue({ key: 'address', value: { ...address, [name]: value } });
    // if (name === 'state_id') {
    //   loadDistrictRequest(value);
    // }
    // if (name === 'district_id') {
    //   loadMunicipalityRequest(value);
    // }
    // if (name === 'city_id') {
    //   loadAreaRequest(value);
    // }
  };

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };
  const handleMapChange = event => {
    event.persist();
    setMap(event.target.value);

    const test = event.target.value;
    const src = test.split('src="')[1].split(/[ "']/)[0];

    setOneValue({ key: 'map_src', value: src });
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    loadAllRequest(address);
  };

  const StateSearch = name => event => {
    // const { value } = event.target;
    setTempAddress({
      key: name,
      value: event.target.value,
    });
    // setTempAddress({ key: name, value: event.target.value });
    loadDistrictRequest();
  };

  // const handleStateSearch = () => {
  //   loadDistrictRequest(address);
  // };

  const handleDistrictSearch = name => event => {
    setTempAddress({
      key: name,
      value: event.target.value,
    });
    loadMunicipalityRequest();
  };

  const handleCitySearch = name => event => {
    setTempAddress({
      key: name,
      value: event.target.value,
    });
    loadAreaRequest();
  };

  // if (loading) {
  //   <Loading />;
  // }

  return (
    <div className="w-full">
      {address_loading ? <Loading /> : ''}
      <div className="w-full flex justify-between">
        <div className="w-full md:w-1/3">
          <label className="block font-bold text-black text-sm mb-2">
            State
          </label>
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
            className="block font-bold text-black text-sm mb-2"
            htmlFor="municipality"
          >
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
            {locations.allDistrict &&
              locations.allDistrict.map(each =>
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

        <div className="w-full md:w-1/3 pb-4 -mr-4">
          <label
            className="block font-bold text-black text-sm mb-2"
            htmlFor="city"
          >
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
              {address.district_id ? 'Choose City' : 'Select District first'}
            </option>
            {locations.allVdc &&
              locations.allVdc.map(each =>
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
      </div>

      <div className="w-full flex justify-between">
        <div className="w-full md:w-1/3 pb-4">
          <label
            className="block font-bold text-black text-sm mb-2"
            htmlFor="area"
          >
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
            {locations.allArea &&
              locations.allArea.map(each =>
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

        <div className="w-full md:w-1/3 pb-4">
          {!is_land && (
            <>
              <label
                className="block font-bold text-black text-sm mb-2"
                htmlFor="landmark"
              >
                House No./Landmark
              </label>
              <input
                className="inputbox w-full"
                id="landmark"
                type="text"
                value={address.house_no}
                onChange={handleAddressChange('house_no')}
              />
              <div id="component-error-text">
                {errors.address ? errors.address.house_no : ''}
              </div>
            </>
          )}
        </div>
        <div className="w-full md:w-1/3 -mr-4">
          {/* <div className="relative mb-2">
            <label className="block font-bold text-black text-sm mb-2">
              Exact Location{' '}
            </label>
          </div>
          <Maps />
          <span className="text-primary text-xs lowercase">
            (location will not be visible to others)
          </span> */}
        </div>
      </div>

      <>
        <label
          className="block font-bold text-black text-sm mb-2"
          htmlFor="Road Type"
        >
          Google Map Iframe
        </label>
        <input
          className="inputbox"
          id="grid-value"
          placeholder="<iframe "
          type="text"
          value={map}
          onChange={handleMapChange}
          style={{ width: '50%' }}
        />
        <div id="component-error-text">
          {errors.map_src ? errors.map_src : ''}
        </div>
        {one.map_src ?
          <div className="relative overflow-hidden" style={{ paddingTop: '56%' }}>
            <iframe
              title="map"
              src={one.map_src ? one.map_src : ''}
              frameBorder="0"
              className="absolute left-0 top-0 border-0 w-full h-full"
              allowFullScreen
            />
          </div> : null
        }
      </>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  address: makeSelectAddress(),
  enums: makeSelectEnum(),
  errors: makeSelectErrors(),
  query: makeSelectQuery(),
  district: makeSelectDistrict(),
  municipality: makeSelectMunicipality(),
  area: makeSelectArea(),
  address_loading: makeSelectAddressLoading(),
  temp_address: makeSelectTempAddress(),
  locations: makeSelectLocations(),
  is_land: makeSelectIsLand(),
  one: makeSelectOne(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Address);
