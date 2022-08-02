/**
 *
 * ListView
 *
 */

import Dialog from '@material-ui/core/Dialog';
import withStyles from '@material-ui/core/styles/withStyles';
import { push } from 'connected-react-router';
import Visibility from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import useInjectReducer from 'utils/injectReducer';
import useInjectSaga from 'utils/injectSaga';
import tick from '../../assets/img/tick.png';
import ladder from '../../assets/img/ladder-blue.svg';
import bed from '../../assets/img/bed-blue.svg';
import tape from '../../assets/img/tape-blue.svg';
import tempImg3 from '../../images/default.jpg';
import { IMAGE_BASE } from '../App/constants';
import { makeSelectLocation as selectRouteLocation } from '../App/selectors';
import {
  loadEnumRequest,
  loadLocationRequest,
  setFilterValue,
  setQueryValue,
} from '../HomeSearch/actions';
import {
  makeSelectEnum,
  makeSelectLocation,
  makeSelectQuery,
} from '../HomeSearch/selectors';
import Search from './../../components/Search/index.js';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAgency,
  makeSelectAll,
  makeSelectDeveloper,
  makeSelectLoading,
  makeSelectLoadingMore,
  makeSelectOfferLoading,
  makeSelectOpenForm,
} from './selectors';
import ListSkeleton from './Skeleton/list';

const key = 'listView';

