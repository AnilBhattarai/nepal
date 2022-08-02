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
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import ImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/scss/image-gallery.scss';
import 'react-image-gallery/styles/css/image-gallery.css';
import YouTube from 'react-youtube';
import { Element } from 'react-scroll';
import tape from '../../../assets/img/tape.svg';
import pillar from '../../../assets/img/pillar.svg';
import road from '../../../assets/img/road.svg';
import calendar from '../../../assets/img/calendar.svg';

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
} from '../selectors';
import { makeSelectUser, makeSelectSlide } from '../../App/selectors';
import reducer from '../reducer';
import saga from '../saga';
import { clearOne } from '../../Comments/actions';

import { loadSlideRequest } from '../../App/actions';
import Search from '../../../components/Search/index';
import HeartIcon from '../../../assets/img/heart.svg';
import HeartLiked from '../../../assets/img/liked.svg';
import HeartLoading from '../../../assets/img/heartload.svg';

import ShareIcon from '../../../assets/img/share.svg';
import YoutubeImg from '../../../assets/img/youtube.jpg';
import tempImg3 from '../../../images/default.jpg';
import agent from '../../../images/agent.png';
import featuredimg from '../../../assets/img/featured.svg';
import premiumimg from '../../../assets/img/premium.svg';
import free from '../../../assets/img/free.png';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import Loading from '../../../components/Loading';
import DetailSkeleton from '../Skeleton/Detail';
import NavBar from './components/navbar';
import Comments from '../../Comments/Loadable';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
  } = props;

  const thumbnailEl = useRef(null);
  const thumbnailEl2 = useRef(null);

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

  // const [active, setActive] = useState(false);

  const showModal = () => {
    // setActive(true);
    setOfferForm(true);
  };

  const handleModal = () => {
    // setActive(false);
    setOfferForm(false);
  };

  useEffect(() => {
    if (match.params && match.params.slug) {
      loadOneRequest(match.params.slug);
      loadSlideRequest();
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadFavoriteRequest(one._id);
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
        from: { pathname: `/detail/${match.params.slug}` },
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
        from: { pathname: `/detail/${match.params.slug}` },
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

  const images = one.media.images.map(function imagearr(each) {
    return {
      original: `${IMAGE_BASE}${each.id.path}`.replace(
        'public/',
        'public/400-200/'),
      thumbnail: `${IMAGE_BASE}${each.id.path}`.replace(
        'public/',
        'public/1-1/'),
      description: `${each.caption.title}`,
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
  const project_payment_plan = one.project_payment_plan
    ? one.project_payment_plan.map(function imagearr(each) {
      return {
        original: `${IMAGE_BASE}${each.image.path}`,
        thumbnail: `${IMAGE_BASE}${each.image.path}`,
      };
    })
    : {};

  return (
    <>
      {loading ? (
        <div className="overflow-hidden mt-5">
          <SkeletonTheme color="#ddd" highlightColor="#ddd">
            <Skeleton height={10} width={150} />
            <br />
            <Skeleton height={10} width={100} />
          </SkeletonTheme>
          <div className="relative mt-5">
            <SkeletonTheme color="#eee" highlightColor="#eee">
              <Skeleton height={200} width={300} />
            </SkeletonTheme>
          </div>
        </div>
      ) : (
          <div className="mobile-view bg-white pb-20">
            <h1 className="font-bold text-3xl flex tracking-tight px-2 pt-4">
              {one.basic.title ? one.basic.title : 'Title'}{' '}
            </h1>
            <p className="px-2">
              {one.address && one.address.area_id ? one.address.area_id.name : ''}
              {', '}
              {one.address && one.address.city_id ? one.address.city_id.name : ''}
            </p>
            <p className="text-sm text-gray-700 px-2">
              {!one.is_project
                ? `${one.prefix}${one.property_id}`
                : `${one.prefix}${one.project_id}`}
            </p>

            <div className="flex items-center px-2 my-2">
              {one.is_featured && (
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
              )}
            </div>

            <ImageGallery
              // thumbnailPosition="bottom"
              items={images}
              showFullscreenButton={false}
              showPlayButton={false}
              onSlide={NextSlide.bind(this)}
              showNav={false}
            />

            {/* <p className="text-sm opacity-5 mt-2">
                        Posted on {moment(one.added_at).format(DATE_FORMAT)}
                      </p> */}

            {/* <h2
        id="overview"
        className=" text-xl tracking-tight py-2"
      >
        Overview
                      </h2> */}

            <div className="flex flex-wrap px-2 py-4">
              <div className="inline-flex w-1/2 lg:w-1/4 items-center rounded mb-4">
                <img className="h-5" src={tape} alt="Area Covered" />
                <div className="flex1 pl-4">
                  <span className="uppercase text-xs block">Area Covered</span>
                  <span className="font-bold">
                    {one.location_property
                      ? one.location_property.total_area
                      : '0'}{' '}
                    {one.location_property
                      ? one.location_property.total_area_unit.title
                      : 'Ana'}
                  </span>{' '}
                </div>
              </div>
              <div className="inline-flex w-1/2 lg:w-1/4 items-center rounded mb-4">
                <img className="h-5" src={pillar} alt="Area Covered" />
                <div className="flex1 pl-4">
                  <span className="uppercase text-xs block">Built-up Area</span>
                  <span className="font-bold">
                    {one.location_property
                      ? one.location_property.built_area
                      : ''}{' '}
                    {one.location_property
                      ? one.location_property.built_area_unit.title
                      : ''}
                  </span>{' '}
                </div>
              </div>
              {one.basic && one.basic.property_category.title !== 'Land' && (
                <div className="inline-flex w-1/2 lg:w-1/4 items-center rounded mb-4">
                  <img className="h-5" src={calendar} alt="Area Covered" />
                  <div className="flex1 pl-4">
                    <span className="uppercase text-xs block">Built Year</span>
                    <span className="font-bold">
                      {one.building ? one.building.built_year : '2'}
                    </span>
                  </div>
                </div>
              )}

              <div className="inline-flex w-1/2 lg:w-1/4 items-center rounded mb-4">
                <img className="h-5" src={road} alt="Area Covered" />
                <div className="flex1 pl-4">
                  <span className="uppercase text-xs block">Road Access</span>
                  <span className="font-bold">
                    {one.location_property
                      ? one.location_property.road_access_value
                      : '0'}{' '}
                    {one.location_property
                      ? one.location_property.road_access_length_unit.title
                      : ''}{' '}
                    /{' '}
                    {one.location_property
                      ? one.location_property.road_access_road_type.title
                      : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-2 text-sm">
              {one.basic ? (
                <div
                  className="leading-relaxed mt-4"
                  dangerouslySetInnerHTML={{
                    __html: one.basic.description,
                  }}
                />
              ) : (
                  'Description'
                )}
              <h2 id="amenities" className=" text-xl tracking-tight py-2 mt-6">
                Project Features
            </h2>

              <div className="flex p-4 flex-wrap -mx-4">
                {one.building.amenities
                  ? one.building.amenities.map(each => (
                    <div
                      className="w-1/2 text-center px-4 my-4 flex items-center"
                      key={`amenities-${each.title}`}
                    >
                      <div className="w-6 h-6 text-center">
                        <img
                          className="opacity-50"
                          src={
                            each.media ? `${IMAGE_BASE}${each.media.path}` : ''
                          }
                          style={{
                            maxHeight: '100%',
                            margin: '0 auto',
                          }}
                        />
                      </div>

                      <p className="text-sm opacity-75 text-left pl-4">
                        {each.title}
                      </p>
                    </div>
                  ))
                  : 'NA'}
              </div>

              {one.project_features &&
                one.project_features.map(x => (
                  <div
                    key={`features-${x._id}`}
                    className="flex items-center px-4 py-2"
                  >
                    <span
                      className="border border-gray-400 w-5 h-5 inline-block rounded inline-flex items-center justify-center mr-2"
                      style={{ lineHeight: 0 }}
                    >
                      <i className="material-icons text-xs text-gray-400 mt-px">
                        check
                    </i>
                    </span>

                    <p className="pl-2">
                      <span className="font-bold">{x.feature.title}</span>:{' '}
                      {x.value}
                    </p>
                  </div>
                ))}

              <div id="map" className="rounded mt-4 overflow-hidden bg-white">
                <h2 className=" text-xl tracking-tight bg-white py-2 px-4">
                  <span style={{ color: '#333' }}> Map</span>
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
              {one.project_property_type && one.project_property_type.length > 0 && (
                <div className="rounded mt-4 overflow-hidden bg-white" id="types">
                  <h2 className=" text-xl tracking-tight bg-white py-2 px-4">
                    <span style={{ color: '#333' }}>Property Types</span>
                  </h2>
                  {/* <div className="flex flex-wrap p-4 -mx-2">
                {one.project_property_type.map(x => (
                  <div
                    key={`property-type-price-${x._id}`}
                    className="flex items-center border p-2 m-2 rounded"
                  >
                    <p className="font-bold">{x.type}</p>
                    <div className="pl-2 ml-2 border-l">
                      <p>Total Area: {x.area}</p>
                      <p className="text-gray-800">
                        Price from Rs.
                                        {Intl.NumberFormat('en-IN').format(
                          x.price,
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div> */}
                </div>
              )}

              {one.project_floor_plan && one.project_floor_plan.length > 0 && (
                <div className="rounded mt-4 bg-white" id="floor">
                  <h2 className=" text-xl tracking-tight bg-white py-2 px-4">
                    <span style={{ color: '#333' }}>Floor Plans</span>
                  </h2>
                  <div className="p-4 hideMainImage">
                    <ImageGallery
                      originalClass="w-0" // css for image?
                      showPlayButton={false}
                      showFullscreenButton={false}
                      ref={thumbnailEl}
                      // onThumbnailClick={() => thumnailClick()}
                      items={project_floor_plan}
                    />
                  </div>
                </div>
              )}
              {one.project_payment_plan && one.project_payment_plan.length > 0 && (
                <div className="rounded mt-4 overflow-hidden bg-white">
                  <h2 className=" text-xl tracking-tight bg-white py-2 px-4">
                    <span style={{ color: '#333' }}>Payment Plans</span>
                  </h2>
                  <div className="p-4 hideMainImage">
                    <ImageGallery
                      showPlayButton={false}
                      showFullscreenButton={false}
                      items={project_payment_plan}
                      ref={thumbnailEl2}
                    // onThumbnailClick={() => thumnailClick2()}
                    />
                  </div>
                </div>
              )}
              {one && one.is_project ? (
                <div
                  className="rounded mt-4 overflow-hidden bg-white"
                  id="developer"
                >
                  <h2 className=" text-xl tracking-tight bg-white py-2 px-4">
                    <span style={{ color: '#333' }}>Developer</span>
                  </h2>
                  <div className="p-4 flex">
                    {/* <Link
                target="_blank"
                className="block"
                to={`/developer/&developer_id=${
                  one.developer_id._id
                  }`}
              > */}
                    <img
                      className="h-12"
                      src={
                        IMAGE_BASE +
                        (one.developer_id.logo && one.developer_id.logo.path)
                      }
                      alt="agent name"
                    />
                    {/* </Link> */}
                    <div className="flex-1 pl-4">
                      {/* <Link
                  target="_blank"
                  className="text-blue no-underline my-2"
                  to={`/developer/&developer_id=${
                    one.developer_id._id
                    }`}
                > */}
                      {one.developer_id.name && (
                        <p className="font-bold">{one.developer_id.name}</p>
                      )}
                      {one.developer_id.address && (
                        <p className="text-gray-600">
                          {one.developer_id.address}{' '}
                        </p>
                      )}
                      {/* </Link> */}
                    </div>
                  </div>

                  {one.developer_id.bio && (
                    <div
                      className="text-gray-600 mt-2 px-4 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: one.developer_id.bio,
                      }}
                    />
                  )}
                </div>
              ) : null}
              <div className="mobile-view">
                <Comments
                  id={one._id}
                  commentFor="property"
                  isOpen={open}
                  isClose={handleClose}
                  owner={one.added_by}
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
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
