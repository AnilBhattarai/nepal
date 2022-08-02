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

import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Table from '../../../components/Table';
import Loader from '../../../assets/img/loader.svg';
import { IMAGE_BASE } from '../../App/constants';
import Skeleton from '../../../components/Skeleton';

const key = 'trendingProperty';

export const TrendingProperty = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    push,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
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
        <title>Trending Properties</title>
      </Helmet>
      <div className="bg-white">
        <div className="bg-ptn-faded">
          <div className="container mx-auto py-8 text-center">
            <h1 className="text-2xl font-bold">Trending Properties</h1>
            <p className="text-gray-600">list of properties gone viral</p>
          </div>
        </div>
        <div className="container mx-auto py-10">
          {loading && loading === true ? (
            <Skeleton />
          ) : (
              <div className="flex flex-wrap">
                {data && data.properties
                  ? data.properties.map(each => (
                    <div
                      className="p-2 relative w-full md:w-1/4"
                      key={`trending-${each.id && each.id._id}`}
                    >
                      <Link
                        target="_blank"
                        className="absolute left-0 right-0 top-0 bottom-0 z-50"
                        to={`/detail/${each.id.slug_url}`}
                      />

                      {each.id && (
                        <div
                          className="rounded relative overflow-hidden cursor-pointer bg-white shadow"
                        // onClick={() => redirectToDetail(each.id.slug_url)}
                        >
                          <div className="relative block overflow-hidden">
                            <img
                              src={
                                each.id.media &&
                                  each.id.media.images &&
                                  each.id.media.images[0] &&
                                  each.id.media.images[0].id
                                  ? `${IMAGE_BASE}${each.id.media.images[0].id.path
                                  }`
                                  : tempImg
                              }
                              className="w-full object-cover"
                              style={{ height: '200px' }}
                              alt=""
                            />
                          </div>
                          <div className="p-2 w-full">
                            <h3 className="text-xl tracking-tight truncate text-black">
                              {each.id.basic.title.trim() === ''
                                ? 'Title'
                                : each.id.basic.title}
                            </h3>

                            <p className="pb-2 text-sm text-gray-600">
                              {each.id.address && each.id.address.area_id
                                ? each.id.address.area_id.name
                                : 'Area'}
                              {', '}
                              {each.id.address && each.id.address.city_id
                                ? each.id.address.city_id.name
                                : 'City'}
                            </p>
                            <p className="font-bold text-primary">
                              {each.id.price && !each.id.price.is_price_on_call
                                ? `Rs. ${Intl.NumberFormat('en-IN', {
                                  maximumSignificantDigits: 3,
                                }).format(each.id.price.value)}`
                                : 'Price On Call'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                  : // < />
                  null}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

TrendingProperty.propTypes = {
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
export default compose(
  withConnect,
  memo,
)(TrendingProperty);
