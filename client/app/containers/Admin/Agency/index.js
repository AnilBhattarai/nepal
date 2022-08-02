/**
 *
 * Agency
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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Table from 'components/Table';

import useInjectSaga from '../../../utils/injectSaga';
import useInjectReducer from '../../../utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectFilter,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Loading from '../../../components/Loading';
import { Link } from 'react-router-dom';

const key = 'agency';

export const Agency = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    clearOne,
    setQueryValue,
    classes,
    query,
    push,
    filter,
    setFilterValue,
    clearQuery,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  // const [initialQuery, setInitialQuery] = useState({ page: 1, size: 10 });

  useEffect(() => {
    loadAllRequest();
  }, []);

  useEffect(() => {
    loadAllRequest(query);
  }, [query]);

  const handleAdd = () => {
    clearOne();
    push('/admin/agency-manage/add');
  };

  const handleEdit = id => {
    push(`/admin/agency-manage/edit/${id}`);
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleSearch = () => {
    loadAllRequest(query);
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

  const tableData = data.map(
    ({ _id, title, email, is_active, is_approved }) => [
      <Link
        to={`/agent/${_id}`}
        target="_blank"
        className="text-secondary underline"
      >
        {title}
      </Link>,
      email,
      `${is_active}`,
      `${is_approved}`,
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
      </>,
    ],
  );

  return (
    <>
      <Helmet>
        <title>Agency </title>
      </Helmet>
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Agency </PageHeader>
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
              aria-label="Clear"
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
          tableHead={['Title', 'Email', 'Active', 'Approved']}
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

Agency.propTypes = {
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

const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withStyle,
  withConnect,
  memo,
)(Agency);
