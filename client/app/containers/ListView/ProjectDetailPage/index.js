/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useState, useRef } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import YouTube from 'react-youtube';
import { Element } from 'react-scroll';
import { FacebookProvider, Comments } from 'react-facebook';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as mapDispatchToProps from '../actions';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectOffer,
  makeSelectError,
  makeSelectOfferLoading,
  makeSelectOfferForm,
  makeSelectFavorite,
  makeSelectFavoriteLoading,
  makeSelectRelated,
  makeSelectFeedbackForm,
} from '../selectors';
import {
  makeSelectUser,
  makeSelectSlide,
  makeSelectToken,
} from '../../App/selectors';
import reducer from '../reducer';
import saga from '../saga';
import { clearOne } from '../../Comments/actions';

import { loadSlideRequest } from '../../App/actions';
import Search from '../../../components/Search/index';
import HeartIcon from '../../../assets/img/heart.svg';
import HeartLiked from '../../../assets/img/liked.svg';
import HeartLoading from '../../../assets/img/heartload.svg';

import ShareIcon from '../../../assets/img/share.svg';
import tape from '../../../assets/img/tape.svg';
import pillar from '../../../assets/img/pillar.svg';
import road from '../../../assets/img/road.svg';
import calendar from '../../../assets/img/calendar.svg';
import rs from '../../../assets/img/rs.svg';
import YoutubeImg from '../../../assets/img/youtube.jpg';
import tempImg3 from '../../../images/default.jpg';
import agent from '../../../images/agent.png';
import featuredimg from '../../../assets/img/featured.svg';
import premiumimg from '../../../assets/img/premium.svg';
import ladder from '../../../assets/img/ladder.svg';
import shower from '../../../assets/img/shower.svg';
import bed from '../../../assets/img/bed.svg';
import sofa from '../../../assets/img/sofa.svg';
import kitchen from '../../../assets/img/kitchen.svg';
import compass from '../../../assets/img/compass.svg';
import calc from '../../../assets/img/calc.png';
import arrow from '../../../assets/img/arrow-bottom.svg';
import { IMAGE_BASE, DATE_FORMAT, URL_BASE } from '../../App/constants';
import DetailSkeleton from '../Skeleton/Detail';
import NavBar from './components/navbar';
// import Comments from '../../Comments/Loadable';
import Feedback from '../Feedback/Loadable';
import { SkeletonTheme } from 'react-loading-skeleton';
import NotFoundPage from '../../NotFoundPage/Loadable';
import priceChecker from '../../../utils/priceChecker';

const key = 'listView';

