/**
 *
 * Property
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectBasic,
  makeSelectTempAddress,
  makeSelectPrice,
  makeSelectFilter,
  makeSelectLocations,
  makeSelectEnum,
  makeSelectAgentList,
  makeSelectAgents,
  makeSelectIsBack,
  makeSelectLoadAll,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Table from '../../../components/Table';
import { makeSelectOne } from '../Media/selectors';
import tempImg3 from '../../../images/default.jpg';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import { makeSelectLocation } from '../../App/selectors';

const key = 'property';

export const Property = props => {
  const {
    all: { data, page, size, totaldata },
    query,
    loading,
    loading_all,
    classes,
    loadAllRequest,
    clearOne,
    setQueryValue,
    setInitialQueryValue,
    deleteOneRequest,
    push,
    basic,
    price,
    one,
    loadLocationRequest,
    setFilterValue,
    filter,
    clearQuery,
    clearFilter,
    locations,
    path,
    loadEnumRequest,
    enums,
    agents,
    agent_list,
    loadAgentsRequest,
    loadAgentsByAgencyRequest,
    is_back,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [locationChange, setLocationChange] = useState(false);

  const [deletedId, setDeletedID] = useState('');

  useEffect(() => {
    if (window.location.hash.includes('pending')) {
      setQueryValue({ key: 'find_is_verified', value: 'false' });
      setFilterValue({ key: 'find_is_verified', value: 'false' });
      setQueryValue({ key: 'find_is_active', value: 'true' });
      setFilterValue({ key: 'find_is_active', value: 'true' });
    }
    if (window.location.hash.includes('inactive')) {
      setQueryValue({ key: 'find_is_active', value: 'false' });
      setFilterValue({ key: 'find_is_active', value: 'false' });
    }
    if (window.location.hash.includes('unverified')) {
      setQueryValue({ key: 'find_is_verified', value: 'false' });
      setFilterValue({ key: 'find_is_verified', value: 'false' });
    }
    if (window.location.hash.includes('sold')) {
      setQueryValue({ key: 'find_is_soldout', value: 'true' });
      setFilterValue({ key: 'find_is_soldout', value: 'true' });
    }
  }, []);

  useEffect(() => {
    if (query.find_agency_id && query.find_agency_id !== '') {
      loadAgentsByAgencyRequest(query.find_agency_id);
    }
    if (
      query.find_is_verfied === 'false' &&
      window.location.hash.includes('pending')
    ) {
      loadAllRequest(query);
    }
    if (
      query.find_is_verfied === 'false' &&
      window.location.hash.includes('unverfied')
    ) {
      loadAllRequest(query);
    }
    if (
      query.find_is_soldout === 'true' &&
      window.location.hash.includes('sold')
    ) {
      loadAllRequest(query);
    }
    if (
      query.find_is_active === 'false' &&
      window.location.hash.includes('inactive')
    ) {
      loadAllRequest(query);
    }
  }, [query]);

  const [expanded, setExpanded] = useState(false);

  const toggleForm = () => {
    setExpanded(!expanded);
  };

  const optionPurpose = enums.property_purpose
    ? enums.property_purpose.map(function vdc(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];

  const optionAgency =
    agents && agents.length > 0
      ? agents.map(function vdc(each) {
          return {
            value: each._id,
            label: each.title,
          };
        })
      : [];

  const optionAgents =
    agent_list && agent_list.length > 0
      ? agent_list.map(function vdc(each) {
          return {
            value: each._id,
            label: each.name,
          };
        })
      : [];

  const optionType = enums.property_type
    ? enums.property_type.map(function vdc(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];

  const optionCategory = enums.property_category
    ? enums.property_category.map(function vdc(each) {
        return {
          value: each._id,
          label: each.title,
        };
      })
    : [];
  const optionStates = locations.allState
    ? locations.allState.map(function state(each) {
        let displayName = '';
        displayName = each.name.replace(/-/g, ', ');
        return {
          value: each._id,
          label: displayName,
          custom: 'State',
        };
      })
    : [];

  const optionDistricts = locations.allDistrict
    ? locations.allDistrict.map(function district(each) {
        const displayName1 = each.slug.replace('-', ' ');
        const displayName2 = displayName1.replace(/-/g, ', ');
        return {
          value: each._id,
          label: displayName2,
          custom: 'District',
        };
      })
    : [];

  const optionVdc = locations.allVdc
    ? locations.allVdc.map(function vdc(each) {
        const displayName1 = each.slug.replace('-', ' ');
        const displayName2 = displayName1.replace(/-/g, ', ');
        return {
          value: each._id,
          label: displayName2,
          custom: 'Vdc',
        };
      })
    : [];

  const optionArea = locations.allArea
    ? locations.allArea.map(function state(each) {
        const displayName1 = each.slug.replace('-', ' ');
        const displayName2 = displayName1
          .split('-')
          .reverse()
          .join(', ');
        return {
          value: each._id,
          label: displayName2,
          custom: 'Area',
        };
      })
    : [];

  const optionLocations = optionStates.concat(
    optionDistricts,
    optionVdc,
    optionArea,
  );
  optionLocations.unshift({ value: '', label: 'Locations' });

  useEffect(() => {
    setLocationChange(true);
  }, [window.location.pathname]);

  useEffect(() => {
    loadAllRequest(query);
  }, [query.page, query.size]);

  useEffect(() => {
    if (!is_back) {
      clearQuery();
    }
  }, [path.pathname]);

  useEffect(() => {
    if (window.location.pathname.includes('project')) {
      if (!is_back) {
        clearQuery();
      }
      clearFilter();

      setInitialQueryValue({ key: 'find_is_project', value: true });
      loadAllRequest(query);
    } else {
      clearFilter();
      if (!is_back) {
        clearQuery();
      }
      setInitialQueryValue({ key: 'find_is_project', value: '' });
      loadAllRequest(query);
    }
    loadLocationRequest();
    loadEnumRequest();
    loadAgentsRequest();
    if (window.location.hash.includes('pending')) {
      setQueryValue({ key: 'find_is_verified', value: 'false' });
      setFilterValue({ key: 'find_is_verified', value: 'false' });
      setQueryValue({ key: 'find_is_active', value: 'true' });
      setFilterValue({ key: 'find_is_active', value: 'true' });
    }
    if (window.location.hash.includes('inactive')) {
      setQueryValue({ key: 'find_is_active', value: 'false' });
      setFilterValue({ key: 'find_is_active', value: 'false' });
    }
    if (window.location.hash.includes('unverified')) {
      setQueryValue({ key: 'find_is_verified', value: 'false' });
      setFilterValue({ key: 'find_is_verified', value: 'false' });
    }
    if (window.location.hash.includes('sold')) {
      setQueryValue({ key: 'find_is_soldout', value: 'true' });
      setFilterValue({ key: 'find_is_soldout', value: 'true' });
    }
  }, [locationChange === true]);

  const handleAdd = () => {
    clearOne();
    if (window.location.pathname.includes('project')) {
      push('/admin/project-manage/add');
    } else {
      push('/admin/property/add');
    }
  };

  const handleEdit = id => {
    clearOne();

    if (window.location.pathname.includes('project')) {
      push(`/admin/project-manage/edit/${id}`);
    } else {
      push(`/admin/property/edit/${id}`);
    }
    // push(`/admin/property/edit/${id}`);
  };

  const handleQueryChange = e => {
    // e.persist();
    if (e.target.name === 'find_project_id' && query.find_property_id) {
      setQueryValue({ key: 'find_property_id', value: '' });
    } else if (e.target.name === 'find_property_id' && query.find_project_id) {
      setQueryValue({ key: 'find_project_id', value: '' });
    }
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleDate = date => {
    if (date === null) {
      date = '';
    }
    setQueryValue({
      key: 'find_date',
      value: date,
    });
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setFilterValue({ key: name, value: event.target.value });
    setQueryValue({ key: name, value: event.target.value });
  };

  const handleOpen = id => {
    setOpen(true);
    setDeletedID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });

    // loadAllRequest(query);
  };

  const handleSearch = () => {
    loadAllRequest(query);
  };

  const handleDelete = id => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    loadAllRequest();
    clearQuery();
  };

  const handleLocationChange = name => event => {
    setFilterValue({ key: name, value: event });
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

  const handleDropDownSearchChange = name => event => {
    setFilterValue({ key: name, value: event });
    setQueryValue({ key: name, value: event.value });
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

  const tablePagination = { page, size, totaldata };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: '#fff',
      borderColor: '#e0e3e8',
      minHeight: '35px',
      height: '35px',
      width: '100%',
      boxShadow: state.isFocused ? null : null,
      marginRight: '8px',
    }),
    dropdownIndicator: state => ({
      display: 'none',
    }),
    clearIndicator: state => ({
      color: '#8e90a7',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
  };

  const tableData = data.map(
    ({
      added_at,
      basic,
      price,
      media,
      property_id,
      project_id,
      is_featured,
      is_negotiable,
      is_premium,
      address,
      _id,
      is_active,
      is_verified,
      is_project,
      agency_id,
      agent_id,
      verified_by,
      slug_url,
      is_published,
      verified_at,
      view_count_user,
      view_count_guest,
    }) => [
      window.location.pathname.includes('project')
        ? project_id || 'No Project id'
        : property_id || 'No property id',
      <img
        src={
          media && media.images && media.images[0] && media.images[0].id
            ? `${IMAGE_BASE}${media.images[0].id.path}`
            : tempImg3
        }
        alt="property"
        style={{ height: 50 }}
      />,
      window.location.pathname.includes('project') ? (
        <Link
          to={`/project/${slug_url}`}
          target="_blank"
          className="text-secondary"
        >
          {basic.title}{' '}
        </Link>
      ) : (
        <Link
          to={`/detail/${slug_url}`}
          target="_blank"
          className="text-secondary"
        >
          {basic.title}{' '}
        </Link>
      ),
      moment(added_at).format(DATE_FORMAT),
      // verified_at ? moment(verified_at).format(DATE_FORMAT) : '-',
      // address &&
      // (address.state_id && `${address.state_id.name}, `) +
      // (address.district_id && `${address.district_id.name}, `) +
      // (address.city_id && `${address.city_id.name}, `) +
      // (address.area_id && `${address.area_id.name}, `) +
      // address.house_no,
      // (is_featured ? 'Featured,' : '') +
      (is_active ? 'Active, ' : 'Inactive, ') +
        (is_verified ? ' Verified' : 'Waiting for Approval'),

      // (is_published ? ' Published' : ' Unpublished'),
      // !is_project && price && Intl.NumberFormat('en-IN').format(price.value),
      !is_project && (
        <>
          {' '}
          <p>{agency_id && agency_id.title ? agency_id.title : ''} </p>
          <p>{agent_id && agent_id.name ? `(${agent_id.name})` : ''}</p>
        </>
      ),
      // <>
      //   <p>View Count User: {view_count_user || 0}</p>
      //   <p>View Count Guest: {view_count_guest || 0}</p>
      // </>,
      // !is_project && verified_by && verified_by.name ? verified_by.name : '',

      <>
        <Tooltip
          id="tooltip-top"
          title="Edit"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Edit"
            className={classes.tableActionButton}
            onClick={() => handleEdit(_id)}
          >
            <Edit
              className={`${classes.tableActionButtonIcon} ${classes.edit}`}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          id="tooltip-top-start"
          title="Remove"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Close"
            className={classes.tableActionButton}
            onClick={() => handleOpen(_id)}
          >
            <Close
              className={`${classes.tableActionButtonIcon} ${classes.close}`}
            />
          </IconButton>
        </Tooltip>
      </>,
    ],
  );

  const publishedData =
    data && data.length > 0
      ? data.map(({ is_verified, is_published }) => [
          is_published && is_verified ? true : false,
        ])
      : [];

  const unPublishedData =
    data && data.length > 0
      ? data.map(({ is_verified, is_published }) => [
          !is_published && is_verified ? true : false,
        ])
      : [];

  const unverifiedData =
    data && data.length > 0
      ? data.map(({ is_active, is_verified }) => [
          is_active && !is_verified ? true : false,
        ])
      : [];

  const verifiedData =
    data && data.length > 0
      ? data.map(({ is_active, is_verified }) => [
          is_active && is_verified ? true : false,
        ])
      : [];

  const inactiveData =
    data && data.length > 0 ? data.map(({ is_active }) => [is_active]) : [];

  return (
    <>
      <Helmet>
        <title>
          {window.location.pathname.includes('property')
            ? 'Properties'
            : 'Projects '}
        </title>
      </Helmet>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>
          {window.location.pathname === '/admin/project-manage'
            ? `Projects `
            : `Properties`}
        </PageHeader>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          round="true"
          onClick={handleAdd}
          elevation={0}
        >
          <AddIcon />
        </Fab>
      </div>

      <div className="bg-white p-2 mb-2 rounded">
        <div className="flex items-center -mx-1">
          <div className="w-1/5 p-1">
            <label className="text-sm">Search by ID</label>
            {window.location.pathname.includes('project') ? (
              <input
                type="text"
                name="find_project_id"
                id="contents-project_id"
                className="m-auto inputbox"
                value={query.find_project_id || ''}
                // value="test"
                onChange={handleQueryChange}
                onKeyPress={handleKeyPress}
              />
            ) : (
              <input
                type="text"
                name="find_property_id"
                id="contents-property_id"
                className="m-auto inputbox"
                value={query.find_property_id || ''}
                // value="test"
                onChange={handleQueryChange}
                onKeyPress={handleKeyPress}
              />
            )}
          </div>
          <div className="w-1/5 p-1">
            <label className="text-sm">Search by Title</label>
            <input
              type="text"
              name="find_title"
              id="contents-title"
              className="m-auto inputbox"
              value={query.find_title || ''}
              // value="test"
              onChange={handleQueryChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="w-1/5 px-1">
            <label className="text-sm">Search by Location</label>
            <Select
              styles={customStyles}
              isClearable={true}
              placeholder="Select"
              value={filter.location || ''}
              onChange={handleLocationChange('location')}
              options={optionLocations}
              formatOptionLabel={formatOptionLabel}
            />
          </div>
          <div className="w-1/5 p-1">
            <label className="text-sm">Active</label>
            <select
              className="inputbox"
              native="true"
              value={filter.find_is_active || ''}
              onChange={handleCheckedChange('find_is_active')}
            >
              <option key="1" name="All" value="">
                All
              </option>
              <option key="2" name="Active" value="true">
                Active
              </option>{' '}
              <option key="3" name="non Active" value="false">
                Not Active
              </option>
            </select>
          </div>
          {/* <div className="w-1/5 p-1">
            <select
              className="inputbox"
              native="true"
              value={filter.find_is_published || ''}
              onChange={handleCheckedChange('find_is_published')}
            >
              <option key="1" name="All" value="">
                All
              </option>
              <option key="2" name="Published" value="true">
                Published
              </option>{' '}
              <option key="3" name="non Published" value="false">
                Not Published
              </option>
            </select>
          </div> */}
          <div className="w-1/5 p-1">
            <label className="text-sm">Verified</label>

            <select
              className="inputbox"
              native="true"
              value={filter.find_is_verified || ''}
              onChange={handleCheckedChange('find_is_verified')}
            >
              <option key="1" name="All" value="">
                All
              </option>
              <option key="2" name="Verified" value="true">
                Verified
              </option>{' '}
              <option key="3" name="non Verified" value="false">
                Not Verified
              </option>
            </select>
          </div>
        </div>

        {expanded ? (
          <div className="flex flex-wrap items-center -mx-1">
            <div className="w-1/5 p-1">
              <label className="text-sm">Purpose</label>
              <Select
                styles={customStyles}
                isClearable={true}
                placeholder="Select"
                value={filter.find_property_purpose || ''}
                onChange={handleDropDownSearchChange('find_property_purpose')}
                options={optionPurpose}
              />
            </div>
            <div className="w-1/5 p-1">
              <label className="text-sm">Type</label>
              <Select
                styles={customStyles}
                isClearable={true}
                placeholder="Select"
                value={filter.find_property_type || ''}
                onChange={handleDropDownSearchChange('find_property_type')}
                options={optionType}
              />
            </div>
            <div className="w-1/5 p-1">
              <label className="text-sm">Categories</label>
              <Select
                styles={customStyles}
                isClearable={true}
                placeholder="Select"
                value={filter.find_property_category || ''}
                onChange={handleDropDownSearchChange('find_property_category')}
                options={optionCategory}
              />
            </div>
            <div className="w-1/5 p-1">
              <label className="text-sm">Agency</label>
              <Select
                styles={customStyles}
                isClearable={true}
                placeholder="Select"
                value={filter.find_agency_id}
                onChange={handleDropDownSearchChange('find_agency_id')}
                options={optionAgency}
              />
            </div>
            <div className="w-1/5 p-1">
              <label className="text-sm">Agents</label>
              <Select
                styles={customStyles}
                isClearable={true}
                placeholder="Select"
                value={filter.find_agent_id || ''}
                onChange={handleDropDownSearchChange('find_agent_id')}
                options={optionAgents}
              />
            </div>

            <div className="w-1/5 p-1">
              <label className="text-sm">Premium</label>
              <select
                className="inputbox"
                native="true"
                value={filter.find_is_premium || ''}
                onChange={handleCheckedChange('find_is_premium')}
              >
                <option key="1" name="All" value="">
                  All
                </option>
                <option key="2" name="Premium" value="true">
                  Premium
                </option>{' '}
                <option key="3" name="non premium" value="false">
                  Non Premium
                </option>
              </select>
            </div>
            <div className="w-1/5 p-1">
              <label className="text-sm">Date</label>

              <DatePicker
                className="inputbox"
                placeholderText="Click to select a date"
                selected={
                  query.find_date !== '' && query.find_date !== null
                    ? new Date(moment(query.find_date).format(DATE_FORMAT))
                    : ''
                }
                onChange={handleDate}
                isClearable
              />
            </div>
            <div className="w-1/5 p-1">
              <label className="text-sm">Featured</label>
              <select
                className="inputbox"
                native="true"
                value={filter.find_is_featured || ''}
                onChange={handleCheckedChange('find_is_featured')}
              >
                <option key="1" name="All" value="">
                  All
                </option>
                <option key="2" name="Featured" value="true">
                  Featured
                </option>{' '}
                <option key="3" name="non featured" value="false">
                  Non Featured
                </option>
              </select>
            </div>
            <div className="w-1/5 p-1">
              <label className="text-sm">Exclusive</label>
              <select
                className="inputbox"
                native="true"
                value={filter.find_is_exclusive || ''}
                onChange={handleCheckedChange('find_is_exclusive')}
              >
                <option key="1" name="All" value="">
                  All
                </option>
                <option key="2" name="Exclusive" value="true">
                  Exclusive
                </option>{' '}
                <option key="3" name="non Exclusive" value="false">
                  Non Exclusive
                </option>
              </select>
            </div>
            <div className="w-1/5 p-1">
              <label className="text-sm">Sold Out</label>
              <select
                className="inputbox"
                native="true"
                value={filter.find_is_soldout || ''}
                onChange={handleCheckedChange('find_is_soldout')}
              >
                <option key="1" name="All" value="">
                  All
                </option>
                <option key="2" name="SoldOut" value="true">
                  Sold Out
                </option>{' '}
                <option key="3" name="non Sold Out" value="false">
                  Not Sold Out
                </option>
              </select>
            </div>
          </div>
        ) : null}
        <div className="flex justify-between">
          {expanded ? (
            <span
              className="text-secondary cursor-pointer text-sm py-2"
              onClick={toggleForm}
            >
              less options
            </span>
          ) : (
            <span
              className="text-secondary cursor-pointer text-sm py-2"
              onClick={toggleForm}
            >
              more options
            </span>
          )}
          <div className="text-right">
            <button
              aria-label="Clear"
              className="px-6 py-1 inline-block text-secondary text-center underline"
              onClick={clearFilters}
              type="button"
            >
              clear filter
            </button>
            <button
              aria-label="Search"
              className="bg-secondary px-6 py-1 uppercase font-lg inline-block text-white text-center rounded"
              onClick={handleSearch}
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <PageContent loading={loading}>
        {window.location.pathname.includes('property') ? (
          <Table
            tableHead={[
              'ID',
              'Image',
              'Title',
              'Added At',
              'Status',
              'Agency',
              // 'Verified by',
              // 'View Count',

              'Action',
            ]}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={handlePagination}
            inactiveData={inactiveData}
            unverifiedData={unverifiedData}
            verifiedData={verifiedData}
            publishedData={publishedData}
            unPublishedData={unPublishedData}
            loading={loading_all}
            emptyDataMsg="No Properties found"
          />
        ) : (
          <Table
            tableHead={[
              'ID',
              'Image',
              'Title',
              'Added At',
              'Status',
              // 'View Count',
              'Action',
            ]}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={handlePagination}
          />
        )}
      </PageContent>
    </>
  );
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  tableActionButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },

  waftsrch: {
    padding: 0,
    position: 'absolute',
    borderLeft: '1px solid #d9e3e9',
    borderRadius: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },
});

Property.propTypes = {
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
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  basic: makeSelectBasic(),
  price: makeSelectPrice(),
  one: makeSelectOne(),
  filter: makeSelectFilter(),
  locations: makeSelectLocations(),
  path: makeSelectLocation(),
  enums: makeSelectEnum(),
  agents: makeSelectAgents(),
  agent_list: makeSelectAgentList(),
  is_back: makeSelectIsBack(),
  loading_all: makeSelectLoadAll(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withConnect,
  memo,
)(Property);
