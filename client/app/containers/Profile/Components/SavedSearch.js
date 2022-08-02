/**
 *
 * LeadManage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// @material-ui/core_components
import withStyles from '@material-ui/core/styles/withStyles';

import Table from 'components/Table';

import useInjectSaga from '../../../utils/injectSaga';
import useInjectReducer from '../../../utils/injectReducer';
import * as mapDispatchToProps from '../actions';
import {
  makeSelectLoading,
  makeSelectQuery,
  makeSelectSaved,
} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

import PageHeader from '../../../components/PageHeader/PageHeader';
import Loading from '../../../components/Loading';
import DeleteDialog from '../../../components/DeleteDialog';

const key = 'userPersonalInformationPage';

export const LeadManage = props => {
  const {
    saved: { data, page, size, totaldata, msg },
    loading,
    loadSavedSearchesRequest,
    setQueryValue,
    query,
    deleteSavedSearchesRequest,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState('');

  const handleOpen = id => {
    setOpen(true);
    setDeleteID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteSavedSearchesRequest(deleteID);
    setOpen(false);
  };

  useEffect(() => {
    loadSavedSearchesRequest(query);
  }, []);
  useEffect(() => {
    loadSavedSearchesRequest(query);
  }, [query]);

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(({ _id, title, url }) => [
    <Link to={url} target="_blank" className="text-blue-400 underline">
      {title}
    </Link>,
    <button
      className="px-1 text-center leading-none text-red-500 whitespace-no-wrap text-sm"
      type="button"
      onClick={() => handleOpen(_id)}
    >
      Delete
    </button>,
  ]);

  return (
    <>
      <Helmet>
        <title> My Saved Searches </title>
      </Helmet>

      <DeleteDialog open={open} doClose={handleClose} doDelete={handleDelete} />

      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>My Saved Searches</PageHeader>
      </div>

      <div className="">
        <Table
          tableHead={['Title', 'Actions']}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
          loading={loading}
        />
      </div>
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

LeadManage.propTypes = {
  loadLeadRequest: PropTypes.func.isRequired,
  lead: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  saved: makeSelectSaved(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withStyle,
  withConnect,
  memo,
)(LeadManage);
