/**
 *
 * FavoriteProperties
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';

import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectLoadingMore,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import tempImg3 from '../../images/default.jpg';
import bed from '../../assets/img/bed.svg';
import shower from '../../assets/img/shower.svg';
import tape from '../../assets/img/tape.svg';
import ladder from '../../assets/img/ladder.svg';
import road from '../../assets/img/road.svg';
import { IMAGE_BASE, DATE_FORMAT } from '../App/constants';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import Loading from '../../components/Loading';
import Loader from '../../assets/img/loader.svg';
import Table from '../../components/Table';
import { makeSelectUser } from '../App/selectors';

const key = 'favoriteProperties';

export const FavoriteProperties = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadFavoriteRequest,
    push,
    loading_more,
    loadMoreRequest,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadFavoriteRequest();
  }, []);

  const handlePagination = ({ page, size }) => {
    loadFavoriteRequest({ page, size });
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    loadMoreRequest({ page: newPage, size });
  };

  const changeRoute = (path, project) => {
    if (project) {
      props.push(`/project/${path}`);
    } else {
      props.push(`/detail/${path}`);
    }
  };
  const tablePagination = { page, size, totaldata };

  const tableData = data.map(each => [
    <>
      <div
        onClick={() =>
          changeRoute(each.property_id.slug_url, each.property_id.is_project)
        }
        className="relative"
      >
        <div className="border rounded p-1 ease-in-out cursor-pointer mb-1">
          <div className="flex" key={each.property_id._id}>
            <div className="w-1/3">
              <div className="rounded overflow-hidden h-24">
                <img
                  className="object-cover hover:shadow-lg ease-in-out cursor-pointer"
                  src={
                    each.property_id.media &&
                    each.property_id.media.images.length > 0
                      ? `${IMAGE_BASE}${
                          each.property_id.media.images[0].id.path
                        }`
                      : tempImg3
                  }
                  alt="property"
                  // onClick={() => redirectToDetail(each.property_id.slug_url)}
                />
              </div>
            </div>
            <div className="w-2/3 p-2 pl-4">
              <h3 className="text-lg text-primary font-bold leading-tight">
                {each.property_id.basic.title
                  ? each.property_id.basic.title
                  : 'Title'}{' '}
                ({each.property_id.prefix}
                {each.property_id.is_project
                  ? each.property_id.project_id
                  : each.property_id.property_id}
                )
              </h3>
              <p className="text-sm opacity-75">
                {each.property_id.address && each.property_id.address.area_id
                  ? each.property_id.address.area_id.name
                  : 'Area'}
                {', '}
                {each.property_id.address && each.property_id.address.city_id
                  ? each.property_id.address.city_id.name
                  : 'City'}
              </p>

              {!each.property_id.is_project && (
                <p className="text-primary font-bold leading-none mt-4">
                  Rs.{' '}
                  {each.property_id.price
                    ? Intl.NumberFormat('en-IN').format(
                        each.property_id.price.value,
                      )
                    : null}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
  ]);

  return loading && loading === true ? (
    <>
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <div className="flex justify-between mt-3 mb-4">
        <PageHeader>My Favorites</PageHeader>
      </div>
      <Loading />
      <img src={Loader} style={{ width: '100px' }} alt="loading" />{' '}
    </>
  ) : (
    <>
      {totaldata < 1 ? (
        <div className="py-2 px-4 mt-3 rounded bg-red-100 border border-red-200 flex items-center text-red-600">
          <i className="material-icons mr-2">business</i>
          <span>You have not chosen your favourites properties yet</span>
        </div>
      ) : (
        <>
          <div className="flex justify-between mt-3 mb-4">
            <PageHeader>My Favorites ({totaldata}) </PageHeader>
          </div>
          <div className="bg-white rounded table-grid">
            <Table
              tableData={tableData}
              pagination={tablePagination}
              handlePagination={handlePagination}
            />
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
        </>
      )}
    </>
  );
};

FavoriteProperties.propTypes = {
  loadFavoriteRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  loading_more: makeSelectLoadingMore(),
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
)(FavoriteProperties);
