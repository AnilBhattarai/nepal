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
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectListing,
} from '../selectors';
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

const key = 'hotProperty';

export const HotProperty = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadListingRequest,
    push,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    window.scrollTo(0, 0);
    loadListingRequest();
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
        <title>Premium Properties</title>
      </Helmet>
      <div className="bg-white">
        {/* <div className="bg-ptn-faded">
          <div className="container mx-auto py-8 text-center">
            <h1 className="text-2xl font-bold">Premium Properties</h1>
            <p className="text-gray-600">
              properties that you don't want to miss
            </p>
          </div>
        </div> */}
        <div className="container mx-auto py-10">
          {loading && loading === true ? (
            <Skeleton />
          ) : (
              <div className="flex flex-wrap" loading={loading.toString()}>
                {data.length > 0
                  ? data.map(each => (
                    <div
                      className="px-2 w-full lg:w-1/4 relative mt-4"
                      key={`trending-${each && each._id}`}
                    >
                      <Link
                        className="absolute left-0 right-0 top-0 bottom-0 z-50"
                        to={`/detail/${each.slug_url}`}
                      />

                      {each && (
                        <div
                          className="rounded relative overflow-hidden cursor-pointer bg-white shadow"
                          onClick={() => redirectToDetail(each.slug_url)}
                        >
                          <div className="relative block overflow-hidden">
                            <img
                              src={
                                each.media &&
                                  each.media.images &&
                                  each.media.images[0] &&
                                  each.media.images[0].id
                                  ? `${IMAGE_BASE}${each.media.images[0].id.path
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
                              {each.basic.title.trim() === ''
                                ? 'Title'
                                : each.basic.title}
                            </h3>

                            <p className="pb-2 text-sm text-gray-600">
                              {each.address && each.address.area_id
                                ? each.address.area_id.name
                                : 'Area'}
                              {', '}
                              {each.address && each.address.city_id
                                ? each.address.city_id.name
                                : 'City'}
                            </p>
                            {each.price && each.price.is_price_on_call ?
                              <p className="font-bold text-black mt-4">Price On Call</p> :
                              <>
                                <p className="font-bold text-black mt-4">
                                  Rs.{' '}
                                  {each.price
                                    ? Intl.NumberFormat('en-IN').format(each.price.value)
                                    : ''}
                                </p>
                                <span className="text-sm text-gray-600">
                                  {each.price.label.title}
                                </span>
                              </>
                            }
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

HotProperty.propTypes = {
  loadListingRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.object.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectListing(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
)(HotProperty);
