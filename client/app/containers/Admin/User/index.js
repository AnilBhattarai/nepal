/**
 *
 * User
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import qs from 'query-string';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Table from 'components/Table';
import CreateIcon from '@material-ui/icons/Create';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Loading from '../../../components/Loading';

/* eslint-disable react/prefer-stateless-function */
const User = props => {
  const {
    classes,
    all: { data, page, size, totaldata },
    loading,
    query,
    push,
    loadAllRequest,
    setQueryValue,
    clearOne,
    clearQuery,
  } = props;

  useEffect(() => {
    loadAllRequest(query);
  }, [query.size, query.page]);

  const handleAdd = () => {
    clearOne();
    push('/admin/user-manage/add');
  };

  const handleEdit = id => {
    push(`/admin/user-manage/edit/${id}`);
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleSearch = event => {
    // event.preventDefault();
    loadAllRequest(query);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePagination = paging => {
    // loadAllRequest(paging);
    // const queryString = qs.stringify(paging);
    // push({
    //   search: queryString,
    // });
    setQueryValue({ key: 'page', value: paging.page });
    setQueryValue({ key: 'size', value: paging.size });
  };

  const clearFilters = () => {
    loadAllRequest();
    clearQuery();
  };

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({ _id, email, name, roles, email_verified, mobile_no }) => [
      email,
      name,
      roles.map(each => each.role_title).join(', '),
      mobile_no,
      `${email_verified}`,
      <>
        <div className="flex">
          <button
            aria-label="Edit"
            className=" px-1 text-center leading-none"
            onClick={() => handleEdit(_id)}
          >
            <i className="material-icons text-base text-indigo-500 hover:text-indigo-700">
              edit
            </i>
          </button>
        </div>
      </>,
    ],
  );

  return (
    <>
      <Helmet>
        <title>User Listing</title>
      </Helmet>
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}

        <PageHeader>User Manage</PageHeader>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={handleAdd}
        >
          <AddIcon />
        </Fab>
      </div>
      <PageContent loading={loading}>
        <div className="flex">
          <div className="flex relative mr-2">
            <input
              type="text"
              name="find_name"
              id="user-name"
              placeholder="Search User"
              className="m-auto inputbox"
              value={query.find_name}
              onKeyPress={handleKeyPress}
              onChange={handleQueryChange}
            />
            <IconButton
              aria-label="Search"
              className="waftsrchstyle"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <div>
            <button
              aria-label="clear filter"
              className="underline px-4 py-1 text-secondary  text-center rounded ml-2"
              onClick={clearFilters}
              type="button"
            >
              clear filter
            </button>
          </div>
        </div>
        <Table
          tableHead={[
            'Email',
            'Name',
            'Roles',
            'Mobile',
            'Email verified',
            'Action',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

User.propTypes = {
  classes: PropTypes.object.isRequired,
  loadAllRequest: PropTypes.func.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  clearOne: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
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

const styles = theme => ({
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

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'adminUserManagePage', reducer });
const withSaga = injectSaga({ key: 'adminUserManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(User);
