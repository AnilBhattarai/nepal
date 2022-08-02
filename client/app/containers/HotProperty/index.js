/* eslint-disable indent */
/**
 *
 * HotProperty
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

import tempImg from '../../images/default.jpg';
import { IMAGE_BASE } from '../App/constants';
import Skeleton from '../../components/Skeleton';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="mr-4 absolute right-0 top-0 -mt-16 bg-white w-9 h-9 rounded-full inline-flex items-center justify-center cursor-pointer text-gray-500 hover:text-primary shadow-lg"
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
      className="mr-16 absolute right-0 top-0 -mt-16 bg-white w-9 h-9 rounded-full inline-flex items-center justify-center cursor-pointer text-gray-500 hover:text-primary shadow-lg"
      onClick={onClick}
    >
      {' '}
      <i className="material-icons text-2xl">keyboard_arrow_left</i>
    </div>
  );
}

const key = 'hotProperty';

export const HotProperty = props => {
  const {
    all: { data },
    loading,
    loadAllRequest,
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
          equalizeHeight: true,
          dots: false,
          adaptiveHeight: false,
          infinite: true,
          speed: 500,
          slidesToScroll: 1,
          slidesToShow: 3,
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
              breakpoint: 767,
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

  return loading && loading === true ? (
    <div />
  ) : (
    <>
      {data && data.is_active && data.properties.length ? (
        <div className="container mx-auto pt-16">
          <h2 className="text-xl lg:text-3xl uppercase font-medium">
            Premium Properties
          </h2>
          <div className="relative mt-6 -mx-6">
            <Slider {...settings}>
              {data && data.properties ? (
                data.properties.map(each => (
                  <div
                    className="relative"
                    key={`hotproperty-${each.id && each.id._id}`}
                  >
                    {each.id && (
                      <div className="relative overflow-hidden w-full px-6">
                        <Link
                          className="relative block overflow-hidden h-60 rounded-lg"
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
                                    'public/423-270/',
                                  )}`
                                : tempImg
                            }
                            className="object-cover"
                            alt={each.id.basic.title}
                            loading="lazy"
                          />
                        </Link>

                        <h3>
                          <Link
                            className="text-base hover:text-primary mt-8 block"
                            to={`/detail/${each.id.slug_url}`}
                          >
                            {each.id.basic.title
                              ? each.id.basic.title
                              : 'Title'}
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
                                each.id.basic.property_purpose.title === 'Rent'
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

                        <p className="font-bold text-lg text-primary mt-4">
                          {each.id.price && !each.id.price.is_price_on_call ? (
                            <>
                              Rs.
                              {Intl.NumberFormat('en-IN', {
                                maximumSignificantDigits: 3,
                              }).format(each.id.price.value)}{' '}
                              {` `}
                              <span className="text-sm">
                                {' '}
                                ({each.id.price.label.title})
                              </span>
                            </>
                          ) : (
                            'Price On Call'
                          )}
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
              ) : (
                <div>
                  {' '}
                  <span>Load Hot property. </span>
                </div>
              )}
            </Slider>
          </div>
        </div>
      ) : null}
    </>
  );
};

HotProperty.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.object.isRequired,
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
)(HotProperty);
