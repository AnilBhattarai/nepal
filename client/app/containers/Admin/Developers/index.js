/**
 *
 * Developers
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

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectFilter,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Table from '../../../components/Table';
import { Link } from 'react-router-dom';

const key = 'developers';

export const Developers = props => {
  const {
    all: { data, page, size, totaldata },
    query,
    loading,
    classes,
    loadAllRequest,
    clearOne,
    setQueryValue,
    deleteOneRequest,
    push,
    setFilterValue,
    filter,
    clearQuery,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedID] = useState('');

  useEffect(() => {
    loadAllRequest(query);
  }, []);

  const handleAdd = () => {
    clearOne();
    push('/admin/developers/add');
  };

  const handleEdit = id => {
    clearOne();
    push(`/admin/developers/edit/${id}`);
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

  const handlePagination = ({ page, size }) => {
    loadAllRequest({ page, size });
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

  const handleCheckedChange = name => event => {
    event.persist();
    setFilterValue({ key: name, value: event.target.checked });
    setQueryValue({ key: name, value: event.target.checked ? true : '' });
  };

  const clearFilters = () => {
    loadAllRequest();
    clearQuery();
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(({ name, email, is_active, is_verified, _id }) => [
    <Link
      to={`/developer/&developer_id=${_id}`}
      target="_blank"
      className="text-secondary underline"
    >
      {name}
    </Link>,
    email,
    is_active ? 'Active' : 'In-active',
    is_verified ? 'Verified' : 'Not verified',
    <>
      <Tooltip
        id="tooltip-top"
        title="Edit"
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
      {/* <Tooltip
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
      </Tooltip> */}
    </>,
  ]);

  return (
    <>
      <Helmet>
        <title>Developers </title>
      </Helmet>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Developers </PageHeader>
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
        <div className="flex justify-end items-center">
          <input
            type="text"
            name="find_name"
            id="contents-name"
            placeholder="Search by name"
            className="m-auto inputbox"
            value={query.find_name || ''}
            // value="test"
            onChange={handleQueryChange}
            style={{ marginRight: '20px', width: 200 }}
            onKeyPress={handleKeyPress}
          />
          <div className="waftformgroup flex relative mr-2">
            <label className="mr-2 block smallCheckbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.find_is_verified || false}
                    tabIndex={-1}
                    onClick={handleCheckedChange('find_is_verified')}
                    color="primary"
                  />
                }
                label="Verified"
              />
              {/* <input type="checkbox" /> Negotiable */}
            </label>
            <label className="mr-2 block smallCheckbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.find_is_active || false}
                    tabIndex={-1}
                    onClick={handleCheckedChange('find_is_active')}
                    color="primary"
                  />
                }
                label="Active"
              />
              {/* <input type="checkbox" /> Negotiable */}
            </label>

            <button
              aria-label="Search"
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
        </div>

        <Table
          tableHead={['Name', 'Email', 'Is active', 'Is verified', '']}
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

Developers.propTypes = {
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
  filter: makeSelectFilter(),
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
)(Developers);
