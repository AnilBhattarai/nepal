/**
 *
 * Slider View
 *
 */

import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { IMAGE_BASE } from '../../../containers/App/constants';
import './popuptemplates.css';

const key = 'popUp';

const SliderView = props => {
  const { data, extra_settings } = props;

  let settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    centerMode: false,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 4000,
    focusOnSelect: true,
  };

  const slide = extra_settings;
  let slider_setting;
  try {
    if (
      slide &&
      slide.extra_setting &&
      typeof slide.extra_setting === 'string'
    ) {
      slider_setting = JSON.parse(slide.extra_setting);
    }
  } catch (err) {
    console.log(err);
  }

  let combined;
  if (slide.extra_setting) {
    combined = { ...settings, ...slider_setting };
  } else {
    combined = { ...settings };
  }

  if (extra_settings && extra_settings !== undefined) {
    settings = { ...combined };
  }

  return (
    <Slider
      {...settings}
      className="mt-2 md:mt-3 lg:mt-4 AdvertiseSlider w-full"
    >
      {data.map(each => (
        <Link to={each.link} key={each._id}>
          <div className="relative w-full">
            <img
              src={
                each && each.image && each.image.path
                  ? `${IMAGE_BASE}${each.image.path}`
                  : ``
              }
              // style={{ maxWidth: 200, maxHeight: 200 }}
              alt="slider media"
              className="w-full"
            />

            {/* <h3 className="w-full banner_caption absolute text-xs md:text-sm lg:text-base text-white text-center">
                {each.caption}
              </h3> */}
          </div>
        </Link>
      ))}
    </Slider>
  );
};

const mapStateToProps = createStructuredSelector({});

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(SliderView);
