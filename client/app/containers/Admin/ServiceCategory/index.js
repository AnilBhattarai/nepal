/**
 *
 * ServiceCategory
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

import useInjectSaga from '../../../utils/injectSaga';
import useInjectReducer from '../../../utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';

const key = 'serviceCategory';

export const ServiceCategory = props => {
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

  useEffect(() => {
    loadAllRequest();
  }, []);

  const handleAdd = () => {
    clearOne();
    push('/admin/service-category-manage/add');
  };

  const handleEdit = id => {
    push(`/admin/service-category-manage/edit/${id}`);
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

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({ _id, title, order, is_active, description }) => [
      order,
      is_active ? 'active' : 'in-active',
      title,
      description,
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
        <title>Directory Category Manage</title>
      </Helmet>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Directory Category </PageHeader>
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
        <div className="flex justify-end">
          <div className="waftformgroup flex relative mr-2">
            <input
              type="text"
              name="find_title"
              id="contents-title"
              placeholder="Search by title"
              className="m-auto inputbox"
              value={query.find_title}
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
          tableHead={['Order', 'Is active', 'Title', 'Description', '']}
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

ServiceCategory.propTypes = {
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

const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withStyle,
  withConnect,
  memo,
)(ServiceCategory);
