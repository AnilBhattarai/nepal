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
import CircularProgress from '@material-ui/core/CircularProgress';

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
import forum from '../../assets/img/forum.png';

import { DATE_FORMAT } from '../App/constants';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectMy,
  makeSelectMyLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../components/Loading';
import { makeSelectUser, makeSelectToken } from '../App/selectors';

const key = 'forum';

export const Forum = props => {
  const {
    all: { data, page, size, totaldata },
    my: { data: myData, page: myPage, size: mySize, totaldata: myTotalData },
    loading,
    myLoading,
    loadAllRequest,
    clearOne,
    setQueryValue,
    deleteOneRequest,
    classes,
    loadMyRequest,
    query,
    user,
    token,
    push, // eslint-disable-line no-shadow
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deleteId, setDeletedID] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadAllRequest(query);
    loadMyRequest();
  }, []);

  const handleAdd = () => {
    clearOne();
    if (Object.keys(user).length > 1) {
      push('/forum/add');
    } else {
      push('/signup-user');
    }
  };

  const handleEdit = _id => {
    push(`/admin/forum/edit/${_id}`);
  };

  const handleQueryChange = e => {
    e.persist();
    if (e.target.name === 'title') {
      setQueryValue({ key: 'find_forum', value: e.target.value });
    } else {
      setQueryValue({ key: e.target.name, value: e.target.value });
    }
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

  const myHandleSearch = () => {
    loadMyRequest(query);
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

  const handleKeyPress2 = e => {
    if (e.key === 'Enter') {
      myHandleSearch();
    }
  };

  const handlePagination = ({ page, size }) => {
    loadAllRequest({ page, size });
  };

  const myHandlePagination = ({ page, size }) => {
    loadMyRequest({ page, size });
  };

  const mytablePagination = {
    page: myPage,
    size: mySize,
    totaldata: myTotalData,
  };

  const mytableData = myData.map(
    ({
      _id,
      title,
      description,
      added_by,
      updated_at,
      // is_approved, // is_active,
      // added_at,
      // published_on,
    }) => [
        <div>
          <Link
            className="block hover:bg-gray-100 p-2 border-b block-clickable"
            to={`/forum/details/${_id}`}
          >
            <span className="text-primary text-xl font-bold block">{title}</span>
            <p className="text-gray-600 overflow-hidden" style={{ maxHeight: '4rem', overflow: 'hidden' }} >{description}</p>
            <span className="text-sm text-gray-800 hidden">
              By {added_by && added_by.name} at {''}
              {moment(updated_at).format(DATE_FORMAT)}
            </span>
          </Link>
        </div>,
      ],
  );

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({
      _id,
      title,
      description,
      added_by,
      updated_at,
      // is_approved, // is_active,
      // added_at,
      // published_on,
    }) => [
        <div>
          <Link
            className="block hover:bg-gray-100 p-2 border-b block-clickable"
            to={`/forum/details/${_id}`}
          >
            <span className="text-base font-bold block">{title}</span>
            <span className="text-sm text-gray-800 hidden">
              By {added_by && added_by.name} at {''}
              {moment(updated_at).format(DATE_FORMAT)}
            </span>
            <p className="text-gray-600 overflow-hidden" style={{ maxHeight: '4rem', overflow: 'hidden' }}>{description}</p>
          </Link>
        </div>,
      ],
  );

  // if (loading)
  //   return (
  //     <React.Fragment>
  //       <div className="bg-primary">
  //         <h1 className="text-3xl font-bold py-10 text-center text-white">
  //           Welcome to NepalHomes Forum
  //         </h1>
  //       </div>
  //       <div className="p-10 text-center">
  //         <CircularProgress />
  //       </div>
  //     </React.Fragment>
  //   );

  return (
    <>
      <div>
        <Helmet>
          <title>Forum</title>
          <meta name="description" content="Description of Forum" />
        </Helmet>
      </div>
      {loading && myLoading && myLoading === true && loading === true ? (
        <Loading />
      ) : (
          <></>
        )}

      {/* <div className="bg-primary">
        <h1 className="text-3xl font-bold py-10 text-center text-white">
          Welcome to NepalHomes Forum
        </h1>
      </div> */}
      <div className="bg-gray-100">
        <div className="container mx-auto mb-10 py-2">
          <div className="flex justify-between mt-3 mb-3">
            <div className="w-1/4">
              <div className="bg-white shadow rounded mb-4">
                <div className="bg-white rounded-xl p-1">
                  <div className="p-4">
                    <img className="w-48 mx-auto" src={forum} alt="forum" />
                    <p className="text-gray-500 text-lg text-center">
                      Get your questions answered from real estate experts.
                  </p>
                  </div>
                  <button
                    type="button"
                    className="bg-secondary w-full uppercase rounded-b tracking-widest p-4 text-sm font-bold text-white"
                    onClick={handleAdd}
                  >
                    Ask a Question ?
                </button>
                </div>
              </div>

              <div className="bg-white shadow rounded mb-4">
                <div className="h-full flex flex-col justify-between bg-white rounded-xl p-4">
                  <h3 className="text-xl">
                    Forum Rules
                </h3>

                  <p className="text-sm text-gray-600">
                    Dear Forum Members/Visitors,
                  <br />
                    As you may be aware, the Forum regularly plays host to a
                    variety of robust conversations, varied opinions, and
                    passionate discussions centred on Nepal's real estate
                    market – all of which are welcome.

                </p>

                  <Link
                    className="text-secondary text-sm py-2 font-bold"
                    to="/forum-rules"
                  >
                    READ MORE
                </Link>
                </div>
              </div>
            </div>

            <div className="w-3/4 pl-5">
              {/* {mytableData && mytableData.length > 0 && ( */}
              {token.length > 0 && (
                <div className="bg-white shadow rounded mb-4">
                  <div className="h-full bg-white rounded-xl p-2">
                    <div className="flex justify-between p-2">
                      <h2 className="text-2xl">
                        Waiting For Verification
                    </h2>
                      <div className="waftformgroup flex relative mr-2">
                        <input
                          type="text"
                          name="title"
                          id="contents-title"
                          placeholder="Search"
                          className="m-auto inputbox"
                          value={query.title}
                          onChange={handleQueryChange}
                          style={{ paddingRight: '50px' }}
                          onKeyPress={handleKeyPress}
                        />
                        <IconButton
                          aria-label="Search"
                          className="waftsrchstyle"
                          onClick={myHandleSearch}
                        >
                          <SearchIcon />
                        </IconButton>
                      </div>
                    </div>

                    {myLoading ? (
                      <CircularProgress />
                    ) : (
                        <div className="table-no-strip">
                          <Table
                            classes={classes}
                            tableData={mytableData}
                            pagination={mytablePagination}
                            handlePagination={myHandlePagination}
                          />
                        </div>
                      )}
                  </div>
                </div>
              )}
              {/* )} */}
              <div className="bg-white shadow rounded mb-4">
                <div className="h-full bg-white rounded-xl p-2">
                  <div className="flex justify-between p-2 items-center">
                    <h2 className="text-2xl">
                      Recent Posts
                  </h2>
                    <div className="waftformgroup flex relative mr-2">
                      <input
                        type="text"
                        name="title"
                        id="contents-title"
                        placeholder="Search"
                        className="m-auto inputbox"
                        value={query.title}
                        onChange={handleQueryChange}
                        style={{ paddingRight: '50px' }}
                        onKeyPress={handleKeyPress2}
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
                  {loading ? (
                    <CircularProgress />
                  ) : (
                      <div className="table-no-strip">
                        <Table
                          classes={classes}
                          tableData={tableData}
                          pagination={tablePagination}
                          handlePagination={handlePagination}
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

Forum.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  loadMyRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  my: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  myLoading: PropTypes.bool.isRequired,
  clearOne: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  deleteOneRequest: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  user: makeSelectUser(),
  my: makeSelectMy(),
  myLoading: makeSelectMyLoading(),
  token: makeSelectToken(),
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
)(Forum);
