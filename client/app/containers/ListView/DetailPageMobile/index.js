/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import { push } from 'connected-react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Comments, FacebookProvider } from 'react-facebook';
import { Helmet } from 'react-helmet';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import Slider from 'react-slick';
import YouTube from 'react-youtube';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { InlineShareButtons } from 'sharethis-reactjs';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import useInjectReducer from 'utils/injectReducer';
import useInjectSaga from 'utils/injectSaga';
import bed from '../../../assets/img/bed.svg';
import calendar from '../../../assets/img/calendar.svg';
import compass from '../../../assets/img/compass.svg';
import exclusiveimg from '../../../assets/img/exlusive.png';
import featuredimg from '../../../assets/img/featured.svg';
import HeartIcon from '../../../assets/img/heart.svg';
import ladder from '../../../assets/img/ladder.svg';
import HeartLiked from '../../../assets/img/liked.svg';
import parking from '../../../assets/img/parking.svg';
import pillar from '../../../assets/img/pillar.svg';
import premiumimg from '../../../assets/img/premium.svg';
import rented from '../../../assets/img/rented.png';
import road from '../../../assets/img/road.svg';
import shower from '../../../assets/img/shower.svg';
import sold from '../../../assets/img/sold.png';
import defaultUser from '../../../assets/img/user.svg';
import YoutubeImg from '../../../assets/img/youtube.jpg';
import CategoryElement from '../../../components/CategoryElement';
import tempImg from '../../../images/logo.png';
import useWindowDimensions from '../../../utils/windowDimensions';
import { loadSlideRequest } from '../../App/actions';
import { DATE_FORMAT, IMAGE_BASE, URL_BASE } from '../../App/constants';
import {
  makeSelectSlide,
  makeSelectToken,
  makeSelectUser,
} from '../../App/selectors';
import { clearOne } from '../../Comments/actions';
import SearchDiv from '../../HomeSearchSimple/Loadable';
import NotFoundPage from '../../NotFoundPage/Loadable';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectAll,
  makeSelectError,
  makeSelectFavorite,
  makeSelectFavoriteLoading,
  makeSelectFeedbackForm,
  makeSelectLoadingOne,
  makeSelectOffer,
  makeSelectOfferForm,
  makeSelectOfferLoading,
  makeSelectOne,
  makeSelectRelated,
} from '../selectors';
// import HomeLoan from './components/homeloan';
import NavBar from './components/navbar';
import ReturnMonth from './components/ReturnMonth';
import StaticContentDiv from '../../../components/StaticContentDiv';

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
      }/logo.png`,
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
        <div className="container mx-auto">
          <div className="h-48">
            <div className="h-16 w-1/2 skeleton rounded mt-10 mr-mr-16" />
          </div>

          <div className="lg:flex">
            <div className="lg:w-3/4 lg:pr-8">
              <div className="skeleton rounded" style={{ height: 350 }} />
            </div>
            <div className="lg:w-1/4">
              <div className="skeleton rounded" style={{ height: 350 }} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {one.property_id && (
            <React.Fragment>
              <div className="md:hidden relative">
                <ImageGallery
                  showThumbnails={false}
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
                    right: 20,
                    top: 20,
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
              <div className="container mx-auto">
                <h1
                  className="text-3xl md:text-6xl mt-4 md:mt-16 leading-tight"
                  ref={el => (titleRef = el)}
                >
                  {one.basic.title ? one.basic.title : ''}
                </h1>
                <p>
                  {one.address && one.address.area_id
                    ? one.address.area_id.name
                    : 'Area'}
                  {', '}
                  {one.address && one.address.city_id
                    ? one.address.city_id.name
                    : 'City'}
                </p>
                <div className="md:flex mt-4">
                  {one.is_exclusive && (
                    <img
                      className="float-left mr-6 h-20 hide-mobile"
                      src={exclusiveimg}
                    />
                  )}
                  <div className="flex-1">
                    {/* <div className="md:flex items-center">
                      {one.is_verified && (
                        <span className="text-sm text-white relative inline-flex tag tag-lg mr-6 bg-secondary">
                          <img className="float-left mr-2" src={premiumimg} />
                          Verified
                        </span>
                      )}
                      {one.is_featured && (
                        <span className="text-sm text-white relative inline-flex tag tag-lg mr-6">
                          <img className="float-left mr-2" src={premiumimg} />
                          Featured
                        </span>
                      )}
                      {one.is_premium && (
                        <span className="text-sm text-white relative inline-flex tag tag-lg bg-primary mr-10">
                          <img className="float-left mr-2" src={featuredimg} />
                          Premium
                        </span>
                      )}
                      <div className="text-gray-600">
                        # {one.prefix} {one.property_id}
                      </div>
                      <div className="text-gray-600 md:pl-6">
                        Posted on {moment(one.verified_at).format(DATE_FORMAT)}
                      </div>
                    </div> */}
                    <div className="relative my-4 hidden md:block">
                      <InlineShareButtons
                        config={{
                          alignment: 'left', // alignment of buttons (left, center, right)
                          color: 'white', // set the color of buttons (social, white)
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
                          show_total: false, //share count
                          size: 32, // the size of each button (INTEGER)
                          // OPTIONAL PARAMETERS
                          url: url,
                        }}
                      />
                      <button
                        style={{
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          left: 300,
                          top: 0,
                        }}
                        className="iconbox hide-mobile"
                        onClick={() => window.print()}
                      >
                        <i
                          className="material-icons"
                          style={{ color: '#7d7d7d' }}
                        >
                          {' '}
                          print{' '}
                        </i>
                      </button>
                      <button
                        style={{
                          position: 'absolute',
                          left: 350,
                          top: 0,
                        }}
                        className="iconbox hide-mobile"
                        onClick={() => handleFavorite()}
                      >
                        {favorite.is_favourite ? (
                          <img
                            className="inline-block w-4"
                            src={favorite_loading ? HeartLiked : HeartLiked}
                            alt="icon"
                          />
                        ) : (
                          <img
                            className="inline-block w-4"
                            src={favorite_loading ? HeartIcon : HeartIcon}
                            alt="icon"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="md:w-1/4 flex items-center">
                    {one.is_sold_out &&
                      one.basic.property_purpose &&
                      one.basic.property_purpose.title &&
                      one.basic.property_purpose.title === 'Rent' && (
                        <img className="absolute" src={rented} />
                      )}
                    {one.is_sold_out &&
                      one.basic.property_purpose &&
                      one.basic.property_purpose.title &&
                      one.basic.property_purpose.title === 'Sale' && (
                        <img className="absolute" src={sold} />
                      )}
                    <div className="pl-6 text-right flex-1">
                      {one.price && one.price.is_price_on_call ? (
                        <p className="text-2xl leading-none text-black">
                          Price On Call
                        </p>
                      ) : (
                        <>
                          {one.price && one.price.is_starting_from ? (
                            <p className="text-xs">Starting From</p>
                          ) : (
                            ''
                          )}
                          <p className="text-3xl font-bold leading-none text-black">
                            Rs.
                            {one.price
                              ? Intl.NumberFormat('en-IN').format(
                                  one.price.value,
                                )
                              : null}
                          </p>
                          <p className=" text-gray-700">
                            {one.price.label.title}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:flex">
                  <div className="lg:w-3/4 lg:pr-8">
                    <div className="-mx-4 md:mx-0 bg-gray-100 p-4 md:p-6 mt-4 md:mt-8 md:mt-0">
                      <h2 className="font-bold  mb-2 text-2xl uppercase">
                        Overview
                      </h2>

                      <div className="border-b border-dotted flex flex-wrap mt-5 -mx-3">
                        {one.basic &&
                          one.location_property &&
                          one.location_property.built_area !== '' &&
                          one.basic.property_category.title !== 'Land' && (
                            <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex items-center">
                              <img src={pillar} alt="Builtup area" />
                              <div className="flex1 pl-4">
                                <span className="block font-bold ">
                                  Built Up Area
                                </span>
                                <span className="text-lg text-gray-600">
                                  {one.location_property.built_area}{' '}
                                  {one.location_property.built_area_unit.title}
                                </span>
                              </div>
                            </div>
                          )}
                        {one.location_property &&
                          one.location_property.property_face &&
                          one.location_property.property_face.title && (
                            <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex items-center">
                              <img src={compass} alt="Property Face" />
                              <div className="flex1 pl-4">
                                <span className="block font-bold ">
                                  Property Face
                                </span>
                                <span className="text-lg text-gray-600">
                                  {one.location_property
                                    ? one.location_property.property_face.title
                                    : null}
                                </span>
                              </div>
                            </div>
                          )}
                        {one.basic &&
                          one.basic.property_category.title !== 'Land' &&
                          one.basic.property_category.title !==
                            'Office Space' &&
                          one.building &&
                          one.building.built_year && (
                            <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex items-center">
                              <img src={calendar} alt="Built Year" />
                              <div className="flex1 pl-4">
                                <span className="block font-bold ">
                                  Built Year
                                </span>
                                <span className="text-lg text-gray-600">
                                  {one.building &&
                                  one.building.built_year &&
                                  one.building.built_month &&
                                  one.building.calender_type ? (
                                    <>
                                      {' '}
                                      {one.building.built_year}{' '}
                                      <ReturnMonth
                                        month={one.building.built_month}
                                        type={one.building.calender_type.title}
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
                            <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex items-center">
                              <img src={calendar} alt="Built Year" />
                              <div className="flex1 pl-4">
                                <span className="block font-bold ">
                                  Ownership Type
                                </span>
                                <span className="text-lg text-gray-600">
                                  {one.basic
                                    ? one.basic.property_ownership.title
                                    : null}
                                </span>
                              </div>
                            </div>
                          )}
                        <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex items-center">
                          <img src={road} alt="Road Access" />
                          <div className="flex1 pl-4">
                            <span className="block font-bold ">
                              Road Access
                            </span>
                            <span className="text-lg text-gray-600">
                              {one.location_property
                                ? one.location_property.road_access_value
                                : '0'}
                              {one.location_property
                                ? one.location_property.road_access_length_unit
                                    .title
                                : 'Feet'}
                              {one.location_property &&
                              one.location_property.road_access_road_type &&
                              one.location_property.road_access_road_type.title
                                ? `/${
                                    one.location_property.road_access_road_type
                                      .title
                                  }`
                                : ''}
                            </span>
                          </div>
                        </div>
                        {one.basic.property_category.title !== 'Land' &&
                          one.building &&
                          one.building.parking !== '' &&
                          one.basic.property_category.title !==
                            'Office Space' && (
                            <div className="mb-4 w-1/2 lg:w-1/3 px-3 flex items-center">
                              <img src={parking} alt="parking" />
                              <div className="flex1 pl-4">
                                <span className="block font-bold ">
                                  Parking
                                </span>
                                <span className="text-lg text-gray-600">
                                  {one.building && one.building.no_of
                                    ? one.building.parking
                                    : '2'}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="lg:flex flex-wrap mt-4 justify-between">
                        {!one.is_project &&
                          one.basic.property_category.title !== 'Land' &&
                          one.basic.property_category.title !==
                            'Office Space' && (
                            <div className="flex-1 md:flex items-center">
                              {one.building &&
                                one.building.no_of &&
                                one.building.total_floor != 0 && (
                                  <div className="flex items-center mr-4 my-2 lg:my-0">
                                    <img
                                      className="w-5 mr-5 md:mr-2"
                                      src={ladder}
                                    />
                                    <span className="block font-bold ">
                                      {one.building.total_floor} Floors
                                    </span>
                                  </div>
                                )}
                              {one.building &&
                                one.building.no_of &&
                                one.building.no_of.bedroom != 0 && (
                                  <div className="flex items-center mr-4 my-2 lg:my-0">
                                    <img
                                      className="w-5 mr-5 md:mr-2"
                                      src={bed}
                                    />
                                    <span className="block font-bold ">
                                      {one.building.no_of.bedroom} Bedrooms
                                    </span>
                                  </div>
                                )}
                              {one.building &&
                                one.building.no_of &&
                                one.building.no_of.bathroom != 0 && (
                                  <div className="flex items-center mr-4 my-2 lg:my-0">
                                    <img
                                      className="w-5 mr-5 md:mr-2"
                                      src={shower}
                                    />
                                    <span className="block font-bold ">
                                      {one.building.no_of.bathroom} Bathrooms
                                    </span>
                                  </div>
                                )}

                              {/* <div className="flex items-center mr-4 my-2 lg:my-0">
                                      <img
                                        className="w-5 mr-5 md:mr-2"
                                        src={shower}
                                      />
                                      <span className="block font-bold ">
                                        {one.building && one.building.no_of
                                          ? one.building.no_of.kitchen
                                          : '1'}{' '}
                                        Kitchens
                                  </span>
                                    </div>

                                    <div className="flex items-center mr-4 my-2 lg:my-0">
                                      <img
                                        className="w-5 mr-5 md:mr-2"
                                        src={shower}
                                      />
                                      <span className="block font-bold ">
                                        {one.building && one.building.no_of
                                          ? one.building.no_of.dinningroom
                                          : '1'}{' '}
                                        Dinning Rooms
                                  </span>
                                    </div>

                                    <div className="flex items-center mr-4 my-2 lg:my-0">
                                      <img
                                        className="w-5 mr-5 md:mr-2"
                                        src={shower}
                                      />
                                      <span className="block font-bold ">
                                        {one.building && one.building.no_of
                                          ? one.building.no_of.hall
                                          : '1'}{' '}
                                        Halls
                                  </span>
                                    </div> */}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="-mx-4 md:mx-0 p-6 mt-4 md:mt-8">
                      <h2 className="font-bold  mb-2 text-2xl uppercase">
                        Description
                      </h2>

                      {width < 769 && (
                        <>
                          {one.basic ? (
                            <>
                              <div
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
                              />
                              {!readMore && one.basic.description.length > 350 && (
                                <button
                                  className="underline text-secondary"
                                  onClick={handleReadMore}
                                  type="button"
                                >
                                  Read More
                                </button>
                              )}
                            </>
                          ) : null}
                        </>
                      )}

                      {width > 769 && (
                        <>
                          {one.basic ? (
                            <>
                              <div
                                className="ckEditor mt-4"
                                dangerouslySetInnerHTML={{
                                  __html: one.basic.description,
                                }}
                              />
                            </>
                          ) : null}
                        </>
                      )}
                    </div>
                    {one.map_src ? (
                      <div className="-mx-4 md:mx-0 p-6 mt-4 md:mt-8">
                        <h2 className="font-bold  mb-2 text-2xl uppercase">
                          Map
                        </h2>
                        <div
                          className="relative overflow-hidden"
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
                    {one.basic && one.basic.property_category.title !== 'Land' && (
                      <div className="-mx-4 md:mx-0 p-6 mt-4 md:mt-8">
                        <h2 className="font-bold  mb-2 text-2xl uppercase">
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
                                          ? `${IMAGE_BASE}${each.media.path}`
                                          : ''
                                      }
                                      style={{
                                        maxHeight: '100%',
                                        margin: '0 auto',
                                      }}
                                    />
                                  </div>
                                  <p className=" opacity-75 text-left pl-4">
                                    {each.title}
                                  </p>
                                </div>
                              ))
                            : 'NA'}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lg:w-1/4">
                    <div
                      className="md:sticky"
                      style={{
                        zIndex: 70,
                        top: 20,
                      }}
                    >
                      <div className="bg-gray-100 p-4 mt-4">
                        {one.is_by_agency && one.agency_id ? (
                          <>
                            <div className="flex">
                              <div className="w-16 h-16 border bg-white rounded p-1">
                                <Link
                                  to={`/agent/${one.agency_id._id}`}
                                  className="flex items-center justify-center h-full"
                                >
                                  <img
                                    src={
                                      one.agency_id &&
                                      one.agency_id.logo &&
                                      one.agency_id.logo.path &&
                                      IMAGE_BASE + one.agency_id.logo.path
                                    }
                                    alt={one.agency_id.title}
                                  />
                                </Link>
                              </div>
                              <div className="flex-1 pl-2">
                                <span className="block truncate font-bold">
                                  {one.is_by_agency &&
                                  one.agent_id &&
                                  one.agent_id.name
                                    ? one.agent_id.name
                                    : one.added_by.name}
                                </span>
                                {/* <span className="text-gray-600 block truncate">
                                                                            {one.added_by.email}
                                                                          </span>
                                                                          <span className="text-gray-600 block truncate">
                                                                            {one.added_by.mobile_no || ''}
                                                                          </span> */}
                                <Link
                                  className="text-secondary hover:underline block"
                                  to={`/agent/${one.agency_id._id}`}
                                >
                                  {one.agency_id.title}
                                </Link>
                              </div>
                            </div>
                          </>
                        ) : (
                          one.added_by &&
                          one.posted_by_admin === false && (
                            <>
                              <div className="flex my-4">
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
                      </div>
                    </div>
                  </div>
                </div>
                {/* <HomeLoan /> */}
                {/* Similar start */}
              </div>
              <StaticContentDiv contentKey="mobile-styling" />
            </React.Fragment>
          )}
        </>
      )}
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
