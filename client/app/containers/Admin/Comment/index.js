/**
 *
 * CommentManagePage
 *
 */

import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import Highlighter from 'react-highlight-words';

import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Table from 'components/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectStatus,
  makeSelectRequesting,
  makeSelectListed,
  makeSelectSelected,
  makeSelectSelectAll,
} from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { DATE_FORMAT } from '../../App/constants';
import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

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

/* eslint-disable react/prefer-stateless-function */
export const BlogCommentManagePage = props => {
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
    status,
    selected,
    listed,
    setSelectedAll,
    setSelectedValue,
    setListedAll,
    setListedValue,
    approveDisapproveRequest,
    selectAll,
    setSelectAllValue,
  } = props;

  useEffect(() => {
    loadAllRequest();
  }, []);

  // componentDidMount() {
  //   props.loadAllRequest(props.query);
  // }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.requesting != props.requesting) {
  //     if (!nextProps.requesting) {
  //       setState({ open: false });
  //     }
  //   }
  // }

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleQueryUpdate = name => value => {
    // e.persist();
    setQueryValue({ key: name, value: value.value });
  };

  const handleCheckedQueryChange = name => e => {
    e.persist();
    setQueryValue({ key: name, value: e.target.checked });
    if (name === 'find_is_approved' && query.find_is_disapproved) {
      setQueryValue({ key: 'find_is_disapproved', value: false });
    }
    if (name === 'find_is_disapproved' && query.find_is_approved) {
      setQueryValue({ key: 'find_is_approved', value: false });
    }
  };

  const handleSearch = () => {
    loadAllRequest(query);
  };

  const handlePagination = paging => {
    loadAllRequest(paging);
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      loadAllRequest(query);
    }
  };

  const handleView = id => {
    push(`/admin/comment/view/${id}`);
  };

  // handleApprove = (id, status) => {
  //   loadApproveRequest(id);
  // };

  // handleDisapprove = id => {
  //   loadDisapproveRequest(id);
  // };
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleSave = status => {
    approveDisapproveRequest(status);
  };

  const handleCheckedChange = index => {
    setSelectedValue(index);
    setListedValue(index);
  };

  const handleSelectAll = () => {
    setSelectAllValue(!selectAll);
    setSelectedAll(!selectAll);
    setListedAll(!selectAll);
  };

  const tablePagination = { page, size, totaldata };

  // const tableData = data.map(each => {
  //   const { title, status, added_at, updated_at, _id } = each;
  //   let justTitle;
  //   if (each.comment_for === 'property') {
  //     justTitle = each.post_id.basic.title;
  //   } else {
  //     justTitle = each.post_id.title;
  //   }

  const tableData = data.map(
    (
      {
        title,
        comment_for,
        status,
        post_id,
        added_by,
        added_at,
        updated_at,
        _id,
      },
      index,
    ) => {
      let justTitle;
      if (comment_for === 'property') {
        justTitle = post_id !== null ? post_id.basic.title : '';
      } else {
        justTitle = post_id !== null ? post_id.title : '';
      }

      return [
        <FormControlLabel
          control={
            <Checkbox
              checked={selected[index]}
              onChange={() => handleCheckedChange(index)}
            />
          }
        />,
        title,
        justTitle,
        status || 'onhold',
        added_by && added_by.name ? added_by.name : '',
        moment(added_at).format(DATE_FORMAT),
        moment(updated_at).format(DATE_FORMAT),
        <>
          <Tooltip
            id="tooltip-top-start"
            title="View"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => handleView(_id)}
            >
              <ViewIcon
                className={`${classes.tableActionButtonIcon} ${classes.view}`}
              />
            </IconButton>
          </Tooltip>
          {/* <button
            type="button"
            className="ml-2 underline text-blue-500"
            onClick={() => handleApprove(_id, 'approve')}
          >
            Approve
          </button>
          <button
            type="button"
            className="ml-2 underline text-primary"
            onClick={() => handleDisapprove(_id, 'disapprove')}
          >
            Disapprove
          </button> */}
        </>,
      ];
    },
  );

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: '#F3F3F9',
      borderColor: '#e0e3e8',
      minHeight: '35px',
      height: '35px',
      width: '200px',
      boxShadow: state.isFocused ? null : null,
      marginRight: '8px',
    }),
    dropdownIndicator: state => ({
      display: 'none',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
  };

  const optionCommentFor = ['blog', 'forum', 'property'].map(each => ({
    value: each,
    label: each === 'blog' ? 'News' : each,
  }));
  optionCommentFor.unshift({ value: '', label: 'all' });

  const optionCommentStatus = (status || []).map(each => ({
    value: each,
    label: each,
  }));
  optionCommentStatus.unshift({ value: '', label: 'all' });

  const formatOptionLabel = ({ label }, { inputValue }) => (
    <Highlighter
      searchWords={[inputValue]}
      textToHighlight={label}
      highlightTag={Highlight}
    />
  );

  const Highlight = ({ children, highlightIndex }) => (
    <strong className="highlighted-text">{children}</strong>
  );

  return (
    <>
      <Helmet>
        <title>Comments</title>
      </Helmet>
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Comment Listing</PageHeader>
      </div>
      {/* <Dialog
        open={state.open}
        onClose={handleClose}
        aria-labelledby="approve-disapprove"
      >
        <DialogTitle>Are you sure you want to {state.status} ?</DialogTitle>
        <DialogActions>
         
          <button
            onClick={handleClose}
            className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
          >
            No
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-500 uppercase btn-theme"
          >
            Yes
          </button>
        </DialogActions>
      </Dialog> */}
      <PageContent loading={loading}>
        <div className="flex justify-end">
          <Select
            styles={customStyles}
            placeholder="Comment For"
            value={
              {
                value: query.find_cmnt_for,
                label:
                  query.find_cmnt_for === 'blog'
                    ? 'News'
                    : query.find_cmnt_for || 'All',
              } || {
                label: 'All',
                value: '',
              }
            }
            onChange={handleQueryUpdate('find_cmnt_for')}
            options={optionCommentFor}
            formatOptionLabel={formatOptionLabel}
            onKeyDown={handleKeyPress}
          />
          {/* <select
              className="my-auto mr-3 inputbox"
              value={query.find_cmnt_for || ''}
              onChange={handleQueryChange}
              name="find_cmnt_for"
              style={{ width: '200px' }}
              onKeyDown={handleEnter}
              // onClick={handleSearch}
              // inputprops={{
              //   name: 'status',
              //   id: 'status_title',
              // }}
            >
              <option value="blog">News</option>
              <option value="forum">Forum</option>
              <option value="property">Property</option>
            </select> */}
          <Select
            styles={customStyles}
            placeholder="Comment Status"
            value={{
              value: query.find_cmnt_status || 'All',
              label: query.find_cmnt_status || 'Status',
            }}
            onChange={handleQueryUpdate('find_cmnt_status')}
            options={optionCommentStatus}
            formatOptionLabel={formatOptionLabel}
            onKeyDown={handleKeyPress}
          />
          {/* <select
              className="my-auto mr-3 inputbox"
              value={query.find_cmnt_status || ''}
              onChange={handleQueryChange}
              name="find_cmnt_status"
              style={{ width: '200px' }}
              onKeyDown={handleEnter}
              // onClick={handleSearch}
              // inputprops={{
              //   name: 'status',
              //   id: 'status_title',
              // }}
            >
              <option value="">None</option>
              {status &&
                status.length > 0 &&
                status.map((each, index) => (
                  <option
                    key={index}
                    value={each}
                    onClick={() => handleSearch()}
                  >
                    {each}
                  </option>
                ))}
            </select> */}

          <input
            type="text"
            name="find_title"
            id="comment-title"
            placeholder="Search Comment"
            className="my-auto mr-3 inputbox"
            value={query.find_title}
            onChange={handleQueryChange}
            onKeyDown={handleEnter}
            style={{ width: '200px' }}
          />
          {/* <div className="flex relative mr-2">
              <input
                type="text"
                name="find_blog_id"
                id="blog-of-comment"
                placeholder="Search Blogs"
                className="m-auto inputbox"
                value={query.find_blog_id}
                onChange={handleQueryChange}
                onKeyDown={handleEnter}
              />
            </div> */}

          <button
            aria-label="Search"
            className="bg-secondary px-4 py-2 text-white  text-center rounded"
            onClick={handleSearch}
            type="button"
          >
            Search
          </button>
        </div>
        <div className="float-right">
          <button
            className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-500 uppercase btn-theme"
            onClick={() => handleSave('approved')}
          >
            Approve
          </button>
          <button
            className="py-2 px-6 rounded mt-4 ml-4 text-sm text-white bg-primary uppercase btn-theme"
            onClick={() => handleSave('disapproved')}
          >
            Disapprove
          </button>
        </div>
        <FormControlLabel
          control={
            <Checkbox checked={selectAll} onChange={() => handleSelectAll()} />
          }
          label="Select All"
        />

        <Table
          tableHead={[
            '',
            'Comment Title',
            'Parent',
            'Status',
            'Added By',
            'Added At',
            'Updated At',
            'Actions',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

BlogCommentManagePage.propTypes = {
  classes: PropTypes.object.isRequired,
  loadAllRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  clearQuery: PropTypes.func.isRequired,
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
  status: makeSelectStatus(),
  selected: makeSelectSelected(),
  listed: makeSelectListed(),
  selectAll: makeSelectSelectAll(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({
  key: 'blogCommentManagePage',
  reducer,
});
const withSaga = injectSaga({ key: 'blogCommentManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
  memo,
)(BlogCommentManagePage);
