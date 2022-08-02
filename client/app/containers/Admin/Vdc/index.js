/**
 *
 * vdc
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ToggleButton from '../../../components/customComponents/ToggleButton';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Table from '../../../components/Table';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectDistrict,
  makeSelectActiveStatus,
  makeSelectState,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'vdc';

export const Vdc = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const {
    all: { data, page, size, totaldata },
    loading,
    query,
    loadAllRequest,
    loadDistrictRequest,
    classes,
    push,
    district,
    state,
    clearOne,
    deleteOneRequest,
    setQueryValue,
    clearQuery,
    addIsActiveRequest,
    active_status,
    loadStateRequest,
  } = props;

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  // const [districtId, setDistrictId] = useState(0);

  useEffect(() => {
    clearQuery();
    loadDistrictRequest(query);
    loadStateRequest();
    loadAllRequest(query);
  }, []);

  // useEffect(() => {
  // }, [districtId]);

  const handleEdit = id => {
    push(`/admin/vdc-manage/edit/${id}`);
  };

  const handleOpen = id => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = id => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const handleAdd = () => {
    clearOne();
    push('/admin/vdc-manage/add');
  };

  const handleChange = name => e => {
    setQueryValue({ key: name, value: e.target.value });
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleSearch = () => {
    loadAllRequest(query);
  };

  const handleSearchState = () => {
    loadDistrictRequest(query);
  };

  const handlePagination = ({ page, size }) => {
    loadAllRequest({ ...query, page, size });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleToggleChange = (_id, status) => {
    console.log('handleToggleChange', _id, status);
    addIsActiveRequest({ _id, status });
  };

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({
      _id,
      name,
      is_active,
      state_id: { name: state_name },
      district_id: { name: district_name },
    }) => [
      state_name,
      district_name,
      name,
      <>
        <ToggleButton
          id={_id}
          status={active_status}
          isOn={is_active}
          handleToggle={() => handleToggleChange(_id, is_active)}
        />
      </>,
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
        <title>Vdc Manage</title>
      </Helmet>
      <DeleteDialog
        msg="This will delete area within this vdc!"
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deleteId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Vdc/Municipality Manage</PageHeader>
        {/* <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          round="true"
          onClick={handleAdd}
          elevation={0}
        >
          <AddIcon />
        </Fab> */}
      </div>
      <PageContent loading={loading}>
        <div className="flex justify-space-around">
          <div className="flex justify">
            <div className="waftformgroup flex relative mr-2">
              {/* <label
             className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
             htmlFor="state"
           >
             State
           </label> */}
              <select
                className="inputbox"
                native="true"
                // name="stateID"
                // value={query.stateID}
                onChange={handleChange('state_id')}
                onClick={() => handleSearchState()}
              >
                <option key="0" name="all" value="">
                  All
                </option>
                {state.map(each => (
                  <option key={each._id} name={each.name} value={each._id}>
                    {each.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify">
            <div className="waftformgroup flex relative mr-2">
              {/* <label
             className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
             htmlFor="state"
           >
             State
           </label> */}
              <select
                className="inputbox"
                native="true"
                // name="stateID"
                // value={query.stateID}
                disabled={!query.state_id}
                onChange={handleChange('district_id')}
                onClick={() => handleSearch()}
              >
                <option key="0" name="all" value="">
                  All
                </option>
                {district.map(each => (
                  <option key={each._id} name={each.name} value={each._id}>
                    {each.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex ml-auto">
            <div className="waftformgroup flex relative mr-2">
              <input
                type="text"
                name="find_name"
                id="contents-name"
                placeholder="Search by vdc Name"
                className="m-auto inputbox"
                value={query.find_name}
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
        </div>
        <Table
          tableHead={[
            'State',
            'District',
            'Vdc/Municipality',
            'Status',
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

Vdc.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  query: PropTypes.object.isRequired,
  deleteOneRequest: PropTypes.func.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  clearOne: PropTypes.func.isRequired,
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
  district: makeSelectDistrict(),
  active_status: makeSelectActiveStatus(),
  state: makeSelectState(),
});
const withStyle = withStyles(styles);

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
  withStyle,
)(Vdc);
