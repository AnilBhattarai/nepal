/**
 *
 * Documents
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// @material-ui/core_components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import Select from 'react-select';

import Table from 'components/Table';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import { CHANNEL } from './constants';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const key = 'documents';

export const Documents = props => {
  const {
    all: { data, page, size, totaldata },

    loading,
    loadAllRequest,
    clearOne,
    setQueryValue,
    deleteOneRequest,
    classes,
    query,
    push,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState('');

  useEffect(() => {
    loadAllRequest(query);
  }, [query]);

  const handleAdd = () => {
    clearOne();
    push('/admin/resource-manage/add');
  };

  const handleEdit = id => {
    push(`/admin/resource-manage/edit/${id}`);
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleOpen = id => {
    setOpen(true);
    setDeleteID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = id => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({ _id, name, key, file_id, resource_for, is_active }) => [
      name,
      key,
      file_id && file_id.filename ? file_id.filename : '-',
      resource_for,
      is_active ? 'Active' : 'In-Active',
      <>
        <div className="flex">
          <button
            aria-label="Edit"
            className=" px-1 text-center leading-none"
            onClick={() => handleEdit(_id)}
            type="button"
          >
            <i className="material-icons text-base text-indigo-500 hover:text-indigo-700">
              edit
            </i>
          </button>

          <button
            className="ml-2 px-1 text-center leading-none"
            onClick={() => handleOpen(_id)}
            type="button"
          >
            <i className="material-icons text-base text-red-400 hover:text-red-600">
              delete
            </i>
          </button>
        </div>
      </>,
    ],
  );

  return (
    <>
      <Helmet>
        <title>Resource Manage</title>
      </Helmet>

      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deleteID)}
      />

      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Resource Manage</PageHeader>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          round="true"
          onClick={handleAdd}
          elevation={0}
        >
          <AddIcon />
        </Fab>
      </div>

      <div className="rounded-lg p-4 bg-white ">
        <Table
          tableHead={['Name', 'Key', 'File', 'Resource For', 'Is active', '']}
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

Documents.propTypes = {
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
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  memo,
  withStyle,
)(Documents);
