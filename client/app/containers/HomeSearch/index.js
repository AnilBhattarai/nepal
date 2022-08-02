/* eslint-disable indent */
/**
 *
 * HomeSearch
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import Highlighter from 'react-highlight-words';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import SlickSlider from '../../components/SlickSlider';
import Skeleton from 'react-loading-skeleton';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { clearDevAndAgent } from '../ListView/actions';
import {
  makeSelectEnum,
  makeSelectFilter,
  makeSelectQuery,
  makeSelectLocation,
  makeSelectLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import searchIcon from '../../assets/img/search.svg';
import StaticContentDiv from '../../components/StaticContentDiv';

const key = 'homeSearch';

export const HomeSearch = props => {
  const {
    enums,
    filter,
    loadEnumRequest,
    setFilterValue,
    setQueryValue,
    query,
    push,
    loadLocationRequest,
    locations,
    loading,
    clearFilterValues,
    clearDevAndAgent,
    clearQuery,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadEnumRequest();
    loadLocationRequest();
    clearFilterValues();
    clearDevAndAgent();
    clearQuery();
  }, []);

  const [expanded, setExpanded] = useState(false);

  const toggleForm = () => {
    setExpanded(!expanded);
  };

  const handleChange = name => event => {
    // event.persist();

    setFilterValue({ key: `find_${name}`, value: event });
    setQueryValue({ key: `find_${name}`, value: event.value });
  };

  const handleLocationChange = name => event => {
    setFilterValue({ key: `find_${name}`, value: event });
    if (query.find_state_id) {
      setQueryValue({ key: `find_state_id`, value: '' });
    }
    if (query.find_district_id) {
      setQueryValue({ key: `find_district_id`, value: '' });
    }
    if (query.find_vdc_id) {
      setQueryValue({ key: `find_vdc_id`, value: '' });
    }
    if (query.find_area_id) {
      setQueryValue({ key: `find_area_id`, value: '' });
    }
    if (event.custom === 'State') {
      setQueryValue({ key: `find_state_id`, value: event.value });
    }
    if (event.custom === 'District') {
      setQueryValue({ key: `find_district_id`, value: event.value });
    }
    if (event.custom === 'Vdc') {
      setQueryValue({ key: `find_vdc_id`, value: event.value });
    }
    if (event.custom === 'Area') {
      setQueryValue({ key: `find_area_id`, value: event.value });
    }
  };

  const handleButtonChange = name => event => {
    // event.persist();
    if (query.find_property_purpose === event.target.value) {
      setFilterValue({ key: `find_${name}`, value: '' });
      setQueryValue({ key: `find_${name}`, value: '' });
    } else {
      setFilterValue({ key: `find_${name}`, value: event.target.value });
      setQueryValue({ key: `find_${name}`, value: event.target.value });
    }
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setFilterValue({ key: `find_${name}`, value: event.target.checked });
    setQueryValue({
      key: `find_${name}`,
      value: event.target.checked ? true : '',
    });
  };

  const handleSearch = () => {
    // clearDevAndAgent();
    let querystring = '';
    Object.keys(query).map(each => {
      if (each === 'agency_id' || each === 'developer_id') {
        querystring = `${querystring}&${each}=${''}`;
      } else {
        querystring = `${querystring}&${each}=${query[each]}`;
      }
      return null;
    });

    push(`/list/${querystring}`);
  };

  const formatOptionLabel = ({ label }, { inputValue }) => {
    return (
      <Highlighter
        searchWords={[inputValue]}
        textToHighlight={label}
        highlightTag={Highlight}
      />
    );
  };

  const Highlight = ({ children, highlightIndex }) => (
    <strong className="highlighted-text">{children}</strong>
  );

  // const handleQueryChange = e => {
  //   e.persist();
  //   setQueryValue({ key: e.target.name, value: e.target.value });
  // };

  const optionCat = enums.property_category
    ? enums.property_category.map(function category(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];

  optionCat.unshift({ value: '', label: 'All Categories' });

  const optionStates = locations.allState
    ? locations.allState.map(function state(each) {
        let displayName = '';
        displayName = each.name.replace(/-/g, ', ');
        return {
          value: each._id,
          label: each.name,
          custom: 'State',
        };
      })
    : [];

  const optionDistricts = locations.allDistrict
    ? locations.allDistrict.map(function district(each) {
        // const displayName1 = each.slug.replace('-', ' ');
        // const displayName2 = displayName1.replace(/-/g, ', ');
        return {
          value: each._id,
          label: each.name,
          custom: 'District',
        };
      })
    : [];

  const optionVdc = locations.allVdc
    ? locations.allVdc.map(function vdc(each) {
        // const displayName1 = each.slug.replace('-', ' ');
        // const displayName2 = displayName1.replace(/-/g, ', ');
        return {
          value: each._id,
          label: each.name,
          custom: 'Vdc',
        };
      })
    : [];

  const optionArea = locations.allArea
    ? locations.allArea.map(function state(each) {
        // const displayName1 = each.slug.replace('-', ' ');
        // const displayName2 = displayName1
        //   .split('-')
        //   .reverse()
        //   .join(', ');
        // const displayName2 = displayName1.replace(/-/g, ', ');
        return {
          value: each._id,
          label: each.name,
          custom: 'Area',
        };
      })
    : [];

  const optionLocations = optionStates.concat(
    optionDistricts,
    optionArea,
    optionVdc,
  );
  optionLocations.unshift({ value: '', label: 'Any Locations' });

  const optionType = enums.property_type
    ? enums.property_type.map(function type(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];

  optionType.unshift({ value: '', label: 'Types' });

  const optionMaxPrice = [
    { value: '1', label: 'Up To 50 K' },
    { value: '2', label: '50 K to 5 Lakh' },
    { value: '3', label: '5 Lakh to 50 Lakh' },
    { value: '4', label: '50 Lakh to 3 Cr.' },
    { value: '5', label: '3 Cr. to max' },
  ];
  optionMaxPrice.unshift({ value: '', label: 'Max Price' });

  const optionFace = enums.property_face
    ? enums.property_face.map(function type(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];

  optionFace.unshift({ value: '', label: 'Property Face' });

  const optionRoad = enums.road_type
    ? enums.road_type.map(function type(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];

  optionRoad.unshift({ value: '', label: 'Road Type' });

  const inputStyles = {
    control: (base, state) => ({
      ...base,
      background: '#fff',
      color: '#2c357d',
      border: 'none',
      position: 'relative',
      height: '100%',
      width: '100%',
      border: 'none',
      minHeight: '48px',
      // match with the menu
      // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      // borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        cursor: 'pointer',
        // Overwrittes the different states of border
        // borderColor: state.isFocused ? "red" : "blue"
      },
    }),

    input: state => ({
      color: '#2c357d',
    }),

    placeholder: state => ({
      color: state.isFocused ? '#2c357d' : '#8e90a7',
      position: 'absolute',
    }),

    clearIndicator: state => ({
      color: '#8e90a7',
    }),

    dropdownIndicator: state => ({
      color: state.isFocused ? '#8e90a7' : '#8e90a7',
      padding: '0 8px',
    }),

    singleValue: state => ({
      color: '#8e90a7',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      flex: 1,
      '& span span': {
        color: '#8e90a7',
        whiteSpace: 'nowrap',
        display: 'block',
        width: 12,
      },
    }),

    indicatorSeparator: state => ({
      display: 'none',
    }),

    // indicatorsContainer: (state) => ({
    //   padding: 0,
    // }),

    menu: base => ({
      ...base,
      // override border radius to match the box
      // kill the gap
      color: '#2c357d',
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      fontSize: '14px',
    }),
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: '#fff',
      color: '#2c357d',
      border: 'none',
      position: 'relative',
      height: '100%',
      width: '100%',
      // match with the menu
      // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      // borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        cursor: 'pointer',
        // Overwrittes the different states of border
        // borderColor: state.isFocused ? "red" : "blue"
      },
    }),

    input: state => ({
      color: '#2c357d',
    }),

    placeholder: state => ({
      color: state.isFocused ? '#2c357d' : '#8e90a7',
      position: 'absolute',
    }),

    clearIndicator: state => ({
      color: '#8e90a7',
    }),

    dropdownIndicator: state => ({
      color: state.isFocused ? '#8e90a7' : '#8e90a7',
      padding: '0 8px',
    }),

    singleValue: state => ({
      color: '#8e90a7',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      flex: 1,
      '& span span': {
        color: '#8e90a7',
        whiteSpace: 'nowrap',
        display: 'block',
        width: 12,
      },
    }),

    indicatorSeparator: state => ({
      display: 'none',
    }),

    // indicatorsContainer: (state) => ({
    //   padding: 0,
    // }),

    menu: base => ({
      ...base,
      // override border radius to match the box
      // kill the gap
      color: '#2c357d',
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      fontSize: '14px',
    }),
  };

  return loading && loading === true ? (
    <Skeleton height={515} />
  ) : (
    // <div className="h-screen" />
    <div className="relative homeSlider">
      {/* <div className="overflow-hidden h-full">
        <StaticContentDiv contentKey="homepage-banner-bg" />
      </div> */}
      <SlickSlider slideKey="main-slide" />
      <div className="absolute w-full z-40 top-0 py-20">
        <div className="container mx-auto">
          <StaticContentDiv contentKey="home-banner-content" />
          {/* <StaticContentDiv contentKey="homepage-banner-title" /> */}
          <div className="h-full flex items-end mt-8 max-w-2xl">
            <div
              className={`w-full homesearch text-sm ${
                expanded ? 'expanded' : null
              }`}
            >
              <div className="">
                {enums.property_purpose && enums.property_purpose.length && (
                  <div
                    className="inline-flex items-center rounded flex-row-reverse twoitems overflow-hidden"
                    name="property_purpose"
                    value={filter.find_property_purpose}
                    onChange={() => null}
                  >
                    {enums.property_purpose &&
                      enums.property_purpose.map(each => (
                        <div
                          className="relative mr-2"
                          key={each._id}
                          name={each.description}
                          value={each._id}
                          onClick={() =>
                            handleButtonChange('property_purpose')({
                              target: { value: each._id },
                            })
                          }
                        >
                          <input
                            name="togglePurpose"
                            className="toggleButton"
                            type="radio"
                          />
                          <span className="font-normal text-sm px-4 py-2 uppercase block bg-gray-100 rounded">
                            {each.description}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="w-full relative mt-2">
                <Select
                  styles={inputStyles}
                  placeholder="Enter Address, Town or Property ID"
                  value={filter.find_location}
                  onChange={handleLocationChange('location')}
                  options={optionLocations}
                  formatOptionLabel={formatOptionLabel}
                  isClearable={true}
                />

                <button
                  type="button"
                  className="bg-primary absolute right-0 top-0 h-8 w-8 rounded-full flex items-center justify-center no-underline mt-2 mr-2"
                  onClick={handleSearch}
                  // disabled={query.length > 0 ? false : true}
                >
                  <img src={searchIcon} alt="search" />
                </button>
              </div>

              {expanded ? null : (
                <span
                  className="hidden underline cursor-pointer py-2 lg:inline-block text-white"
                  onClick={toggleForm}
                >
                  Advanced search
                </span>
              )}

              <div className="lg:flex flex-wrap -mx-1 mt-2 moresearch">
                <div className="w-full lg:w-1/4 px-1 mb-1 lg:mb-1">
                  <Select
                    styles={customStyles}
                    placeholder="Categories"
                    value={filter.find_property_category}
                    onChange={handleChange('property_category')}
                    options={optionCat}
                    isSearchable={false}
                  />
                </div>

                <div className="w-full lg:w-1/4 px-1 mb-1 lg:mb-1">
                  <Select
                    styles={customStyles}
                    placeholder="Price Range"
                    value={filter.find_selected_price}
                    onChange={handleChange('selected_price')}
                    options={optionMaxPrice}
                    isSearchable={false}
                  />
                </div>

                <div className="w-full lg:w-1/4 px-1 mb-1 lg:mb-1">
                  <Select
                    styles={customStyles}
                    placeholder="Property Face"
                    value={filter.find_property_face}
                    onChange={handleChange('property_face')}
                    options={optionFace}
                  />
                </div>

                <div className="w-full lg:w-1/4 px-1 mb-1 lg:mb-1">
                  <Select
                    styles={customStyles}
                    placeholder="Road Types"
                    value={filter.find_road_access_road_type}
                    onChange={handleChange('road_access_road_type')}
                    options={optionRoad}
                  />
                </div>

                {/* <div className="w-full lg:w-2/3 px-2">
                      <label className="flex relative mt-2">
                        <input type="checkbox" className="absolute opacity-0 customCheckbox w-5 h-5"
                          checked={filter.find_is_premium || false}
                          onClick={handleCheckedChange('is_premium')}
                        />
                        <span className="rounded-sm bg-secondary w-5 h-5 inline-flex items-center justify-center mr-2 tick"><i className="material-icons opacity-0 text-white">check</i></span>
                        <span>Premium</span>
                      </label>

                     <FormControlLabel
                        control={
                          <Checkbox
                            checked={filter.find_is_premium || false}
                            tabIndex={-1}
                            color="primary"
                            onClick={handleCheckedChange('is_premium')}
                          />
                        }
                        label={<span className=" lato">Premium</span>}
                      /> 
                      <FormControlLabel
                        className=" mr-2"
                        control={
                          <Checkbox
                            checked={filter.find_is_featured || false}
                            tabIndex={-1}
                            color="primary"
                            onClick={handleCheckedChange('is_featured')}
                          />
                        }
                        label={<span className=" lato">Featured</span>}
                      />
                    </div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HomeSearch.propTypes = {
  loadEnumRequest: PropTypes.func.isRequired,
  loadLocationRequest: PropTypes.func.isRequired,
  enums: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  setFilterValue: PropTypes.func.isRequired,
  query: PropTypes.object,
  push: PropTypes.func.isRequired,
  locations: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  filter: makeSelectFilter(),
  enums: makeSelectEnum(),
  query: makeSelectQuery(),
  locations: makeSelectLocation(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push, clearDevAndAgent },
);
export default compose(
  withConnect,
  memo,
)(HomeSearch);
