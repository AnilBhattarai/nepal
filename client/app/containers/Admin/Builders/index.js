/**
 *
 * User
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Select from 'react-select';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import qs from 'query-string';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
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
import { VERIFIED } from './constants';

/* eslint-disable react/prefer-stateless-function */
export const Builders = props => {
  const {
    loadAllRequest,
    query,
    setQueryValue,
    push,
    classes,
    all: { data, page, size, totaldata },
    loading,
    clearQuery,
  } = props;

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

  const handleEdit = id => {
    push(`/admin/builders-manage/edit/${id}`);
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleSearch = e => {
    e.preventDefault();
    loadAllRequest(query);
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleDropDownQueryChange = name => e => {
    setQueryValue({ key: name, value: e.value });
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      loadAllRequest(query);
    }
  };

  const clearFilters = () => {
    loadAllRequest();
    clearQuery();
  };

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({ _id, email, name, roles, email_verified, builder }) => [
      name,
      email,
      roles.map(each => each.role_title).join(', '),
      builder && `${builder.is_verified ? 'Verified' : 'Un-verified'}`,
      <>
        <Tooltip id="tooltip-left" title="Edit Builder" placement="left">
          <IconButton
            className={classes.tableActionButton}
            onClick={() => handleEdit(_id)}
          >
            <CreateIcon />
          </IconButton>
        </Tooltip>
      </>,
    ],
  );

  return (
    <>
      <Helmet>
        <title>Builders Listing</title>
      </Helmet>
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}

        <PageHeader>Builders</PageHeader>
      </div>
      <PageContent loading={loading}>
        <div className="flex justify-end items-center">
          <input
            type="text"
            name="find_name"
            id="name"
            placeholder="Name"
            className="mr-3 inputbox"
            value={query.find_name}
            onKeyDown={handleEnter}
            onChange={handleQueryChange}
            style={{ width: '200px' }}
          />

          <Select
            className="React_Select"
            id="find_is_verified"
            classNamePrefix="select"
            placeholder="Verified"
            name="find_is_verified"
            onChange={handleDropDownQueryChange('find_is_verified')}
            value={query.find_is_verified || ''}
            isSearchable
            options={VERIFIED}
            styles={customStyles}
          />

          <input
            type="text"
            name="find_email"
            id="email"
            placeholder="Email"
            className="mr-3 inputbox"
            onKeyDown={handleEnter}
            value={query.find_email}
            onChange={handleQueryChange}
            style={{ width: '200px' }}
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
        <Table
          tableHead={['Name', 'Email', 'Roles', 'Verified', 'Action']}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

Builders.propTypes = {
  classes: PropTypes.object.isRequired,
  loadAllRequest: PropTypes.func.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
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

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: '#F3F3F9',
    borderColor: '#e0e3e8',
    minHeight: '35px',
    height: '35px',
    width: '150px',
    boxShadow: state.isFocused ? null : null,
    marginRight: '8px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
};
const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'adminBuildersManagePage', reducer });
const withSaga = injectSaga({ key: 'adminBuildersManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(Builders);
