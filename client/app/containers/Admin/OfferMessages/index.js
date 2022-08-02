/**
 *
 * OfferMessages
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import moment from 'moment';

// @material-ui/core_components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';

import Table from 'components/Table';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';

import { DATE_FORMAT } from '../../App/constants';

const key = 'offerMessages';

export const OfferMessages = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    classes,
    push,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadAllRequest();
  }, []);

  const handlePagination = ({ page, size }) => {
    loadAllRequest({ page, size });
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({ _id, name, email, phone, message, added_at, propertyId }) => [
      name,
      email,
      phone,
      message,
      propertyId ? (
        <Link
          to={
            propertyId.is_project
              ? `/project/${propertyId.slug_url}`
              : `/detail/${propertyId.slug_url}`
          }
          target="_blank"
          className="underline text-secondary text-sm cursor-pointer mt-1 block"
        >
          {' '}
          {propertyId.basic.title}{' '}
        </Link>
      ) : (
          'Null'
        ),
      moment(added_at).format(DATE_FORMAT),
    ],
  );

  return (
    <>
      <Helmet>
        <title>Property Messages</title>
      </Helmet>

      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Property Messages </PageHeader>
      </div>

      <PageContent loading={loading}>
        <Table
          tableHead={[
            'Name',
            'Email',
            'Phone',
            'Message',
            'Property',
            'Added at',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  tableActionButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },

  waftsrch: {
    padding: 0,
    position: 'absolute',
    borderLeft: '1px solid #d9e3e9',
    borderRadius: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },
});

OfferMessages.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
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
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
  memo,
)(OfferMessages);
