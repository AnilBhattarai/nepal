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
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// @material-ui/core_components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import Select from 'react-select';

import Table from 'components/Table';

import useInjectSaga from '../../../utils/injectSaga';
import useInjectReducer from '../../../utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectAgency,
  makeSelectAgents,
  makeSelectOpen,
  makeSelectAgentLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import { CHANNEL } from './constants';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const key = 'leadManage';

export const LeadManage = props => {
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
    loadAgencyRequest,
    loadAgentByAgencyRequest,
    agency,
    agents,
    open,
    setOpen,
    agent_loading,
    AssignAgentRequest,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [deletedId, setDeletedID] = useState('');
  const [leadType, setLeadType] = useState('Contact_Form');
  const [seperatedData, setSeperatedData] = useState([]);
  const [leadID, setLeadID] = useState('');
  const [agencyID, setAgencyID] = useState('');
  const [agentID, setAgentID] = useState('');

  useEffect(() => {
    loadAllRequest(query);
  }, [query]);

  useEffect(() => {
    loadAgencyRequest();
  }, []);

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
    push('/admin/lead-manage/add');
  };

  const handleEdit = id => {
    push(`/admin/lead-manage/edit/${id}`);
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleOpen = id => {
    setOpen(true);
    setLeadID(id);
  };

  const handleClose = () => {
    setOpen(false);
    setAgencyID('');
    setAgentID('');
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

  const handleDropDownChange = name => event => {
    console.log('event', event.value);
    if (name === 'agency_id') {
      loadAgentByAgencyRequest(event.value);
      setAgencyID(event.value);
    }
    if (name === 'agent_id') {
      setAgentID(event.value);
    }
  };

  console.log('lead', leadID);
  console.log('agent', agentID);

  const handleAssign = () => {
    const assign_data = { _id: leadID, agent_id: agentID };
    AssignAgentRequest(assign_data);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: '#fff',
      borderColor: '#e0e3e8',
      minHeight: '35px',
      height: '35px',
      width: '100%',
      boxShadow: state.isFocused ? null : null,
      marginRight: '8px',
    }),
    dropdownIndicator: state => ({
      display: 'none',
    }),
    clearIndicator: state => ({
      color: '#8e90a7',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
  };

  const optionAgency =
    agency && agency.length > 0
      ? agency.map(function agency(each) {
          return {
            value: each._id,
            label: each.title,
          };
        })
      : [];

  console.log(agency);

  const optionAgents =
    agents && agents.length > 0
      ? agents.map(function agents(each) {
          return {
            value: each._id,
            label: each.name,
          };
        })
      : [];

  const tablePagination = { page, size, totaldata };

  const tableData = seperatedData.map(
    ({
      _id,
      name,
      email,
      is_active,
      inquiry,
      agency_id,
      profile_link,
      phone_no,
      agent_id,
      property_id,
    }) => [
      leadType === 'Contact_Form'
        ? agency_id && (
            <Link
              target="_blank"
              className="text-secondary underline"
              to={`/agent/${agency_id._id}`}
            >
              {agency_id.title}
            </Link>
          )
        : null,
      leadType === 'Property_Inquiries'
        ? property_id && (
            <Link
              target="_blank"
              className="text-secondary underline"
              to={`/detail/${property_id.slug_url}`}
            >
              {property_id.basic.title}
            </Link>
          )
        : null,
      name,
      email,
      leadType === 'Facebook' ? profile_link : phone_no,
      inquiry,
      // agent_id ? (
      //   agent_id.name
      // ) : (
      //   <button
      //     className="underline text-blue-500"
      //     onClick={() => handleOpen(_id)}
      //   >
      //     Assign to agent
      //   </button>
      // ),
    ],
  );

  let tableHead = [];
  if (leadType === 'Contact_Form') {
    tableHead = [
      'Agency',
      '',
      'Name',
      'Email',
      'Profile Link',
      'Message',
      // 'Assigned To',
    ];
  }

  if (leadType === 'Facebook') {
    tableHead = [
      '',
      '',
      'Name',
      'Email',
      'Phone No.',
      'Message',
      // 'Assigned To',
    ];
  }

  if (leadType === 'Property_Inquiries') {
    tableHead = [
      '',
      'Property',
      'Name',
      'Email',
      'Phone No.',
      'Message',
      // 'Assigned To',
    ];
  }

  if (leadType === 'Via_Phone') {
    tableHead = [
      '',
      '',
      'Name',
      'Email',
      'Phone No.',
      'Message',
      // 'Assigned To',
    ];
  }

  return (
    <>
      <Helmet>
        <title>Lead Manage</title>
      </Helmet>

      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Lead Manage</PageHeader>
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

      {/* <div className="flex justify-end">
          <div className="waftformgroup flex relative mr-2">
            <input
              type="text"
              name="find_title"
              id="contents-title"
              placeholder="Search by title"
              className="m-auto inputbox"
              value={query.find_title}
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
        </div> */}

      <div className="rounded-lg p-4 bg-white ">
        <div className="flex flex-wrap">
          {CHANNEL.map(each => (
            <button
              type="button"
              onClick={() => handleLeadChange(each)}
              className={`rounded mr-2 px-4 py-1 mb-4 ${
                leadType !== each
                  ? `bg-gray-300 text-black`
                  : 'bg-secondary text-white'
              }`}
            >
              {each.replace('_', ' ')}
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

      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Assign To Agent</DialogTitle>
        <DialogContent>
          <div className="p-1">
            <label className="text-sm">Agency</label>
            <Select
              styles={customStyles}
              isClearable={true}
              placeholder="Select"
              onChange={handleDropDownChange('agency_id')}
              options={optionAgency}
            />
          </div>
          <div className=" p-1">
            <label className="text-sm">Agents</label>
            <Select
              styles={customStyles}
              isClearable={true}
              placeholder="Select"
              onChange={handleDropDownChange('agent_id')}
              options={optionAgents}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="btn disabled:cursor-not-allowed"
            type="button"
            disabled={leadID !== '' && agentID !== '' ? false : true}
            onClick={handleAssign}
          >
            Assign
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
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  agency: makeSelectAgency(),
  agents: makeSelectAgents(),
  open: makeSelectOpen(),
  agent_loading: makeSelectAgentLoading(),
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
