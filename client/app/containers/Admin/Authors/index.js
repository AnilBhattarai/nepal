/**
 *
 * User
 *
 */

import React from 'react';
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
export class Authors extends React.PureComponent {
  static propTypes = {
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

  componentDidMount() {
    const {
      loadAllRequest,
      query,
      location: { search },
      setQueryObj,
    } = this.props;
    let queryObj = { ...query };
    if (search) {
      queryObj = qs.parse(search);
      setQueryObj(queryObj);
    }

    loadAllRequest(queryObj);
  }

  handleEdit = id => {
    this.props.push(`/admin/authors-manage/edit/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
    const queryString = qs.stringify({
      ...this.props.query,
      [e.target.name]: e.target.value,
    });
    this.props.push({
      search: queryString,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.loadAllRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
    const queryString = qs.stringify(paging);
    this.props.push({
      search: queryString,
    });
  };

  handleDropDownQueryChange = name => e => {
    this.props.setQueryValue({ key: name, value: e.value });
  };

  handleEnter = e => {
    if (e.key === 'Enter') {
      this.props.loadAllRequest(this.props.query);
    }
  };

  clearFilters = () => {
    this.props.loadAllRequest();
    this.props.clearQuery();
  };

  render() {
    const {
      classes,
      all: { data, page, size, totaldata },
      loading,
      query,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ _id, email, name, roles, email_verified, author }) => [
        name,
        email,
        roles.map(each => each.role_title).join(', '),
        author && `${author.is_verified ? 'Verified' : 'Un-verified'}`,
        <>
          <Tooltip id="tooltip-left" title="Edit Author" placement="left">
            <IconButton
              className={classes.tableActionButton}
              onClick={() => this.handleEdit(_id)}
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
          <title>Authors Listing</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading === true ? <Loading /> : <></>}

          <PageHeader>Authors</PageHeader>
        </div>
        <PageContent loading={loading}>
          <div className="flex justify-end">
            <input
              type="text"
              name="find_name"
              id="name"
              placeholder="Name"
              className="mr-3 inputbox"
              value={query.find_name}
              onKeyDown={this.handleEnter}
              onChange={this.handleQueryChange}
              style={{ width: '200px' }}
            />
            <Select
              className="React_Select"
              id="find_is_verified"
              classNamePrefix="select"
              placeholder="Verified"
              name="find_is_verified"
              value={query.find_is_verified || ''}
              onChange={this.handleDropDownQueryChange('find_is_verified')}
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
              onKeyDown={this.handleEnter}
              value={query.find_email}
              onChange={this.handleQueryChange}
              style={{ width: '200px' }}
            />

            <button
              aria-label="clear filter"
              className="px-6 py-1 inline-block text-secondary text-center underline"
              onClick={this.clearFilters}
              type="button"
            >
              clear filter
            </button>

            <button
              aria-label="Search"
              className="bg-secondary px-4 py-2 text-white  text-center rounded"
              onClick={this.handleSearch}
              type="button"
            >
              Search
            </button>
          </div>
          <Table
            tableHead={['Name', 'Email', 'Roles', 'Verified', 'Action']}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
        </PageContent>
      </>
    );
  }
}

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

const withReducer = injectReducer({ key: 'adminAuthorsManagePage', reducer });
const withSaga = injectSaga({ key: 'adminAuthorsManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(Authors);
