/**
 *
 * Municipality
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

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
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectDistrict,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Table from '../../../components/Table';

const key = 'municipality';

export const Municipality = props => {
  const {
    all: { data, page, size, totaldata },
    query,
    loading,
    classes,
    loadAllRequest,
    loadDistrictRequest,
    clearOne,
    setQueryValue,
    deleteOneRequest,
    district,
    push,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedID] = useState('');

  useEffect(() => {
    loadAllRequest(query);
    loadDistrictRequest();
  }, []);

  const handleChange = name => event => {
    event.persist();
    setQueryValue({ key: event.target.name, value: event.target.value });
  };

  const handleAdd = () => {
    clearOne();
    push('/admin/municipality/add');
  };

  const handleEdit = id => {
    push(`/admin/municipality/edit/${id}`);
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

  const handlePagination = ({ page, size }) => {
    loadAllRequest({ page, size });
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

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({
      districtID,
      municipality_name,
      municipalityID,
      description,
      is_active,
      _id,
    }) => [
        districtID,
        municipality_name,
        municipalityID,
        description,
        is_active ? 'Active' : 'In-active',
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
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Municipality Manage</PageHeader>
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
              name="districtID"
              value={query.districtID}
              onChange={handleChange('districtID')}
              onClick={() => handleSearch()}
            >
              <option key="0" name="all" value="0">
                {' '}
                All{' '}
              </option>
              {district.map(each => (
                <option
                  key={each.districtID}
                  name={each.district_name}
                  value={each.districtID}
                >
                  {each.district_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="waftformgroup flex relative mr-2">
            <input
              type="text"
              name="find_municipality"
              id="contents-name"
              placeholder="Search by name"
              className="m-auto inputbox"
              value={query.find_municipalityt}
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
          tableHead={[
            'District ID',
            'Municipality name',
            'Municipality ID',
            'Description',
            'Is active?',
            '',
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

Municipality.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  district: PropTypes.array.isRequired,
  loadDistrictRequest: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  district: makeSelectDistrict(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withConnect,
  memo,
)(Municipality);
