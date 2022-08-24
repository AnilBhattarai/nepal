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

  const totalViewCount = one.view_count_guest
    ? Number(one.view_count_guest) + Number(one.view_count_user)
    : 0;

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
                <div className="flex-1 mb-2 overflow-hidden">
                  <Skeleton width={1000} height={480} />
                </div>
                <div className="flex justify-between hidden w-32 mb-2 lg:block">
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
                    <h1 className="flex pt-4 text-2xl tracking-tighter md:text-4xl">
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
                    <div style={{ display: 'flex' }}>
                      <p className="text-sm text-gray-700">
                        {!one.is_project
                          ? `${one.prefix}${one.property_id}`
                          : `${one.prefix}${one.project_id}`}
                      </p>
                      {totalViewCount > 0 ? (
                        <div className="inline-flex items-center pl-6">
                          <i className="hidden material-icons opacity-60 lg:block">
                            visibility
                          </i>
                          <span className="pl-1 text-xs opacity-60">
                            {totalViewCount}
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="flex items-center">
                      {/* {one.is_exclusive && (
                    <span className="relative inline-block mr-6 text-sm text-white bg-red-600 rounded">
                      <i className="">
                        Exclusive Project
                 </span>
                      )} */}
                      {/* {one.is_featured && (
                        <span className="relative inline-block mr-6 text-sm text-white tag tag-lg">
                          <img
                            className="float-left mt-1 mr-2"
                            src={premiumimg}
                            alt="featured"
                          />
                          Featured
                        </span>
                      )}

                      {one.is_premium && (
                        <span className="relative inline-block mr-10 text-sm text-white tag tag-lg bg-primary">
                          <img
                            className="float-left mt-1 mr-2"
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
                          {/* <p className="mt-2 text-sm opacity-5">
                        Posted on {moment(one.added_at).format(DATE_FORMAT)}
                      </p> */}

                          <div className="mt-4 bg-white rounded" id="overview">
                            <div className="flex flex-wrap py-4">
                              {one.location_property &&
                                one.location_property.total_area && (
                                  <div className="inline-flex w-full mb-4 rounded md:w-1/4">
                                    <div className="pl-4 flex1">
                                      <span className="block text-sm uppercase">
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
                                  <div className="inline-flex w-full mb-4 rounded md:w-1/4">
                                    {/* <div className="flex items-center justify-center w-10 h-10">
                                      <img src={pillar} alt="Area Covered" />
                                    </div> */}
                                    <div className="pl-4 flex1">
                                      <span className="block text-sm uppercase">
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
                                  <div className="inline-flex w-full mb-4 rounded md:w-1/4">
                                    {/* <div className="flex items-center justify-center w-10 h-10">
                                      <img src={calendar} alt="Area Covered" />
                                    </div> */}
                                    <div className="pl-4 flex1">
                                      <span className="block text-sm uppercase">
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
                                  <div className="inline-flex w-full mb-4 rounded md:w-1/4">
                                    {/* <div className="flex items-center justify-center w-10 h-10">
                                      <img src={road} alt="Area Covered" />
                                    </div> */}
                                    <div className="pl-4 flex1">
                                      <span className="block text-sm uppercase">
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

                              <div className="inline-flex w-full mb-4 rounded md:w-1/4">
                                <div className="pl-4 flex1">
                                  <span className="block text-sm uppercase">
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
                            <h2 className="mt-12 mb-6 text-2xl font-bold">
                              Amenities
                            </h2>
                            <div className="flex flex-wrap p-4 -mx-2 md:-mx-4">
                              {one.building.amenities
                                ? one.building.amenities.map(each => (
                                    <div
                                      className="flex items-center w-1/3 px-1 my-4 text-center md:w-1/5 md:px-4"
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

                                      <p className="flex-1 pl-2 text-sm text-left opacity-75 md:pl-4">
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
                                    className="mt-4 bg-white rounded"
                                    id="features"
                                  >
                                    <h2 className="mt-12 mb-6 text-2xl font-bold">
                                      Project Features
                                    </h2>

                                    {/* {one.basic &&
                                      one.basic.property_category.title !==
                                        'Land' && (
                                        <div className="flex flex-wrap p-4 -mx-2 md:-mx-4">
                                         
                                        </div>
                                      )} */}

                                    {one.project_features.map(x => (
                                      <div
                                        key={`features-${x._id}`}
                                        className="flex items-center px-4 py-2"
                                      >
                                        <span
                                          className="inline-flex items-center justify-center inline-block w-4 h-4 mr-2 border border-gray-400 rounded"
                                          style={{ lineHeight: 0 }}
                                        >
                                          <i className="mt-px text-xs text-gray-400 material-icons">
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
                                  <div className="mt-4 bg-white rounded">
                                    <h2 className="px-4 py-2 text-lg md:text-2xl md:tracking-tighter">
                                      Property Types
                                    </h2>

                                    <div className="flex px-6 mb-4 border-b border-gray-300">
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
                                        {/* <div className="flex items-center justify-center inline-block w-16 h-16 mr-5 text-2xl text-center text-gray-500 bg-gray-100 border border-gray-200 rounded-full">
                                      {propertyTab + 1}
                                    </div> */}
                                        <div className="flex-1">
                                          {/* <h3 className="text-lg font-bold">
                                        {
                                          one.project_property_type[propertyTab]
                                            .type
                                        }
                                      </h3> */}
                                          <div className="pt-4 md:flex">
                                            {one.project_property_type[
                                              propertyTab
                                            ].area && (
                                              <div className="flex items-center mb-6 mr-12">
                                                <img src={tape} />
                                                <p className="pl-5 text-xl leading-none text-gray-600">
                                                  <p className="pb-1 text-xs tracking-widest text-black uppercase">
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
                                              <div className="flex items-center mb-6 mr-12">
                                                <img
                                                  className="h-6 opacity-50"
                                                  src={rs}
                                                />
                                                <p className="pl-5 text-xl leading-none text-gray-600">
                                                  <p className="pb-1 text-xs tracking-widest text-black uppercase">
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
                                              <div className="flex items-center mb-6 mr-12">
                                                <img
                                                  className="h-6 opacity-50"
                                                  src={ladder}
                                                  alt="floor"
                                                />
                                                <p className="pl-5 text-xl leading-none text-gray-600">
                                                  <p className="pb-1 text-xs tracking-widest text-black uppercase">
                                                    Floor no
                                                  </p>
                                                  {one.project_property_type[
                                                    propertyTab
                                                  ].floor_no || ''}
                                                </p>
                                              </div>
                                            )}
                                            {/* <div className="flex items-center mb-6 mr-12">
                                              <img
                                                className="h-8"
                                                src={compass}
                                              />
                                              <p className="pl-5 text-xl leading-none text-gray-600">
                                                <p className="pb-1 text-xs tracking-widest text-black uppercase">
                                                  Facing
                                                </p>
                                                East
                                              </p>
                                            </div> */}

                                            {/* <div className="flex items-center mb-6 mr-12">
                                          <img
                                            className="h-6 opacity-50"
                                            src={rs}
                                          />
                                          <p className="pl-5 text-xl leading-none text-gray-600">
                                            <p className="pb-1 text-xs tracking-widest text-black uppercase">
                                              Total Unit:
                                          </p>
                                            {one.project_property_type[
                                              propertyTab
                                            ].total_unit || ''}
                                          </p>
                                        </div>

                                        <div className="flex items-center mb-6 mr-12">
                                          <img
                                            className="h-6 opacity-50"
                                            src={rs}
                                          />
                                          <p className="pl-5 text-xl leading-none text-gray-600">
                                            <p className="pb-1 text-xs tracking-widest text-black uppercase">
                                              Available Unit:
                                          </p>
                                            {one.project_property_type[
                                              propertyTab
                                            ].available_unit || ''}
                                          </p>
                                        </div> */}
                                          </div>

                                          <div className="pt-4 md:flex">
                                            {one.project_property_type[
                                              propertyTab
                                            ].bathroom && (
                                              <div className="flex items-center mb-6 mr-12">
                                                <img src={shower} />
                                                <p className="pl-5 text-xl leading-none text-gray-600">
                                                  <p className="pb-1 text-xs tracking-widest text-black uppercase">
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
                                              <div className="flex items-center mb-6 mr-12">
                                                <img
                                                  className="h-6"
                                                  src={bed}
                                                />
                                                <p className="pl-5 text-xl leading-none text-gray-600">
                                                  <p className="pb-1 text-xs tracking-widest text-black uppercase">
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
                                              <div className="flex items-center mb-6 mr-12">
                                                <img
                                                  className="h-6"
                                                  src={kitchen}
                                                />
                                                <p className="pl-5 text-xl leading-none text-gray-600">
                                                  <p className="pb-1 text-xs tracking-widest text-black uppercase">
                                                    Kitchen:
                                                  </p>
                                                  {one.project_property_type[
                                                    propertyTab
                                                  ].kitchen || ''}
                                                </p>
                                              </div>
                                            )}

                                            {/* <div className="flex items-center mb-6 mr-12">
                                          <img
                                            className="h-6 opacity-50"
                                            src={shower}
                                          />
                                          <p className="pl-5 text-xl leading-none text-gray-600">
                                            <p className="pb-1 text-xs tracking-widest text-black uppercase">
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
                                              <div className="flex items-center mb-6 mr-12">
                                                <img
                                                  className="h-6"
                                                  src={sofa}
                                                />
                                                <p className="pl-5 text-xl leading-none text-gray-600">
                                                  <p className="pb-1 text-xs tracking-widest text-black uppercase">
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
                                                <div className="px-4 md:w-1/3">
                                                  <span className="mb-2 text-lg font-bold">
                                                    {plan.floor_name}
                                                  </span>
                                                  <div className="p-px my-1 border cursor-pointer">
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
                                                                <span className="inline-flex items-center justify-center w-4 h-4 mr-2 border border-gray-400 rounded">
                                                                  <i className="mt-px text-xs text-gray-400 material-icons">
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
                                        <div className="pt-4 md:flex">
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
                              className="mt-4 bg-white rounded"
                              id="floor"
                            >
                              <h2 className="mt-12 mb-6 text-2xl font-bold">
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
                                  className="mt-4 bg-white rounded"
                                >
                                  <h2 className="mt-12 mb-6 text-2xl font-bold">
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
                        <div id="map" className="mt-4 bg-white rounded">
                          <h2 className="mt-12 mb-6 text-2xl font-bold">Map</h2>
                          <div
                            className="relative overflow-hidden"
                            style={{ paddingTop: '56%' }}
                          >
                            <iframe
                              title="map"
                              src={one.map_src ? one.map_src : ''}
                              frameBorder="0"
                              className="absolute top-0 left-0 w-full h-full border-0"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        {one.is_project ? (
                          <>
                            <div
                              className="mt-4 bg-white rounded"
                              id="developer"
                            >
                              <h2 className="mt-12 mb-6 text-2xl font-bold">
                                Developer
                              </h2>
                              <div className="flex p-4">
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
                                    className="my-2 no-underline text-blue"
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
                                  className="p-4 text-gray-600"
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
                                  className="my-2 no-underline text-blue"
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
                                  className="my-2 no-underline text-blue"
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
                                    className="my-2 no-underline text-blue"
                                    to="#"
                                  >
                                    {one.added_by.bio}
                                  </Link>
                                </div>
                              </div>
                            </>
                          )
                        )}

                        <div className="flex items-center hidden p-4 mt-4 bg-white rounded shadow">
                          <img src={calc} alt="calculator" className="h-32" />
                          <div className="flex-1 px-8">
                            <h3 className="text-2xl tracking-tight text-black md:text-3xl">
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
                              <span className="pl-2 text-sm italic text-gray-500">
                                it’s free
                              </span>
                            </div>
                            <span
                              style={{
                                boxShadow: '0 15px 30px 0 rgba(2,145,221,0.33)',
                              }}
                              className="block p-3 text-white rounded-full bg-secondary"
                            >
                              Calculate Loan
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center mt-4 mb-12">
                          <button
                            className="block mt-1 text-sm text-right text-red-500 underline cursor-pointer"
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
                            <div className="flex-wrap mt-4 -mx-2 md:flex">
                              {related.map(each => (
                                <div
                                  className="relative px-2 md:w-1/3"
                                  key={`related-${each._id}`}
                                >
                                  <Link
                                    className="absolute top-0 bottom-0 left-0 right-0 z-50"
                                    to={`/project/${each.slug_url}`}
                                  />

                                  {each && (
                                    <div
                                      className="relative overflow-hidden bg-white rounded cursor-pointer"
                                      onClick={() =>
                                        redirectToDetail(each.slug_url)
                                      }
                                    >
                                      <div className="relative block h-48 overflow-hidden">
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
                                      <div className="w-full p-2">
                                        <h3 className="text-xl tracking-tight text-black truncate">
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
                          <div className="p-4 mt-4 overflow-hidden bg-white border rounded">
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
                                    className="text-base material-icons"
                                    style={{
                                      position: 'absolute',
                                      left: 5,
                                      top: 10,
                                    }}
                                  >
                                    person_pin
                                  </i>
                                  <input
                                    className="bg-white inputbox"
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
                                    className="text-base material-icons"
                                    style={{
                                      position: 'absolute',
                                      left: 5,
                                      top: 10,
                                    }}
                                  >
                                    mail
                                  </i>
                                  <input
                                    className="bg-white inputbox"
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
                                    className="text-base material-icons"
                                    style={{
                                      position: 'absolute',
                                      left: 5,
                                      top: 10,
                                    }}
                                  >
                                    smartphone
                                  </i>
                                  <input
                                    className="bg-white inputbox"
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
                                  className="bg-white inputbox"
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
                                  className="px-6 py-2 mt-2 text-sm font-bold text-white rounded text-blue bg-primary"
                                  onClick={handleMakeOffer}
                                >
                                  {offer_loading ? '...' : 'Send Message'}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between py-4">
                            <button
                              className="inline-block px-2 py-1 text-sm text-red-600 border border-gray-300 rounded cursor-pointer hover:border-red-600"
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

                            <div className="relative inline-flex justify-end">
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
                        className="absolute top-0 right-0 px-5 py-2 mt-2 mr-4 text-white bg-black bg-opacity-50 cursor-pointer"
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
  arrows: true,
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