export const ProjectDetailPage = props => {
  const {
    loadOneRequest,
    match,
    one,
    classes,
    loading,
    push,
    clearOne,
    slideObj,
    user,
    setOfferValue,
    offer,
    makeOfferRequest,
    errors,
    offer_loading,
    offerForm,
    setOfferForm,
    setFavoriteValue,
    favorite,
    favorite_loading,
    loadFavoriteRequest,
    token,
    clearOffer,
    related,
    setFeedbackForm,
    feedbackForm,
    setCountRequest,
  } = props;

  const thumbnailEl = useRef(null);
  const thumbnailEl2 = useRef(null);
  const thumbnailEl3 = useRef(null);

  const url = window.location.href;
  const [open, setOpen] = useState(false);
  const [shareDiv, setShareDiv] = useState(false);
  const [showVideo, setShowVideo] = useState([]);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [check, setCheck] = useState(true);
  const [showFullscreenButton, setShowFullscreenButton] = useState(false);
  const [
    showGalleryFullscreenButton,
    setShowGalleryFullscreenButton,
  ] = useState(true);
  const [play, setPlay] = useState(true);

  const [propertyTab, setPropertyTab] = useState(0);

  const [type_image, setTypeImage] = useState('');
  const [type_open, setTypeOpen] = useState(false);

  // const [active, setActive] = useState(false);

  const handlePropertyTypeTab = index => {
    setPropertyTab(index);
  };

  const showModal = () => {
    // setActive(true);
    setOfferForm(true);
  };

  const handleModal = () => {
    // setActive(false);
    setOfferForm(false);
  };

  const showType = image => {
    // setActive(true);
    setTypeImage(image);
    setTypeOpen(true);
  };

  const closeType = () => {
    // setActive(false);
    setTypeOpen(false);
  };

  const showFeedbackModal = () => {
    // setActive(true);
    setFeedbackForm(true);
  };

  const handleFeedbackModal = () => {
    // setActive(false);
    setFeedbackForm(false);
  };

  useEffect(() => {
    clearOffer();
    if (match.params && match.params.slug) {
      loadOneRequest(match.params.slug);
      loadSlideRequest();
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    clearOffer();
    if (match.params && match.params.slug) {
      loadOneRequest(match.params.slug);
      loadSlideRequest();
    }
    window.scrollTo(0, 0);
  }, [match.params.slug]);

  useEffect(() => {
    if (token && token !== '' && one._id) {
      loadFavoriteRequest(one._id);
    }
    if (one._id) {
      setCountRequest(one._id);
    }
  }, [one]);

  useEffect(() => {
    if (one.media.youtube_video_id === '') {
      setCheck(false);
      setShowFullscreenButton(true);
      setShowPlayButton(true);
      setPlay(false);
    } else {
      setCheck(true);
      setShowFullscreenButton(false);
      setShowPlayButton(false);
      setPlay(true);
    }
  }, [one]);

  const handleShareDiv = () => {
    setShareDiv(!shareDiv);
  };

  const handleClick = () => {
    if (user.id) {
      setOpen(true);
    } else {
      push('/signup-user', {
        from: { pathname: `/project/${match.params.slug}` },
      });
    }
  };

  const handleRedirectClick = path => {
    push(path);
  };

  const handleFavorite = () => {
    if (token && token !== '') {
      setFavoriteValue();
    } else {
      push('/signup-user', {
        from: { pathname: `/project/${match.params.slug}` },
      });
    }
  };

  const handleMakeOffer = () => {
    const id = one._id;
    makeOfferRequest(id);
  };

  const handleClose = () => {
    setOpen(false);
    clearOne();
  };

  useEffect(() => {
    setOfferValue({
      key: 'name',
      value: user.name,
    });
    setOfferValue({
      key: 'email',
      value: user.email,
    });
    setOfferValue({
      key: 'phone',
      value: user.mobile_no,
    });
  }, [user]);

  const handleChange = name => event => {
    event.persist();

    setOfferValue({ key: name, value: event.target.value });
  };

  const onReady = event => {
    const showVideo = showVideo;
    showVideo.push(event.target);
    setShowVideo({
      showVideo,
    });
  };

  const resetVideo = () => {
    setShowVideo({});

    if (showPlayButton) {
      setShowGalleryPlayButton(true);
    }

    if (showFullscreenButton) {
      setShowGalleryFullscreenButton(true);
    }
  };

  const toggleShowVideo = videoUrl => {
    showVideo[videoUrl] = !showVideo[videoUrl];
    setShowVideo({
      showVideo,
    });

    if (showVideo[videoUrl]) {
      if (showPlayButton) {
        setShowGalleryPlayButton(false);
      }

      if (showFullscreenButton) {
        setShowGalleryFullscreenButton(false);
      }
    }
  };

  const renderVideo = item => {
    const opts = {
      height: '480',
      width: '100%',
    };
    return (
      play === true && (
        <div>
          <div className="video-wrapper">
            <YouTube videoId={item.embedUrl} opts={opts} onReady={onReady} />
          </div>
        </div>
      )
    );
  };

  const NextSlide = index => {
    if (check === true) {
      if (index !== 0) {
        setShowFullscreenButton(true);
        setShowPlayButton(true);
        setPlay(false);
      } else {
        setShowFullscreenButton(false);
        setShowPlayButton(false);
        setPlay(true);
      }
    }
  };

  const thumnailClick = () => {
    thumbnailEl.current.fullScreen();
    // ImageGallery.fullScreen();
  };
  const thumnailClick2 = () => {
    thumbnailEl2.current.fullScreen();
    // ImageGallery.fullScreen();
  };

  const thumnailClick3 = () => {
    thumbnailEl3.current.fullScreen();
    // ImageGallery.fullScreen();
  };

  const images = one.media.images.map(function imagearr(each) {
    return {
      original: `${IMAGE_BASE}${each.id.path}`,
      thumbnail: `${IMAGE_BASE}${each.id.path}`.replace(
        'public/',
        'public/100-100/',
      ),
      description: each.caption.title !== 'Other' && `${each.caption.title}`,
    };
  });

  if (one.media.youtube_video_id && one.media.youtube_video_id !== '') {
    images.unshift({
      thumbnail: `https://img.youtube.com/vi/${
        one.media.youtube_video_id
      }/default.jpg`,
      original: YoutubeImg,
      embedUrl: one.media.youtube_video_id,
      description: 'Youtube Video',
      renderItem: renderVideo.bind(this),
    });
  }

  const project_floor_plan = one.project_floor_plan
    ? one.project_floor_plan.map(function imagearr(each) {
        return {
          original: `${IMAGE_BASE}${each.image.path}`,
          thumbnail: `${IMAGE_BASE}${each.image.path}`,
        };
      })
    : {};

  const renderThumbnail = item => {
    return (
      <div>
        <img className="image-gallery-image" src={item.thumbnail} />
        <span className="image-thumbnail-description">{item.title}</span>
      </div>
    );
  };

  const project_payment_plan = one.project_payment_plan
    ? one.project_payment_plan.map(function imagearr(each) {
        return {
          original: `${IMAGE_BASE}${each.image.path}`,
          thumbnail: `${IMAGE_BASE}${each.image.path}`,
          title: each.title,
          renderThumbInner: renderThumbnail.bind(this),
        };
      })
    : {};

  const property_types_images =
    one.project_property_type &&
    one.project_property_type[propertyTab] &&
    one.project_property_type[propertyTab].image
      ? one.project_property_type[propertyTab].image.map(function imagearr(
          each,
        ) {
          return {
            original: `${IMAGE_BASE}${each.path}`,
            thumbnail: `${IMAGE_BASE}${each.path}`,
          };
        })
      : {};

  return !loading && one.msg && one.msg === 'product not found' ? (
    <NotFoundPage />
  ) : (
    <>
      <Helmet>
        <title>{one.basic.title ? one.basic.title : 'Title'}</title>
      </Helmet>
      <div className="bg-white">
        <div className="container mx-auto my-4">
          {loading ? (
            <div className="">
              <div className="lg:flex">
                <div className="mb-2 flex-1 overflow-hidden">
                  <Skeleton width={1000} height={480} />
                </div>
                <div className="hidden lg:block w-32 mb-2 flex justify-between">
                  <Skeleton width={92} height={60} />
                  <Skeleton width={92} height={60} />
                  <Skeleton width={92} height={60} />
                  <Skeleton width={92} height={60} />
                  <Skeleton width={92} height={60} />
                  <Skeleton width={92} height={60} />
                  <Skeleton width={92} height={60} />
                </div>
              </div>

              <div className="mb-4">
                {' '}
                <Skeleton width={300} height={40} />
              </div>
              <Skeleton width={100} height={20} />

              <div className="mb-4 lg:w-3/4">
                <Skeleton width={1000} height={180} />
              </div>
              <div className="mb-4 lg:w-3/4">
                <Skeleton width={1000} height={180} />
              </div>
              <div className="mb-4 lg:w-3/4">
                <Skeleton width={1000} height={180} />
              </div>
            </div>
          ) : (
            <>
              {one.basic.title && (
                <>
                  <div className="imagegallerycontainer">
                    <ImageGallery
                      thumbnailPosition="right"
                      items={images}
                      showFullscreenButton={showFullscreenButton}
                      showPlayButton={showPlayButton}
                      onSlide={NextSlide.bind(this)}
                    />
                  </div>

                  <div className="mt-10">
                    <h1 className="text-2xl md:text-4xl flex tracking-tighter pt-4">
                      {one.basic.title ? one.basic.title : 'Title'}{' '}
                    </h1>
                    <p>
                      {one.address && one.address.area_id
                        ? one.address.area_id.name
                        : ''}
                      {', '}
                      {one.address && one.address.city_id
                        ? one.address.city_id.name
                        : ''}
                    </p>
                    <p className="text-sm text-gray-700">
                      {!one.is_project
                        ? `${one.prefix}${one.property_id}`
                        : `${one.prefix}${one.project_id}`}
                    </p>

                    <div className="flex items-center">
                      {/* {one.is_exclusive && (
                    <span className="text-sm text-white relative inline-block bg-red-600 rounded mr-6">
                      <i className="">
                        Exclusive Project
                 </span>
                      )} */}
                      {/* {one.is_featured && (
                        <span className="text-sm text-white relative inline-block tag tag-lg mr-6">
                          <img
                            className="float-left mr-2 mt-1"
                            src={premiumimg}
                            alt="featured"
                          />
                          Featured
                        </span>
                      )}

                      {one.is_premium && (
                        <span className="text-sm text-white relative inline-block tag tag-lg bg-primary mr-10">
                          <img
                            className="float-left mr-2 mt-1"
                            src={featuredimg}
                            alt="premium"
                          />
                          Premium
                        </span>
                      )} */}
                    </div>

                    {/* <NavBar /> */}
                    <div className="lg:flex">
                      <div className="lg:w-3/4">
                        <Element name="overview">
                          {/* <p className="text-sm opacity-5 mt-2">
                        Posted on {moment(one.added_at).format(DATE_FORMAT)}
                      </p> */}

                          <div className="mt-4 rounded bg-white" id="overview">
                            <div className="flex flex-wrap py-4">
                              {one.location_property &&
                                one.location_property.total_area && (
                                  <div className="inline-flex w-full md:w-1/4 rounded mb-4">
                                    <div className="flex1 pl-4">
                                      <span className="uppercase text-sm block">
                                        Area Covered
                                      </span>
                                      <span className="font-bold">
                                        {one.location_property
                                          ? one.location_property.total_area
                                          : '0'}{' '}
                                        {one.location_property
                                          ? one.location_property
                                              .total_area_unit.title
                                          : 'Ana'}
                                      </span>{' '}
                                    </div>
                                  </div>
                                )}
                              {one.location_property &&
                                one.location_property.built_area && (
                                  <div className="inline-flex w-full md:w-1/4 rounded mb-4">
                                    {/* <div className="w-10 h-10 flex items-center justify-center">
                                      <img src={pillar} alt="Area Covered" />
                                    </div> */}
                                    <div className="flex1 pl-4">
                                      <span className="uppercase text-sm block">
                                        Built-up Area
                                      </span>
                                      <span className="font-bold">
                                        {one.location_property
                                          ? one.location_property.built_area
                                          : ''}{' '}
                                        {one.location_property
                                          ? one.location_property
                                              .built_area_unit.title
                                          : ''}
                                      </span>{' '}
                                    </div>
                                  </div>
                                )}
                              {one.basic &&
                                one.basic.property_category.title !== 'Land' &&
                                one.building &&
                                one.building.built_year && (
                                  <div className="inline-flex w-full md:w-1/4 rounded mb-4">
                                    {/* <div className="w-10 h-10 flex items-center justify-center">
                                      <img src={calendar} alt="Area Covered" />
                                    </div> */}
                                    <div className="flex1 pl-4">
                                      <span className="uppercase text-sm block">
                                        Built Year
                                      </span>
                                      <span className="font-bold">
                                        {one.building
                                          ? one.building.built_year
                                          : '2'}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              {one.location_property &&
                                one.location_property.road_access_value ===
                                  0 && (
                                  <div className="inline-flex w-full md:w-1/4 rounded mb-4">
                                    {/* <div className="w-10 h-10 flex items-center justify-center">
                                      <img src={road} alt="Area Covered" />
                                    </div> */}
                                    <div className="flex1 pl-4">
                                      <span className="uppercase text-sm block">
                                        Road Access
                                      </span>
                                      <span className="font-bold">
                                        {one.location_property
                                          ? one.location_property
                                              .road_access_value
                                          : '0'}{' '}
                                        {one.location_property
                                          ? one.location_property
                                              .road_access_length_unit.title
                                          : ''}{' '}
                                        /{' '}
                                        {one.location_property &&
                                        one.location_property
                                          .road_access_road_type &&
                                        one.location_property
                                          .road_access_road_type.title
                                          ? one.location_property
                                              .road_access_road_type.title
                                          : ''}
                                      </span>
                                    </div>
                                  </div>
                                )}

                              <div className="inline-flex w-full md:w-1/4 rounded mb-4">
                                <div className="flex1 pl-4">
                                  <span className="uppercase text-sm block">
                                    Project Status
                                  </span>
                                  <p className="font-bold">
                                    {one.project_status &&
                                    one.project_status.title
                                      ? one.project_status.title
                                      : 'Undefined'}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4">
                              {/* {one.range && (
                                <>
                                  Range {one.range.from || ''} to{' '}
                                  {one.range.to || ''} per {one.range.unit}
                                </>
                              )} */}
                              {/* {one.unit_count && (
                                <p> {one.unit_count} Total </p>
                              )} */}

                              {one.basic ? (
                                <div
                                  className="leading-relaxed text-gray-600"
                                  dangerouslySetInnerHTML={{
                                    __html: one.basic.description,
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </Element>

                        {one.is_project && (
                          <>
                            <h2 className="font-bold  mb-6 text-2xl mt-12">
                              Amenities
                            </h2>
                            <div className="flex p-4 flex-wrap -mx-2 md:-mx-4">
                              {one.building.amenities
                                ? one.building.amenities.map(each => (
                                    <div
                                      className="w-1/3 md:w-1/5 text-center px-1 md:px-4 my-4 flex items-center"
                                      key={`amenities-${each.title}`}
                                    >
                                      <div className="w-6 h-6 text-center">
                                        <img
                                          className="opacity-50"
                                          src={
                                            each.media
                                              ? `${IMAGE_BASE}${
                                                  each.media.path
                                                }`
                                              : ''
                                          }
                                          style={{
                                            maxHeight: '100%',
                                            margin: '0 auto',
                                          }}
                                        />
                                      </div>

                                      <p className="text-sm opacity-75 text-left pl-2 md:pl-4 flex-1">
                                        {each.title}
                                      </p>
                                    </div>
                                  ))
                                : 'NA'}
                            </div>

                            <Element name="features">
                              {one.project_features &&
                                one.project_features.length > 0 && (
                                  <div
                                    className="rounded mt-4 bg-white"
                                    id="features"
                                  >
                                    <h2 className="font-bold  mb-6 text-2xl mt-12">
                                      Project Features
                                    </h2>

                                    {/* {one.basic &&
                                      one.basic.property_category.title !==
                                        'Land' && (
                                        <div className="flex p-4 flex-wrap -mx-2 md:-mx-4">
                                         
                                        </div>
                                      )} */}

                                    {one.project_features.map(x => (
                                      <div
                                        key={`features-${x._id}`}
                                        className="flex items-center px-4 py-2"
                                      >
                                        <span
                                          className="border border-gray-400 w-4 h-4 inline-block rounded inline-flex items-center justify-center mr-2"
                                          style={{ lineHeight: 0 }}
                                        >
                                          <i className="material-icons text-xs text-gray-400 mt-px">
                                            check
                                          </i>
                                        </span>

                                        <p className="pl-2">
                                          <span className="font-bold">
                                            {x.feature.title}
                                          </span>
                                          {x.value ? (
                                            <span>: {x.value}</span>
                                          ) : (
                                            ''
                                          )}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </Element>

                            {one.project_property_type &&
                              one.project_property_type.length > 0 && (
                                <Element name="types">
                                  <div className="rounded mt-4 bg-white">
                                    <h2 className="text-lg md:text-2xl md:tracking-tighter py-2 px-4">
                                      Property Types
                                    </h2>

                                    <div className="flex px-6 border-b border-gray-300 mb-4">
                                      {one.project_property_type.map(
                                        (x, index) => (
                                          <button
                                            className={`rounded-t bg-white border-transparent capitalize py-1 px-6 cursor-pointer  ${
                                              propertyTab === index
                                                ? '-mb-px border-primary border-b-2'
                                                : ''
                                            }`}
                                            onClick={() =>
                                              handlePropertyTypeTab(index)
                                            }
                                            rounded-t
                                            bg-white
                                            border-transparent
                                            capitalize
                                            py-1
                                            px-6
                                            cursor-pointer
                                            mb-px
                                            border-blue-300
                                            border-b-2
                                          >
                                            <p className="font-bold">
                                              {x.type}
                                            </p>
                                            <p className="text-sm opacity-60">
                                              {x.unit_count || ''} Units
                                            </p>
                                            <p className="text-sm opacity-60">
                                              {
                                                priceChecker(x.minimum_price)
                                                  .numeral
                                              }{' '}
                                              {
                                                priceChecker(x.minimum_price)
                                                  .text
                                              }{' '}
                                              to{' '}
                                              {
                                                priceChecker(x.maximum_price)
                                                  .numeral
                                              }{' '}
                                              {
                                                priceChecker(x.maximum_price)
                                                  .text
                                              }
                                            </p>
                                          </button>
                                        ),
                                      )}
                                    </div>

                                    {one.project_property_type && (
                                      <div
                                        key={`property-type-price-${
                                          one.project_property_type[propertyTab]
                                            ._id
                                        }`}
                                        className="flex pl-5"
                                      >
                                        {/* <div className="border border-gray-200 mr-5 w-16 h-16 rounded-full inline-block bg-gray-100 text-center flex items-center justify-center text-2xl text-gray-500">
                                      {propertyTab + 1}
                                    </div> */}
                                        <div className="flex-1">
                                          {/* <h3 className="font-bold text-lg">
                                        {
                                          one.project_property_type[propertyTab]
                                            .type
                                        }
                                      </h3> */}
                                          <div className="md:flex pt-4">
                                            {one.project_property_type[
                                              propertyTab
                                            ].area && (
                                              <div className="flex items-center mr-12 mb-6">
                                                <img src={tape} />
                                                <p className="text-xl text-gray-600 pl-5 leading-none">
                                                  <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                                    Total Area:
                                                  </p>
                                                  {
                                                    one.project_property_type[
                                                      propertyTab
                                                    ].area
                                                  }
                                                  {one.project_property_type[
                                                    propertyTab
                                                  ].area_option &&
                                                  one.project_property_type[
                                                    propertyTab
                                                  ].area_option.title
                                                    ? one.project_property_type[
                                                        propertyTab
                                                      ].area_option.title
                                                    : ''}
                                                </p>
                                              </div>
                                            )}
                                            {one.project_property_type[
                                              propertyTab
                                            ].price && (
                                              <div className="flex items-center mr-12 mb-6">
                                                <img
                                                  className="opacity-50 h-6"
                                                  src={rs}
                                                />
                                                <p className="text-xl text-gray-600 pl-5 leading-none">
                                                  <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                                    Price:
                                                  </p>
                                                  Rs.
                                                  {Intl.NumberFormat(
                                                    'en-IN',
                                                  ).format(
                                                    one.project_property_type[
                                                      propertyTab
                                                    ].price,
                                                  )}
                                                </p>
                                              </div>
                                            )}
                                            {one.project_property_type[
                                              propertyTab
                                            ].floor_no && (
                                              <div className="flex items-center mr-12 mb-6">
                                                <img
                                                  className="opacity-50 h-6"
                                                  src={ladder}
                                                  alt="floor"
                                                />
                                                <p className="text-xl text-gray-600 pl-5 leading-none">
                                                  <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                                    Floor no
                                                  </p>
                                                  {one.project_property_type[
                                                    propertyTab
                                                  ].floor_no || ''}
                                                </p>
                                              </div>
                                            )}
                                            {/* <div className="flex items-center mr-12 mb-6">
                                              <img
                                                className="h-8"
                                                src={compass}
                                              />
                                              <p className="text-xl text-gray-600 pl-5 leading-none">
                                                <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                                  Facing
                                                </p>
                                                East
                                              </p>
                                            </div> */}

                                            {/* <div className="flex items-center mr-12 mb-6">
                                          <img
                                            className="opacity-50 h-6"
                                            src={rs}
                                          />
                                          <p className="text-xl text-gray-600 pl-5 leading-none">
                                            <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                              Total Unit:
                                          </p>
                                            {one.project_property_type[
                                              propertyTab
                                            ].total_unit || ''}
                                          </p>
                                        </div>

                                        <div className="flex items-center mr-12 mb-6">
                                          <img
                                            className="opacity-50 h-6"
                                            src={rs}
                                          />
                                          <p className="text-xl text-gray-600 pl-5 leading-none">
                                            <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                              Available Unit:
                                          </p>
                                            {one.project_property_type[
                                              propertyTab
                                            ].available_unit || ''}
                                          </p>
                                        </div> */}
                                          </div>

                                          <div className="md:flex pt-4">
                                            {one.project_property_type[
                                              propertyTab
                                            ].bathroom && (
                                              <div className="flex items-center mr-12 mb-6">
                                                <img src={shower} />
                                                <p className="text-xl text-gray-600 pl-5 leading-none">
                                                  <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                                    Bathroom:
                                                  </p>
                                                  {one.project_property_type[
                                                    propertyTab
                                                  ].bathroom || ''}
                                                </p>
                                              </div>
                                            )}
                                            {one.project_property_type[
                                              propertyTab
                                            ].bedroom && (
                                              <div className="flex items-center mr-12 mb-6">
                                                <img
                                                  className="h-6"
                                                  src={bed}
                                                />
                                                <p className="text-xl text-gray-600 pl-5 leading-none">
                                                  <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                                    Bedroom:
                                                  </p>

                                                  {one.project_property_type[
                                                    propertyTab
                                                  ].bedroom || ''}
                                                </p>
                                              </div>
                                            )}
                                            {one.project_property_type[
                                              propertyTab
                                            ].kitchen && (
                                              <div className="flex items-center mr-12 mb-6">
                                                <img
                                                  className="h-6"
                                                  src={kitchen}
                                                />
                                                <p className="text-xl text-gray-600 pl-5 leading-none">
                                                  <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                                    Kitchen:
                                                  </p>
                                                  {one.project_property_type[
                                                    propertyTab
                                                  ].kitchen || ''}
                                                </p>
                                              </div>
                                            )}

                                            {/* <div className="flex items-center mr-12 mb-6">
                                          <img
                                            className="opacity-50 h-6"
                                            src={shower}
                                          />
                                          <p className="text-xl text-gray-600 pl-5 leading-none">
                                            <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                              Puja Room:
                                          </p>
                                            {one.project_property_type[
                                              propertyTab
                                            ].puja_room || ''}
                                          </p>
                                        </div> */}
                                            {one.project_property_type[
                                              propertyTab
                                            ].living_room && (
                                              <div className="flex items-center mr-12 mb-6">
                                                <img
                                                  className="h-6"
                                                  src={sofa}
                                                />
                                                <p className="text-xl text-gray-600 pl-5 leading-none">
                                                  <p className="uppercase text-xs tracking-widest pb-1 text-black">
                                                    Living Room:
                                                  </p>
                                                  {one.project_property_type[
                                                    propertyTab
                                                  ].living_room || ''}
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex flex-wrap -mx-4">
                                            {one.project_property_type[
                                              propertyTab
                                            ].floor_plan &&
                                              one.project_property_type[
                                                propertyTab
                                              ].floor_plan.length > 0 &&
                                              one.project_property_type[
                                                propertyTab
                                              ].floor_plan.map(plan => (
                                                <div className="md:w-1/3 px-4">
                                                  <span className="text-lg font-bold mb-2">
                                                    {plan.floor_name}
                                                  </span>
                                                  <div className="p-px border cursor-pointer my-1">
                                                    {plan.image &&
                                                      plan.image[0] && (
                                                        <img
                                                          src={`${IMAGE_BASE}${
                                                            plan.image[0].path
                                                          }`}
                                                          onClick={() =>
                                                            showType(plan.image)
                                                          }
                                                        />
                                                      )}
                                                  </div>
                                                  {plan.feature_list &&
                                                    plan.feature_list.length >
                                                      0 && (
                                                      <>
                                                        <ol>
                                                          {plan.feature_list.map(
                                                            ft_list => (
                                                              <li>
                                                                <span className="border border-gray-400 w-4 h-4 rounded inline-flex items-center justify-center mr-2">
                                                                  <i className="material-icons text-xs text-gray-400 mt-px">
                                                                    check
                                                                  </i>
                                                                </span>
                                                                {ft_list}
                                                              </li>
                                                            ),
                                                          )}
                                                        </ol>
                                                      </>
                                                    )}
                                                </div>
                                              ))}
                                          </div>
                                          <div className="hideMainImage">
                                            <ImageGallery
                                              originalClass="w-0" // css for image?
                                              showPlayButton={false}
                                              showFullscreenButton={false}
                                              ref={thumbnailEl3}
                                              onThumbnailClick={() =>
                                                thumnailClick3()
                                              }
                                              items={property_types_images}
                                            />
                                          </div>

                                          {/* {one.project_property_type[propertyTab]
                                      .image &&
                                      one.project_property_type[propertyTab]
                                        .image.length > 0 && (
                                        <div className="md:flex pt-4">
                                          {one.project_property_type[
                                            propertyTab
                                          ].image.map(img => (
                                            <div className="flex" key={img._id}>
                                              <img
                                                src={`${IMAGE_BASE}${img.path}`}
                                                alt={
                                                  one.project_property_type[
                                                    propertyTab
                                                  ].type
                                                }
                                                style={{
                                                  width: 250,
                                                }}
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      )} */}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </Element>
                              )}

                            {/* {one.project_floor_plan &&
                          one.project_floor_plan.length > 0 && (
                            <div
                              className="rounded mt-4 bg-white"
                              id="floor"
                            >
                              <h2 className="font-bold  mb-6 text-2xl mt-12">
                                Floor Plans
                              </h2>
                                <div className="p-4 hideMainImage">
                                  <ImageGallery
                                    originalClass="w-0" // css for image?
                                    showPlayButton={false}
                                    showFullscreenButton={false}
                                    ref={thumbnailEl}
                                    onThumbnailClick={() => thumnailClick()}
                                    items={project_floor_plan}
                                  />
                                </div>
                              </div>
                            </div>
                          )} */}
                            {one.project_payment_plan &&
                              one.project_payment_plan.length > 0 && (
                                <div
                                  id="payment"
                                  className="rounded mt-4 bg-white"
                                >
                                  <h2 className="font-bold  mb-6 text-2xl mt-12">
                                    Payment Plans
                                  </h2>
                                  <div className="hideMainImage">
                                    <ImageGallery
                                      showPlayButton={false}
                                      showFullscreenButton={false}
                                      items={project_payment_plan}
                                      ref={thumbnailEl2}
                                      onThumbnailClick={() => thumnailClick2()}
                                    />
                                  </div>
                                </div>
                              )}
                          </>
                        )}
                        <div id="map" className="rounded mt-4 bg-white">
                          <h2 className="font-bold  mb-6 text-2xl mt-12">
                            Map
                          </h2>
                          <div
                            className="relative overflow-hidden"
                            style={{ paddingTop: '56%' }}
                          >
                            <iframe
                              title="map"
                              src={one.map_src ? one.map_src : ''}
                              frameBorder="0"
                              className="absolute left-0 top-0 border-0 w-full h-full"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        {one.is_project ? (
                          <>
                            <div
                              className="rounded mt-4 bg-white"
                              id="developer"
                            >
                              <h2 className="font-bold  mb-6 text-2xl mt-12">
                                Developer
                              </h2>
                              <div className="p-4 flex">
                                <Link
                                  target="_blank"
                                  className="block"
                                  to={`/developer/&developer_id=${
                                    one.developer_id._id
                                  }`}
                                >
                                  <img
                                    className="h-12"
                                    src={
                                      IMAGE_BASE +
                                      (one.developer_id.logo &&
                                        one.developer_id.logo.path)
                                    }
                                    alt="agent name"
                                  />
                                </Link>
                                <div className="flex-1 pl-4">
                                  <Link
                                    target="_blank"
                                    className="text-blue no-underline my-2"
                                    to={`/developer/&developer_id=${
                                      one.developer_id._id
                                    }`}
                                  >
                                    {one.developer_id.name && (
                                      <p className="font-bold text-primary">
                                        {one.developer_id.name}
                                      </p>
                                    )}
                                    {one.developer_id.address && (
                                      <p className="text-gray-600">
                                        {one.developer_id.address}{' '}
                                      </p>
                                    )}
                                  </Link>
                                </div>
                              </div>

                              {one.developer_id.bio && (
                                <div
                                  className="text-gray-600 p-4"
                                  dangerouslySetInnerHTML={{
                                    __html: one.developer_id.bio,
                                  }}
                                />
                              )}
                            </div>
                          </>
                        ) : one.agency_id ? (
                          <>
                            <h2 className="mt-8 mb-2 text-2xl font-bold">
                              Posted By
                            </h2>
                            <Link
                              to={`/list/&agency_id=${one.agency_id._id}`}
                              className="flex my-4"
                            >
                              <img
                                className="h-12"
                                src={IMAGE_BASE + one.agency_id.logo.path}
                                alt="agent name"
                              />
                              <div className="flex-1 pl-4">
                                <p className="font-bold">
                                  {one.agency_id.title}
                                </p>
                                <Link
                                  className="text-blue no-underline my-2"
                                  to="#"
                                >
                                  {one.agency_id.description}
                                </Link>
                              </div>
                            </Link>
                          </>
                        ) : one.agency_id ? (
                          <>
                            <h2 className="mt-8 mb-2 text-2xl font-bold">
                              Posted By - {one.added_by.name}
                            </h2>
                            <div className="flex my-4">
                              <img
                                className="h-12"
                                src={
                                  one.added_by.image !== null &&
                                  IMAGE_BASE + one.added_by.image.path
                                }
                                alt="agent name"
                              />
                              <div className="flex-1 pl-4">
                                <p className="font-bold">
                                  {one.agency_id.name}
                                </p>
                                <Link
                                  className="text-blue no-underline my-2"
                                  to="#"
                                >
                                  {one.agency_id.description}
                                </Link>
                              </div>
                            </div>
                          </>
                        ) : (
                          one.added_by && (
                            <>
                              <h2 className="mt-4 mb-2 text-2xl font-bold">
                                Posted By
                              </h2>
                              <div className="flex my-4">
                                <img
                                  className="h-12"
                                  src={IMAGE_BASE + one.added_by.image.path}
                                  alt="agent name"
                                />
                                <div className="flex-1 pl-4">
                                  <p className="font-bold">
                                    {one.added_by.name}
                                  </p>
                                  <Link
                                    className="text-blue no-underline my-2"
                                    to="#"
                                  >
                                    {one.added_by.bio}
                                  </Link>
                                </div>
                              </div>
                            </>
                          )
                        )}

                        <div className="bg-white rounded shadow p-4 flex items-center mt-4 hidden">
                          <img src={calc} alt="calculator" className="h-32" />
                          <div className="flex-1 px-8">
                            <h3 className="text-2xl md:text-3xl text-black tracking-tight">
                              How much can you take loan?
                            </h3>
                            <p className="text-gray-600">
                              Calculate home loans and get bigger picture of
                              future
                            </p>
                          </div>

                          <div className="w-40 text-center">
                            <div className="flex justify-center">
                              <img alt="arrow" src={arrow} />
                              <span className="italic pl-2 text-gray-500 text-sm">
                                it’s free
                              </span>
                            </div>
                            <span
                              style={{
                                boxShadow: '0 15px 30px 0 rgba(2,145,221,0.33)',
                              }}
                              className="block p-3 text-white bg-secondary  rounded-full"
                            >
                              Calculate Loan
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center mt-4 mb-12">
                          <button
                            className="underline text-right text-red-500 text-sm cursor-pointer mt-1 block"
                            type="button"
                            onClick={showFeedbackModal}
                          >
                            Report Developer or Project?
                          </button>
                        </div>

                        <FacebookProvider appId="403635297248992">
                          <Comments
                            href={`${URL_BASE}detail/${one.property_id}`}
                            width="100%"
                          />
                        </FacebookProvider>
                        {/* Related Start */}

                        {related && related.length > 0 && (
                          <div className="mt-16">
                            <h2 className="text-2xl font-bold tracking-tight">
                              <span className="">Related Projects</span>
                              {/* {one.developer_id && (
                              <span className="text-secondary">
                                {' '}
                                From {one.developer_id.name}
                              </span>
                            )} */}
                            </h2>
                            <div className="md:flex flex-wrap -mx-2 mt-4">
                              {related.map(each => (
                                <div
                                  className="md:w-1/3 px-2 relative"
                                  key={`related-${each._id}`}
                                >
                                  <Link
                                    className="absolute left-0 right-0 top-0 bottom-0 z-50"
                                    to={`/project/${each.slug_url}`}
                                  />

                                  {each && (
                                    <div
                                      className="rounded relative overflow-hidden cursor-pointer bg-white"
                                      onClick={() =>
                                        redirectToDetail(each.slug_url)
                                      }
                                    >
                                      <div className="relative block overflow-hidden h-48">
                                        <img
                                          src={
                                            each.media &&
                                            each.media.images &&
                                            each.media.images[0]
                                              ? `${IMAGE_BASE}${
                                                  each.media.images[0].id.path
                                                }`
                                              : tempImg
                                          }
                                          className="object-cover"
                                          alt=""
                                        />
                                      </div>
                                      <div className="p-2 w-full">
                                        <h3 className="text-xl tracking-tight truncate text-black">
                                          {each.basic.title.trim() === ''
                                            ? 'Title'
                                            : each.basic.title}
                                        </h3>

                                        <p className="pb-2 text-sm text-gray-600">
                                          {each.address && each.address.area_id
                                            ? each.address.area_id.name
                                            : 'Area'}
                                          {', '}
                                          {each.address && each.address.city_id
                                            ? each.address.city_id.name
                                            : 'City'}
                                        </p>

                                        {/* <p className="font-bold text-primary">
                                          Starting Price:{' '}
                                          <span className="text-black">
                                            {' '}
                                            Rs.
                                            {each.project_property_type &&
                                              each.project_property_type[0] &&
                                              Intl.NumberFormat('en-IN').format(
                                                each.project_property_type[0]
                                                  .price,
                                              )}
                                          </span>
                                        </p> */}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Related End */}
                      </div>
                      <div className="lg:w-1/4 lg:pl-4">
                        <div style={{ position: 'sticky', top: 50 }}>
                          <div className="border rounded mt-4 overflow-hidden bg-white p-4">
                            <div className="text-base font-normal">
                              <h2 className="text-xl font-bold">
                                Contact Developer
                              </h2>
                              <p className="text-sm text-black">
                                Developer will get notified when you send
                                message
                              </p>

                              <div className="mt-2">
                                <label className="text-sm">Name</label>
                                <div className="relative">
                                  <i
                                    className="material-icons text-base"
                                    style={{
                                      position: 'absolute',
                                      left: 5,
                                      top: 10,
                                    }}
                                  >
                                    person_pin
                                  </i>
                                  <input
                                    className="inputbox bg-white"
                                    style={{ paddingLeft: 35 }}
                                    id="grid-name"
                                    type="text"
                                    value={offer.name}
                                    onChange={handleChange('name')}
                                  />
                                </div>
                                {errors.name && (
                                  <div id="component-error-text">
                                    {errors.name}
                                  </div>
                                )}
                              </div>

                              <div className="mt-2">
                                <label className="text-sm" htmlFor="Email">
                                  Email
                                </label>
                                <div className="relative">
                                  <i
                                    className="material-icons text-base"
                                    style={{
                                      position: 'absolute',
                                      left: 5,
                                      top: 10,
                                    }}
                                  >
                                    mail
                                  </i>
                                  <input
                                    className="inputbox bg-white"
                                    style={{ paddingLeft: 35 }}
                                    id="grid-email"
                                    type="text"
                                    value={offer.email}
                                    onChange={handleChange('email')}
                                  />
                                </div>
                                {errors.email && (
                                  <div id="component-error-text">
                                    {errors.email}
                                  </div>
                                )}
                              </div>

                              <div className="mt-2">
                                <label className="text-sm" htmlFor="phone">
                                  Phone Number
                                </label>
                                <div className="relative">
                                  <i
                                    className="material-icons text-base"
                                    style={{
                                      position: 'absolute',
                                      left: 5,
                                      top: 10,
                                    }}
                                  >
                                    smartphone
                                  </i>
                                  <input
                                    className="inputbox bg-white"
                                    style={{ paddingLeft: 35 }}
                                    placeholder=""
                                    type="text"
                                    id="grid-phone"
                                    value={offer.phone}
                                    onChange={handleChange('phone')}
                                  />
                                </div>
                                {errors.phone && (
                                  <div id="component-error-text">
                                    {errors.phone}
                                  </div>
                                )}
                              </div>
                              <div className="mt-2">
                                <label className="text-sm" htmlFor="message">
                                  Message
                                </label>
                                <textarea
                                  className="inputbox bg-white"
                                  cols="45"
                                  rows="5"
                                  value={offer.message}
                                  maxLength="140"
                                  onChange={handleChange('message')}
                                />
                                <div>{offer.message.length} / 140</div>

                                <div id="component-error-text">
                                  {errors.message && errors.message}
                                </div>
                              </div>
                              <div className="text-right">
                                <button
                                  type="button"
                                  className="py-2 px-6 rounded mt-2 text-sm text-blue text-white bg-primary font-bold"
                                  onClick={handleMakeOffer}
                                >
                                  {offer_loading ? '...' : 'Send Message'}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center py-4">
                            <button
                              className="border rounded border-gray-300 text-red-600 text-sm py-1 px-2 inline-block cursor-pointer hover:border-red-600"
                              onClick={() => handleFavorite()}
                            >
                              {favorite.is_favourite ? (
                                <img
                                  className="inline-block w-4 mr-2"
                                  src={
                                    favorite_loading ? HeartLiked : HeartLiked
                                  }
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className="inline-block w-4 mr-2"
                                  src={favorite_loading ? HeartIcon : HeartIcon}
                                  alt="icon"
                                />
                              )}
                              Favourite
                            </button>

                            <div className="inline-flex justify-end relative">
                              <FacebookShareButton className="ml-2" url={url}>
                                <FacebookIcon size={24} round />
                              </FacebookShareButton>
                              <LinkedinShareButton className="ml-2" url={url}>
                                <LinkedinIcon size={24} round />
                              </LinkedinShareButton>
                              <TwitterShareButton className="ml-2" url={url}>
                                <TwitterIcon size={24} round />
                              </TwitterShareButton>
                              <EmailShareButton className="ml-2" url={url}>
                                <EmailIcon size={24} round />
                              </EmailShareButton>
                              <WhatsappShareButton className="ml-2" url={url}>
                                <WhatsappIcon size={24} round />
                              </WhatsappShareButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dialog open={feedbackForm} onClose={handleFeedbackModal}>
                    <DialogTitle>Feedback</DialogTitle>
                    <Feedback />
                  </Dialog>

                  <Dialog open={type_open} onClose={closeType} fullScreen>
                    <div className="mb-12">
                      <span
                        onClick={closeType}
                        className="cursor-pointer absolute bg-black bg-opacity-50 px-5 py-2 text-white right-0 top-0 mr-4 mt-2"
                      >
                        CLOSE
                      </span>
                    </div>
                    <div
                      className="w-full m-auto"
                      style={{
                        maxHeight: '100vh',
                        maxWidth: '100vw',
                      }}
                    >
                      <Slider {...settings}>
                        {type_image &&
                          type_image.map(image => (
                            <>
                              <img
                                style={{
                                  maxHeight: '100vh',
                                  maxWidth: '100vw',
                                }}
                                src={`${IMAGE_BASE}${image && image.path}`}
                                alt="slider media"
                              />
                            </>
                          ))}
                      </Slider>
                    </div>
                    {/* <img src={`${IMAGE_BASE}${type_image}`} alt="property" /> */}
                  </Dialog>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

let settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  centerMode: false,
  centerPadding: '0px',
  autoplay: false,
  autoplaySpeed: 2000,
  focusOnSelect: true,
  arrows:true,
};

ProjectDetailPage.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  slideObj: makeSelectSlide(),
  user: makeSelectUser(),
  offer: makeSelectOffer(),
  errors: makeSelectError(),
  offer_loading: makeSelectOfferLoading(),
  offerForm: makeSelectOfferForm(),
  favorite: makeSelectFavorite(),
  favorite_loading: makeSelectFavoriteLoading(),
  token: makeSelectToken(),
  related: makeSelectRelated(),
  feedbackForm: makeSelectFeedbackForm(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push, clearOne },
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
  withSaga,
  withStyle,
  withConnect,
)(ProjectDetailPage);
