/**
 *
 * Projects
 *
 */

import withStyles from '@material-ui/core/styles/withStyles';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import useInjectReducer from 'utils/injectReducer';
import useInjectSaga from 'utils/injectSaga';
import tempImg from '../../images/default.jpg';
import { IMAGE_BASE } from '../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading } from './selectors';
import priceChecker from '../../utils/priceChecker';

const key = 'projects';

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

export const Projects = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    classes,
    push,
  } = props;

  const redirectToDetail = slug => {
    props.push(`/project/${slug}`);
  };

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadAllRequest();
  }, []);
  let settings =
    data && data.properties.length
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

  const getTotalUnis = type => {
    let total = 0;
    for (let index = 0; index < type.length; index++) {
      const element = type[index];
      total = total + element.unit_count;
    }
    return total;
  };

  return (
    <>
      {data && data.properties.length > 0 ? (
        <div className="bg-blue-50">
          <div className="container mx-auto lg:flex">
            <div className="w-1/3 relative hidden lg:block">
              <img
                alt="featured projects"
                className="absolute right-0 top-0 max-w-none h-full"
                loading="lazy"
                src="https://www.nepalhomes.com/public/files/C5AEF5FDA400751-bg-project.jpg"
              />
            </div>

            <div
              className="lg:w-2/3 lg:pl-10 py-20 bg-dots"
              style={{ backgroundPosition: '74% 15%' }}
            >
              <h2>
                <span className="leading-none block font-bold text-xl lg:text-2xl text-gray-300">
                  Projects
                </span>{' '}
                <span className="leading-none text-4xl lg:text-6xl uppercase font-black">
                  Featured
                </span>
              </h2>
              <div className="relative mt-6 multiSlider leftAlign lg:-ml-64 imagezoom ">
                <Slider {...settings}>
                  {data && data.properties.length ? (
                    data.properties.map(each => (
                      <div
                        className="px-2"
                        key={`projects-${each && each.id._id}`}
                      >
                        <div className="relative bg-white shadow h-full rounded-lg overflow-hidden">
                          <div className="relative block h-40 overflow-hidden">
                            <Link to={`/project/${each.id.slug_url}`}>
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
                                className="w-full h-full object-cover"
                                alt={each.id.basic.title}
                              />
                            </Link>
                          </div>
                          <div className="px-2">
                            <h3>
                              <Link
                                className="text-base hover:text-primary mt-4 block"
                                to={`/project/${each.id.slug_url}`}
                              >
                                {each.id.basic.title
                                  ? each.id.basic.title
                                  : 'Title'}
                              </Link>
                            </h3>
                            <p className="text-xs text-black opacity-50 font-bold flex-1 flex">
                              {each.id.address && each.id.address.area_id
                                ? each.id.address.area_id.name
                                : 'Area'}
                              {', '}
                              {each.id.address && each.id.address.city_id
                                ? each.id.address.city_id.name
                                : 'City'}
                            </p>
                            {each.id.range && (
                              <>
                                <p className="py-2 text-base font-bold text-primary">
                                  Rs.
                                  {each.id.range && each.id.range.from ? (
                                    <>
                                      {Intl.NumberFormat('en-IN', {
                                        maximumSignificantDigits: 3,
                                      }).format(
                                        priceChecker(each.id.range.from)
                                          .numeral,
                                      )}

                                      {priceChecker(each.id.range.from).text}
                                    </>
                                  ) : (
                                    ''
                                  )}
                                  {' - '}
                                  Rs.
                                  {each.id.range && each.id.range.to ? (
                                    <>
                                      {Intl.NumberFormat('en-IN', {
                                        maximumSignificantDigits: 3,
                                      }).format(
                                        priceChecker(each.id.range.to).numeral,
                                      )}
                                      {priceChecker(each.id.range.to).text}
                                    </>
                                  ) : (
                                    ''
                                  )}
                                  {each.id.range && each.id.range.unit ? (
                                    <span>{' per '}</span>
                                  ) : (
                                    ''
                                  )}
                                  {each.id.range && each.id.range.unit
                                    ? each.id.range.unit
                                    : ''}
                                </p>
                              </>
                            )}

                            {each.id.unit_count && (
                              <span className="inline-block rounded border-2 border-gray-300 px-2 py-1 text-sm">
                                {getTotalUnis(each.id.project_property_type)}{' '}
                                Properties
                              </span>
                            )}

                            <div>
                              {/* <p className="truncate text-sm">
                                <span className="border border-secondary w-4 h-4 inline-block rounded-full text-center leading-none mr-2">
                                  <i className="material-icons text-xs text-secondary mt-px">
                                    check
                                </i>
                                </span>
                                
                              </p> */}
                              {/* <p className="truncate">
                                <span className="bg-secondary w-4 h-4 inline-block rounded-full text-center leading-none mr-2">
                                  <i className="material-icons text-sm text-white mt-px">
                                    check
                                </i>
                                </span>
                                Property Types:{' '}
                                {each.id.project_property_type.map(
                                  property_type => property_type.type,
                                )}
                              </p> */}
                              {/* <p className="truncate text-sm">
                                <span className="border border-secondary w-4 h-4 inline-block rounded-full text-center leading-none mr-2">
                                  <i className="material-icons text-xs text-secondary mt-px">
                                    check
                                </i>
                                </span>
                                Approx Rs.{' '}
                                {each.id.project_property_type[0] &&
                                  Intl.NumberFormat('en-IN').format(
                                    each.id.project_property_type[0].price,
                                  )}
                              </p> */}
                            </div>

                            <div className="clearfix mt-2">
                              {each.id.developer_id ? (
                                <Link
                                  className="pb-2 text-xs font-bold text-gray-600 italic opacity-50 mt-2 inline-block"
                                  to={`/agent/${each.id.developer_id._id}`}
                                  target="_blank"
                                >
                                  By:{' '}
                                  {each.id.developer_id
                                    ? each.id.developer_id.name
                                    : 'null'}
                                </Link>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div />
                  )}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

Projects.propTypes = {
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
const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withStyle,
  withConnect,
  memo,
)(Projects);
