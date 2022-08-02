/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import Highlighter from 'react-highlight-words';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectFilter,
  makeSelectEnum,
  makeSelectQuery,
  makeSelectLocation,
} from '../../containers/HomeSearch/selectors';
import * as mapDispatchToProps from '../../containers/HomeSearch/actions';
import {
  setFormOpen,
  saveSearchRequest,
} from '../../containers/ListView/actions';
import {
  loadAllRequest,
  clearDevAndAgent,
} from '../../containers/ListView/actions';
import reducer from '../../containers/HomeSearch/reducer';
import saga from '../../containers/HomeSearch/saga';
import { makeSelectLocation as makeSelectRouteLocation } from '../../containers/App/selectors';
import { makeSelectOfferLoading } from '../../containers/ListView/selectors';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const key = 'homeSearch';
const Search = props => {
  const {
    enums,
    filter,
    loadEnumRequest,
    setFilterValue,
    setQueryValue,
    query,
    loadAllRequest,
    loadLocationRequest,
    clearDevAndAgent,
    push,
    locations,
    setFormOpen,
    clearFilterValues,
    offer_loading,
    saveSearchRequest,
    routeLocation,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadEnumRequest();
    loadLocationRequest();
  }, []);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    if (offer_loading === false) {
      setSearchOpen(false);
    }
  }, [offer_loading]);

  const showSave = () => {
    setSearchOpen(true);
  };

  const hideSave = () => {
    setSearchOpen(false);
  };

  const [searchError, setSearchError] = useState(false);

  const handleSearchChange = event => {
    setSearchTitle(event.target.value);
    setSearchError(false);
  };

  const handleSearchSave = () => {
    if (searchTitle.trim() === '') {
      setSearchError(true);
    } else {
      saveSearchRequest({ title: searchTitle, url: routeLocation.pathname });
    }
  };

  useEffect(() => {
    setQueryValue({ key: 'page', value: 1 });
  }, [filter]);

  const optionCat = enums.property_category
    ? enums.property_category.map(function category(each) {
        return {
          value: each._id,
          label: each.title,
          count: each.count,
        };
      })
    : [];

  const optionStates = locations.allState
    ? locations.allState.map(function state(each) {
        // let displayName = '';
        // displayName = each.name.replace(/-/g, ', ');
        return {
          value: each._id,
          label: each.name,
          custom: 'State',
        };
      })
    : [];

  const optionDistricts = locations.allDistrict
    ? locations.allDistrict.map(function district(each) {
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
        // // const displayName1 = each.slug.replace('-', ' ');
        // // const displayName2 = displayName1
        //   .split('-')
        //   .reverse()
        //   .join(', ');
        return {
          value: each._id,
          label: each.name,
          custom: 'Area',
        };
      })
    : [];

  const optionLocations = optionStates.concat(
    optionDistricts,
    optionVdc,
    optionArea,
  );
  optionLocations.unshift({ value: '', label: 'Select Locations' });

  const optionType = enums.property_type
    ? enums.property_type.map(function type(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];

  const optionMaxPrice = [
    { value: '1', label: 'Up To 50 K' },
    { value: '2', label: '50 K to 5 Lakh' },
    { value: '3', label: '5 Lakh to -50 Lakh' },
    { value: '4', label: '50 Lakh to 3 Cr.' },
    { value: '5', label: '3 Cr. to max' },
  ];

  const optionFace = enums.property_face
    ? enums.property_face.map(function type(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];

  const optionRoad = enums.road_type
    ? enums.road_type.map(function type(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];
  const options = [{ value: '1', label: 'Loading ....' }];

  optionRoad.unshift({ value: '', label: 'Road Types' });

  const handleChange = name => event => {
    // event.persist();

    // console.log('name', name, 'selected', event);
    setFilterValue({ key: `find_${name}`, value: event });
    setQueryValue({ key: `find_${name}`, value: event.value });
  };

  const handleRadioChange = (name, value) => {
    setFilterValue({ key: `find_${name}`, value: value });
    setQueryValue({ key: `find_${name}`, value: value });
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setFilterValue({ key: `find_${name}`, value: event.target.checked });
    setQueryValue({
      key: `find_${name}`,
      value: event.target.checked ? true : '',
    });
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

  const clearFilter = () => {
    clearFilterValues();
    push(`/list/&find_district_id=&find_area_id=`);
    loadAllRequest();
  };

  const handleFilter = () => {
    setFormOpen(false);
    let querystring = '';
    if ('agency_id' in query) {
      setQueryValue({ key: `agency_id`, value: '' });
      setFilterValue({ key: `agency_id`, value: '' });
      clearDevAndAgent();
    }
    if ('developer_id' in query) {
      setQueryValue({ key: `developer_id`, value: '' });
      setFilterValue({ key: `developer_id`, value: '' });
      clearDevAndAgent();
    }

    Object.keys(query).map(each => {
      querystring = `${querystring}&${each}=${query[each]}`;
      return null;
    });
    push(`/list/${querystring}`);
    loadAllRequest(querystring);
  };

  const handleLocationChange = name => event => {
    // console.log(event);
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

  const formatOptionLabel = ({ label }, { inputValue }) => (
    <Highlighter
      searchWords={[inputValue]}
      textToHighlight={label}
      highlightTag={Highlight}
    />
  );

  const Highlight = ({ children, highlightIndex }) => (
    <strong className="highlighted-text">{children}</strong>
  );
  // console.log('query in side search', query);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: '#fff',
      borderColor: '#fff',
      // minHeight: '35px',
      // height: '35px',
      boxShadow: state.isFocused ? null : null,
      // marginRight: '8px'
    }),
    // dropdownIndicator: state => ({
    //   display: 'none'
    // }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
  };
  return (
    <>
      {window.location.pathname.includes('detail') ? null : (
        <>
          <div>
            <div className="bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center p-5">
                <h3 className="text-lg text-secondary">
                  {window.location.pathname.includes('detail') ||
                  window.location.pathname.includes('news')
                    ? 'Search Properties'
                    : 'Filter Your Search'}
                </h3>

                <button
                  type="button"
                  className="text-primary block text-center text-xs underline py-2 mx-auto"
                  onClick={clearFilter}
                >
                  Clear Filter
                </button>
              </div>

              <div className="p-5">
                {enums.property_purpose && enums.property_purpose.length && (
                  <>
                    {enums.property_purpose &&
                      enums.property_purpose.map(each => (
                        <div className="custom-radio inline-block mr-2 bg-white rounded-full px-3 py-1">
                          <input
                            type="radio"
                            checked={each._id === filter.find_property_purpose}
                            id={`${each._id}-purpose`}
                            onClick={() =>
                              handleButtonChange('property_purpose')({
                                target: { value: each._id },
                              })
                            }
                          />
                          <label
                            htmlFor={`${each._id}-purpose`}
                            className="font-normal text-sm capitalize "
                            id={`${each._id}-purpose`}
                          >
                            {each.description}
                          </label>
                        </div>
                      ))}
                  </>
                )}
              </div>
              <div className="p-5 border-t border-gray-200">
                <h4 className="font-bold mb-5">Categories</h4>
                {optionCat.map(each => (
                  <div className="custom-radio">
                    <input
                      type="radio"
                      name="category-radio"
                      checked={each.value === query.find_property_category}
                      id={`category-${each.value}`}
                      value={each.value}
                      onChange={() =>
                        handleRadioChange('property_category', each.value)
                      }
                    />
                    <label htmlFor={`category-${each.value}`}>
                      {each.label} ({each.count})
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-5 border-t border-gray-200">
                <h4 className="font-bold mb-5">Location</h4>
                <Select
                  styles={customStyles}
                  className="mb-2 text-sm"
                  placeholder="Select Location"
                  value={filter.find_location}
                  onChange={handleLocationChange('location')}
                  options={optionLocations}
                  formatOptionLabel={formatOptionLabel}
                />
              </div>

              <div className="p-5 border-t border-gray-200">
                <h4 className="font-bold mb-5">Property Types</h4>
                <div className="flex">
                  {optionType.map(each => (
                    <div className="custom-radio inline-block mr-2 bg-white rounded-full px-3 py-1">
                      <input
                        type="radio"
                        checked={each.value === query.find_property_type}
                        id={`${each.label}-${each._id}`}
                        value={each.value}
                        onChange={() =>
                          handleRadioChange('property_type', each.value)
                        }
                      />
                      <label htmlFor={`${each.label}-${each._id}`}>
                        {each.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {(!query.is_project === true || query.is_project === '') && (
                <>
                  <div className="p-5 border-t border-gray-200">
                    <h4 className="font-bold mb-5">Price Range</h4>
                    {optionMaxPrice.map(each => (
                      <div className="custom-radio">
                        <input
                          type="radio"
                          checked={each.value === query.find_selected_price}
                          id={`${each.label}-${each._id}`}
                          value={each.value}
                          onChange={() =>
                            handleRadioChange('selected_price', each.value)
                          }
                        />
                        <label htmlFor={`${each.label}-${each._id}`}>
                          {each.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="p-5 border-t border-gray-200">
                <h4 className="font-bold mb-5">Road Types</h4>
                {optionRoad.map(each => (
                  <div className="custom-radio">
                    <input
                      className="absolute left-0 right-0 top-0 bottom-0 opacity-0 blueBox"
                      type="radio"
                      checked={each.value === query.find_road_access_road_type}
                      id={`${each.label}-${each._id}`}
                      value={each.value}
                      onChange={() =>
                        handleRadioChange('road_access_road_type', each.value)
                      }
                    />
                    <label htmlFor={`${each.label}-${each._id}`}>
                      {each.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-5 pb-2 border-t border-gray-200">
                <button
                  type="button"
                  className="bg-primary py-3 uppercase text-sm block text-white text-center w-full rounded-lg font-bold"
                  onClick={handleFilter}
                >
                  {window.location.pathname.includes('detail') ||
                  window.location.pathname.includes('news')
                    ? 'Search'
                    : 'Apply Filter'}
                </button>
                <div className="my-2">
                  <button
                    className="w-full px-2 text-primary text-xs uppercase"
                    onClick={showSave}
                  >
                    Save This Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Dialog open={searchOpen} onClose={hideSave}>
        <DialogContent>
          <h2 className="my-2 text-xl">Save Search</h2>
          <p className="text-sm mb-2">
            Save this search to your profile with the selected filters so that
            you can recheck later
          </p>
          <input
            placeholder="Name of Search"
            value={searchTitle}
            className="inputbox"
            onChange={handleSearchChange}
          />
          {searchError && (
            <div className="text-sm text-red-600">This Field is Required</div>
          )}
        </DialogContent>
        <DialogActions>
          <div className="px-4 mb-4">
            <button
              className="px-4 py-1 text-danger rounded mx-2"
              onClick={hideSave}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 text-white rounded mx-2 bg-primary"
              onClick={handleSearchSave}
            >
              Save
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  enums: makeSelectEnum(),
  filter: makeSelectFilter(),
  query: makeSelectQuery(),
  locations: makeSelectLocation(),
  offer_loading: makeSelectOfferLoading(),
  routeLocation: makeSelectRouteLocation(),
});

export default connect(
  mapStateToProps,
  {
    ...mapDispatchToProps,
    push,
    loadAllRequest,
    clearDevAndAgent,
    setFormOpen,
    saveSearchRequest,
  },
)(Search);
