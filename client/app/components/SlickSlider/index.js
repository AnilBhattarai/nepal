/**
 *
 * SlickSlider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeSelectSlide } from '../../containers/App/selectors';
import { loadSlideRequest } from '../../containers/App/actions';
import MediaElement from '../MediaElement';
import LinkBoth from '../LinkBoth';
import { IMAGE_BASE } from '../../containers/App/constants';
import './index.css';

/* eslint-disable react/prefer-stateless-function */
class SlickSlider extends React.PureComponent {
  static propTypes = {
    slideKey: PropTypes.string.isRequired,
    loadSlide: PropTypes.func.isRequired,
    slideObj: PropTypes.object.isRequired,
    show_link: PropTypes.bool,
  };
  static defaultProps = {
    show_link: false,
  };
  componentDidMount() {
    if (this.props.slideObj[this.props.slideKey]) {
      return;
    }
    this.props.loadSlide(this.props.slideKey);
  }

  render() {
    const { slideObj, show_link, show_caption } = this.props;
    const slide = slideObj[this.props.slideKey];
    let settings = {
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: true,
      centerMode: true,
      centerPadding: '40px',
      autoplay: true,
      autoplaySpeed: 2000,
      focusOnSelect: true,
    };
    try {
      if (slide && slide.settings && typeof slide.settings === 'string') {
        settings = JSON.parse(slide.settings);
      }
    } catch (err) {
      console.log(err);
    }
    if (!slide) return null; // maybe add a loader here
    return (
      <div className="slider">
        <Slider {...settings}>
          {slide &&
            slide.images.map(image => (
              <LinkBoth to={show_link ? `${image.link}` : ''} key={image._id}>
                <>
                  <img
                    src={`${IMAGE_BASE}${image.image && image.image.path}`}
                    alt={`${image.image && image.image.filename}`}
                  />
                  {show_caption && <h6>{image.caption}</h6>}
                </>
              </LinkBoth>
              // <MediaElement
              //   mediaKey={image.image}
              //   key={image._id}
              //   link={image.link}
              // />
            ))}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  slideObj: makeSelectSlide(),
});

const mapDispatchToProps = dispatch => ({
  loadSlide: payload => dispatch(loadSlideRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SlickSlider);
