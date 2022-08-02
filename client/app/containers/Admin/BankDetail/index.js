/**
 *
 * BankDetail
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import { IMAGE_BASE } from '../../App/constants';

const key = 'bankDetail';

export const BankDetail = props => {
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
    clearQuery,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedID] = useState('');

  useEffect(() => {
    loadAllRequest();
  }, []);

  const handleAdd = () => {
    clearOne();
    push('/admin/banks/add');
  };

  const handleEdit = id => {
    clearOne();
    push(`/admin/banks/edit/${id}`);
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
    loadAllRequest({ page, size });
  };

  const clearFilters = () => {
    loadAllRequest();
    clearQuery();
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({ _id, Bank_Name, Rate_Of_interest, Processing_Fees, Logo }) => [
      Logo ? (
        <img
          src={`${IMAGE_BASE}${Logo.path}`}
          alt="bank_image"
          style={{ height: 50, width: 50 }}
        />
      ) : (
        ''
      ),
      Bank_Name,
      Rate_Of_interest,
      Processing_Fees,

      <>
        <Tooltip
          id="tooltip-top"
          title="Edit Bank"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Edit"
            className={classes.tableActionButton}
            onClick={() => handleEdit(_id)}
          >
            <Edit
              className={`${classes.tableActionButtonIcon} ${classes.edit}`}
            />
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
    ],
  );

  return (
    <>
      <Helmet>
        <title>Banks Manage</title>
      </Helmet>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader> Banks </PageHeader>
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

      <PageContent loading={loading}>
        {/* <div className="flex justify-end">
          <div className="waftformgroup flex relative mr-2">
            <input
              type="text"
              name="find_title"
              id="contents-title"
              placeholder="Search by title"
              className="m-auto inputbox"
              value={query.find_name || ''}
              // value="test"
              onChange={handleQueryChange}
              style={{ paddingRight: '50px' }}
              onKeyPress={handleKeyPress}
            />
            <button
              aria-label="clear"
              className="px-6 py-1 inline-block text-secondary text-center underline"
              onClick={clearFilters}
              type="button"
            >
              clear filter
            </button>

            <button
              aria-label="Search"
              className="bg-secondary px-4 py-2 text-white  text-center rounded"
              onClick={handleSearch}
              type="button"
            >
              Search
            </button>
          </div>
        </div> */}

        <Table
          tableHead={[
            'Image',
            'Bank Name',
            'Rate of Interest',
            'Processing fees',
            '',
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

BankDetail.propTypes = {
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
  withStyle,
  withConnect,
  memo,
)(BankDetail);
