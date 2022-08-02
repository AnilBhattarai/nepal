import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { IMAGE_BASE } from '../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectDirectory } from './selectors';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="mr-4 absolute right-0 top-0 -mt-16 bg-white w-9 h-9 rounded-full inline-flex items-center justify-center cursor-pointer text-primary"
      onClick={onClick}
    >
      {' '}
      <i className="material-icons text-2xl">keyboard_arrow_right</i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="mr-16 absolute right-0 top-0 -mt-16 bg-white w-9 h-9 rounded-full inline-flex items-center justify-center cursor-pointer text-primary"
      onClick={onClick}
    >
      {' '}
      <i className="material-icons text-2xl">keyboard_arrow_left</i>
    </div>
  );
}

const key = 'homeComponents';

export const DirectorySlider = props => {
  const { loadDirectoryRequest, directories } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadDirectoryRequest();
  }, []);

  let settings = directories
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
            breakpoint: 1210,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 450,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
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

  return (
    <div
      className="bg-purple-500 py-28"
      style={{
        background:
          'linear-gradient(90deg, rgba(38,116,180,1) 0%, rgba(112,92,160,1) 100%)',
      }}
    >
      <div className="container mx-auto lg:flex">
        <div className="lg:w-1/3">
          <span className="bg-primary rounded px-3 text-sm leading-6 inline-block text-white">
            Specific
          </span>
          <h2 className="font-black text-4xl lg:text-6xl text-white mt-6">
            DIRECTORY
          </h2>
          <p className="opacity-70 text-lg text-white mt-6">
            NepalHomes offers buyer to easy home loan processing.
          </p>
          <Link to="/directories">
            <button className="bg-white text-black px-5 py-1 mt-6 leading-6 rounded font-bold">
              View All
            </button>
          </Link>
        </div>

        <div className="mt-6 lg:w-2/3 lg:pl-10">
          <Slider {...settings}>
            {directories && directories.length > 0 ? (
              directories.map(each => (
                <div className="relative px-3" key={`directory-${each.id}`}>
                  <div className="rounded-lg bg-white py-6 px-2 text-center">
                    <img
                      className="h-20 mx-auto"
                      src={
                        each.image && each.image.path
                          ? `${IMAGE_BASE}${each.image.path}`
                          : ''
                      }
                      alt={each.title}
                      loading="lazy"
                    />
                    <h4 className="text-secondary mt-4">{each.title}</h4>
                    <p className="text-sm leading-6 mt-4 opacity-70">
                      {each.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                {' '}
                <span>Load Directories. </span>
              </div>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

DirectorySlider.propTypes = {
  loadDirectoryRequest: PropTypes.func.isRequired,
  directories: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  directories: makeSelectDirectory(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(DirectorySlider);
