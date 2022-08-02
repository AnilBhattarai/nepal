/**
 *
 * Forum
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';

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

import { DATE_FORMAT } from '../App/constants';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../components/Loading';
import CareerSkeleton from './Details/CareerSkeleton';

const key = 'career';

export const Career = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
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
    loadAllRequest(query);
  }, []);

  const handleAdd = () => {
    clearOne();
    push('/admin/career/add');
  };

  const handleEdit = _id => {
    push(`/admin/career/edit/${_id}`);
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

  const tableData = data.map(({ slug_url, job_title, deadline_at }) => [
    // is_approved, // is_active,
    // added_by,
    // published_on,
    <div>
      <Link
        className="block hover:bg-gray-100 p-2 border-b"
        to={`/careers/${slug_url}`}
      >
        <span className="text-primary text-xl font-bold block">
          {job_title}
        </span>
      </Link>
      <span className="text-sm text-gray-800">
        {`at ${moment(deadline_at).format(DATE_FORMAT)}`}
      </span>
    </div>,
  ]);

  if (loading) return <CareerSkeleton />;

  return (
    <div className="max-w-4xl mx-auto mb-10 py-10">
      <div>
        <Helmet>
          <title>Career</title>
          <meta name="description" content="Description of Career" />
        </Helmet>
      </div>
      <div className="flex justify-between items-center mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}

        <h1 className="text-3xl font-bold">Career</h1>

        <div className="waftformgroup flex relative mr-2">
          <input
            type="text"
            name="title"
            id="contents-title"
            placeholder="Search"
            className="m-auto inputbox"
            value={query.job_title}
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

        {/* <button
          type="button"
          className="bg-primary rounded px-4 py-2 text-sm font-bold text-white"
          onClick={handleAdd}
        >
          Ask a Question ?
        </button> */}
      </div>
      <div className="flex justify-end" />

      <Table
        classes={classes}
        tableHead={['']}
        tableData={tableData}
        pagination={tablePagination}
        handlePagination={handlePagination}
      />
    </div>
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
)(Career);
