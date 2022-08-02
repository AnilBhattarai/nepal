/**
 *
 * DevelopersPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import YouTube from 'react-youtube';

import { Helmet } from 'react-helmet';

import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectDeveloper,
  makeSelectLoading,
  makeSelectBuilders,
  makeSelectForm,
  makeSelectErrors,
  makeSelectFormLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import { IMAGE_BASE, DATE_FORMAT } from '../App/constants';
import Loader from '../../assets/img/loader.svg';

import tempImg3 from '../../images/default.jpg';
import featuredimg from '../../assets/img/featured.svg';
import premiumimg from '../../assets/img/premium.svg';
import Table from '../../components/Table';
import logo from '../../images/logo.png';

const key = 'developersPage';

export const DevelopersPage = props => {
  const {
    all: { data, page, size, totaldata, msg },
    loading,
    loadDeveloperRequest,
    loadDeveloperDetailRequest,
    developer,
    match,
    builders,
    form,
    errors,
    setFormValue,
    contactDeveloperRequest,
    form_loading,
  } = props;

  const redirectToDetail = slug => {
    props.push(`/project/${slug}`);
  };

  const opts = {
    height: '480',
    width: '100%',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDeveloperRequest(match.params.query);
    const obj = match.params.query
      .split('&')
      .map(keyVal => keyVal.split('=').map(_ => _.trim()))
      .reduce((accumulator, currentValue) => {
        accumulator[currentValue[0]] = currentValue[1];

        return accumulator;
      }, {});
    Object.entries(obj).map(([qkey, qvalue]) => {
      if (qkey === 'developer_id') {
        loadDeveloperDetailRequest(qvalue);
      }
    });
  }, []);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleContactDeveloper = () => {
    contactDeveloperRequest();
  };

  const handleChange = name => event => {
    const { value } = event.target;
    setFormValue({ key: name, value });
  };

  const tableData = data.map(each => [
    <div className="p-2 w-1/2" key={each._id}>
      <div
        className="rounded cursor-pointer bg-gray-100"
        onClick={() => redirectToDetail(each.slug_url)}
      >
        <div className="overflow-hidden rounded" style={{ height: 150 }}>
          <img
            className="object-cover"
            src={
              each.media && each.media.images.length > 0
                ? `${IMAGE_BASE}${each.media.images[0].id.path}`
                : tempImg3
            }
            alt="property"
          />
        </div>
        {each.is_featured && (
          <span className="text-sm text-white relative inline-block tag tag-sm mr-6">
            <img className="float-left mr-2 mt-1" src={premiumimg} />
            Featured
          </span>
        )}

        {each.is_premium && (
          <span className="text-sm text-white relative inline-block tag tag-sm bg-primary">
            <img className="float-left mr-2 mt-1" src={featuredimg} />
            Premium
          </span>
        )}

        <h3 className="text-lg font-bold p-2">
          {each.basic.title ? each.basic.title : 'Title'} ({each.prefix}{' '}
          {each.is_project ? each.project_id : each.property_id})
        </h3>

        <div className="border-t flex">
          <p className="px-2 py-4 text-center flex-1">
            Area:{' '}
            {`${each.location_property.total_area} ${each.location_property.total_area_unit.title
              }`}
          </p>
          <p className="border-l px-2 py-4 text-center flex-1">
            Approx Price:{' '}
            {each.project_property_type &&
              each.project_property_type[0] &&
              Intl.NumberFormat('en-IN').format(
                each.project_property_type[0].price,
              )}
          </p>
        </div>
      </div>
    </div>,
  ]);
  const tablePagination = { page, size, totaldata };

  return loading ? (
    <img src={Loader} style={{ width: '100px' }} alt="loading" />
  ) : (
      <>
        <Helmet>
          <title>{developer.name} </title>
        </Helmet>
        <div className="bg-white">
          {developer.banner.path ? (
            <img
              className="object-cover"
              alt={developer.name}
              src={
                developer.banner ? `${IMAGE_BASE}${developer.banner.path}` : ''
              }
            />
          ) : (
              <div
                style={{ height: 450 }}
                style={{ backgroundColor: developer.hex_code }}
              />
            )}

          <div className="absolute righ-0 left-0 top-0 pt-20 lg:pt-64 w-full">
            <h2
              className="text-3xl lg:text-6xl tracking-tight capitalize text-center text-white"
              style={{ textShadow: '0 0 20px #000' }}
            >
              {developer.name}
            </h2>
            <h2
              className="text-lg lg:text-2xl mt-6 text-center text-white"
              style={{ textShadow: '0 0 20px #000' }}
            >
              {developer.tagline || ''}
            </h2>
          </div>

          <div className="container mx-auto py-8 lg:py-16 lg:flex items-center">
            <div className="w-32 h-32">
              <img
                className="object-cover"
                alt={developer.name}
                src={
                  developer.logo
                    ? `${IMAGE_BASE}${developer.logo.path}`
                    : tempImg3
                }
              />
            </div>

            <div className="max-w-4xl lg:pl-10">
              <h2 className="text-4xl lg:mt-20 font-bold">
                About <span className="text-gray-500">{developer.name}</span>
              </h2>
              <div
                className="text-gray-600 mt-2 text-lg lg:text-xl leading-loose"
                dangerouslySetInnerHTML={{ __html: developer.bio }}
              />
            </div>
          </div>

          {developer.md_message !== '' && (
            <div className="container mx-auto py-8 lg:py-16 text-right">
              {developer.md_post ? (
                <h2 className="text-4xl font-bold text-right">
                  {developer.md_post}{' '}
                  <span className="text-gray-500">Message</span>
                </h2>
              ) : (
                  <h2 className="text-4xl font-bold text-right">
                    MD <span className="text-gray-500">Message</span>
                  </h2>
                )}
              {developer.md_message && (
                <div
                  className="max-w-4xl text-right py-6 inline-block text-gray-600 text-lg lg:text-xl leading-loose"
                  dangerouslySetInnerHTML={{ __html: developer.md_message }}
                />
              )}
              {developer.md_name && (
                <h3 className="font-bold text-right">{developer.md_name}</h3>
              )}
              {developer.md_post && (
                <p className="text-right">{developer.md_post}</p>
              )}
            </div>
          )}

          <div className="container mx-auto py-8 lg:py-16">
            {developer.journey !== null && developer.journey.length > 0 && (
              <>
                <h2 className="text-4xl font-bold">
                  The Journey so far of <br />{' '}
                  <span className="text-gray-500">{developer.name}</span>
                </h2>
                <ul className="mt-20 lg:flex">
                  {developer.journey !== null &&
                    developer.journey.length > 0 &&
                    developer.journey.map(each => (
                      <li className="flex-1 border-l border-dotted lg:border-l-0">
                        <div className="border border-dotted border-bottom -mb-5 hidden lg:block" />
                        <strong
                          className="px-2 text-2xl bg-white"
                          style={{
                            color: developer.hex_code,
                          }}
                        >
                          {each.year}
                        </strong>
                        <p className="text-sm px-2">{each.label || ''}</p>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>

          {developer.factoids !== null && developer.factoids.length > 0 && (
            <>
              <div className="container mx-auto py-16">
                <h3 className="text-center text-4xl font-bold">Factoids</h3>
                <div className="flex flex-wrap -mx-2 mt-6 justify-center">
                  {developer.factoids.length > 0 &&
                    developer.factoids.map(each => (
                      <div className="w-64 px-2">
                        <div className="bg-white border border-white rounded p-1 ease-in-out cursor-pointer mb-1 block mb-2 text-center">
                          <h4
                            className="font-bold text-6xl"
                            style={{
                              color: developer.hex_code,
                            }}
                          >
                            {each.top_label || ''}
                          </h4>
                          <span className="text-lg">{each.value || ''}</span>
                          <br />
                          <span className="text-sm text-gray-500">
                            {each.button_label || ''}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          {developer.business.title !== '' && (
            <div className="">
              <div className="container mx-auto py-10 text-center">
                <h3 className="text-center text-4xl mt-20 font-bold">
                  {developer.business.title || ''}{' '}
                </h3>
                <p>{developer.business.sub_title || ''} </p>
                {developer.business.video_code !== '' && (
                  <div>
                    <div className="video-wrapper mt-10">
                      <YouTube
                        videoId={developer.business.video_code}
                        opts={opts}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {developer.future_ready.title !== '' && (
            <>
              <div className="container mx-auto bg-white py-10 text-center">
                <h3 className="text-center text-4xl mt-20 font-bold">
                  {developer.future_ready.title || ''}{' '}
                </h3>
                <p>{developer.future_ready.sub_title || ''} </p>
              </div>
              {developer.future_ready.video_code !== '' && (
                <div>
                  <div className="video-wrapper mt-10">
                    <YouTube
                      videoId={developer.future_ready.video_code}
                      opts={opts}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          {developer.success_story.title !== '' && (
            <>
              <div className="container mx-auto bg-white py-10 text-center">
                <h3 className="text-center text-4xl mt-20 font-bold">
                  {developer.success_story.title || ''}{' '}
                </h3>
                <p>{developer.success_story.sub_title || ''} </p>
                {developer.success_story.video_code !== '' && (
                  <div>
                    <div className="video-wrapper mt-10">
                      <YouTube
                        videoId={developer.success_story.video_code}
                        opts={opts}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* {builders.length > 0 && (
            <h3
              className="inline-block text-4xl mt-20 pr-5 border-b-2 font-bold text-black border-black"
              style={{
                color: developer.hex_code,
                borderBottomColor: developer.hex_code,
              }}
            >
              Builders
        </h3>
          )} */}

          {/* <div className="flex flex-wrap -mx-2 mt-6">
            {builders &&
              builders.length > 0 &&
              builders.map(each => (
                <div className="w-1/3 px-2">
                  <div className="bg-white border border-white rounded p-1 ease-in-out cursor-pointer mb-1 block mb-2 shadow text-center">
                    <img
                      className="h-24 mx-auto"
                      src={each.image ? `${IMAGE_BASE}${each.image.path}` : logo}
                      alt={each.name}
                    />
                    <h4 className="font-bold">{each.name || ''}</h4>
                    <span className="text-sm">{each.email || ''}</span>
                    <br />
                    <span className="text-sm">{each.mobile_no || ''}</span>
                  </div>
                </div>
              ))}
          </div> */}

          <div className="container mx-auto">
            {tableData.length > 0 && (
              <>
                <h3
                  className="inline-block text-4xl mt-10 pr-5 border-b-2 font-bold"
                  style={{
                    color: developer.hex_code,
                    borderBottomColor: developer.hex_code,
                  }}
                >
                  {tableData && tableData.length} Projects
              </h3>
                <div className="flex flex-wrap -mx-2 mb-10">{tableData}</div>
              </>
            )}
          </div>
          <div className="md:flex  max-w-2xl mx-auto py-16">
            <div className="bg-gray-100 flex-1 p-8">
              <div className="py-6 flex">
                {developer.website && (
                  <>
                    <i
                      style={{ color: developer.hex_code }}
                      className="material-icons mr-6 text-4xl"
                    >
                      language
                  </i>

                    <p className="text-gray-700 text-sm py-2">
                      {developer.website}
                    </p>
                  </>
                )}
              </div>
              <div className="py-6 flex">
                <div>
                  {(developer.email &&
                    developer.email.length > 0 &&
                    developer.email.map(each => (
                      <>
                        <i
                          style={{ color: developer.hex_code }}
                          className="material-icons mr-6 text-4xl"
                        >
                          email
                      </i>

                        <p className="text-gray-700 text-sm py-2">{each || ''}</p>
                      </>
                    ))) ||
                    null}
                </div>
              </div>

              <div className="py-6 flex">
                <div>
                  {(developer.phone &&
                    developer.phone.length > 0 &&
                    developer.phone.map(each => (
                      <>
                        <i
                          style={{ color: developer.hex_code }}
                          className="material-icons mr-6 text-4xl"
                        >
                          phone
                      </i>

                        <p className="text-gray-700 text-sm py-2">{each || ''}</p>
                      </>
                    ))) ||
                    null}
                </div>
              </div>
              <div className="py-6 flex">
                {developer.address && (
                  <>
                    <i
                      style={{ color: developer.hex_code }}
                      className="material-icons mr-6 text-4xl"
                    >
                      room
                  </i>

                    <p className="text-gray-700 text-sm py-2">
                      {developer.address}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div
              className="p-8 flex-1"
              style={{
                backgroundColor: developer.hex_code,
              }}
            >
              <div className="mt-2">
                <label
                  className={`text-sm ${developer.hex_code !== null &&
                      developer.hex_code !== '#FFFFFF'
                      ? 'text-white'
                      : 'text-black'
                    } `}
                >
                  Name
              </label>
                <div className="relative">
                  <i
                    className="material-icons"
                    style={{ position: 'absolute', left: 5, top: 8 }}
                  >
                    person_pin
                </i>
                  <input
                    className="inputbox border-none"
                    style={{ paddingLeft: 35 }}
                    id="grid-name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                  />
                </div>
                {errors.name ? (
                  <div id="component-error-text">{errors.name}</div>
                ) : null}
              </div>

              <div className="mt-2">
                <label
                  className={`text-sm ${developer.hex_code !== null &&
                      developer.hex_code !== '#FFFFFF'
                      ? 'text-white'
                      : 'text-black'
                    } `}
                  htmlFor="Email"
                >
                  Email
              </label>
                <div className="relative">
                  <i
                    className="material-icons"
                    style={{ position: 'absolute', left: 5, top: 8 }}
                  >
                    mail
                </i>
                  <input
                    className="inputbox border-none"
                    style={{ paddingLeft: 35 }}
                    id="grid-email"
                    type="text"
                    value={form.email}
                    onChange={handleChange('email')}
                  />
                </div>
                {errors.email ? (
                  <div id="component-error-text">{errors.email}</div>
                ) : null}
              </div>

              <div className="mt-2">
                <label
                  className={`text-sm ${developer.hex_code !== null &&
                      developer.hex_code !== '#FFFFFF'
                      ? 'text-white'
                      : 'text-black'
                    } `}
                  htmlFor="phone"
                >
                  Phone Number
              </label>
                <div className="relative">
                  <i
                    className="material-icons"
                    style={{ position: 'absolute', left: 5, top: 8 }}
                  >
                    smartphone
                </i>
                  <input
                    className="inputbox border-none"
                    style={{ paddingLeft: 35 }}
                    type="text"
                    id="grid-phone"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    placeholder=""
                  />
                </div>
                {errors.phone ? (
                  <div id="component-error-text">{errors.phone}</div>
                ) : null}
              </div>
              <div className="mt-2">
                <label
                  className={`text-sm ${developer.hex_code !== null &&
                      developer.hex_code !== '#FFFFFF'
                      ? 'text-white'
                      : 'text-black'
                    } `}
                  htmlFor="message"
                >
                  Message
              </label>
                <textarea
                  className="inputbox"
                  rows="3"
                  value={form.message}
                  onChange={handleChange('message')}
                />
                <div id="component-error-text">
                  {errors.message && errors.message}
                </div>
              </div>
              <button
                type="button"
                className={`py-2 px-6 rounded mt-2 text-sm w-full border ${developer.hex_code !== null && developer.hex_code !== '#FFFFFF'
                    ? 'border-white text-white'
                    : 'border-black text-black'
                  } `}
                onClick={handleContactDeveloper}
              >
                {form_loading ? '...' : 'Contact Developer'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

DevelopersPage.propTypes = {
  loadDeveloperRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  developer: makeSelectDeveloper(),
  loading: makeSelectLoading(),
  builders: makeSelectBuilders(),
  form: makeSelectForm(),
  errors: makeSelectErrors(),
  form_loading: makeSelectFormLoading(),
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
const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });
const withStyle = withStyles(styles);

export default compose(
  withConnect,
  memo,
  withRouter,
  withStyle,
  withReducer,
  withSaga,
)(DevelopersPage);
