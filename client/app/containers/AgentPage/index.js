/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * AgentPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectAgent,
  makeSelectQuery,
  makeSelectAgents,
  makeSelectEnums,
  makeSelectHasData,
  makeSelectErrors,
  makeSelectForm,
  makeSelectFormLoading,
  makeSelectPropertyCount,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import tempImg3 from '../../images/default.jpg';
import logo from '../../images/logo.png';
import bed from '../../assets/img/bed.svg';
import shower from '../../assets/img/shower.svg';
import tape from '../../assets/img/tape.svg';
import ladder from '../../assets/img/ladder.svg';
import road from '../../assets/img/road.svg';
import { IMAGE_BASE, DATE_FORMAT } from '../App/constants';
// import ListSkeleton from './Skeleton/list';
import featuredimg from '../../assets/img/featured.svg';
import premiumimg from '../../assets/img/premium.svg';
import Table from '../../components/Table';
import StaticContentDiv from '../../components/StaticContentDiv/StaticContentDiv';
import { makeSelectTotal } from '../HomePageAgency/selectors';
import { each } from 'lodash';

const key = 'agentPage';

export const AgentPage = props => {
  const {
    all: { data, page, size, totaldata, msg },
    loading,
    loadAllRequest,
    agent,
    loadAgentRequest,
    match,
    push,
    setQueryValue,
    query,
    agents,
    enums,
    loadEnumsRequest,
    loadDataRequest,
    has_data,
    form,
    errors,
    form_loading,
    setFormValue,
    contactAgencyRequest,
    propertyCount,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (match.params.id) {
      setQueryValue({ key: 'agency_id', value: match.params.id });
      loadAllRequest({ query });
      loadAgentRequest(match.params.id);
      loadDataRequest(match.params.id);
    }
    loadEnumsRequest();
  }, []);

  const handleReadMore = () => {
    setReadMore(true);
  };

  useEffect(() => {
    loadAllRequest({ query });
  }, [query]);

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });

    loadAllRequest({ query });
  };

  const handleSortChange = name => event => {
    setQueryValue({ key: name, value: event.target.value });
    if (name === 'find_property_purpose') {
      setQueryValue({ key: 'find_is_sold', value: '' });
    } else if (name === 'find_is_sold') {
      setQueryValue({ key: 'find_property_purpose', value: '' });
    }
  };

  const handleContactAgency = () => {
    contactAgencyRequest();
  };

  const handleChange = name => event => {
    const { value } = event.target;
    setFormValue({ key: name, value });
  };

  const handleChecked = (name, each) => event => {
    setFormValue({ key: name, value: each });
  };

  const getCount = name => {
    let count = 0;
    for (let index = 0; index < propertyCount.length; index++) {
      const element = propertyCount[index];
      if (element.type === name) count = element.total;
    }
    return count;
  };

  const contactPurpose = [
    'Selling_my_property',
    'Buying_new_property',
    'Looking_to_rent_a_property',
  ];

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(each => [
    <>
      <Link
        to={
          each.is_project
            ? `/project/${each.slug_url}`
            : `/detail/${each.slug_url}`
        }
        className="relative block overflow-hidden rounded-lg"
        key={each._id}
      >
        <div className="relative block overflow-hidden h-48 rounded">
          <img
            className="object-cover"
            src={
              each.media && each.media.images.length > 0
                ? `${IMAGE_BASE}${each.media.images[0].id.path}`
                : tempImg3
            }
            alt="property image"
            loading="lazy"
          />
        </div>
        <div className="">
          <h2>
            <Link
              className="text-base hover:text-primary mt-8 block"
              to={`/detail/${each.slug_url}`}
            >
              {each.basic.title ? each.basic.title : 'Title'}
            </Link>
          </h2>
          <p className="text-sm text-black opacity-70 flex-1 flex mt-5">
            <i className="material-icons text-secondary mt-px mr-2">
              location_on
            </i>
            {each.address && each.address.area_id
              ? each.address.area_id.name
              : 'Area'}
            {', '}
            {each.address && each.address.city_id
              ? each.address.city_id.name
              : 'City'}
          </p>
          <p className="font-bold text-lg text-primary mt-4">
            {each.price && !each.price.is_price_on_call ? (
              <>
                Rs.
                {Intl.NumberFormat('en-IN', {
                  maximumSignificantDigits: 3,
                }).format(each.price.value)}{' '}
                {` `}
                <span className="text-sm"> ({each.price.label.title})</span>
              </>
            ) : (
              'Price On Call'
            )}
          </p>
        </div>
      </Link>
    </>,
  ]);

  return loading ? null : (
    <>
      <Helmet>
        <title>{agent.title || ''}</title>
      </Helmet>

      <div className="bg-secondary py-10 overflow-hidden relative">
        {agent.background_image && agent.background_image.path && (
          <img
            src={`${IMAGE_BASE}${agent.background_image.path}`}
            className="absolute left-0 w-full top-0 opacity-10"
          />
        )}
        <div className="max-w-5xl px-5 mx-auto lg:flex relative">
          <div class="w-16 h-16 overflow-hidden rounded-full border-4 border-white border-opacity-10 bg-white flex justify-center items-center">
            <img
              alt={agent.title}
              src={agent.logo ? `${IMAGE_BASE}${agent.logo.path}` : tempImg3}
            />
          </div>
          <div className="lg:w-2/5 lg:pl-10">
            <h1 className="text-3xl block text-white">{agent.title}</h1>
            {agent.address && (
              <span className="text-white block mt-3 md:inline-flex text-sm items-center mr-4">
                <i className="material-icons text-base text-white mr-2">
                  navigation
                </i>
                {agent.address}
              </span>
            )}

            <div className="text-sm">
              {agent.mobile && (
                <a
                  href={`tel:${agent.mobile}`}
                  className="text-white block hover:no-underline my-3 md:inline-flex items-center mr-4"
                >
                  <i className="material-icons text-base mr-2">phone</i>
                  {agent.mobile || ''}
                </a>
              )}

              {agent.email && (
                <a
                  href={`mailto:${agent.email}`}
                  className="text-white block hover:no-underline my-3 md:inline-flex items-center mr-4"
                >
                  <i className="material-icons text-base mr-2">email</i>
                  {agent.email}
                </a>
              )}
            </div>
            <div>
              {agent.website && (
                <a
                  href={`${agent.website}`}
                  target="_blank"
                  className="text-white block hover:no-underline hover:text-white  md:inline-flex items-center mr-4 text-sm"
                >
                  <i className="material-icons text-base mr-2">language</i>
                  {agent.website}
                </a>
              )}
            </div>
            <div>
              {agent.fb_link && (
                <a
                  href={`${agent.fb_link}`}
                  target="_blank"
                  className="text-white block hover:no-underline hover:text-white  md:inline-flex items-center mr-4 text-sm"
                >
                  <i className="material-icons text-base mr-2">language</i>
                  {agent.fb_link}
                </a>
              )}
            </div>
          </div>

          <div className="flex-1 lg:pl-10">
            <div className="lg:pl-10 lg:border-l border-white border-opacity-20">
              <h1 className="text-2xl font-bold text-white">Properties</h1>
              <p className="opacity-50 text-white text-sm">
                Sale &amp; Rent Informations till now
              </p>
              <div className="grid grid-cols-3 justify-between">
                <div className="my-10">
                  <h3 className="text-4xl font-bold text-primary">
                    {getCount('Sale')}
                  </h3>
                  <p className="text-sm text-white mt-1">For Sale</p>
                </div>
                <div className="my-10">
                  <h3 className="text-4xl font-bold text-primary">
                    {getCount('Sold')}
                  </h3>
                  <p className="text-sm text-white mt-1">Sold</p>
                </div>
                <div className="my-10">
                  <h3 className="text-4xl font-bold text-primary">
                    {getCount('Rent')}
                  </h3>
                  <p className="text-sm text-white mt-1">Rent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl px-5 mx-auto py-10">
        {agent.description && (
          <>
            <h3 class="inline-block text-3xl mt-6 pr-5 font-bold text-black border-black">
              About {agent.title}
            </h3>
            <p className="text-gray-500 leading-loose text-sm mt-4 ">
              {agent.description}
            </p>
          </>
        )}
      </div>

      <div className="container mx-auto">
        <div className="md:flex flex-wrap">
          {/* <div className="md:w-2/3 md:pr-10">
            {agents && agents.length > 0 && (
              <>
                <h3 class="inline-block text-2xl mt-10 pr-5 font-bold text-black">
                  Agents
                </h3>
                <div className="lg:flex flex-wrap -mx-2 mt-6">
                  {agents &&
                    agents.length > 0 &&
                    agents.map(each => (
                      <div className="lg:w-1/3 px-2 py-8">
                        <div className="bg-white border border-white rounded p-4 ease-in-out mb-1 block mb-2 text-center">
                          <div className="w-20 h-20 mx-auto rounded-full flex mb-2 border-4 border-gray-100 -mt-12 overflow-hidden">
                            <img
                              className="object-cover"
                              src={
                                each.image
                                  ? `${IMAGE_BASE}${each.image.path}`
                                  : logo
                              }
                              alt={each.name}
                            />
                          </div>
                          <h4 className="font-bold text-xl">
                            {each.name || ''}
                          </h4>
                          <span className="text-sm">{each.email || ''}</span>
                          <br />
                          <span className="text-sm">
                            {each.mobile_no || ''}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div> */}
        </div>
        {has_data && (
          <div className="max-w-5xl px-5 mx-auto">
            <h3 className="inline-block text-3xl mt-6 pr-5 font-bold text-black border-black">
              Current Listing
            </h3>

            <div className="md:w-1/2 flex items-center mt-5 ">
              <div className="">
                {enums.property_purpose && enums.property_purpose.length && (
                  <div
                    className="inline-flex items-center rounded border flex-row-reverse twoitems overflow-hidden bg-white"
                    style={{ borderColor: '#ccc' }}
                    name="property_purpose"
                    value={query.find_property_purpose || ''}
                    onChange={() => null}
                  >
                    {enums.property_purpose &&
                      enums.property_purpose.map(each => (
                        <div
                          className="relative flex-1 text-center p-px"
                          key={each._id}
                          name={each.description}
                          value={each._id}
                          onClick={() =>
                            handleSortChange('find_property_purpose')({
                              target: { value: each._id },
                            })
                          }
                        >
                          <input
                            name="togglePurpose"
                            className="toggleButton"
                            type="radio"
                          />
                          <span
                            className={`font-normal text-sm px-4 py-2 capitalize block rounded-sm ${query.find_property_purpose ===
                              each._id && 'text-white bg-blue-400'}`}
                          >
                            {each.description}
                          </span>
                        </div>
                      ))}

                    <span
                      className={`font-normal text-sm px-4 py-2 capitalize block rounded-sm ${query.find_is_sold ===
                        true && 'text-white bg-blue-400'}`}
                      onClick={() =>
                        handleSortChange('find_is_sold')({
                          target: { value: true },
                        })
                      }
                    >
                      Sold
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="md:flex items-center">
              <div className="md:w-1/2 flex items-center md:justify-start mt-5">
                <label
                  className="text-sm  whitespace-no-wrap pr-2"
                  htmlFor="Sort by"
                >
                  Filter By
                </label>
                <select
                  className="inputbox bg-gray-100 w-48 py-2 mr-5"
                  style={{ height: 32 }}
                  value={query.sort}
                  onChange={handleSortChange('sort')}
                >
                  <option value="3">Lowest Price First</option>
                  <option value="2">Highest Price First</option>
                  <option value="1">Latest First</option>
                </select>
                <select
                  className="inputbox bg-gray-100 w-48 py-2 mr-5"
                  style={{ height: 32 }}
                  value={query.find_property_type}
                  onChange={handleSortChange('find_property_type')}
                >
                  {enums &&
                    enums.property_type &&
                    enums.property_type.length > 0 &&
                    enums.property_type.map(each => (
                      <option value={each._id}>{each.title}</option>
                    ))}
                </select>
              </div>
              <div className="md:w-1/2 flex items-center md:justify-end mt-5 text-sm opacity-70">
                Showing {totaldata} properties
              </div>
            </div>
            <div className="table-grid col-4 ">
              <Table
                tableData={tableData}
                pagination={tablePagination}
                handlePagination={handlePagination}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-20 p-10 bg-blue-50">
        <div className="max-w-5xl px-5 mx-auto">
          <h2 className="text-3xl font-bold">Contact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="mt-2">
              <input
                placeholder="Your First Name"
                className="inputbox bg-white border rounded-none py-2"
                id="grid-name"
                type="text"
                value={form.first_name}
                onChange={handleChange('first_name')}
              />
              {errors.first_name ? (
                <div id="component-error-text">{errors.first_name}</div>
              ) : null}
            </div>
            <div className="mt-2">
              <input
                className="inputbox bg-white border rounded-none py-2"
                placeholder="Your Last Name"
                id="grid-name"
                type="text"
                value={form.last_name}
                onChange={handleChange('last_name')}
              />
              {errors.last_name ? (
                <div id="component-error-text">{errors.last_name}</div>
              ) : null}
            </div>

            <div className="mt-2">
              <input
                className="inputbox bg-white border rounded-none py-2"
                placeholder="Your Email"
                id="grid-email"
                type="text"
                value={form.email}
                onChange={handleChange('email')}
              />
              {errors.email ? (
                <div id="component-error-text">{errors.email}</div>
              ) : null}
            </div>
            <div className="mt-2">
              <input
                className="inputbox bg-white border rounded-none py-2"
                placeholder="Your Phone Number"
                type="text"
                id="grid-phone"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder=""
              />
              {errors.phone ? (
                <div id="component-error-text">{errors.phone}</div>
              ) : null}
            </div>
            <div className="mt-2 col-span-2">
              <textarea
                className="inputbox bg-white border rounded-none py-2"
                rows="6"
                placeholder="Message"
                value={form.message}
                onChange={handleChange('message')}
              />
              <div id="component-error-text">
                {errors.message && errors.message}
              </div>
            </div>
          </div>
          <div className="flex">
            {contactPurpose.map(each => (
              <div className="mr-10">
                <div className="checkbox">
                  <input
                    checked={form.contact_purpose === each}
                    onChange={handleChecked('contact_purpose', each)}
                    id={`contact_purpose-${each}`}
                    type="radio"
                  />
                  <label
                    className="text-sm opacity-70"
                    htmlFor={`contact_purpose-${each}`}
                  >
                    <span className="box mr-5" />
                    {each.replace(/_/g, ' ')}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="py-4 px-10 rounded mt-10 font-bold text-blue bg-secondary text-white inline-block"
            onClick={handleContactAgency}
          >
            {form_loading ? '...' : 'Send Enquiry'}
          </button>
        </div>
      </div>
    </>
  );
};

AgentPage.propTypes = {
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
  agent: makeSelectAgent(),
  query: makeSelectQuery(),
  agents: makeSelectAgents(),
  enums: makeSelectEnums(),
  has_data: makeSelectHasData(),
  form: makeSelectForm(),
  errors: makeSelectErrors(),
  form_loading: makeSelectFormLoading(),
  propertyCount: makeSelectPropertyCount(),
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
  withStyle,
  withRouter,
  withConnect,
  memo,
)(AgentPage);
