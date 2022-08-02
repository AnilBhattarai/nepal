/**
 *
 * LeadManage
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

// @material-ui/core_components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';

import Table from 'components/Table';

import useInjectSaga from '../../../utils/injectSaga';
import useInjectReducer from '../../../utils/injectReducer';
import * as mapDispatchToProps from '../actions';
import {
  makeSelectLead,
  makeSelectLoading,
  makeSelectOpen,
  makeSelectQuery,
  makeSelectStatusLoading,
} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import { CHANNEL } from '../constants';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const key = 'userPersonalInformationPage';

export const LeadManage = props => {
  const {
    lead: { data, page, size, totaldata, msg },

    loading,
    loadLeadRequest,
    clearOne,
    setQueryValue,
    deleteOneRequest,
    classes,
    query,
    push,
    setOpen,
    open,
    status_loading,
    setLeadStatusRequest,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [deletedId, setDeletedID] = useState('');
  const [leadType, setLeadType] = useState('Contact_Form');
  const [seperatedData, setSeperatedData] = useState([]);
  const [leadID, setLeadID] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    loadLeadRequest(query);
  }, []);
  useEffect(() => {
    loadLeadRequest(query);
  }, [query]);

  useEffect(() => {
    let tempData = [];
    if (data && data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        if (data[index].channel === leadType) {
          tempData.push(data[index]);
        }
      }
    }
    setSeperatedData(tempData);
  }, [leadType, data]);

  const handleAdd = () => {
    clearOne();
    push('/user/leads/add');
  };

  const handleEdit = id => {
    push(`/admin/lead-manage/edit/${id}`);
  };

  const handleOpen = id => {
    setOpen(true);
    setLeadID(id);
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
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleLeadChange = value => {
    setLeadType(value);
    setQueryValue({ key: 'find_channel', value });
    setQueryValue({ key: 'page', value: 1 });
  };

  const handleStatusChanges = () => event => {
    const { value } = event.target;

    console.log('value', value);

    setStatus(value);
  };

  const handleAssignStatus = () => {
    const assign_data = { _id: leadID, status };
    setLeadStatusRequest(assign_data);
  };

  const tablePagination = { page, size, totaldata };

  const tableData = seperatedData.map(
    ({
      _id,
      name,
      email,
      is_active,
      inquiry,
      profile_link,
      phone_no,
      status,
      is_assign_by_admin,
      property_id,
      channel,
    }) =>
      leadType === 'Property_Inquiries'
        ? [
            name,
            email,
            leadType === 'Facebook' ? profile_link : phone_no,
            channel === 'Property_Inquiries' &&
            property_id &&
            property_id.slug_url ? (
              <Link
                target="_blank"
                to={`/detail/${property_id.slug_url}`}
                className="text-secondary underline"
              >
                {property_id.slug_url}
              </Link>
            ) : (
              '-'
            ),

            inquiry,
            status ? (
              <>
                {status}
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => handleOpen(_id)}
                  >
                    <Edit
                      className={`${classes.tableActionButtonIcon} ${
                        classes.edit
                      }`}
                    />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <button
                className="underline text-blue-500"
                onClick={() => handleOpen(_id)}
              >
                Set Status
              </button>
            ),
            is_assign_by_admin ? 'Assigned by Admin' : '-',
          ]
        : [
            name,
            email,
            leadType === 'Facebook' ? profile_link : phone_no,

            inquiry,
            status ? (
              <>
                {status}
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => handleOpen(_id)}
                  >
                    <Edit
                      className={`${classes.tableActionButtonIcon} ${
                        classes.edit
                      }`}
                    />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <button
                className="underline text-blue-500"
                onClick={() => handleOpen(_id)}
              >
                Set Status
              </button>
            ),
            is_assign_by_admin ? 'Assigned by Admin' : '-',
          ],
  );

  const GetCount = id => {
    let count = 0;
    if (msg && msg !== undefined) {
      for (let index = 0; index < msg.length; index++) {
        const element = msg[index];
        if (element._id === id) {
          count = element.amt;
        }
      }
    }

    return count;
  };

  const tableHead =
    leadType === 'Property_Inquiries'
      ? [
          'Name',
          'Email',
          'Phone No.',
          'Property',
          'Message',
          'Status',
          'Assigned',
        ]
      : leadType === 'Facebook'
      ? ['Name', 'Email', 'Profile Link', 'Message', 'Status', 'Assigned']
      : ['Name', 'Email', 'Phone No.', 'Message', 'Status', 'Assigned'];

  return (
    <>
      <Helmet>
        <title> My Leads </title>
      </Helmet>

      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>My Leads</PageHeader>
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

      <div className="">
        <div className="  flex flex-wrap">
          {CHANNEL.map(each => (
            <button
              type="button"
              onClick={() => handleLeadChange(each)}
              className={`rounded mr-2 px-4 py-1 mb-4 ${
                leadType !== each
                  ? `bg-gray-200 text-black`
                  : 'bg-secondary text-white'
              }`}
            >
              {each.replace('_', ' ')} ({GetCount(each)})
            </button>
          ))}
        </div>

        <Table
          tableHead={tableHead}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
          loading={loading}
        />
      </div>

      <Dialog ullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Set Status</DialogTitle>
        <DialogContent>
          <select
            className="inputbox"
            value={status}
            onChange={handleStatusChanges()}
          >
            {/* added', 'unqualified', 'on_progress', 'converted' */}
            <option value="">Choose Status</option>
            <option value="unqualified">Unqualified</option>
            <option value="on_progress">On Progress</option>
            <option value="converted">Converted</option>
          </select>
        </DialogContent>
        <DialogActions>
          <button
            className="btn disabled:cursor-not-allowed"
            type="button"
            disabled={leadID !== '' && status !== '' ? false : true}
            onClick={handleAssignStatus}
          >
            Set Status
          </button>
        </DialogActions>
      </Dialog>
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

LeadManage.propTypes = {
  loadLeadRequest: PropTypes.func.isRequired,
  lead: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  lead: makeSelectLead(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  open: makeSelectOpen(),
  status_loading: makeSelectStatusLoading(),
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
)(LeadManage);
