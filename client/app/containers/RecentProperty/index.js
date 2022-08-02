/**
 *
 * RecentProperty
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

import withStyles from '@material-ui/core/styles/withStyles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import tempImg from '../../images/default.jpg';
import { IMAGE_BASE } from '../App/constants';
import Loading from '../../components/Loading';
import Skeleton from '../../components/Skeleton';

const key = 'recentProperty';

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

export const RecentProperty = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    classes,
    push,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const redirectToDetail = slug => {
    push(`/detail/${slug}`);
  };

  useEffect(() => {
    loadAllRequest();
  }, []);

  let settings = data
    ? {
      equalizeHeight: true,
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
        {data && data.length > 0 ? (
          <div className="container mx-auto pt-16">
            <h2 className="text-xl lg:text-3xl uppercase font-medium">Recent Properties
          </h2>
            <div className="relative mt-6 -mx-6">
              <Slider {...settings}>
                {data.map(each => (
                  <div
                    className="px-6"
                    key={`recentproperty-${each._id}`}
                  >
                    <Link className="relative block overflow-hidden h-44 rounded-lg" to={`/detail/${each.slug_url}`}>
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
                        loading="lazy"
                        className="object-cover"
                        alt=""
                      />
                    </Link>
                    <h3>
                      <Link className="text-base hover:text-primary mt-8 block" to={`/detail/${each.slug_url}`}>
                        {each.basic.title.trim() === ''
                          ? 'Title'
                          : each.basic.title}
                      </Link>
                    </h3>

                    <div className="flex items-center mt-4">
                      <p className="text-sm text-black opacity-70 flex-1 flex">
                        <i className="material-icons text-secondary mt-px mr-2">location_on</i>
                        {each.address && each.address.area_id
                          ? each.address.area_id.name
                          : 'Area'}
                        {', '}
                        {each.address && each.address.city_id
                          ? each.address.city_id.name
                          : 'City'}
                      </p>

                      {each.basic && each.basic.property_purpose && (
                        <button
                          disabled
                          className={`ml-4 rounded text-sm font-bold px-2 py-1 text-white ${each.basic.property_purpose.title ===
                            'Rent'
                            ? 'bg-warning'
                            : 'bg-success'
                            } `}
                        >
                          {each.basic.property_purpose.title}
                        </button>
                      )}
                    </div>

                    <p className="font-bold text-lg text-primary mt-4">
                      {each.price && !each.price.is_price_on_call
                        ? <> Rs.{Intl.NumberFormat('en-IN', {
                          maximumSignificantDigits: 3,
                        }).format(each.price.value)} {` `}
                          <span className="text-sm"> ({each.price.label.title
                          })</span>
                        </>
                        : 'Price On Call'}
                    </p>
                    {each.agency_id ? (
                      <Link
                        className="pb-2 text-xs font-bold text-gray-600 italic opacity-50 mt-2 inline-block"
                        to={`/agent/${each.agency_id._id}`}
                        target="_blank"
                      >
                        By: {each.agency_id.title}
                      </Link>
                    ) : null}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : null
        }
      </>
    );
};

RecentProperty.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
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

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
  memo,
)(RecentProperty);
