/**
 *
 * HomeLoan
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
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

const key = 'homeLoan';

export const HomeLoan = props => {
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
  const [deletedId, setDeletedID] = useState('');
  const [initialQuery, setInitialQuery] = useState({ page: 1, size: 10 });

  useEffect(() => {
    loadAllRequest();
  }, []);

  useEffect(() => {
    if (query.size !== initialQuery.size) {
      loadAllRequest(query);
    } else if (query.page !== initialQuery.page) {
      loadAllRequest(query);
    }
  }, [query]);

  const handleAdd = () => {
    clearOne();
    push('/admin/home-loan/add');
  };

  const handleEdit = id => {
    push(`/admin/home-loan/edit/${id}`);
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleOpen = id => {
    setOpen(true);
    setDeletedID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    loadAllRequest(query);
  };

  const handleDelete = id => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(({ _id, full_name, email, mobile, is_active }) => [
    full_name,
    email,
    mobile,

    <>
      <Tooltip
        id="tooltip-top"
        title="View Details"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="Edit"
          className={classes.tableActionButton}
          onClick={() => handleEdit(_id)}
        >
          <i className="material-icons mr-4">remove_red_eye</i>
        </IconButton>
      </Tooltip>
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
      <Helmet>
        <title>Home Loan Manage</title>
      </Helmet>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Home Loan </PageHeader>
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
              name="find_full_name"
              id="contents-title"
              placeholder="Search by Name"
              className="m-auto inputbox mr-2"
              value={query.find_full_name}
              // value="test"
              onChange={handleQueryChange}
              style={{ paddingRight: '50px' }}
              onKeyPress={handleKeyPress}
            />
            <input
              type="text"
              name="find_email"
              id="contents-title"
              placeholder="Search by Email"
              className="m-auto inputbox"
              value={query.find_email}
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
          tableHead={['Full Name', 'Email', 'Mobile', '']}
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

HomeLoan.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  clearOne: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
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
  withStyle,
  memo,
)(HomeLoan);
