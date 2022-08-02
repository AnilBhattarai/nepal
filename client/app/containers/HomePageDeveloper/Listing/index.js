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
  makeSelectListing,
  makeSelectLoading,
  makeSelectLoadingMore,
} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import user from '../../../assets/img/user.svg';

import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Table from '../../../components/Table';
import Loader from '../../../assets/img/loader.svg';
import StaticContentDiv from '../../../components/StaticContentDiv';
import { IMAGE_BASE } from '../../App/constants';
import defaultImage from '../../../assets/img/logo.png';

const key = 'homePageDeveloper';

export const HomeDevelopersListing = props => {
  const {
    listing: { data, page, size, totaldata },
    loading,
    loadListingRequest,
    loadMoreRequest,
    loading_more,
    push,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadListingRequest();
  }, []);

  const handlePagination = ({ page, size }) => {
    loadListingRequest({ page, size });
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    loadMoreRequest({ page: newPage, size });
  };

  const tablePagination = { page, size, totaldata };

  console.log(data);

  const tableData = data.map(
    ({ name, email, phone, address, mobile, bio, logo, _id }) => [
      <div key={`developer-${_id}`} className="w-full">
        <Link to={`/developer/&developer_id=${_id}`}>
          <div className="rounded relative bg-white shadow cursor-pointer hover:border-white ease-in-out">
            <div className="h-32 flex items-center jusitify-center p-2 pb-0">
              <img
                className="max-h-full mx-auto"
                src={logo ? `${IMAGE_BASE}${logo.path}` : defaultImage}
                alt={name}
              />
            </div>
            <div className="flex-1 p-2 text-center">
              <span className="text-lg tracking-tight capitalize block truncate">
                {name || ''}
              </span>
              <span className="text-gray-600 text-sm block truncate">
                {address || ''}
              </span>
            </div>
          </div>
        </Link>
      </div>,
    ],
  );

  // console.log(tableData);

  return (
    <>
      <Helmet>
        <title>Developer Listing</title>
      </Helmet>
      <StaticContentDiv contentKey="developers-list" />

      <div className="bg-blue-100">
        <div className="container mx-auto py-5">
          {loading && loading === true && <Loading />}
          <div className="table-grid col-5">
            <Table tableData={tableData} />
            {loading_more && <img src={Loader} alt="Loading" />}
            {data.length < totaldata && (
              <button
                type="button"
                className="btn w-full border border-secondary bg-blue-100 mb-8 text-secondary mt-4"
                onClick={handleLoadMore}
              >
                Load More
          </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

HomeDevelopersListing.propTypes = {
  loadListingRequest: PropTypes.func.isRequired,
  listing: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listing: makeSelectListing(),
  loading: makeSelectLoading(),
  loading_more: makeSelectLoadingMore(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
)(HomeDevelopersListing);
