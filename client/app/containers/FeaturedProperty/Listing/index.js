/**
 *
 * WantedPropertyListing
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from '../actions';
import { makeSelectAll, makeSelectLoading } from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import user from '../../../assets/img/user.svg';
import pin from '../../../assets/img/pin.svg';

import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Table from '../../../components/Table';
import Loader from '../../../assets/img/loader.svg';
import { IMAGE_BASE } from '../../App/constants';
import Skeleton from '../../../components/Skeleton';
import RecentBlogs from '../../Blog/components/RecentBlogsHome';

const key = 'featuredProperty';

export const FeaturedProperty = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    push,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    window.scrollTo(0, 0);
    loadAllRequest();
  }, []);

  // const handlePagination = ({ page, size }) => {
  //   loadAllRequest({ page, size });
  // };

  // const tablePagination = { page, size, totaldata };

  // const tableData = data.map(({ name, email, message, purpose, _id }) => [
  //   <div className="px-1 w-1/6">
  //     <div
  //       className="bg-white shadow h-48 rounded-sm p-4 flex flex-col justify-between"
  //       key={`wantedproperty-${_id}`}
  //     >
  //       <p className="">{message && message}</p>
  //       <div>
  //         <p className="font-bold text-black capitalize">{name && name}</p>
  //         <a
  //           className="text-black hover:underline text-sm"
  //           href={`mailto:${email && email}`}
  //         >
  //           {email && email}
  //         </a>
  //       </div>
  //     </div>
  //   </div>,
  // ]);

  // console.log(tableData);

  return (
    <>
      <Helmet>
        <title>Featured Properties</title>
      </Helmet>
      {loading && loading === true ? (
        <div />
      ) : (
        <div className="bg-white">
          <div className="container mx-auto py-10">
            <h1 className="text-xl lg:text-3xl uppercase font-medium">
              Featured Properties
            </h1>
          </div>
          <div className="container mx-auto">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
              loading={loading.toString()}
            >
              {data && data.properties
                ? data.properties.map(each => (
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
                                  ? `${IMAGE_BASE}${
                                      each.id.media.images[0].id.path
                                    }`
                                  : tempImg
                              }
                              className="object-cover"
                              alt={
                                each.id.basic.title.trim() === ''
                                  ? 'Title'
                                  : each.id.basic.title
                              }
                            />
                          </Link>
                          <h3>
                            <Link
                              to={`/detail/${each.id.slug_url}`}
                              className="text-base hover:text-primary mt-8 block"
                            >
                              {' '}
                              {each.id.basic.title.trim() === ''
                                ? 'Title'
                                : each.id.basic.title}
                            </Link>
                          </h3>
                          <div className="mt-4 flex">
                            <img src={pin} className="h-4 mr-4 mt-px" />
                            <p className="text-xs font-bold text-black opacity-50 flex-1">
                              {each.id.address && each.id.address.area_id
                                ? each.id.address.area_id.name
                                : 'Area'}
                              {', '}
                              {each.id.address && each.id.address.city_id
                                ? each.id.address.city_id.name
                                : 'City'}
                            </p>
                          </div>

                          <p className="font-bold text-lg text-primary mt-4">
                            {each.id.price &&
                            !each.id.price.is_price_on_call ? (
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
                        </div>
                      )}
                    </div>
                  ))
                : // < />
                  null}
            </div>
          </div>
          <div className="container mx-auto pt-16">
            <div className="flex items-center justify-between">
              <h2 className="text-xl lg:text-3xl uppercase font-medium">
                News &amp; Articles
              </h2>
              <Link
                to="/news"
                className="w-10 h-10 inline-flex items-center justify-center shadow-lg rounded-full"
              >
                <i className="material-icons text-primary text-lg">
                  chevron_right
                </i>
              </Link>
            </div>
            <div className="layout-1 layout-1-extend notitle mt-12">
              <RecentBlogs />
            </div>
          </div>
        </div>
      )}
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
export default compose(
  withConnect,
  memo,
)(FeaturedProperty);
