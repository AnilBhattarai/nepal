/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { Element } from 'react-scroll';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import YouTube from 'react-youtube';
import Skeleton from 'react-loading-skeleton';
import StaticContentDiv from '../../../components/StaticContentDiv';

import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import { InlineShareButtons } from 'sharethis-reactjs';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Visibility from '@material-ui/icons/Visibility';
import tempImg from '../../../images/default.jpg';
import ladder from '../../../assets/img/ladder-blue.svg';
import shower from '../../../assets/img/shower-blue.svg';
import bed from '../../../assets/img/bed-blue.svg';
import sold from '../../../assets/img/sold.png';
import rented from '../../../assets/img/rented.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import * as mapDispatchToProps from '../actions';
import {
  makeSelectOne,
  makeSelectLoadingOne,
  makeSelectOffer,
  makeSelectError,
  makeSelectOfferLoading,
  makeSelectOfferForm,
  makeSelectFavorite,
  makeSelectFavoriteLoading,
  makeSelectRelated,
  makeSelectFeedbackForm,
  makeSelectAll,
} from '../selectors';
import {
  makeSelectUser,
  makeSelectSlide,
  makeSelectToken,
} from '../../App/selectors';
import reducer from '../reducer';
import saga from '../saga';
import { clearOne } from '../../Comments/actions';
import CategoryElement from '../../../components/CategoryElement';

import UnitConverter from '../../UnitConverterModal/Loadable';

import { loadSlideRequest } from '../../App/actions';
import Search from '../../../components/Search/index';
import HeartIcon from '../../../assets/img/heart.svg';
import HeartLiked from '../../../assets/img/liked.svg';
import HeartLoading from '../../../assets/img/heartload.svg';

import ShareIcon from '../../../assets/img/share.svg';
import YoutubeImg from '../../../assets/img/youtube.jpg';

import tick from '../../../assets/img/tick.png';
import premiumimg from '../../../assets/img/premium.svg';
import exclusiveimg from '../../../assets/img/exlusive.png';
import { IMAGE_BASE, DATE_FORMAT, URL_BASE } from '../../App/constants';
import Loading from '../../../components/Loading';
import Conversation from './components/conversation.js';
import Comment from '../../Comments/Loadable';
import tape from '../../../assets/img/tape.svg';
import pillar from '../../../assets/img/pillar-blue.svg';
import road from '../../../assets/img/road-blue.svg';
import calendar from '../../../assets/img/calendar-blue.svg';
import parking from '../../../assets/img/parking-blue.svg';
import compass from '../../../assets/img/compass-blue.svg';
import defaultUser from '../../../assets/img/user.svg';
import pin from '../../../assets/img/pin.svg';

import free from '../../../assets/img/free.png';
import calc from '../../../assets/img/calc.png';
import arrow from '../../../assets/img/arrow-bottom.svg';
import NotFoundPage from '../../NotFoundPage/Loadable';
import Feedback from '../Feedback/Loadable';
import NavBar from './components/navbar';
import HomeLoan from './components/homeloan';
import SearchDiv from '../../HomeSearchSimple/Loadable';
import RecentBlogs from '../../Blog/components/RecentBlogsHome';

import {
  formatAmount,
  trimDecimal,
  MONTH,
  MONTH_OPTIONS,
  YEAR_OPTIONS,
} from './utils';
import { FacebookProvider, Comments } from 'react-facebook';
import useWindowDimensions from '../../../utils/windowDimensions';
import { useRef } from 'react';
import ReutnMonth from './components/ReturnMonth';
import ReturnMonth from './components/ReturnMonth';
const key = 'listView';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-next`} onClick={onClick}>
      <i className="material-icons"> keyboard_arrow_right </i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-prev`} onClick={onClick}>
      <i className="material-icons"> keyboard_arrow_left </i>
    </div>
  );
}

