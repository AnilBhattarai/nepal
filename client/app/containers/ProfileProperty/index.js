/**
 *
 * ProfileProperty
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';

import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectOffer,
  makeSelectOfferLoading,
  makeSelectOfferSize,
  makeSelectLoadingMore,
  makeSelectLocations,
  makeSelectFilter,
  makeSelectAgents,
  makeSelectPropertyCount,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import agent from '../../images/agent.png';
import tempImg3 from '../../images/default.jpg';
import bed from '../../assets/img/bed.svg';
import shower from '../../assets/img/shower.svg';
import tape from '../../assets/img/tape.svg';
import ladder from '../../assets/img/ladder.svg';
import road from '../../assets/img/road.svg';
import { IMAGE_BASE, DATE_FORMAT } from '../App/constants';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import Loading from '../../components/Loading';
import Loader from '../../assets/img/loader.svg';
import Table from '../../components/Table';
import { makeSelectUser } from '../App/selectors';
import premiumimg from '../../assets/img/premium.svg';

const key = 'profileProperty';

export const ProfileProperty = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    loadOfferRequest,
    classes,
    push,
    clearOne,
    setQueryValue,
    query,
    offers,
    offer_loading,
    offer_size,
    currentUser,
    loading_more,
    loadMoreRequest,
    setFilterValue,
    loadLocationRequest,
    locations,
    filter,
    loadAgentsRequest,
    agents,
    property_count,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (window.location.pathname.includes('project')) {
      setQueryValue({ key: 'find_is_project', value: true });
      loadAllRequest(query);
    } else {
      setQueryValue({ key: 'find_is_project', value: '' });

      loadAllRequest(query);
      loadLocationRequest();
    }
  }, [query]);

  useEffect(() => {
    if (data && data[0] && data[0].agency_id !== undefined) {
      loadAgentsRequest(data[0].agency_id._id);
    }
  }, [data]);

  const handlePagination = ({ page, size }) => {
    loadAllRequest({ page, size });
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    loadMoreRequest({ page: newPage, size });
  };

  const [currentID, setCurrentID] = useState('');

  const redirectToDetail = (slug, isProject) => {
    if (isProject) {
      props.push(`/project/${slug}`);
    } else {
      props.push(`/detail/${slug}`);
    }
  };

  const handleAdd = () => {
    clearOne();

    if (window.location.pathname.includes('project')) {
      push('/user/project/add');
    } else {
      push('/user/property/add');
    }
  };

  const handleEdit = id => {
    if (window.location.pathname.includes('project')) {
      push(`/user/project/edit/${id}`);
    } else {
      push(`/user/property/edit/${id}`);
    }
  };

  const handleOffer = id => {
    setCurrentID(id);
    loadOfferRequest(id);
  };

  const handleQueryChange = e => {
    e.persist();
    if (e.target.name === 'find_project_id' && query.find_property_id) {
      setQueryValue({ key: 'find_property_id', value: '' });
    } else if (e.target.name === 'find_property_id' && query.find_project_id) {
      setQueryValue({ key: 'find_project_id', value: '' });
    }
    setQueryValue({ key: e.target.name, value: e.target.value });
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

  const optionAgents =
    agents && agents.length > 0
      ? agents.map(function vdc(each) {
          return {
            value: each._id,
            label: each.name,
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
          label: each.name,
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
          label: each.name,
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
  optionLocations.unshift({ value: '', label: 'Locations' });

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(each => [
    <>
      <Helmet>
        {window.location.pathname.includes('project') ? (
          <title>My projects</title>
        ) : (
          <title>My properties</title>
        )}
      </Helmet>
      <div className="relative">
        <div className="bg-gray-100 mb-2 cursor-pointer rounded">
          <div className="flex flex-end border-b">
            <button
              className="text-sm text-primary px-4 py-2 font-bold"
              type="button"
              onClick={() => handleOffer(each._id)}
            >
              Show Messages
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-primary text-sm font-bold"
              onClick={() => handleEdit(each._id)}
            >
              <i className="material-icons text-sm mr-1 text-primary">edit</i>
              {window.location.pathname.includes('project')
                ? 'Edit Project'
                : 'Edit Property'}
            </button>
          </div>

          <div className="flex" key={each._id}>
            <div className="w-1/6 mx-1 p-2 h-32">
              <img
                className="object-cover ease-in-out cursor-pointer"
                src={
                  each.media &&
                  each.media.images.length > 0 &&
                  each.media.images[0].id
                    ? `${IMAGE_BASE}${each.media.images.map(a => a.id.path)[0]}`
                    : tempImg3
                }
                alt="property"
                onClick={() => redirectToDetail(each.slug_url)}
              />
            </div>
            <div className="w-3/4 p-2 flex flex-col justify-between">
              <div className="">
                <div className="flex items-center">
                  {each.is_verified && (
                    <span className="text-sm text-white relative inline-flex tag tag-lg mr-6 bg-secondary">
                      <img className="float-left mr-2" src={premiumimg} />
                      Verified
                    </span>
                  )}

                  {each.is_sold_out && (
                    <span className="ml-2 text-sm text-white relative inline-block tag tag-lg">
                      Sold Out
                    </span>
                  )}
                </div>

                <h3
                  className="text-2xl mt-4 hover:text-secondary"
                  onClick={() =>
                    redirectToDetail(each.slug_url, each.is_project)
                  }
                >
                  {each.basic.title ? each.basic.title : 'Title'}
                  {/* {each.prefix}
                    {each.is_project ? each.project_id : each.property_id}) */}
                </h3>
                <p className="text-sm opacity-75">
                  {each.address && each.address.area_id
                    ? each.address.area_id.name
                    : 'Area'}
                  {', '}
                  {each.address && each.address.city_id
                    ? each.address.city_id.name
                    : 'City'}
                </p>
                <div className="pl-6 text-right flex-1">
                  {each.price && each.price.is_price_on_call ? (
                    <p className="text-xl text-black">Price On Call</p>
                  ) : (
                    <>
                      {each.price && each.price.is_starting_from ? (
                        <p className="text-xs">Starting From</p>
                      ) : (
                        ''
                      )}
                      <p className="text-xl font-bold text-black">
                        Rs.
                        {each.price
                          ? Intl.NumberFormat('en-IN').format(each.price.value)
                          : null}
                      </p>
                      {/* <p className=" text-gray-700">
                          {each.price.label.title}
                        </p> */}
                    </>
                  )}
                </div>
              </div>
              {/* {!each.is_project && (
                <>
                  <p className="text-primary text-sm">
                    This{' '}
                    <span className="lowercase">
                      {each.basic &&
                        each.basic.property_category &&
                        each.basic.property_category.title}{' '}
                    </span>
                    is availble {' '}
                  {each.basic &&
                    each.basic.property_purpose &&
                    each.basic.property_purpose.title}{' '}
                    is faced to{' '}
                    {each.location_property &&
                      each.location_property.property_face &&
                      each.location_property.property_face.title}
                    .
                  </p>

                  <div className="flex">
                    <div className="inline-flex w-3/4 pt-2">
                      <div className="inline-flex items-center pl-3">
                        <img className="h-4 mr-1" src={tape} />
                        <p className="text-sm truncate w-full text-center">
                          {each.location_property
                            ? each.location_property.total_area
                            : '0'}{' '}
                          {each.location_property.total_area_unit &&
                            each.location_property.total_area_unit.title
                            ? each.location_property.total_area_unit.title
                            : ''}
                        </p>
                        <p className="text-sm truncate w-full text-center">
                  {each.location_property
                    ? each.location_property.total_area
                    : '0'}{' '}
                  Aana Area
                </p>
                      </div>
                      <div className="inline-flex items-center pl-3">
                        <img className="h-4 mr-1" src={road} />
                        <p className="text-sm whitespace-no-wrap w-full text-center">
                          {each.location_property
                            ? each.location_property.road_access_value
                            : '0'}{' '}
                          {each.location_property &&
                            each.location_property.road_access_length_unit
                            ? each.location_property.road_access_length_unit
                              .title
                            : 'Feet'}
                          {each.location_property &&
                            each.location_property.road_access_road_type
                            ? ` (${
                            each.location_property.road_access_road_type
                              .title
                            })`
                            : ''}
                        </p>
                      </div>
                      <div className="inline-flex items-center pl-3">
                        <img className="h-4 mr-1" src={ladder} />
                        <p className="text-sm truncate w-full text-center">
                          {each.building ? each.building.total_floor : '0'}{' '}
                          Floor
                        </p>
                        <p className="text-sm truncate w-full text-center">
                  {each.location_property
                    ? each.location_property.road_access_value
                    : '0'}{' '}
                  {each.location_property &&
                    each.location_property.road_access_length_unit
                    ? each.location_property.road_access_length_unit.title
                    : 'Feet'}
                </p>
                      </div>
                      <div className="flex items-ce pl-3nter">
                    <img className="h-4 mr-1" src={bed} />
                    <p className="text-sm truncate w-full text-center">
                      {each.building ? each.building.no_of.bedroom : '0'} Room
                    </p>
                  </div>
                  <div className="flex items-center pl-3">
                    <img className="h-4 mr-1" src={shower} />
                    <p className="text-sm truncate w-full text-center">
                      {each.building ? each.building.no_of.bathroom : '0'}{' '}
                      Bathroom
                    </p>
                  </div>
                    </div>
                  </div>
                </>
              )} */}
            </div>
          </div>

          {offer_loading && currentID === each._id && (
            <div className="border-t py-1 flex items-center">
              <a className="inline-block p-2" href="mailto:Jacob@gmail.com">
                <i className="material-icons text-primary ml-4">mail</i>
              </a>
              <a className="inline-block p-2" href="tel:+977-984924224">
                <i className="material-icons text-primary ml-4">call</i>
              </a>
              <div className="flex-1 pl-5">
                <span>Loading poster</span>
                <p className="italic text-sm text-gray-700">Loading offer</p>
              </div>
            </div>
          )}
          {offers.length > 0 &&
            offers.map(offer =>
              offer.propertyId._id === each._id ? (
                <div
                  className="border-t py-1 flex items-center"
                  key={offer._id}
                >
                  <a
                    className="inline-block p-2"
                    href={`mailto:${offer.email}`}
                  >
                    <i className="material-icons text-primary ml-4">mail</i>
                  </a>
                  <a
                    className="inline-block p-2"
                    href={`tel:+977-${offer.phone}`}
                  >
                    <i className="material-icons text-primary ml-4">call</i>
                  </a>
                  <div className="flex-1 pl-5">
                    <span>
                      {offer.name && offer.name} offered at{' '}
                      {moment(offer.added_at).format('llll')}
                    </span>
                    <p className="italic text-sm text-gray-700">
                      {offer.message}
                    </p>
                  </div>
                </div>
              ) : (
                ''
              ),
            )}
        </div>
      </div>
    </>,
  ]);

  return loading && loading === true ? (
    <>
      <div className="flex justify-between mt-3 mb-4">
        <PageHeader>
          {window.location.pathname.includes('project')
            ? `My Projects `
            : `My Properties  `}
        </PageHeader>
        <button
          type="button"
          className="bg-primary hover:bg-secondary text-white rounded px-4 py-1"
          onClick={handleAdd}
          disabled={!currentUser.email_verified}
        >
          <AddIcon />{' '}
          {window.location.pathname.includes('project')
            ? 'Add Projects'
            : 'Add Properties'}
        </button>
      </div>
      <Loading />
      <img src={Loader} style={{ width: '100px' }} alt="loading" />{' '}
    </>
  ) : (
    <>
      <div className="flex justify-between items-center mt-3 mb-4">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>
          {window.location.pathname.includes('project')
            ? `My Projects (${totaldata})`
            : `My Properties (${totaldata}) `}
        </PageHeader>
        <button
          type="button"
          className="bg-primary hover:bg-secondary text-white rounded px-4 py-1"
          onClick={handleAdd}
          disabled={!currentUser.email_verified}
        >
          <AddIcon />{' '}
          {window.location.pathname.includes('project')
            ? 'Add Project'
            : 'Add Property'}
        </button>
      </div>

      {window.location.pathname.includes('property') && (
        <div className="flex my-8">
          <div className="w-1/6 mx-1 bg-white rounded p-2 flex flex-col-reverse justify-between hover:text-black bg-green-100 border border-green-400">
            {/* <NoteAdd /> */}

            <span className="text-green-800 text-center  font-bold">
              Active
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold  rounded-full bg-waftprimary-light leading-loose">
              {property_count &&
                property_count.active_property &&
                property_count.active_property}
              {!property_count.active_property && 0}
            </span>
          </div>
          <div className="w-1/6 mx-1 bg-white rounded p-2 flex flex-col-reverse justify-between hover:text-black bg-purple-100 border border-purple-400">
            <span className="text-purple-800 text-center  font-bold">
              {/* <Note /> */}
              Pending
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold  rounded-full bg-waftprimary-light leading-loose">
              {property_count &&
                property_count.pending_property &&
                property_count.pending_property}
            </span>
          </div>
          <div className="w-1/6 mx-1 bg-white rounded p-2 flex flex-col-reverse justify-between hover:text-black bg-indigo-100 border border-indigo-400">
            <span className="text-indigo-800 text-center  font-bold">
              {/* <AccountBox /> */}
              On Sale
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold  rounded-full bg-waftprimary-light leading-loose">
              {property_count &&
              property_count.property_purpose &&
              property_count.property_purpose.length > 0
                ? property_count.property_purpose.map(
                    each => each.purpose === 'Sale' && each.amt,
                  )
                : 0}
            </span>
          </div>
          <div className="w-1/6 mx-1 bg-white rounded p-2 flex flex-col-reverse justify-between hover:text-black bg-indigo-100 border border-indigo-400">
            <span className="text-indigo-800 text-center  font-bold">
              {/* <AccountBox /> */}
              In Rent
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold  rounded-full bg-waftprimary-light leading-loose">
              {property_count &&
              property_count.property_purpose &&
              property_count.property_purpose.length > 0
                ? property_count.property_purpose.map(
                    each => each.purpose === 'Rent' && each.amt,
                  )
                : 0}
            </span>
          </div>
          <div className="w-1/6 mx-1 bg-white rounded p-2 flex flex-col-reverse justify-between hover:text-black bg-pink-100 border border-pink-400">
            <span className="text-pink-800 text-center  font-bold">
              Commercial
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold  rounded-full bg-waftprimary-light leading-loose">
              {property_count &&
              property_count.property_type &&
              property_count.property_type.length > 0
                ? property_count.property_type.map(
                    each => each.type === 'Commercial' && each.amt,
                  )
                : 0}
            </span>
          </div>
          <div className="w-1/6 mx-1 bg-white rounded p-2 flex flex-col-reverse justify-between hover:text-black bg-pink-100 border border-pink-400">
            <span className="text-pink-800 text-center  font-bold">
              Residential
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold  rounded-full bg-waftprimary-light leading-loose">
              {property_count &&
              property_count.property_type &&
              property_count.property_type.length > 0
                ? property_count.property_type.map(
                    each => each.type === 'Residential' && each.amt,
                  )
                : 0}
            </span>
          </div>
        </div>
      )}

      <div className="bg-white p-2 mb-2 rounded">
        <div className="flex items-center -mx-3">
          <div className="w-1/5 px-1">
            <label className="text-sm">Search by ID</label>
            {window.location.pathname.includes('project') ? (
              <input
                type="text"
                name="find_project_id"
                id="contents-project_id"
                className="m-auto inputbox"
                value={query.find_project_id || ''}
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
          <div className="w-2/5 px-1">
            <label className="text-sm">Search by Location</label>
            <Select
              styles={customStyles}
              isClearable={true}
              placeholder="Select"
              value={filter.location}
              onChange={handleLocationChange('location')}
              options={optionLocations}
              formatOptionLabel={formatOptionLabel}
            />
          </div>
          <div className="w-2/5 px-1 flex">
            <div className="flex-1 pr-2">
              <label className="text-sm">Agents</label>
              <Select
                styles={customStyles}
                isClearable={true}
                placeholder="Select"
                value={filter.find_agent_id}
                onChange={handleDropDownSearchChange('find_agent_id')}
                options={optionAgents}
              />
            </div>
            <button
              aria-label="Search"
              className="bg-secondary px-6 py-1 uppercase font-lg inline-block text-white text-center rounded mt-6"
              onClick={handleSearch}
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end" />
      <div
        className={`bg-white rounded table-list ${loading ? 'opacity-50' : ''}`}
      >
        {' '}
        {currentUser.email_verified === false && (
          <div className="border-red-500 border text-red-600 font-bold bg-red-100 px-4 py-2 mt-10 rounded">
            Verify Email to add
          </div>
        )}
        {data.length < 1 ? (
          <div className="border-red-500 border text-red-600 font-bold bg-red-100 px-4 py-2 mt-10 rounded">
            {window.location.pathname.includes('project')
              ? 'You have not posted any project yet.'
              : 'You have not posted any property yet.'}
          </div>
        ) : (
          <>
            <Table tableData={tableData} />
            {loading_more && <img src={Loader} alt="Loading" />}
            {data.length < totaldata && (
              <button
                type="button"
                className="btn w-full border border-secondary bg-blue-100 mb-8 text-secondary mt-4"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

ProfileProperty.propTypes = {
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
  query: makeSelectQuery(),
  offers: makeSelectOffer(),
  offer_loading: makeSelectOfferLoading(),
  offer_size: makeSelectOfferSize(),
  currentUser: makeSelectUser(),
  loading_more: makeSelectLoadingMore(),
  locations: makeSelectLocations(),
  filter: makeSelectFilter(),
  agents: makeSelectAgents(),
  property_count: makeSelectPropertyCount(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const withStyle = withStyles(styles);
export default compose(
  withConnect,
  withStyle,
  memo,
)(ProfileProperty);
