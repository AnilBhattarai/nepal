import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IconButton, Tabs, Tab, Paper } from '@material-ui/core';

import * as mapDispatchToProps from '../actions';
import {
  makeSelectLocation,
  makeSelectEnum,
  makeSelectErrors,
  makeSelectLocationProperty,
  makeSelectIsLand,
} from '../selectors';

import Maps from './maps';

const Location = props => {
  const {
    location_property,
    errors,
    setOneValue,
    enums,
    location,
    is_land,
  } = props;

  const handleLocationPropertyChange = name => event => {
    event.persist();
    const { value } = event.target;
    setOneValue({
      key: 'location_property',
      value: { ...location_property, [name]: value },
    });
  };

  const handleLocationChange = name => event => {
    event.persist();
    const { value } = event.target;
    setOneValue({
      key: 'location',
      value: { ...location, [name]: value },
    });
  };
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    event.persist();
    setValue(newValue);
  };
  return Object.keys(enums).length > 0 ? (
    <>
      <div className="w-full">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 pb-4">
            <label className="block font-bold text-black text-sm mb-2">
              Total Area
            </label>
            <div className="flex justify-between px-2 ">
              <input
                className="inputbox -ml-2"
                id="grid-value"
                type="text"
                value={location_property.total_area}
                onChange={handleLocationPropertyChange('total_area')}
                style={{ width: '50%' }}
              />
              <div id="component-error-text">
                {errors.location_property
                  ? errors.location_property.total_area
                  : ''}
              </div>
              <div className="w-1/2 -mr-2">
                <select
                  className="inputbox"
                  native="true"
                  name="total_area_unit"
                  value={location_property.total_area_unit}
                  onChange={handleLocationPropertyChange('total_area_unit')}
                >
                  <option key="0" name="choose" value="area-unit" disabled>
                    Choose area unit
                  </option>
                  {enums.area_unit &&
                    enums.area_unit.length > 0 &&
                    enums.area_unit.map(each => (
                      <option key={each._id} name={each.title} value={each._id}>
                        {each.title}
                      </option>
                    ))}
                </select>
              </div>
              <div id="component-error-text">{errors.value}</div>
            </div>
          </div>
          {!is_land && (
            <>
              <div className="w-full md:w-1/3 px-2 pb-4">
                <label
                  className="block font-bold text-black text-sm mb-2"
                  htmlFor="Built area"
                >
                  Built Up Area
                </label>
                <div className="flex justify-between px-2">
                  <input
                    className="inputbox -ml-2"
                    id="grid-value"
                    type="text"
                    value={location_property.built_area}
                    onChange={handleLocationPropertyChange('built_area')}
                    style={{ width: '50%' }}
                  />

                  {errors.location_property ? (
                    <div id="component-error-text">
                      {errors.location_property.built_area}
                    </div>
                  ) : (
                      ''
                    )}
                  <div className="w-1/2 -mr-2">
                    <select
                      className="inputbox"
                      native="true"
                      name="built_area_unit"
                      value={location_property.built_area_unit}
                      onChange={handleLocationPropertyChange('built_area_unit')}
                    >
                      <option key="0" name="choose" value="area-unit" disabled>
                        Choose area unit
                      </option>
                      {enums.area_unit.map(each => (
                        <option
                          key={each._id}
                          name={each.title}
                          value={each._id}
                        >
                          {each.title}
                        </option>
                      ))}
                    </select>

                    {errors.location_property ? (
                      <div id="component-error-text">
                        {errors.location_property.built_area_unit}
                      </div>
                    ) : (
                        ''
                      )}
                  </div>
                  {errors.value ? <div id="component-error-text" /> : null}
                </div>
              </div>
            </>
          )}
          <div className="w-full md:w-1/3 px-2 pb-4">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="Road access"
            >
              Road Access (Face-width)
            </label>
            <div className="flex justify-between px-2">
              <input
                className="inputbox -ml-2"
                id="grid-value"
                type="text"
                value={location_property.road_access_value}
                onChange={handleLocationPropertyChange('road_access_value')}
                style={{ width: '50%' }}
              />

              {errors.location_property ? (
                <div id="component-error-text">
                  {errors.location_property.road_access_value}
                </div>
              ) : (
                  ''
                )}

              <div className="w-1/2 -mr-2">
                <select
                  className="inputbox"
                  native="true"
                  value={location_property.road_access_length_unit}
                  onChange={handleLocationPropertyChange(
                    'road_access_length_unit',
                  )}
                >
                  <option key="0" name="choose" value="length-unit" disabled>
                    Choose length unit
                  </option>
                  {enums.length_unit.map(each => (
                    <option key={each._id} name={each.title} value={each._id}>
                      {each.title}
                    </option>
                  ))}
                </select>

                {errors.location_property ? (
                  <div id="component-error-text">
                    {errors.location_property.road_access_length_unit}
                  </div>
                ) : (
                    ''
                  )}
              </div>
              <div id="component-error-text">{errors.value}</div>
            </div>
          </div>

          <div className="w-full md:w-1/3 px-2 pb-4">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="Propery facing"
            >
              Property Facing
            </label>
            <select
              className="m-auto inputbox"
              native="true"
              name="property_face"
              value={location_property.property_face}
              onChange={handleLocationPropertyChange('property_face')}
            >
              <option key="0" name="choose" value="">
                Choose facing
              </option>
              {enums.property_face.map(each => (
                <option key={each._id} name={each.title} value={each._id}>
                  {each.title}
                </option>
              ))}
            </select>
            <div id="component-error-text">
              {errors.location_property
                ? errors.location_property.property_face
                : ''}
            </div>
          </div>

          <div className="w-full md:w-1/3 px-2 pb-4">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="Road Type"
            >
              Road Type
            </label>
            <select
              className="m-auto inputbox"
              native="true"
              value={location_property.road_access_road_type}
              onChange={handleLocationPropertyChange('road_access_road_type')}
            // inputprops={{ value: country || '', name: 'country' }}
            >
              <option key="0" name="choose" value="">
                Choose road type
              </option>
              {enums.road_type.map(each => (
                <option key={each._id} name={each.title} value={each._id}>
                  {each.title}
                </option>
              ))}
            </select>
            <div id="component-error-text">
              {errors.location_property
                ? errors.location_property.road_access_road_type
                : ''}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
      <> Loading </>
    );
};

const mapStateToProps = createStructuredSelector({
  location_property: makeSelectLocationProperty(),
  location: makeSelectLocation(),
  enums: makeSelectEnum(),
  errors: makeSelectErrors(),
  is_land: makeSelectIsLand(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Location);
