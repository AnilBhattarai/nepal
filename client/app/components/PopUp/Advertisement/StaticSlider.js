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
  const { data, slider_setting } = props;

  let settings;
  const slide = slider_setting;
  try {
    if (
      slide &&
      slide.extra_setting &&
      typeof slide.extra_setting === 'string'
    ) {
      settings = JSON.parse(slide.extra_setting);
    }
  } catch (err) {
    console.log(err);
  }

  let combined;
  if (slide && slide.extra_setting) {
    combined = { ...slider_setting, ...settings };
  } else {
    combined = { ...slider_setting };
  }

  return (
    <Slider
      {...combined}
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
