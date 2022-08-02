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
import Select from 'react-select';
import Highlighter from 'react-highlight-words';

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
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectStatus,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';

const key = 'forum';

export const Forum = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    clearOne,
    setQueryValue,
    deleteOneRequest,
    classes,
    query,
    status,
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
    push('/admin/forum/add');
  };

  const handleEdit = _id => {
    push(`/admin/forum/edit/${_id}`);
  };

  const handleQueryChange = e => {
    // e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleQueryUpdate = name => value => {
    // e.persist();
    setQueryValue({ key: name, value: value.value });
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
      handleSearch(e);
    }
  };

  const handlePagination = ({ page, size }) => {
    loadAllRequest({ page, size });
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({ title, description, _id, is_active, status: tableStatus, added_by }) => [
      title,
      description.slice(0, 200) + '....',
      '' + is_active,
      tableStatus,
      added_by && added_by.name,
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
            disabled
          >
            <Close
              className={`${classes.tableActionButtonIcon} ${classes.close}`}
            />
          </IconButton>
        </Tooltip> */}
      </>,
    ],
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

  const optionLocations = status.map(each => ({
    value: each,
    label: each,
  }));
  optionLocations.unshift({ value: '', label: 'Title' });

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
      <div>
        <Helmet>
          <title>Forum</title>
          <meta name="description" content="Description of Forum" />
        </Helmet>
      </div>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deleteId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Forum</PageHeader>
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
          <Select
            styles={customStyles}
            placeholder="Search by Status"
            value={{
              value: query.status || '',
              label: query.status || 'Status',
            }}
            onChange={handleQueryUpdate('status')}
            name="status"
            options={optionLocations}
            formatOptionLabel={formatOptionLabel}
            onKeyDown={handleKeyPress}
          />
          {/* <select
                className="inputbox"
                value={query.status || ''}
                onChange={handleQueryChange}
                name="status"
                onKeyPress={handleKeyPress}
              >
                <option value="">None</option>
                {status &&
                  status.length > 0 &&
                  status.map((each, index) => (
                    <option key={index} value={each}>
                      {each}
                    </option>
                  ))}
              </select> */}

          <input
            type="text"
            name="find_forum"
            id="contents-title"
            placeholder="Search by title"
            className="my-auto inputbox mr-2"
            value={query.title}
            onChange={handleQueryChange}
            onKeyPress={handleKeyPress}
            style={{ width: '200px' }}
          />
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
          classes={classes}
          tableHead={[
            'Title',
            'Description',
            'Active',
            // 'Is Approved',
            'Status',
            'Added By',
            'action',
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

Forum.propTypes = {
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
  status: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  status: makeSelectStatus(),
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