export const DetailPage = props => {
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
    loadFavoriteRequest,
    favorite_loading,
    token,
    clearOffer,
    related,
    setFeedbackForm,
    setFeedbackValue,
    feedbackForm,
    all: { data },
    loadAllRequest,
    setCountRequest,
  } = props;

  const url = window.location.href;
  const [open, setOpen] = useState(false);
  const [shareDiv, setShareDiv] = useState(false);
  const [showVideo, setShowVideo] = useState([]);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showGalleryPlayButton, setShowGalleryPlayButton] = useState(true);
  const [showFullscreenButton, setShowFullscreenButton] = useState(false);
  const [check, setCheck] = useState(true);
  const [play, setPlay] = useState(true);
  const [similar, setSimilar] = useState([]);
  const [showConverter, setShowConverter] = useState(false);

  const [readMore, setReadMore] = useState(false);
  let titleRef = useRef(null);

  const [isTitleHidden, setIsTitleHidden] = useState(false);

  const [showShare, setShowShare] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleReadMore = () => {
    setReadMore(true);
  };

  // const [active, setActive] = useState(false);

  const showShareModal = () => {
    setShowShare(true);
  };

  const handleShareModal = () => {
    setShowShare(false);
  };

  const showSearchModal = () => {
    setShowSearch(true);
  };

  const handleSearchModal = () => {
    setShowSearch(false);
  };

  const showModal = () => {
    // setActive(true);
    setOfferForm(true);
  };

  const handleModal = () => {
    // setActive(false);
    setOfferForm(false);
  };

  const showLoanForm = () => {
    // setActive(true);
    setLoanForm(true);
  };

  const handleLoanModal = () => {
    setLoanForm(false);
  };

  const showConverterModal = () => {
    // setActive(true);
    setShowConverter(true);
  };

  const handleConverterModal = () => {
    // setActive(false);
    setShowConverter(false);
  };

  const showFeedbackModal = name => {
    // setActive(true);
    setFeedbackForm(true);
    if (name === 'yes') {
      setFeedbackValue({ key: 'is_listing_correct', value: true });
    } else {
      setFeedbackValue({ key: 'is_listing_correct', value: false });
    }
  };

  const handleFeedbackModal = () => {
    // setActive(false);
    setFeedbackForm(false);
  };

  const { width } = useWindowDimensions();

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
    if (token && token !== '' && one._id !== undefined) {
      loadFavoriteRequest(one._id);
    }
    if (one && one.address && one.address.area_id && one.address.area_id._id) {
      loadAllRequest(`find_area_id=${one.address.area_id._id}`);
    }
    if (one && one._id) {
      setCountRequest(one._id);
    }
    // const defaultVal = `Hey, i am interested in your property [${one.prefix}${
    //   one.property_id
    //   }]`;
    // setOfferValue({
    //   key: 'message',
    //   value: defaultVal,
    // });
  }, [one]);

  useEffect(() => {
    const tempProperties = data.filter(each => each._id !== one._id);
    setSimilar(tempProperties);
  }, [data]);

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

  useEffect(() => {
    window.addEventListener('scroll', isInViewport);
    return () => window.removeEventListener('scroll', isInViewport);
  });

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
        from: {
          pathname: `/detail/${match.params.slug}`,
        },
      });
    }
  };

  const handleFavorite = () => {
    if (token && token !== '') {
      setFavoriteValue();
    } else {
      push('/signup-user', {
        from: {
          pathname: `/detail/${match.params.slug}`,
        },
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
    const { value } = event.target;
    // if (name === 'phone') {
    //   if (value.length < 4) {
    //     return;
    //   }
    //   const sanitizedValue = value.substring(4);
    //   setOfferValue({ key: name, value: sanitizedValue });
    // } else {
    //   setOfferValue({ key: name, value });

    // }
    setOfferValue({
      key: name,
      value,
    });
  };

  const onReady = event => {
    const showVideo = showVideo;
    showVideo.push(event.target);
    setShowVideo({
      showVideo,
    });
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

    let settings =
      data && data.properties
        ? {
            equalizeHeight: true,
            dots: false,
            adaptiveHeight: false,
            infinite: true,
            speed: 500,
            slidesToScroll: 1,
            slidesToShow: 4,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  initialSlide: 2,
                },
              },
            ],
          }
        : {
            dots: false,
            // dotsClass: 'slick-dots slick-thumb',
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 3,
          };
    try {
      if (settings && typeof settings === 'string') {
        settings = JSON.parse(settings);
      }
    } catch (err) {
      console.log(err);
    }

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

  const thumnailClick = (e, index) => {
    ImageGallery.fullScreen();
  };

  function isInViewport(offset = 0) {
    if (!titleRef) return false;
    const top = titleRef.getBoundingClientRect().top;
    if (top < -22) {
      setIsTitleHidden(true);
    } else {
      setIsTitleHidden(false);
    }
    return top + offset >= 0 && top - offset <= window.innerHeight;
  }

  const images = one.media.images.map(function imagearr(each) {
    return {
      original:
        each.id && each.id.path ? `${IMAGE_BASE}${each.id.path}` : tempImg,
      thumbnail:
        each.id && each.id.path
          ? `${IMAGE_BASE}${each.id.path}`.replace('public/', 'public/200-200/')
          : tempImg,
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
          description: `${each.title}`,
        };
      })
    : {};
  const project_payment_plan = one.project_payment_plan
    ? one.project_payment_plan.map(function imagearr(each) {
        return {
          original: `${IMAGE_BASE}${each.image.path}`,
          thumbnail: `${IMAGE_BASE}${each.image.path}`,
          description: `${each.title}`,
        };
      })
    : {};

  let settings =
    related && related.length > 0
      ? {
          dots: false,
          adaptiveHeight: false,
          infinite: false,
          speed: 500,
          slidesToScroll: 1,
          slidesToShow: 4,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2,
                arrows: false,
              },
            },
          ],
        }
      : {
          dots: false,
          // dotsClass: 'slick-dots slick-thumb',
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 3,
        };
  try {
    if (settings && typeof settings === 'string') {
      settings = JSON.parse(settings);
    }
  } catch (err) {
    console.log(err);
  }

  let settings2 =
    similar && similar.length > 0
      ? {
          dots: false,
          adaptiveHeight: false,
          infinite: false,
          speed: 500,
          slidesToScroll: 1,
          slidesToShow: 4,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2,
                arrows: false,
              },
            },
          ],
        }
      : {
          dots: false,
          // dotsClass: 'slick-dots slick-thumb',
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 3,
        };
  try {
    if (settings && typeof settings === 'string') {
      settings = JSON.parse(settings);
    }
  } catch (err) {
    console.log(err);
  }

  return !loading && one.msg && one.msg === 'product not found' ? (
    <NotFoundPage />
  ) : (
    <>
      <Helmet>
        <title> {one.basic.title ? one.basic.title : 'Title'} </title>
      </Helmet>
      {loading ? (
        <div style={{ minHeight: '100vh' }} />
      ) : (
        <>
          {one.property_id && (
            <React.Fragment>
              <StaticContentDiv contentKey="property-detail-top" />
              <div className="container mx-auto">
                <div className="lg:flex pt-6 md:pt-16">
                  <div className="lg:w-2/3 pr-12">
                    <h1
                      className="text-2xl lg:text-5xl leading-tight"
                      ref={el => (titleRef = el)}
                    >
                      {one.basic.title ? one.basic.title : ''}
                    </h1>
                    <div className="flex items-center mt-5">
                      <img src={pin} className="h-4" />
                      <p className="flex-1 pl-3 text-sm text-gray-500">
                        {one.address && one.address.area_id
                          ? one.address.area_id.name
                          : 'Area'}
                        {', '}
                        {one.address && one.address.city_id
                          ? one.address.city_id.name
                          : 'City'}
                      </p>
                    </div>
                    <div className="md:flex mt-10">
                      <div className="md:flex flex-1 items-center mb-6 lg:mb-0">
                        {/* {one.is_exclusive && (
                          <img
                            className="float-left mr-6 h-20 hide-mobile"
                            src={exclusiveimg}
                          />
                        )} */}

                        {/* {one.is_verified && (
                            <span className="text-sm text-white relative inline-flex tag tag-lg mr-6 bg-secondary">
                              <img className="float-left mr-2" src={premiumimg} />
                          Verified
                            </span>
                          )} */}
                        {/* {one.is_featured && (
                            <span className="text-sm text-white relative inline-flex tag tag-lg mr-6">
                              <img className="float-left mr-2" src={premiumimg} />
                          Featured
                            </span>
                          )} */}

                        <span className="bg-primary rounded text-xs p-2 text-white font-bold">
                          # {one.prefix} {one.property_id}
                        </span>

                        <span className="text-gray-500 text-sm ml-6">
                          {one.verified_at
                            ? `Posted on ${moment(one.verified_at).format(
                                DATE_FORMAT,
                              )}`
                            : ` Added on ${moment(one.added_at).format(
                                DATE_FORMAT,
                              )}`}
                        </span>

                        <div className="inline-flex items-center pl-6">
                                <i className="material-icons opacity-60 hidden lg:block">
                        visibility
                      </i>
                      <span className="text-xs opacity-60 pl-1">  {one.view_count_guest + one.view_count_user}</span>
                            </div>

                        {one.is_premium && (
                          <span
                            className="text-xs text-white relative font-bold ml-6 mr-10 rounded-full block pl-6 pr-2 py-1"
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

                      <InlineShareButtons
                        config={{
                          alignment: 'center', // alignment of buttons (left, center, right)
                          color: 'social', // set the color of buttons (social, white)
                          enabled: true, // show/hide buttons (true, false)
                          font_size: 16, // font size for the buttons
                          labels: null, // button labels (cta, counts, null)
                          language: 'en', // which language to use (see LANGUAGES)
                          networks: [
                            // which networks to include (see SHARING NETWORKS)
                            'facebook',
                            'messenger',
                            'whatsapp',
                            'twitter',
                            'linkedin',
                            'email',
                          ],
                          padding: 12, // padding within buttons (INTEGER)
                          radius: 4, // the corner radius on each button (INTEGER)
                          show_total: true, //share count
                          size: 32, // the size of each button (INTEGER)
                          // OPTIONAL PARAMETERS
                          url: url,
                        }}
                      />
                    </div>
                  </div>
                  <div className="lg:w-1/3 pt-8 lg:pt-0">
                    <div className="h-full lg:ml-12 bg-blue-50 p-10 flex flex-col justify-center relative">
                      {one.is_sold_out &&
                        one.basic.property_purpose &&
                        one.basic.property_purpose.title &&
                        one.basic.property_purpose.title === 'Rent' && (
                          <img
                            className="absolute right-0 bottom-0 mr-2 mb-10"
                            src={rented}
                          />
                        )}
                      {one.is_sold_out &&
                        one.basic.property_purpose &&
                        one.basic.property_purpose.title &&
                        one.basic.property_purpose.title === 'Sale' && (
                          <img
                            className="absolute right-0 bottom-0 mr-2 mb-10"
                            src={sold}
                          />
                        )}

                      {one.price && one.price.is_price_on_call ? (
                        <p className="text-2xl leading-none text-secondary">
                          Price On Call
                        </p>
                      ) : (
                        <>
                          {one.price && one.price.is_starting_from ? (
                            <p className="text-lg font-bold text-secondary">
                              Starting From
                            </p>
                          ) : (
                            ''
                          )}
                          <p className="text-gray-700">
                            {one.price.label.title}
                          </p>
                          <p className="text-3xl font-black leading-none text-secondary">
                            Rs.
                            {one.price
                              ? Intl.NumberFormat('en-IN').format(
                                  one.price.value,
                                )
                              : null}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:flex">
                  <div className="lg:w-2/3 pt-12">
                    <div className="mainSlider relative">
                      <ImageGallery
                        showThumbnails
                        items={images}
                        // onThumbnailClick={() => thumnailClick()}
                        showFullscreenButton
                        // showPlayButton={showPlayButton && showGalleryPlayButton}
                        showPlayButton={false}
                        onSlide={NextSlide.bind(this)}
                      />
                      <span
                        className="text-white px-4 py-1 rounded-full absolute text-xs flex justify-center items-center"
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          left: 20,
                          bottom: 95,
                        }}
                      >
                        <i
                          className="material-icons mr-2"
                          style={{
                            fontSize: 14,
                          }}
                        >
                          photo_library
                        </i>
                        {one.media.images.length}
                      </span>
                    </div>
                    {/* {width < 769 && (
                      <>
                        <div
                          className={`bg-secondary p-2 z-50 ${
                            !isTitleHidden
                              ? 'hidden -translate-y-full'
                              : 'translate-y-0'
                          } fixed items-center flex left-0 right-0 top-0 ease-in-out`}
                        >
                          <h2 className="text-lg text-white font-bold pr-10 flex-1">
                            {' '}
                            {one.basic.title ? one.basic.title : ''}
                          </h2>
                          <div className="inline-flex text-white">
                            <span
                              className="w-10 h-10 inline-block inline-flex items-center justify-center"
                              onClick={showSearchModal}
                            >
                              <i
                                className="material-icons"
                                style={{ fontSize: 24 }}
                              >
                                search
                              </i>
                            </span>
                          </div>
                        </div>

                        <Dialog
                          fullScreen
                          open={showSearch}
                          onClose={handleSearchModal}
                        >
                          <div
                            className="rounded-full inline-flex items-center justify-center mr-4 mt-4 cursor-pointer absolute right-0 top-0 bg-red-500 text-white hover:bg-red-600 w-6 h-6"
                            onClick={handleSearchModal}
                          >
                            <i className="material-icons"> close </i>
                          </div>
                          <DialogContent>
                            <SearchDiv />
                          </DialogContent>
                        </Dialog>
                      </>
                    )} */}
                    <Element name="overview">
                      <div className="mt-4 md:mt-8">
                        <h2 className="font-bold  mb-2 text-3xl">Overview</h2>

                        <div className="flex flex-wrap mt-5 -mx-3 text-sm">
                          {one.basic &&
                            one.location_property &&
                            one.location_property.built_area !== '' &&
                            one.basic.property_category.title !== 'Land' && (
                              <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex">
                                <img
                                  className="w-7"
                                  src={pillar}
                                  alt="Builtup area"
                                />
                                <div className="flex1 pl-6">
                                  <span className="text-xs font-bold text-gray-400">
                                    Built Up Area
                                  </span>
                                  <span className="text-sm font-bold block text-gray-600">
                                    {one.location_property.built_area}{' '}
                                    {
                                      one.location_property.built_area_unit
                                        .title
                                    }
                                  </span>
                                </div>
                              </div>
                            )}
                          {one.location_property &&
                            one.location_property.property_face &&
                            one.location_property.property_face.title && (
                              <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex">
                                <img
                                  className
                                  src={compass}
                                  alt="Property Face"
                                />
                                <div className="flex1 pl-6">
                                  <span className="text-xs font-bold  text-gray-400">
                                    Property Face
                                  </span>
                                  <span className="text-sm font-bold block  text-gray-600">
                                    {one.location_property
                                      ? one.location_property.property_face
                                          .title
                                      : null}
                                  </span>
                                </div>
                              </div>
                            )}
                          {one.basic &&
                            one.basic.property_category &&
                            one.basic.property_category.title !== 'Land' &&
                            one.basic.property_category.title !==
                              'Office Space' &&
                            one.building &&
                            one.building.built_year && (
                              <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex">
                                <img
                                  className="w-7"
                                  src={calendar}
                                  alt="Built Year"
                                />
                                <div className="flex1 pl-6">
                                  <span className="text-xs font-bold text-gray-400">
                                    Built Year
                                  </span>
                                  <span className="text-sm font-bold block  text-gray-600">
                                    {one.building &&
                                    one.building.built_year &&
                                    one.building.built_month &&
                                    one.building.calender_type ? (
                                      <>
                                        {' '}
                                        {one.building.built_year}{' '}
                                        <ReturnMonth
                                          month={one.building.built_month}
                                          type={
                                            one.building.calender_type.title
                                          }
                                        />{' '}
                                        {one.building.calender_type.title}
                                      </>
                                    ) : null}
                                  </span>
                                </div>
                              </div>
                            )}
                          {one.basic &&
                            one.basic.property_ownership &&
                            one.basic.property_ownership.title &&
                            one.basic.property_ownership.title !== '' && (
                              <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex">
                                <img
                                  className="w-7"
                                  src={calendar}
                                  alt="Built Year"
                                />
                                <div className="flex1 pl-6">
                                  <span className="text-xs font-bold text-gray-400">
                                    Ownership Type
                                  </span>
                                  <span className="text-sm font-bold block  text-gray-600">
                                    {one.basic
                                      ? one.basic.property_ownership.title
                                      : null}
                                  </span>
                                </div>
                              </div>
                            )}
                          {one.location_property.road_access_value && (
                            <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex">
                              <img
                                className="w-7"
                                src={road}
                                alt="Road Access"
                              />
                              <div className="flex1 pl-6">
                                <span className="text-xs font-bold text-gray-400">
                                  Road Access
                                </span>
                                <span className="text-sm font-bold block  text-gray-600">
                                  {one.location_property
                                    ? one.location_property.road_access_value
                                    : '0'}
                                  {one.location_property
                                    ? one.location_property
                                        .road_access_length_unit.title
                                    : 'Feet'}
                                  {one.location_property &&
                                  one.location_property.road_access_road_type &&
                                  one.location_property.road_access_road_type
                                    .title
                                    ? `/${
                                        one.location_property
                                          .road_access_road_type.title
                                      }`
                                    : ''}
                                </span>
                              </div>
                            </div>
                          )}
                          {one.basic &&
                            one.basic.property_category &&
                            one.basic.property_category.title !== 'Land' &&
                            one.building &&
                            one.building.parking !== '' &&
                            one.basic.property_category.title !==
                              'Office Space' && (
                              <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex">
                                <img
                                  className="w-7"
                                  src={parking}
                                  alt="parking"
                                />
                                <div className="flex1 pl-6">
                                  <span className="text-xs font-bold text-gray-400">
                                    Parking
                                  </span>
                                  <span className="text-sm font-bold block text-gray-600">
                                    {one.building && one.building.no_of
                                      ? one.building.parking
                                      : '2'}
                                  </span>
                                </div>
                              </div>
                            )}

                          {one.building &&
                            one.building.no_of &&
                            one.building.total_floor != 0 && (
                              <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex">
                                <img className="w-7" src={ladder} />
                                <div className="flex1 pl-6">
                                  <span className="text-xs font-bold text-gray-400">
                                    Floors
                                  </span>
                                  <span className="font-bold block text-gray-600">
                                    {one.building.total_floor} Stories
                                  </span>
                                </div>
                              </div>
                            )}
                          {one.building &&
                            one.building.no_of &&
                            one.building.no_of.bedroom != 0 && (
                              <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex">
                                <img className="w-7" src={bed} />
                                <div className="flex1 pl-6">
                                  <span className="text-xs font-bold text-gray-400">
                                    Bedrooms
                                  </span>
                                  <span className="font-bold block text-gray-600">
                                    {one.building.no_of.bedroom}
                                  </span>
                                </div>
                              </div>
                            )}

                          {one.building &&
                            one.building.no_of &&
                            one.building.no_of.bathroom != 0 && (
                              <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex">
                                <img className="w-7" src={shower} />
                                <div className="flex1 pl-6">
                                  <span className="text-xs font-bold text-gray-400">
                                    Bathrooms
                                  </span>
                                  <span className="font-bold block text-gray-600">
                                    {one.building.no_of.bathroom}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>
                        <div className="lg:flex flex-wrap mt-4 justify-between">
                          {!one.is_project &&
                            one.basic &&
                            one.basic.property_category &&
                            one.basic.property_category.title !== 'Land' &&
                            one.basic.property_category.title !==
                              'Office Space' && (
                              <div className="flex-1 md:flex items-center">
                                {/* <div className="flex items-center mr-4 my-2 lg:my-0">
                                      <img
                                        className="w-7"
                                        src={shower}
                                      />
                                      <span className="text-xs font-bold  ">
                                        {one.building && one.building.no_of
                                          ? one.building.no_of.kitchen
                                          : '1'}{' '}
                                        Kitchens
                                  </span>
                                    </div>

                                    <div className="flex items-center mr-4 my-2 lg:my-0">
                                      <img
                                        className="w-7"
                                        src={shower}
                                      />
                                      <span className="text-xs font-bold  ">
                                        {one.building && one.building.no_of
                                          ? one.building.no_of.dinningroom
                                          : '1'}{' '}
                                        Dinning Rooms
                                  </span>
                                    </div>

                                    <div className="flex items-center mr-4 my-2 lg:my-0">
                                      <img
                                        className="w-7"
                                        src={shower}
                                      />
                                      <span className="text-xs font-bold  ">
                                        {one.building && one.building.no_of
                                          ? one.building.no_of.hall
                                          : '1'}{' '}
                                        Halls
                                  </span>
                                    </div> */}
                              </div>
                            )}
                          {/* <div className="md:flex flex-1 justify-end items-center mr-4 my-2 lg:my-0">
                            <button
                              className="text-red-600  cursor-pointer ml-4 hover:underline"
                              type="button"
                              onClick={() => showFeedbackModal('no')}
                            >
                              Report Property ?
                            </button>
                            <button
                              className="text-secondary  cursor-pointer ml-4 hover:underline"
                              type="button"
                              onClick={() => showFeedbackModal('yes')}
                            >
                              Have Feedbacks ?
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </Element>
                    <Element name="description">
                      <div className="mt-12">
                        <h2 className="font-bold  mb-2 text-3xl">
                          Description
                        </h2>
                        {one.basic ? (
                          <>
                            <div
                              className="ckEditor mt-4 text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: one.basic.description,
                              }}
                            />

                            {/* <div
                              className="ckEditor mt-4"
                              dangerouslySetInnerHTML={{
                                __html:
                                  !readMore &&
                                  one.basic.description.length > 350
                                    ? `${one.basic.description.substring(
                                        0,
                                        350,
                                      )}...`
                                    : one.basic.description,
                              }}
                            /> */}
                            {/* {!readMore && one.basic.description.length > 350 && (
                              <button
                                className="underline text-secondary"
                                onClick={handleReadMore}
                                type="button"
                              >
                                Read More
                              </button>
                            )} */}
                          </>
                        ) : null}
                      </div>
                    </Element>
                    <Element name="amenities">
                      {one.basic &&
                        one.basic.property_category &&
                        one.basic.property_category.title !== 'Land' && (
                          <div className="mt-12">
                            <h2 className="font-bold  mb-2 text-3xl">
                              Amenities
                            </h2>
                            {/* {one.building.amenities
                                                                            ? one.building.amenities.map(each => `|${each.title}| `)
                                                                            : 'NA'} */}
                            <div className="flex md:p-4 flex-wrap -mx-4">
                              {one.building.amenities
                                ? one.building.amenities.map(each => (
                                    <div
                                      className="w-1/2 lg:w-1/5 text-center px-4 my-4 flex items-center"
                                      key={`amenities-${each.title}`}
                                    >
                                      <div className="w-12 h-12 text-center flex items-center">
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
                                      <p className=" opacity-60 text-left pl-4">
                                        {each.title}
                                      </p>
                                    </div>
                                  ))
                                : 'NA'}
                            </div>
                          </div>
                        )}
                    </Element>

                    <Element name="map">
                      {one.map_src ? (
                        <div className="mt-12">
                          <h2 className="font-bold  mb-2 text-3xl">
                            View on Map
                          </h2>
                          <div
                            className="relative overflow-hidden mt-12"
                            style={{
                              paddingTop: '56%',
                            }}
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
                      ) : null}
                    </Element>
                    <Element name="comments">
                      <div className="mt-12">
                        <h2 className="font-bold  mb-2 text-3xl">
                          Conversations
                        </h2>
                        <div
                          className="mt-6 p-2 md:p-4"
                          style={{ backgroundColor: '#F7F7FB' }}
                        >
                          <FacebookProvider appId="403635297248992">
                            <Comments
                              href={`${URL_BASE}detail/${one.property_id}`}
                              width="100%"
                            />
                          </FacebookProvider>
                        </div>
                      </div>
                    </Element>
                  </div>
                  <div className="lg:w-1/3 pt-12 lg:pl-12">
                    <div
                      className="md:relative"
                      style={{
                        zIndex: 70,
                        top: 20,
                      }}
                    >
                      {user.id === one.added_by._id ? (
                        ''
                      ) : (
                        <div className="bg-gray-50">
                          {one.is_by_agency && one.agency_id ? (
                            <>
                              <div className="bg-gray-100 px-6 py-3">
                                <h3 className="text-2xl">Contact Agent</h3>
                              </div>
                              <div className="px-6">
                                <div className="flex mt-10">
                                  <Link
                                    to={`/agent/ ${one.agency_id._id}`}
                                    className="flex items-center justify-center w-8 h-8 bg-white rounded-full overflow-hidden"
                                  >
                                    <img
                                      src={
                                        one.agency_id &&
                                        one.agency_id.logo &&
                                        one.agency_id.logo.path &&
                                        IMAGE_BASE + one.agency_id.logo.path
                                      }
                                      className="object-cover"
                                      alt={one.agency_id.title}
                                    />
                                  </Link>
                                  <div className="flex-1 pl-4">
                                    <p className="text-xs">Property by:</p>
                                    <Link
                                      className="text-black hover:underline font-bold  text-sm"
                                      to={`/agent/${one.agency_id._id}`}
                                    >
                                      {one.agency_id.title}
                                    </Link>
                                  </div>
                                </div>

                                <div className="flex mt-5">
                                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full overflow-hidden">
                                    <i class="material-icons text-2xl">
                                      phone_iphone
                                    </i>
                                  </div>
                                  <div className="flex-1 pl-4">
                                    <p className="font-bold text-sm">
                                      {one.is_by_agency &&
                                      one.agent_id &&
                                      one.agent_id.name
                                        ? one.agent_id.name
                                        : one.added_by.name}
                                    </p>
                                    <a
                                      className="pt-2 text-xs"
                                      href={`tel:${one.agency_id.mobile}`}
                                    >
                                      {one.agency_id.mobile}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            one.added_by &&
                            one.posted_by_admin === false && (
                              <>
                                <div className="flex my-4 px-6">
                                  <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                      className="object-cover"
                                      src={
                                        one.added_by &&
                                        one.added_by.image &&
                                        one.added_by.image.path
                                          ? IMAGE_BASE + one.added_by.image.path
                                          : defaultUser
                                      }
                                      alt={one.added_by.name}
                                    />
                                  </div>
                                  <div className="flex-1 pl-4">
                                    <p className="font-bold">
                                      {one.added_by.name}
                                    </p>
                                    <a href={`tel:${one.added_by.mobile_no}`}>
                                      {one.added_by.mobile_no}
                                    </a>
                                  </div>
                                </div>
                              </>
                            )
                          )}
                          <div className="px-6">
                            {token && token !== '' ? (
                              <>
                                <div className="mt-4">
                                  <input
                                    className="px-4 py-3 bg-white w-full focus:shadow"
                                    placeholder="Name"
                                    id="grid-name"
                                    type="text"
                                    value={offer.name}
                                    onChange={handleChange('name')}
                                  />
                                  {errors.name ? (
                                    <div className="error">{errors.name}</div>
                                  ) : null}
                                </div>
                                <div className="mt-4">
                                  <input
                                    className="px-4 py-3 bg-white w-full focus:shadow"
                                    placeholder="Email"
                                    id="grid-email"
                                    type="text"
                                    value={offer.email}
                                    onChange={handleChange('email')}
                                  />
                                  {errors.email ? (
                                    <div className="error">{errors.email}</div>
                                  ) : null}
                                </div>
                                <div className="mt-4">
                                  <input
                                    className="px-4 py-3 bg-white w-full focus:shadow"
                                    placeholder="Tel:"
                                    id="grid-phone"
                                    type="text"
                                    value={offer.phone}
                                    onChange={handleChange('phone')}
                                  />
                                  {errors.phone ? (
                                    <div className="error">{errors.phone}</div>
                                  ) : null}
                                </div>

                                <div className="mt-4">
                                  <textarea
                                    className="px-4 py-3 bg-white w-full focus:shadow"
                                    rows="3"
                                    placeholder={`Hello, I'm interested in your property [${
                                      one.prefix
                                    }${one.property_id}]`}
                                    value={offer.message}
                                    maxLength="140"
                                    onChange={handleChange('message')}
                                  />
                                  <div className="text-xs mt-2">
                                    {offer.message.length}/ 140
                                  </div>
                                  <div className="error">
                                    {errors.message && errors.message}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="py-3 px-10 rounded my-10 font-bold text-lg bg-primary text-white inline-block"
                                  onClick={handleMakeOffer}
                                  disabled={offer_loading}
                                >
                                  {offer_loading
                                    ? '...'
                                    : one.is_by_agency
                                    ? 'Send Message'
                                    : 'Send Message'}
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                className="py-3 px-10 rounded my-10 font-bold text-lg bg-primary text-white inline-block"
                                onClick={handleFavorite}
                                disabled={offer_loading}
                              >
                                {offer_loading ? '...' : 'Contact Seller'}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <HomeLoan />
              <StaticContentDiv
                className="mt-10"
                contentKey="explore-tools-2"
              />

              {similar && similar.length > 0 ? (
                <div className="container mx-auto py-16">
                  <h2 className="text-2xl md:text-3xl text-gray-600 tracking-tight">
                    Related Properties
                    {/* Other Properties In{' '}
                    {one.address && one.address.area_id
                      ? one.address.area_id.name
                      : 'Area'} */}
                  </h2>
                  <Slider
                    {...settings2}
                    className="relative multiSlider flex flex-wrap mt-6 -mx-4"
                  >
                    {similar && similar
                      ? similar.map(each => (
                          <div
                            className="w-full md:w-1/2 lg:w-1/4 px-4 relative h-full"
                            key={`trending-${each && each._id}`}
                          >
                            <div
                              className="relative overflow-hidden w-full"
                              onClick={() => redirectToDetail(each.slug_url)}
                            >
                              <Link
                                to={`/detail/${each.slug_url}`}
                                className="relative block overflow-hidden h-44 rounded-lg"
                              >
                                <img
                                  src={
                                    each.media &&
                                    each.media.images &&
                                    each.media.images[0] &&
                                    each.media.images[0].id
                                      ? `${IMAGE_BASE}${each.media.images[0].id.path.replace(
                                          'public/',
                                          'public/600-300/',
                                        )}`
                                      : tempImg
                                  }
                                  className="object-cover"
                                  alt={each.basic.title}
                                />
                              </Link>
                              <h3 className="text-lg hover:text-primary mt-8 block">
                                <Link to={`/detail/${each.slug_url}`}>
                                  {each.basic.title.trim() === ''
                                    ? 'Title'
                                    : each.basic.title}
                                </Link>
                              </h3>
                              <div className="mt-4">
                                <p className="flex">
                                  <img src={pin} className="h-4 mr-4 mt-px" />
                                  <p className="text-xs font-bold text-black opacity-50 flex-1">
                                    {each.address && each.address.area_id
                                      ? each.address.area_id.name
                                      : 'Area'}
                                    {', '}
                                    {each.address && each.address.city_id
                                      ? each.address.city_id.name
                                      : 'City'}
                                  </p>
                                </p>
                              </div>

                              <p className="font-bold text-lg text-primary mt-4">
                                {each.price && !each.price.is_price_on_call ? (
                                  <>
                                    Rs.
                                    {Intl.NumberFormat('en-IN', {
                                      maximumSignificantDigits: 3,
                                    }).format(each.price.value)}{' '}
                                    {` `}
                                    <span className="text-sm">
                                      {' '}
                                      ({each.price.label.title})
                                    </span>
                                  </>
                                ) : (
                                  'Price On Call'
                                )}
                              </p>
                            </div>
                          </div>
                        )) // < />
                      : null}
                  </Slider>
                </div>
              ) : null}

              <div className="bg-gray-100 py-16">
                {related && related.length > 0 && (
                  <div className="container mx-auto">
                    <h2 className="text-2xl md:text-3xl text-black tracking-tight">
                      Other Properties by <br />
                      <p className="text-sm font-bold">{one.agency_id.title}</p>
                    </h2>
                    <Slider
                      {...settings}
                      className="relative multiSlider flex flex-wrap mt-6 -mx-2"
                    >
                      {related.map(each => (
                        <div
                          className="w-full md:w-1/2 lg:w-1/4 px-2 relative h-full"
                          key={`recentproperty-${each && each._id}`}
                        >
                          <div
                            className="relative shadow overflow-hidden bg-white rounded-xl w-full"
                            onClick={() => redirectToDetail(each.slug_url)}
                          >
                            <div className="relative block overflow-hidden h-48">
                              <Link to={`/detail/${each.slug_url}`}>
                                <img
                                  src={
                                    each.media &&
                                    each.media.images &&
                                    each.media.images[0] &&
                                    each.media.images[0].id
                                      ? `${IMAGE_BASE}${each.media.images[0].id.path.replace(
                                          'public/',
                                          'public/600-300/',
                                        )}`
                                      : tempImg
                                  }
                                  className="object-cover"
                                  alt={each.basic.title}
                                />
                              </Link>
                            </div>
                            <div className="p-6">
                              <h3 className="text-lg hover:text-primary block">
                                <Link to={`/detail/${each.slug_url}`}>
                                  {each.basic.title.trim() === ''
                                    ? 'Title'
                                    : each.basic.title}
                                </Link>
                              </h3>

                              <p className="text-xs font-bold text-black opacity-50 flex-1">
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
                                    <span className="text-sm">
                                      {' '}
                                      ({each.price.label.title})
                                    </span>
                                  </>
                                ) : (
                                  'Price On Call'
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </div>

              {/* <SearchDiv /> */}

              <div className="container mx-auto py-16">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl lg:text-3xl uppercase font-medium">
                    News &amp; Articles
                  </h2>
                  <Link
                    to="/news"
                    className="w-10 h-10 inline-flex items-center justify-center shadow-lg rounded-full"
                  >
                    <i className="material-icons text-primary text-lg">
                      chevron_right
                    </i>
                  </Link>
                </div>
                <div className="layout-1 layout-1-extend notitle mt-12">
                  <RecentBlogs />
                </div>
              </div>
            </React.Fragment>
          )}
        </>
      )}
      {/* <Dialog open={showConverter} onClose={handleConverterModal}>
          <UnitConverter isModal />
        </Dialog>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={feedbackForm}
          onClose={handleFeedbackModal}
        >
          <div
            className="rounded-full inline-flex items-center justify-center mr-4 mt-4 cursor-pointer absolute right-0 top-0 bg-red-500 text-white hover:bg-red-600 w-6 h-6"
            onClick={handleFeedbackModal}
          >
            <i className="material-icons"> close </i>
          </div>
          <Feedback />
        </Dialog> */}
    </>
  );
};

DetailPage.propTypes = {
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
  loading: makeSelectLoadingOne(),
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
  all: makeSelectAll(),
});

const withConnect = connect(
  mapStateToProps,
  {
    ...mapDispatchToProps,
    push,
    clearOne,
  },
);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});
const withReducer = useInjectReducer({
  key,
  reducer,
});
const withSaga = useInjectSaga({
  key,
  saga,
});
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withStyle,
  withConnect,
)(DetailPage);