export const ListView = props => {
  const {
    all: { data, page, size, totaldata, msg },
    loading,
    loadAllRequest,
    classes,
    push,
    query,
    match,
    setFilterValue,
    setQueryValue,
    enums,
    loadEnumRequest,
    loadLocationRequest,
    locations,
    loadAgencyRequest,
    loadDeveloperRequest,
    agent,
    developer,
    clearDevAndAgent,
    clearDevAndAgentImmediate,
    routeLocation,
    setFormOpen,
    openForm,
    loadMoreRequest,
    loading_more,
    saveSearchRequest,
    offer_loading,
  } = props;
  const redirectToDetail = (slug, isProject) => {
    if (isProject) {
      props.push(`/project/${slug}`);
    } else {
      props.push(`/detail/${slug}`);
    }
  };
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const showModal = () => {
    setFormOpen(true);
  };

  const closeModal = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    if (!match.params.query.includes('agency')) {
      setQueryValue({ key: 'agency_id', value: '' });
    }
  }, [match.params.query]);
  useEffect(() => {
    clearDevAndAgent();
    window.scrollTo(0, 0);
    loadEnumRequest();
    loadLocationRequest();
    if (match.params.query) {
      loadAllRequest(match.params.query);
    } else {
      loadAllRequest();
    }

    const obj = match.params.query
      .split('&')
      .map(keyVal => keyVal.split('=').map(_ => _.trim()))
      .reduce((accumulator, currentValue) => {
        accumulator[currentValue[0]] = currentValue[1];

        return accumulator;
      }, {});
    if (Object.keys(obj).includes('is_project')) {
      setQueryValue({
        key: 'is_project',
        value: obj.is_project === 'true' ? 'true' : '',
      });
    } else {
      setQueryValue({ key: 'is_project', value: '' });
    }

    Object.entries(obj).map(([qkey, qvalue]) => {
      // console.log('keyhere', qkey, 'valuehere', qvalue);
      // if (qkey === 'is_project') {
      //   setQueryValue({ key: 'is_project', value: qvalue === 'true' ? 'true' : '' });
      // }

      if (qkey === 'agency_id') {
        loadAgencyRequest(qvalue);
      }
      if (qkey === 'developer_id') {
        loadDeveloperRequest(qvalue);
      }
      if (qkey === 'developer_id' && qvalue === '') {
        clearDevAndAgent();
        setQueryValue({ key: 'developer_id', value: '' });
        loadAllRequest(match.params.query);
      }
      if (qkey === 'agency_id' && qvalue === '') {
        clearDevAndAgent();
        loadAllRequest(match.params.query);
      }
    });
  }, [match.params.query]);
  const optionMaxPrice = [
    { value: '1', label: 'Up To 50 K' },
    { value: '2', label: '50 K to 5 Lakh' },
    { value: '3', label: '5 Lakh to -50 Lakh' },
    { value: '4', label: '50 Lakh to 3 Cr.' },
    { value: '5', label: '3 Cr. to max' },
  ];

  const [lastTop, setLastTop] = useState(0);

  // const isProject = headerStickyLocations.includes(location.pathname);
  const lastDiv = useRef(null);

  useEffect(() => {
    window.scrollTo(0, lastTop - 140);
  }, [loading_more]);

  useEffect(() => {
    if (
      // Object.keys(query).length === 1 &&
      match.params.query &&
      Object.keys(enums).length > 0
    ) {
      const obj = match.params.query
        .split('&')
        .map(keyVal => keyVal.split('=').map(_ => _.trim()))
        .reduce((accumulator, currentValue) => {
          accumulator[currentValue[0]] = currentValue[1];

          return accumulator;
        }, {});
      Object.entries(obj).map(([qkey, qvalue]) => {
        if (qvalue === undefined) {
          return null;
        }
        if (qkey === 'find_property_category') {
          const dlabel =
            enums &&
            enums.property_category.map(e =>
              e._id === qvalue ? `${e.title}` : '',
            );
          const forDropdown = { value: qvalue, label: dlabel };
          setFilterValue({ key: qkey, value: forDropdown });
        } else if (qkey === 'find_property_type') {
          const dlabel =
            enums &&
            enums.property_type.map(e =>
              e._id === qvalue ? `${e.title}` : '',
            );
          const forDropdown = { value: qvalue, label: dlabel };
          setFilterValue({ key: qkey, value: forDropdown });
        } else if (qkey === 'find_road_access_road_type') {
          const dlabel =
            enums &&
            enums.road_type.map(e => (e._id === qvalue ? `${e.title}` : ''));
          const forDropdown = { value: qvalue, label: dlabel };
          setFilterValue({ key: qkey, value: forDropdown });
        } else if (qkey === 'find_selected_price') {
          const dlabel =
            optionMaxPrice &&
            optionMaxPrice.map(e => (e.value === qvalue ? `${e.label}` : ''));
          const forDropdown = { value: qvalue, label: dlabel };
          setFilterValue({ key: qkey, value: forDropdown });
        } else if (qkey === 'find_state_id' && qvalue !== '') {
          const dlabel =
            locations &&
            locations.allState.map(e => (e._id === qvalue ? `${e.name}` : ''));
          const slabel = dlabel.toString().replace(/,/g, '');
          const forDropdown = { value: qvalue, label: slabel };
          setFilterValue({ key: 'find_location', value: forDropdown });
        } else if (qkey === 'find_district_id' && qvalue !== '') {
          const dlabel =
            locations &&
            locations.allDistrict.map(e =>
              e._id === qvalue ? `${e.name}` : '',
            );
          const slabel = dlabel.toString().replace(/,/g, '');
          const forDropdown = { value: qvalue, label: slabel };
          setFilterValue({ key: 'find_location', value: forDropdown });
        } else if (qkey === 'find_vdc_id' && qvalue !== '') {
          const dlabel =
            locations &&
            locations.allVdc.map(e => (e._id === qvalue ? `${e.name}` : ''));
          const slabel = dlabel.toString().replace(/,/g, '');
          const forDropdown = { value: qvalue, label: slabel };
          setFilterValue({ key: 'find_location', value: forDropdown });
        } else if (qkey === 'find_area_id' && qvalue !== '') {
          const dlabel =
            locations &&
            locations.allArea.map(e => (e._id === qvalue ? `${e.name}` : ''));
          const slabel = dlabel.toString().replace(/,/g, '');
          const forDropdown = { value: qvalue, label: slabel };
          setFilterValue({ key: 'find_location', value: forDropdown });
        } else {
          setFilterValue({ key: qkey, value: qvalue });
        }
        if (qkey !== 'is_project') {
          setQueryValue({ key: 'is_project', value: '' });
        }
        setQueryValue({ key: qkey, value: qvalue });
      });
    }
  }, [Object.keys(enums).length && Object.keys(locations).length]);

  useEffect(() => {
    if (
      // Object.keys(query).length === 1 &&
      match.params.query &&
      Object.keys(enums).length > 0
    ) {
      const obj = match.params.query
        .split('&')
        .map(keyVal => keyVal.split('=').map(_ => _.trim()))
        .reduce((accumulator, currentValue) => {
          accumulator[currentValue[0]] = currentValue[1];

          return accumulator;
        }, {});
      Object.entries(obj).map(([qkey, qvalue]) => {
        if (qvalue === undefined) {
          return null;
        }
        if (qkey === 'find_property_category') {
          const dlabel =
            enums &&
            enums.property_category.map(e =>
              e._id === qvalue ? `${e.title}` : '',
            );
          const forDropdown = { value: qvalue, label: dlabel };
          setFilterValue({ key: qkey, value: forDropdown });
        } else if (qkey === 'find_property_type') {
          const dlabel =
            enums &&
            enums.property_type.map(e =>
              e._id === qvalue ? `${e.title}` : '',
            );
          const forDropdown = { value: qvalue, label: dlabel };
          setFilterValue({ key: qkey, value: forDropdown });
        } else if (qkey === 'find_road_access_road_type') {
          const dlabel =
            enums &&
            enums.road_type.map(e => (e._id === qvalue ? `${e.title}` : ''));
          const forDropdown = { value: qvalue, label: dlabel };
          setFilterValue({ key: qkey, value: forDropdown });
        } else if (qkey === 'find_selected_price') {
          const dlabel =
            optionMaxPrice &&
            optionMaxPrice.map(e => (e.value === qvalue ? `${e.label}` : ''));
          const forDropdown = { value: qvalue, label: dlabel };
          setFilterValue({ key: qkey, value: forDropdown });
        } else if (qkey === 'find_state_id' && qvalue !== '') {
          const dlabel =
            locations &&
            locations.allState.map(e => (e._id === qvalue ? `${e.name}` : ''));
          const slabel = dlabel.toString().replace(/,/g, '');
          const forDropdown = { value: qvalue, label: slabel };
          setFilterValue({ key: 'find_location', value: forDropdown });
        } else if (qkey === 'find_district_id' && qvalue !== '') {
          const dlabel =
            locations &&
            locations.allDistrict.map(e =>
              e._id === qvalue ? `${e.name}` : '',
            );
          const slabel = dlabel.toString().replace(/,/g, '');
          const forDropdown = { value: qvalue, label: slabel };
          setFilterValue({ key: 'find_location', value: forDropdown });
        } else if (qkey === 'find_vdc_id' && qvalue !== '') {
          const dlabel =
            locations &&
            locations.allVdc.map(e => (e._id === qvalue ? `${e.name}` : ''));
          const slabel = dlabel.toString().replace(/,/g, '');
          const forDropdown = { value: qvalue, label: slabel };
          setFilterValue({ key: 'find_location', value: forDropdown });
        } else if (qkey === 'find_area_id' && qvalue !== '') {
          const dlabel =
            locations &&
            locations.allArea.map(e => (e._id === qvalue ? `${e.name}` : ''));
          const slabel = dlabel.toString().replace(/,/g, '');
          const forDropdown = { value: qvalue, label: slabel };
          setFilterValue({ key: 'find_location', value: forDropdown });
        } else {
          setFilterValue({ key: qkey, value: qvalue });
        }
        if (qkey !== 'is_project') {
          setQueryValue({ key: 'is_project', value: '' });
        }
        setQueryValue({ key: qkey, value: qvalue });
      });
    }
  }, [routeLocation.pathname]);

  const handleSortChange = name => event => {
    setQueryValue({ key: name, value: event.target.value });
    setQueryValue({ key: 'page', value: 1 });

    callSort();
  };

  const callSort = () => {
    // console.log('query before call', query);
    let querystring = '';
    Object.keys(query).map(each => {
      querystring = `${querystring}&${each}=${query[each]}`;
      return null;
    });
    push(`/list/${querystring}`);
    loadAllRequest(querystring);
  };
  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
    let querystring = '';
    Object.keys(query).map(each => {
      querystring = `${querystring}&${each}=${query[each]}`;
      return null;
    });
    push(`/list/${querystring}`);
    loadAllRequest(querystring);
  };

  const handleLoadMore = () => {
    setQueryValue({ key: 'page', value: page + 1 });
    setQueryValue({ key: 'size', value: size });
    let querystring = '';
    Object.keys(query).map(each => {
      querystring = `${querystring}&${each}=${query[each]}`;
      return null;
    });
    const top = lastDiv.current.offsetTop;
    console.log('top', top);
    setLastTop(top);
    loadMoreRequest(querystring);
  };

  return loading ? (
    <ListSkeleton />
  ) : (
    // <ListSkeleton />
    <>
      <Helmet>
        <title>{query.is_project === 'true' ? 'Projects' : 'Properties'}</title>
      </Helmet>
      {window.location.pathname.includes('agency_id') &&
        Object.keys(agent).length > 0 &&
        agent.hasOwnProperty('0') === false && (
          <div className="rounded border border-gray-200 relative overflow-hidden p-3">
            <div className="flex">
              <div className="w-32 mr-5">
                <img
                  alt="Agent logo"
                  src={
                    agent.logo && agent.logo.path !== undefined
                      ? `${IMAGE_BASE}${agent.logo.path}`
                      : tempImg3
                  }
                />
              </div>
              <div className="flex-1">
                <span className="font-bold text-xl capitalize block">
                  {agent.title}
                </span>
                <div className="flex items-center">
                  {agent.website && (
                    <span className="text-gray-700 text-xs inline-flex items-center mr-4">
                      <i className="material-icons text-sm">language</i>
                      {agent.website}
                    </span>
                  )}
                  {agent.email && (
                    <span className="text-gray-700 text-xs inline-flex items-center mr-4">
                      <i className="material-icons text-sm">email</i>{' '}
                      {agent.email}
                    </span>
                  )}
                  {agent.address && (
                    <span className="text-gray-700 text-xs inline-flex items-center mr-4">
                      <i className="material-icons text-sm">navigation</i>
                      {agent.address}
                    </span>
                  )}
                  {agent.phone && (
                    <span className="text-gray-700 text-xs inline-flex items-center mr-4">
                      <i className="material-icons text-sm">phone</i>
                      {agent.phone || ''}
                    </span>
                  )}
                </div>
                {agent.description && (
                  <p className="text-gray-700 mt-4">{agent.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      {window.location.pathname.includes('developer_id') &&
        Object.keys(developer).length > 0 &&
        developer.hasOwnProperty('0') === false && (
          <div className="rounded border border-gray-200 relative overflow-hidden  p-3">
            <div className="flex">
              <div className="w-32 mr-5">
                <img
                  alt="Agent logo"
                  src={
                    developer.logo && developer.logo.path !== undefined
                      ? `${IMAGE_BASE}${developer.logo.path}`
                      : tempImg3
                  }
                />
              </div>
              <div className="flex-1">
                <span className="font-bold text-xl capitalize block">
                  {developer.name}
                </span>
                {developer.website && (
                  <span className="text-gray-700 text-xs block">
                    <i className="material-icons text-sm">language</i>
                    {developer.website}
                  </span>
                )}
                {developer.email && (
                  <span className="text-gray-700 text-xs block">
                    <i className="material-icons text-sm">email</i>{' '}
                    {developer.email}
                  </span>
                )}
                {developer.address && (
                  <span className="text-gray-700 text-xs block">
                    <i className="material-icons text-sm">navigation</i>
                    {developer.address}
                  </span>
                )}
                {developer.phone && (
                  <span className="text-gray-700 text-xs block">
                    <i className="material-icons text-sm">phone</i>
                    {developer.phone || ''}
                  </span>
                )}
                {developer.bio && (
                  <p className="text-gray-700">{developer.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}

      <h2 className="text-xl lg:text-3xl opacity-80 hidden lg:block">
        Showing {totaldata} properties
      </h2>
      <p className="text-sm hidden lg:block">
        We offer cost-effective and value-added property advertising services to
        the real estate agencies.
      </p>

      <div className="lg:flex justify-between items-center lg:mt-10 py-5 border-b border-gray-200">
        <div className="text-sm flex-1 pr-5">
          <>
            {totaldata > 0 && (
              <strong className="block">
                Showing {size} properties of {totaldata}{' '}
              </strong>
            )}
          </>
          {/* {window.location.pathname.includes('sort') && (
              <>
                <strong className="block">Search Results</strong>
                <div dangerouslySetInnerHTML={{ __html: msg }} />
              </>
            )} */}
        </div>
        {(!query.is_project ||
          query.is_project === false ||
          query.is_project === '') && (
          <div className="hidden lg:flex flex-1 items-center justify-end">
            <label
              className="text-sm block whitespace-no-wrap pr-2"
              htmlFor="Sort by"
            >
              Sort By
            </label>
            <select
              className="p-2 bg-gray-100 text-sm w-48 rounded"
              value={query.sort}
              onChange={handleSortChange('sort')}
            >
              <option value="3">Lowest Price First</option>
              <option value="2">Highest Price First</option>`
              <option value="1">Latest First</option>
            </select>
          </div>
        )}
      </div>

      <div className="hidden">
        <Dialog open={openForm} onClose={closeModal} fullScreen>
          <div
            className="h-12 shadow px-4 flex items-center mb-4"
            onClick={closeModal}
          >
            <i className="material-icons text-2xl">arrow_back</i>
          </div>
          <Search />
        </Dialog>

        <div
          className="rounded border p-2 text-center bg-white mt-2"
          onClick={showModal}
        >
          {' '}
          Apply Filter
        </div>
      </div>

      <div>
        {data.length > 0 ? (
          data.map((each, index) => (
            <>
              <Link
                to={
                  each.is_project
                    ? `/project/${each.slug_url}`
                    : `/detail/${each.slug_url}`
                }
                className="block"
                key={each._id}
                target="_blank"
              >
                <div
                  className="flex flex-wrap py-6 border-b border-gray-200"
                  ref={index === data.length - 1 ? lastDiv : null}
                >
                  <div className="w-1/3 mb-2 lg:mb-0">
                    <div className="rounded-lg overflow-hidden h-24 lg:h-48 relative">
                      <img
                        className="object-cover"
                        src={
                          each.media &&
                          each.media.images.length > 0 &&
                          each.media.images[0].id &&
                          each.media.images[0].id.path !== undefined
                            ? `${IMAGE_BASE}${each.media.images[0].id.path.replace(
                                'public/',
                                'public/400-300/',
                              )}`
                            : tempImg3
                        }
                        alt={each.basic.title ? each.basic.title : 'Title'}
                      />

                      <div className="absolute top-0 left-0 mt-2 ml-2">
                        {each.is_premium && (
                          <span
                            className="text-xs text-white relative font-bold rounded-full block pl-6 pr-2 py-1"
                            style={{ background: '#7ec694' }}
                          >
                            <img
                              className="absolute left-0 top-0 h-6 -ml-1"
                              src={tick}
                            />
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-2/3 pl-6">
                    <h2 className="text-sm lg:text-xl text-gray-900 lg:text-primary cursor-pointer">
                      {each.basic.title ? each.basic.title : 'Property'}
                    </h2>
                    <div className='flex'>
                    <div className="inline-flex items-center pt-2">
                      <i className="material-icons opacity-40 hidden lg:block">
                        place
                      </i>
                      <span className="text-xs opacity-40">
                        {each.address && each.address.area_id
                          ? each.address.area_id.name
                          : 'Area'}
                        {', '}
                        {each.address && each.address.city_id
                          ? each.address.city_id.name
                          : 'City'}
                      </span>
                    </div>
                    <div className="inline-flex items-center pt-2 pl-6">
                                <i className="material-icons opacity-40 hidden lg:block">
                        visibility
                      </i>
                      <span className="text-xs opacity-40 pl-1">  {each.view_count_guest + each.view_count_user}</span>
                            </div>
                            </div>
                    {/* {each.is_project && (
                          <div className="lg:border-t lg:flex mt-2">
                            <p className="px-2 lg:p-2 lg:text-center flex-1">
                              Area:{' '}
                              <span className="text-black">
                                {' '}
                                {`${each.location_property.total_area} ${
                                  each.location_property.total_area_unit.title
                                }`}
                              </span>
                            </p>
                            <p className="lg:border-l px-2 lg:p-2 lg:text-center flex-1">
                              Starting Price:{' '}
                              <span className="text-black">
                                {' '}
                                Rs.
                                {each.project_property_type &&
                                  each.project_property_type[0] &&
                                  Intl.NumberFormat('en-IN').format(
                                    each.project_property_type[0].price,
                                  )}
                              </span>
                            </p>
                          </div>
                        )} */}

                    <div className="lg:flex flex-wrap lg:py-5">
                      {each.agency_id ? (
                        <>
                          <div className="w-10 h-10 overflow-hidden rounded-full border-4 border-gray-200 hidden lg:block">
                            <img
                              src={
                                each.agency_id.logo
                                  ? `${IMAGE_BASE}${each.agency_id.logo.path}`
                                  : ''
                              }
                              className="object-cover"
                            />
                          </div>
                          <div className="w-4/5 lg:w-1/3 pl-2 pr-10 hidden lg:block">
                            <p className="text-xs">Property by:</p>
                            <p className="font-bold text-xs">
                              {each.agency_id.title}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 overflow-hidden rounded-full border-4 border-gray-200">
                            <img
                              src={
                                each.added_by.image
                                  ? `${IMAGE_BASE}${each.added_by.image.path}`
                                  : ''
                              }
                              className="object-cover"
                            />
                          </div>
                          <div className="w-4/5 lg:w-1/3 pl-2 pr-10">
                            <p className="text-xs">Property by:</p>
                            <p className="font-bold text-xs">
                              {each.added_by.name}
                            </p>
                          </div>
                        </>
                      )}

                      {!each.is_project && (
                        <div className="w-full lg:w-1/3">
                          <div className="lg:border border-secondary rounded lg:px-2 py-1 inline-block lg:block">
                            {each.price && each.price.is_price_on_call ? (
                              <p className="lg:font-black lg:text-xl text-primary lg:text-secondary leading-none">
                                Price On Call
                              </p>
                            ) : (
                              <>
                                <p className="lg:font-black lg:text-xl text-primary lg:text-secondary leading-none">
                                  Rs.{' '}
                                  {each.price
                                    ? Intl.NumberFormat('en-IN').format(
                                        each.price.value,
                                      )
                                    : ''}
                                </p>
                                <p className="hidden lg:block text-xs font-bold leading-none italic text-gray-400">
                                  {each.price.label.title}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="lg:hidden">
                        {each.agency_id ? (
                          <p className="font-bold text-xs opacity-70">
                            By: {each.agency_id.title}
                          </p>
                        ) : (
                          <p className="font-bold text-xs opacity-70">
                            By: {each.added_by.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {!each.is_project && (
                      <>
                        <div className="hidden lg:inline-flex">
                          <div className="hidden lg:flex items-center pr-6">
                            <img className="h-3" src={tape} />
                            <div className="flex-1 pl-2">
                              <p className="text-xs font-bold">
                                {each.location_property
                                  ? each.location_property.total_area
                                  : '0'}{' '}
                                {each.location_property.total_area_unit &&
                                each.location_property.total_area_unit.title
                                  ? each.location_property.total_area_unit.title
                                  : ''}
                              </p>
                            </div>
                          </div>

                          {each.basic &&
                            each.basic.property_category &&
                            each.basic.property_category.title !== undefined &&
                            each.basic.property_category.title !== 'Land' && (
                              <div className="hidden lg:flex items-center pr-6">
                                <img className="h-3" src={ladder} />
                                <div className="flex-1 pl-2">
                                  <p className="text-xs font-bold">
                                    Floors :{' '}
                                    {each.building
                                      ? each.building.total_floor
                                      : '0'}{' '}
                                  </p>
                                </div>
                              </div>
                            )}

                          <div className="hidden lg:flex items-center pr-6">
                            <img className="h-3" src={bed} />
                            <div className="flex-1 pl-2">
                              <p className="text-xs font-bold">
                                {each.location_property
                                  ? each.location_property.road_access_value
                                  : '0'}{' '}
                                {each.location_property &&
                                each.location_property.road_access_length_unit
                                  ? each.location_property
                                      .road_access_length_unit.title
                                  : 'Feet'}
                                {each.location_property &&
                                each.location_property.road_access_road_type
                                  ? ` (${
                                      each.location_property
                                        .road_access_road_type.title
                                    })`
                                  : ''}
                              </p>
                            </div>

                            
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </>
          ))
        ) : (
          <div className="bg-white border border-white rounded p-4 text-center ease-in-out cursor-pointer block mb-2 shadow text-lg">
            No Properties Found!
          </div>
        )}
        {loading_more && <ListSkeleton />}
        {data.length < totaldata && (
          <div className="text-center">
            <button
              type="button"
              className="px-10 py-3 inline-block rounded-full font-bold bg-primary mb-8 text-white mt-4"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

ListView.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  enums: makeSelectEnum(),
  locations: makeSelectLocation(),
  agent: makeSelectAgency(),
  developer: makeSelectDeveloper(),
  routeLocation: selectRouteLocation(),
  openForm: makeSelectOpenForm(),
  loading_more: makeSelectLoadingMore(),
  offer_loading: makeSelectOfferLoading(),
});

const withConnect = connect(
  mapStateToProps,
  {
    ...mapDispatchToProps,
    push,
    setQueryValue,
    setFilterValue,
    loadEnumRequest,
    loadLocationRequest,
  },
);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});
const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withRouter,
  withSaga,
  withStyle,
  withConnect,
  memo,
)(ListView);
