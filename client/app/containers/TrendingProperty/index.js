/**
 *
 * TrendingProperty
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import withStyles from '@material-ui/core/styles/withStyles';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import tempImg from '../../images/default.jpg';
import { IMAGE_BASE } from '../App/constants';
import Loading from '../../components/Loading';
import Skeleton from '../../components/Skeleton';

const key = 'trendingProperty';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-next`} onClick={onClick}>
      {' '}
      <i className="material-icons">keyboard_arrow_right</i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-prev`} onClick={onClick}>
      {' '}
      <i className="material-icons">keyboard_arrow_left</i>
    </div>
  );
}

export const TrendingProperty = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    classes,
    push,
  } = props;

  const redirectToDetail = slug => {
    props.push(`/detail/${slug}`);
  };

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadAllRequest();
  }, []);

  let settings =
    data && data.properties
      ? {
          dots: false,
          adaptiveHeight: true,
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
          dots: true,
          // dotsClass: 'slick-dots slick-thumb',
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 2,
        };
  try {
    if (settings && typeof settings === 'string') {
      settings = JSON.parse(settings);
    }
  } catch (err) {
    console.log(err);
  }

  return loading && loading === true ? (
    <div />
  ) : (
    <>
      {data && data.is_active && data.properties.length > 0 ? (
        <div className="container mx-auto pt-16">
          <div className="flex items-center">
            <h2 className="text-xl lg:text-3xl uppercase font-medium">
              Trending Properties
            </h2>
            <span
              className="uppercase px-2 py-1 text-xs rounded-full font-bold ml-4"
              style={{ background: '#e4e652' }}
            >
              Trending
            </span>
          </div>
          <div className="relative mt-6 -mx-6">
            <Slider {...settings}>
              {data && data.properties
                ? data.properties.map(each => (
                    <div
                      className="px-6 relative"
                      key={`trending-${each.id && each.id._id}`}
                    >
                      {each.id && (
                        <div>
                          <Link
                            className="relative block overflow-hidden h-44 rounded-lg"
                            to={`/detail/${each.id.slug_url}`}
                          >
                            <img
                              src={
                                each.id.media &&
                                each.id.media.images &&
                                each.id.media.images[0] &&
                                each.id.media.images[0].id
                                  ? `${IMAGE_BASE}${each.id.media.images[0].id.path.replace(
                                      'public/',
                                      'public/600-300/',
                                    )}`
                                  : tempImg
                              }
                              loading="lazy"
                              className="object-cover"
                              alt={each.id.title}
                            />
                          </Link>
                          <h3>
                            <Link
                              className="text-base hover:text-primary mt-8 block"
                              to={`/detail/${each.id.slug_url}`}
                            >
                              {each.id.basic.title ? each.id.basic.title : ''}
                            </Link>
                          </h3>
                          <div className="flex items-center mt-4">
                            <p className="text-sm text-black opacity-70 flex-1 flex">
                              <i className="material-icons text-secondary mt-px mr-2">
                                location_on
                              </i>
                              {each.id.address && each.id.address.area_id
                                ? each.id.address.area_id.name
                                : 'Area'}
                              {', '}
                              {each.id.address && each.id.address.city_id
                                ? each.id.address.city_id.name
                                : 'City'}
                            </p>
                            {each.id.basic && each.id.basic.property_purpose && (
                              <button
                                disabled
                                className={`ml-4 rounded text-sm font-bold px-2 py-1 text-white ${
                                  each.id.basic.property_purpose.title ===
                                  'Rent'
                                    ? 'bg-warning'
                                    : 'bg-success'
                                } `}
                              >
                                {each.id.basic.property_purpose.title}
                              </button>
                            )}
                          </div>
                          {/* <p className="pb-2 text-sm text-gray-600">
                            {each.id.location_property &&
                              each.id.location_property.total_area
                              ? `${each.id.location_property.total_area} ${each.id.location_property.total_area_unit
                                .title
                              }`
                              : ''}
                          </p> */}

                          <p className="font-bold text-primary mt-4">
                            {each.id.price && !each.id.price.is_price_on_call
                              ? `Rs. ${Intl.NumberFormat('en-IN', {
                                  maximumSignificantDigits: 3,
                                }).format(each.id.price.value)} (${
                                  each.id.price.label.title
                                })`
                              : 'Price On Call'}
                          </p>
                          {each.id.agency_id ? (
                            <Link
                              className="pb-2 text-xs font-bold text-gray-600 italic opacity-50 mt-2 inline-block"
                              to={`/agent/${each.id.agency_id._id}`}
                              target="_blank"
                            >
                              By: {each.id.agency_id.title}
                            </Link>
                          ) : null}
                        </div>
                      )}
                    </div>
                  ))
                : // < />
                  null}
            </Slider>
          </div>
        </div>
      ) : null}
    </>
  );
};

TrendingProperty.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    // data: PropTypes.object.isRequired,
    // page: PropTypes.number.isRequired,
    // size: PropTypes.number.isRequired,
    // totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
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
  withReducer,
  withSaga,
  withStyle,
  withConnect,
  memo,
)(TrendingProperty);
