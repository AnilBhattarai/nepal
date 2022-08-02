import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {
  makeSelectBuilding,
  makeSelectNoOf,
  makeSelectEnum,
  makeSelectErrors,
  makeSelectAmenities,
  makeSelectIsLand,
  makeSelectOne,
  makeSelectBasic,
  makeSelectTempTag,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import Loader from '../../../../assets/img/loader.svg';
import { Paper, Chip } from '@material-ui/core';

import { IMAGE_BASE } from '../../../App/constants';

const BuildingInfo = props => {
  const {
    building,
    no_of,
    errors,
    setOneValue,
    enums,
    setBuildingValue,
    amenities,
    classes,
    is_land,
    one,
    basic,
    setTagValue,
    tempTag,
  } = props;

  const [calendarBS, setCalendarBS] = useState(false);

  const handleBuildingChange = name => event => {
    const { value } = event.target;

    if (name === 'total_floor' && value < 0) {
      setOneValue({ key: 'building', value: { ...building, [name]: 0 } });
    } else {
      setOneValue({ key: 'building', value: { ...building, [name]: value } });
    }

    if (name === 'calender_type') {
      setCalendarBS(!calendarBS);
    }
  };

  const handleChange = name => event => {
    setOneValue({ key: name, value: event.target.value });
  };

  const handleNoOfChange = name => event => {
    const { value } = event.target;
    // console.log('no of', value);
    if (value < 0) {
      setBuildingValue({
        key: 'no_of',
        value: { ...no_of, [name]: 0 },
      });
    } else {
      setBuildingValue({
        key: 'no_of',
        value: { ...no_of, [name]: value },
      });
    }
  };

  const handleBasicChange = name => event => {
    const { value } = event.target;
    if (!(value === '') && !value) return;
    setOneValue({ key: 'basic', value: { ...basic, [name]: value } });
  };

  const handleDelete = index => () => {
    const chipData = [...amenities];

    chipData.splice(index, 1);
    props.setBuildingValue({ key: 'amenities', value: chipData });
  };
  const [color, setColor] = useState('primary');
  const handleAmenities = name => event => {
    const { value } = event.target;
    const index = amenities.indexOf(value);
    if (index >= 0) {
      const chipData = [...amenities];
      chipData.splice(index, 1);
      setBuildingValue({
        key: 'amenities',
        value: chipData,
      });
    } else {
      setBuildingValue({
        key: 'amenities',
        value: [...amenities, value],
      });
    }
  };

  const handleDeleteTag = index => () => {
    const chipData = [...one.tags];

    chipData.splice(index, 1);
    props.setOneValue({ key: 'tags', value: chipData });
  };
  const handleTempTag = e => {
    e.persist();
    setTagValue(e.target.value);
  };

  const insertTags = event => {
    event.preventDefault();

    if (tempTag.trim() !== '') {
      if (one.tags.indexOf(tempTag.trim()) === -1) {
        setOneValue({
          key: 'tags',
          value: [...one.tags, tempTag],
        });
        setTagValue('');
      }
    }
    return { tempTag: setTagValue('') };
  };

  return Object.keys(enums).length > 0 ? (
    <div>
      {!is_land && (
        <>
          <div className="flex items-center px-4">
            {window.location.pathname.includes('project') ? (
              <div className="w-full md:w-1/3 pb-4 -ml-4">
                <label
                  className="block font-bold text-black text-sm mb-2"
                  htmlFor="grid-kitchen"
                >
                  Project Status
                </label>
                <select
                  className="inputbox"
                  native="true"
                  value={one.project_status || ''}
                  onChange={handleChange('project_status')}
                  // inputprops={{ value: country || '', name: 'country' }}
                >
                  <option key="0" name="choose" value="" disabled>
                    Project Status
                  </option>
                  {enums.project_status.map(each => (
                    <option key={each._id} name={each.title} value={each._id}>
                      {each.title}
                    </option>
                  ))}
                </select>

                {errors.project_status ? (
                  <div id="component-error-text">{errors.project_status}</div>
                ) : (
                  ''
                )}
              </div>
            ):(
              <div className="w-full md:w-1/3 pb-4 -ml-4 hidden">
                <label
                  className="block font-bold text-black text-sm mb-2"
                  htmlFor="grid-kitchen"
                >
                  Project Status
                </label>
                <select
                  className="inputbox"
                  native="true"
                  value={one.project_status || '5e8afe4058e32727fa9ce855'}
                  onChange={handleChange('project_status')}
                  // inputprops={{ value: country || '', name: 'country' }}
                >
                  <option key="0" name="choose" value="" disabled>
                    Project Status
                  </option>
                  {enums.project_status.map(each => (
                    <option key={each._id} name={each.title} value={each._id}>
                      {each.title}
                    </option>
                  ))}
                </select>

                {errors.project_status ? (
                  <div id="component-error-text">{errors.project_status}</div>
                ) : (
                  ''
                )}
              </div>
            )}
            {one.project_status === '5e8afe4058e32727fa9ce855' && (
              <>
                <div className="w-full md:w-1/3 pb-4 -ml-4">
                  <label
                    className="block font-bold text-black text-sm mb-2"
                    htmlFor="Built year"
                  >
                    Built Year
                  </label>
                  <div className="flex px-2">
                    <input
                      className="inputbox -ml-2"
                      id="grid-value"
                      type="text"
                      value={building.built_year}
                      onChange={handleBuildingChange('built_year')}
                      style={{ width: '50%' }}
                    />

                    {errors.building ? (
                      <div id="component-error-text">
                        {errors.building.built_year}
                      </div>
                    ) : (
                      ''
                    )}

                    <div className="w-1/2 ml-2">
                      <select
                        className="inputbox"
                        native="true"
                        value={building.calender_type || ''}
                        onChange={handleBuildingChange('calender_type')}
                        // inputprops={{ value: country || '', name: 'country' }}
                      >
                        <option
                          key="0"
                          name="choose"
                          value="calendar_type"
                          disabled
                        >
                          calender type
                        </option>
                        {enums.calender_type.map(each => (
                          <option
                            key={each._id}
                            name={each.title}
                            value={each._id}
                          >
                            {each.title}
                          </option>
                        ))}
                      </select>

                      {errors.building ? (
                        <div id="component-error-text">
                          {errors.building.calender_type}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                </div>
                  </div>
                  <div className="w-full md:w-1/3">
                  <label
                    className="block font-bold text-black text-sm mb-2"
                    htmlFor="grid-vlaue"
                  >
                    Month
                  </label>
                  <select
                    className="inputbox"
                    native="true"
                    value={building.built_month}
                    onChange={handleBuildingChange('built_month')}
                    // inputprops={{ value: country || '', name: 'country' }}
                  >
                    <option
                      key="0"
                      name="choose"
                      value="calendar_type"
                      disabled
                    >
                      Choose Month
                    </option>
                    {calendarBS ? (
                      <>
                        <option key="1" name="Jan" value="1">
                          January
                        </option>
                        <option key="2" name="Feb" value="2">
                          February
                        </option>
                        <option key="3" name="Mar" value="3">
                          March
                        </option>
                        <option key="4" name="Apr" value="4">
                          April
                        </option>
                        <option key="5" name="May" value="5">
                          May
                        </option>
                        <option key="6" name="Jun" value="6">
                          June
                        </option>
                        <option key="7" name="Jul" value="7">
                          July
                        </option>
                        <option key="8" name="Aug" value="8">
                          August
                        </option>
                        <option key="9" name="Sep" value="9">
                          September
                        </option>
                        <option key="10" name="Oct" value="10">
                          October
                        </option>
                        <option key="11" name="Feb" value="11">
                          November
                        </option>
                        <option key="12" name="Feb" value="12">
                          December
                        </option>
                      </>
                    ) : (
                      <>
                        <option key="1" name="Jan" value="13">
                          Baisakh
                        </option>
                        <option key="2" name="Feb" value="14">
                          Jestha
                        </option>
                        <option key="3" name="Mar" value="15">
                          Asar
                        </option>
                        <option key="4" name="Apr" value="16">
                          Shrawan
                        </option>
                        <option key="5" name="May" value="17">
                          Bhadau
                        </option>
                        <option key="6" name="Jun" value="18">
                          Asoj
                        </option>
                        <option key="7" name="Jul" value="19">
                          Kartik
                        </option>
                        <option key="8" name="Aug" value="20">
                          Mangsir
                        </option>
                        <option key="9" name="Sep" value="21">
                          Poush
                        </option>
                        <option key="10" name="Oct" value="22">
                          Magh
                        </option>
                        <option key="11" name="Feb" value="23">
                          Falgun
                        </option>
                        <option key="12" name="Feb" value="24">
                          Chaitra
                        </option>
                      </>
                    )}
                  </select>
                  <div id="component-error-text">
                    {errors.building ? errors.building.built_month : ''}
                  </div>
                </div>
              </>
            )}

            {/* <div className="w-full md:w-1/3 pb-4 -mr-4">
              <label
                className="block font-bold text-black text-sm mb-2"
                htmlFor="Furnishing"
              >
                Furnishing
              </label>
              <select
                className="inputbox"
                native="true"
                value={building.furnishing}
                onChange={handleBuildingChange('furnishing')}
                // inputprops={{ value: country || '', name: 'country' }}
              >
                <option key="0" name="choose" value="">
                  Choose furnishing
                </option>
                {enums.furnishing &&
                  enums.furnishing.map(each => (
                    <option key={each._id} name={each.title} value={each._id}>
                      {each.title}
                    </option>
                  ))}
              </select>
              <div id="component-error-text">
                {errors.building ? errors.building.furnishing : ''}
              </div>
            </div> */}
          </div>

          {window.location.pathname.includes('property') && (
            <div className="flex justify-between px-4">
              <div className="flex justify-between w-full md:w-2/3 -ml-4 px-4">
                <div className="w-1/5 -ml-4">
                  <label
                    className="block font-bold text-black text-sm mb-2"
                    htmlFor="grid-kitchen"
                  >
                    Kitchen
                  </label>
                  <input
                    className="inputbox"
                    id="grid-kitchen"
                    type="number"
                    value={no_of.kitchen}
                    onChange={handleNoOfChange('kitchen')}
                  />
                  <div id="component-error-text">
                    {errors.building && errors.building.no_of
                      ? errors.building.no_of.kitchen
                      : ''}
                  </div>
                </div>
                <div className="w-1/5">
                  <label
                    className="block font-bold text-black text-sm mb-2"
                    htmlFor="grid-dinningroom"
                  >
                    Dining Room
                  </label>
                  <input
                    className="inputbox"
                    id="grid-dinningroom"
                    type="number"
                    value={no_of.dinningroom}
                    onChange={handleNoOfChange('dinningroom')}
                  />
                  <div id="component-error-text">
                    {errors.building && errors.building.no_of
                      ? errors.building.no_of.dinningroom
                      : ''}
                  </div>
                  <div id="component-error-text">{errors.value}</div>
                </div>
                <div className="w-1/5">
                  <label
                    className="block font-bold text-black text-sm mb-2"
                    htmlFor="grid-bedroom"
                  >
                    Bed Room
                  </label>
                  <input
                    className="inputbox"
                    id="grid-bedroom"
                    type="number"
                    value={no_of.bedroom}
                    onChange={handleNoOfChange('bedroom')}
                  />
                  <div id="component-error-text">
                    {errors.building && errors.building.no_of
                      ? errors.building.no_of.bedroom
                      : ''}
                  </div>
                </div>

                <div className="w-1/5">
                  <label
                    className="block font-bold text-black text-sm mb-2"
                    htmlFor="grid-bathroom"
                  >
                    Bath Room
                  </label>
                  <input
                    className="inputbox"
                    id="grid-bathroom"
                    type="number"
                    value={no_of.bathroom}
                    onChange={handleNoOfChange('bathroom')}
                  />
                  <div id="component-error-text">
                    {errors.building && errors.building.no_of
                      ? errors.building.no_of.bathroom
                      : ''}
                  </div>
                </div>
                <div className="w-1/5 -mr-4">
                  <label
                    className="block font-bold text-black text-sm mb-2"
                    htmlFor="grid-hall"
                  >
                    Hall
                  </label>
                  <input
                    className="inputbox"
                    id="grid-hall"
                    type="number"
                    value={no_of.hall}
                    onChange={handleNoOfChange('hall')}
                  />
                  <div id="component-error-text">
                    {errors.building && errors.building.no_of
                      ? errors.building.no_of.hall
                      : ''}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 flex justify-between -mr-4 px-2">
                <div className="w-1/3 -ml-2">
                  <label
                    className="block font-bold text-black text-sm mb-2"
                    htmlFor="grid-vlaue"
                  >
                    Total Floors
                  </label>
                  <input
                    className="m-auto inputbox"
                    id="grid-value"
                    type="number"
                    value={building.total_floor}
                    onChange={handleBuildingChange('total_floor')}
                  />
                  <div id="component-error-text">
                    {errors.building ? errors.building.total_floor : ''}
                  </div>
                </div>

                <div className="w-2/3 -mr-2">
                  <label
                    className="block font-bold text-black text-sm mb-2"
                    htmlFor="grid-vlaue"
                  >
                    Parking
                  </label>
                  <input
                    className="inputbox"
                    placeholder="e.g. 2 Cars &amp; 2 Bikes"
                    id="grid-value"
                    type="text"
                    value={building.parking}
                    onChange={handleBuildingChange('parking')}
                  />
                  <div id="component-error-text">
                    {errors.building ? errors.building.parking : ''}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {is_land && (
        <div className="w-full pb-4">
          <div className="w-1/2 -mr-2">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="grid-vlaue"
            >
              Parking
            </label>
            <textarea
              className="inputbox h-8"
              id="grid-value"
              type="text"
              value={building.parking}
              onChange={handleBuildingChange('parking')}
            />
            <div id="component-error-text">
              {errors.building ? errors.building.parking : ''}
            </div>
          </div>
        </div>
      )}

      <div className="w-full pb-4">
        <label
          className="block font-bold text-black text-sm mb-2"
          htmlFor="grid-Tags"
        >
          Amenities
        </label>

        <ToggleButtonGroup
          size="large"
          className={classes.accesslist}
          name="amenities"
          value={building.amenities || ''}
          onChange={() => null}
          style={{ boxShadow: 'none' }}
        >
          {enums.amenities &&
            enums.amenities.map(each => (
              <ToggleButton
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginRight: '5px',
                  marginBottom: '5px',
                  color: '#999',
                  textAlign: 'center',
                }}
                key={each._id}
                name={each.title}
                value={each._id}
                onClick={() =>
                  handleAmenities('amenities')({
                    target: { value: each._id },
                  })
                }
              >
                <img
                  src={each.media ? `${IMAGE_BASE}${each.media.path}` : ''}
                  alt="o"
                  style={{ height: 18, marginRight: 8 }}
                />{' '}
                <p>{each.title}</p>
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
        <div id="component-error-text">
          {errors.building ? errors.building.amenities : ''}
        </div>
      </div>

      <div className="flex -mx-2">
        <div className="w-full md:w-1/3 pb-4 -mr-4">
          <label
            className="block font-bold text-black text-sm mb-2"
            htmlFor="Furnishing"
          >
            Ownership Type
          </label>
          <select
            className="inputbox"
            native="true"
            value={basic.property_ownership}
            onChange={handleBasicChange('property_ownership')}
            // inputprops={{ value: country || '', name: 'country' }}
          >
            <option key="0" name="choose" value="">
              Choose OwnerShip
            </option>
            {enums.ownership_type &&
              enums.ownership_type.map(each => (
                <option key={each._id} name={each.title} value={each._id}>
                  {each.title}
                </option>
              ))}
          </select>
          <div id="component-error-text">
            {errors.basic ? errors.basic.property_ownership : ''}
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2 ml-4">
          <div className="w-full ">
            <label
              className="block font-bold text-black text-sm mb-2"
              htmlFor="grid-Tags"
            >
              Tags
              {/* <span className="text-xs italic lowercase">
              </span> */}
            </label>
            <form onSubmit={insertTags}>
              <input
                className="inputbox"
                placeholder="Press enter after each tag"
                id="blog-tags"
                type="text"
                value={tempTag || ''}
                name="Tags"
                onChange={handleTempTag}
              />
            </form>
            <div className="mt-2">
              {one.tags.map((tag, index) => {
                const icon = null;
                return (
                  <Chip
                    key={`${tag}-${index}`}
                    icon={icon}
                    label={tag}
                    onDelete={handleDeleteTag(index)}
                    className="mb-2 mr-2"
                  />
                );
              })}
            </div>
            <div id="component-error-text">{errors.tags}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <img src={Loader} />
  );
};

const mapStateToProps = createStructuredSelector({
  building: makeSelectBuilding(),
  no_of: makeSelectNoOf(),
  enums: makeSelectEnum(),
  errors: makeSelectErrors(),
  amenities: makeSelectAmenities(),
  is_land: makeSelectIsLand(),
  one: makeSelectOne(),
  basic: makeSelectBasic(),
  tempTag: makeSelectTempTag(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuildingInfo);
