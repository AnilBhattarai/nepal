/**
 *
 * Career
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Table from 'components/Table';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';

import * as mapDispatchToProps from '../actions';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectAppliedUsers,
} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import DeleteDialog from '../../../../components/DeleteDialog';
import Loading from '../../../../components/Loading';

const key = 'career';

export const Career = props => {
  const {
    // all: { data, page, size, totaldata },
    applied_users: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    loadAppliedUsersRequest,
    clearOne,
    setQueryValue,
    deleteOneRequest,
    classes,
    query,
    push, // eslint-disable-line no-shadow
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deleteId, setDeletedID] = useState('');

  useEffect(() => {
    loadAppliedUsersRequest(query);
  }, []);

  // const handleAdd = () => {
  //   clearOne();
  //   push('/admin/career/add');
  // };

  // const handleEdit = id => {
  //   push(`/admin/career/edit/${id}`);
  // };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleOpen = _id => {
    setOpen(true);
    setDeletedID(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    loadAllRequest(query);
  };

  const handleDelete = _id => {
    deleteOneRequest(_id);
    setOpen(false);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // console.log('All', data);

  // const clickDiv = e => {
  //   console.log('namaste function call', e);
  //   push(`/admin/career/`);
  // };

  const handlePagination = ({ page, size }) => {
    loadAllRequest({ page, size });
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(({ _id, name, email }) => [
    _id,
    name,
    email,
    <>
      {/* <Tooltip
          id="tooltip-top"
          title="Edit"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Edit"
            className={classes.tableActionButton}
            onClick={() => handleEdit(slug_url)}
          >
            <Edit
              className={`${classes.tableActionButtonIcon} ${classes.edit}`}
            />
          </IconButton>
        </Tooltip> */}
      <Tooltip
        id="tooltip-top-start"
        title="Remove"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="Close"
          className={classes.tableActionButton}
          onClick={() => handleOpen(_id)}
        >
          <Close
            className={`${classes.tableActionButtonIcon} ${classes.close}`}
          />
        </IconButton>
      </Tooltip>
    </>,
  ]);

  return (
    <>
      <div>
        <Helmet>
          <title>Applied Users</title>
          <meta name="description" content="Description of Career" />
        </Helmet>
      </div>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deleteId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Applied Users</PageHeader>
        {/* <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          round="true"
          onClick={handleAdd}
          elevation={0}
        >
          <AddIcon />
        </Fab> */}
      </div>
      <PageContent loading={loading}>
        <div className="flex justify-end">
          <div className="waftformgroup flex relative mr-2">
            <input
              type="text"
              name="name"
              id="_id"
              placeholder="Search by name"
              className="m-auto inputbox"
              value={query.name}
              // value="test"
              onChange={handleQueryChange}
              style={{ paddingRight: '50px' }}
              onKeyPress={handleKeyPress}
            />
            <IconButton
              aria-label="Search"
              className="waftsrchstyle"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div>

        <Table
          classes={classes}
          tableHead={['ID', 'Name', 'Email', 'action']}
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

Career.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),

  loading: PropTypes.bool.isRequired,
  clearOne: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  deleteOneRequest: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  loadAppliedUsersRequest: PropTypes.func.isRequired,
  applied_users: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  applied_users: makeSelectAppliedUsers(),
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
  withStyle,
  memo,
)(Career);
