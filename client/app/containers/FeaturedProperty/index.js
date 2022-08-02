/**
 *
 * FeaturedProperty
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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

import tempImg from '../../images/default.jpg';
import { IMAGE_BASE } from '../App/constants';
import Skeleton from '../../components/Skeleton';

const key = 'featuredProperty';

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

export const FeaturedProperty = props => {
  const {
    all: { data },
    loading,
    loadAllRequest,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const redirectToDetail = slug => {
    props.push(`/detail/${slug}`);
  };

  useEffect(() => {
    loadAllRequest();
  }, []);

  let settings =
    data && data.properties
      ? {
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl lg:text-3xl uppercase font-medium">
              Featured Properties
            </h2>
            <Link
              to="/properties/featured"
              className="w-10 h-10 inline-flex items-center justify-center shadow-lg rounded-full"
            >
              <i class="material-icons text-primary text-lg">chevron_right</i>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6">
            {data && data.properties ? (
              data.properties.map(each => (
                <div
                  className="p-1"
                  key={`featuredProperty-${each.id && each.id._id}`}
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
                          alt={each.id.basic.title}
                        />
                      </Link>

                      <h3>
                        <Link
                          className="text-base hover:text-primary mt-8 block"
                          to={`/detail/${each.id.slug_url}`}
                        >
                          {each.id.basic.title ? each.id.basic.title : 'Title'}
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
                      {/* <p className="font-bold text-primary mt-4">
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
                            {' '}
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
              <div />
            )}
            {/* </Slider> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

FeaturedProperty.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.object.isRequired,
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

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withConnect,
  memo,
)(FeaturedProperty);
