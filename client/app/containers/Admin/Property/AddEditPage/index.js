/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { Helmet } from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import 'react-datepicker/dist/react-datepicker.css';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Tabs, Tab, Paper } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectQuery,
  makeSelectEnum,
  makeSelectState,
  makeSelectAddress,
  makeSelectAgents,
  makeSelectUserStatus,
  makeSelectIsProject,
  makeSelectBasic,
  makeSelectIsLand,
  makeSelectDevelopers,
  makeSelectAgentList,
  makeSelectAgentLoading,
  makeSelectAutoLoading,
} from '../selectors';
import { makeSelectOne as MakeSelectUserProfile } from '../../../Profile/selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';

import BasicInfo from '../components/basicInfo';
import Address from '../components/address';
import Location from '../components/location';
import BuildingInfo from '../components/buildinginfo';
import Price from '../components/price';
import Media from '../components/media';
import ProjectFloor from '../components/projectFloor';
import ProjectPayment from '../components/projectPayment';
import ProjectFeatures from '../components/projectFeatures';
import ProjectPropertyType from '../components/projectType';
import Map from '../components/maps';
import Medias from '../../Media/Loadable';
import { makeSelectTempImage } from '../../Amenities/selectors';
import { IMAGE_BASE } from '../../../App/constants';
import Loader from '../../../../assets/img/loader.svg';
import { makeSelectUser } from '../../../App/selectors';
import { enqueueSnackbar } from '../../../App/actions';

const styles = {
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
};

const key = 'property';

const AddEdit = props => {
  const {
    clearErrors,
    loadOneRequest,
    match,
    query,
    one,
    classes,
    loading,
    errors,
    setOneValue,
    clearOne,
    setQueryValue,
    addEditRequest,
    push,
    loadEnumRequest,
    enums,
    loadStateRequest,
    state,
    address,
    loadDistrictRequest,
    loadMunicipalityRequest,
    loadAreaRequest,
    loadLocationRequest,
    agents,
    loadAgentsRequest,
    loadUserStatusRequest,
    user_status,
    setIsProject,
    is_project,
    setIsLand,
    basic,
    is_land,
    developers,
    loadDevelopersRequest,
    current_user,
    agent_list,
    agent_loading,
    loadAgentsByAgencyRequest,
    setIsBack,
    user,
    autoSaveRequest,
    auto_loading,
    enqueueSnackbar,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [isAgentUser, setIsAgentUser] = useState(false);

  useEffect(() => {
    clearErrors();

    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    } else {
      clearOne();
      setIsBack(false);
    }
    if (window.location.pathname.includes('project')) {
      setIsProject(true);
    } else {
      setIsProject(false);
    }
  }, []);

  useEffect(() => {
    loadLocationRequest();

    loadEnumRequest();
    loadStateRequest();
    loadAgentsRequest();
    loadUserStatusRequest();
    loadDevelopersRequest();
  }, []);

  useEffect(() => {
    let tempAgent = false;
    if (user && user.roles !== undefined) {
      for (let index = 0; index < user.roles.length; index++) {
        if (user.roles[index].role_title.includes('Agent')) {
          tempAgent = true;
        }
      }
    }
    setIsAgentUser(tempAgent);
  }, [user]);

  useEffect(() => {
    if (
      basic &&
      (basic.property_category === '5d662c7b8f12c7035cd39315' ||
        basic.property_category === '5d7e7586f62e89458418c2da')
    ) {
      setIsLand(true);
    } else {
      setIsLand(false);
    }

    if (current_user.isAdmin && window.location.pathname.includes('add')) {
      setOneValue({ key: 'posted_by_admin', value: true });
    } else {
      setOneValue({ key: 'posted_by_admin', value: false });
    }

    if (
      current_user.isAdmin &&
      window.location.pathname.includes('edit') &&
      one.is_by_agency
    ) {
      setIsAgent(true);
    }
    if (
      current_user.isAdmin &&
      window.location.pathname.includes('edit') &&
      one.is_by_agency &&
      one.agency_id
    ) {
      loadAgentsByAgencyRequest(one.agency_id);
    }
  }, [one]);

  useEffect(() => {
    if (one.agency_id) {
      loadAgentsByAgencyRequest(one.agency_id);
    }
  }, [one.agency_id]);

  useEffect(() => {
    const interval = setInterval(() => {
      AutoSave();
    }, 120000); // 30000 for 30 sec
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const snackbarData = {
      message: 'Auto Saving',
      options: {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      },
    };
    if (auto_loading === true) {
      enqueueSnackbar(snackbarData);
    }
  }, [auto_loading]);

  function AutoSave() {
    autoSaveRequest();
  }

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleDropdownChange = name => event => {
    setOneValue({ key: name, value: event.value });
  };

  const [isAgent, setIsAgent] = React.useState(false);
  const [isDeveloper, setIsDeveloper] = React.useState(false);

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleIsByAgency = name => event => {
    event.persist();
    if (event.target.checked === true) {
      setOneValue({ key: 'agency_id', value: user_status.agent.agency._id });
    } else {
      setOneValue({ key: 'agency_id', value: '' });
    }
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleAgentChange = name => event => {
    if (isAgent === true) {
      setIsAgent(false);
      setOneValue({ key: 'agency_id', value: '' });
    } else {
      setIsAgent(true);
    }
    setOneValue({ key: 'is_by_agency', value: event.target.checked });
  };

  const handleDeveloperChange = name => event => {
    if (isDeveloper === true) {
      setIsDeveloper(false);
      setOneValue({ key: 'developer_id', value: '' });
    } else {
      setIsDeveloper(true);
    }
    setOneValue({ key: 'is_by_agency', value: event.target.checked });
  };
  const handleClear = () => {
    clearOne();
    handleGoBack();
  };

  const handleGoBack = () => {
    setIsBack(true);

    if (
      window.location.pathname === '/user/property/add' ||
      window.location.pathname === `/user/property/edit/${match.params.id}` ||
      window.location.pathname === `/post-property`
    ) {
      push('/user/property');
    } else if (
      window.location.pathname === '/user/project/add' ||
      window.location.pathname === `/user/project/edit/${match.params.id}`
    ) {
      push('/user/project');
    } else if (
      window.location.pathname === '/admin/property/add' ||
      window.location.pathname === `/admin/property/edit/${match.params.id}`
    ) {
      push('/admin/property');
    } else {
      push('/admin/project-manage');
    }
  };

  const handleSave = () => {
    if (
      window.location.pathname === '/user/property/add' ||
      window.location.pathname === `/user/property/edit/${match.params.id}`
    ) {
      addEditRequest('user');
    } else {
      addEditRequest('admin');
    }
  };

  // const handleCheckedChange = name => event => {
  //   event.persist();
  //   setOneValue({ key: name, value: event.target.checked });
  // };

  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    event.persist();
    setValue(newValue);
  };

  let listAgencyNormalized = {};
  const listAgency = agents.map(each => {
    const obj = {
      label: each.title,
      value: each._id,
    };
    listAgencyNormalized = {
      ...listAgencyNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  listAgency.unshift({ label: 'Choose Agency', value: '' });

  let listAgentsNormalized = {};
  const listAgents = agent_list.map(each => {
    const obj = {
      label: each.name,
      value: each._id,
    };
    listAgentsNormalized = {
      ...listAgentsNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  listAgents.unshift({ label: 'Choose Agent', value: '' });

  let listDevelopersNormalized = {};
  const listDevelopers = developers.map(each => {
    const obj = {
      label: each.name,
      value: each._id,
    };
    listDevelopersNormalized = {
      ...listDevelopersNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  listDevelopers.unshift({ label: 'Choose Developer', value: '' });

  return current_user.email_verified === false ? (
    <>
      <PageHeader>
        <IconButton
          className={`${classes.backbtn} cursor-pointer`}
          onClick={handleGoBack}
          aria-label="Back"
        >
          <BackIcon />
        </IconButton>
        {match &&
        match.params &&
        match.params.id &&
        window.location.pathname.includes('project')
          ? 'Edit Project'
          : window.location.pathname.includes('project-manage')
          ? 'Add Project'
          : match && match.params && match.params.id
          ? 'Edit Property'
          : 'Add Property'}
      </PageHeader>
      <div className="border-red-500 border text-red-600 font-bold bg-red-100 px-4 py-2 mt-10 rounded">
        Verify your Email first.
      </div>
    </>
  ) : (
    <>
      {Object.keys(user_status).length === 0 &&
      Object.keys(enums).length === 0 ? (
        <>
          <div className="flex justify-between mt-3 mb-3">
            <PageHeader>
              <IconButton
                className={`${classes.backbtn} cursor-pointer`}
                onClick={handleGoBack}
                aria-label="Back"
              >
                <BackIcon />
              </IconButton>
              {match &&
              match.params &&
              match.params.id &&
              window.location.pathname.includes('project')
                ? 'Edit Project'
                : window.location.pathname.includes('project-manage')
                ? 'Add Project'
                : match && match.params && match.params.id
                ? 'Edit Property'
                : 'Add Property'}
            </PageHeader>
          </div>
          <Loading />
          <img src={Loader} style={{ width: '100px' }} alt="loading" />{' '}
        </>
      ) : loading && loading === true ? (
        <>
          <div className="flex justify-between mt-3 mb-3">
            <PageHeader>
              <IconButton
                className={`${classes.backbtn} cursor-pointer`}
                onClick={handleGoBack}
                aria-label="Back"
              >
                <BackIcon />
              </IconButton>
              {match &&
              match.params &&
              match.params.id &&
              window.location.pathname.includes('project/edit')
                ? 'Edit Project'
                : window.location.pathname.includes('project-manage')
                ? 'Add Project'
                : window.location.pathname.includes('project/add')
                ? 'Add Project'
                : match && match.params && match.params.id
                ? 'Edit Property'
                : 'Add Property'}
            </PageHeader>
          </div>
          <Loading />
          <img src={Loader} style={{ width: '100px' }} alt="loading" />{' '}
        </>
      ) : (
        <div>
          <Helmet>
            <title>
              Post{' '}
              {window.location.pathname.includes('property')
                ? 'Property'
                : 'Project'}
            </title>
          </Helmet>
          <div className="flex justify-between mt-3 mb-3">
            <PageHeader>
              <IconButton
                className={`${classes.backbtn} cursor-pointer`}
                onClick={handleGoBack}
                aria-label="Back"
              >
                <BackIcon />
              </IconButton>
              {match &&
              match.params &&
              match.params.id &&
              window.location.pathname.includes('project/edit')
                ? 'Edit Project'
                : window.location.pathname.includes('project-manage/add')
                ? 'Add Project'
                : window.location.pathname.includes('project-manage/edit')
                ? 'Add Project'
                : window.location.pathname.includes('project/add')
                ? 'Add Project'
                : match && match.params && match.params.id
                ? 'Edit Property'
                : 'Add Property'}
            </PageHeader>
          </div>
          <div>
            <div className="my-5">
              {/* IF Agent chha vane Apply as Agent, Chaina vane info (Agent ko tarikale apply garna chha avne as a agency Apply garan ) */}

              {window.location.pathname === '/admin/property/add' ||
              window.location.pathname ===
                `/admin/property/edit/${match.params.id}` ||
              window.location.pathname.includes('project') ? (
                <></>
              ) : (
                <>
                  {Object.keys(user_status).length > 0 &&
                  user_status &&
                  user_status.agent &&
                  user_status.agent.is_verified ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={one.is_by_agency || false}
                          tabIndex={-1}
                          onClick={handleIsByAgency('is_by_agency')}
                          color="primary"
                        />
                      }
                      label="Apply as Agent"
                    />
                  ) : (
                    <div>
                      {user_status.agent && user_status.agent.is_apply ? (
                        <div className="px-4 py-2 border-blue-300 bg-blue-100 border text-blue-600 flex items-center rounded">
                          <i className="material-icons">info</i>{' '}
                          <p className="pl-2 font-bold flex-1">
                            Your agency is not verified yet. Once it is
                            verified, you can apply as agency.
                          </p>
                        </div>
                      ) : (
                        <div className="px-4 py-2 border-blue-300 bg-blue-100 border text-blue-600 flex justify-between items-center rounded">
                          <p className="font-bold flex items-center">
                            <i className="material-icons mr-2">info</i>You can
                            apply as agency but you have to be an agent first.
                          </p>{' '}
                          <Link
                            className="rounded-full text-sm bg-secondary p-1 px-3 text-white"
                            to="/user/member/agent"
                          >
                            Apply as Agent
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {one.is_by_agency === true ? (
                    <div
                      className="border rounded bg-card my-4 w-2/3 shadow p-4"
                      style={{ minHeight: 220 }}
                    >
                      <div className="w-1/2">
                        <h3>{user_status.agent && user_status.agent.name} </h3>
                        {/* <p> {user_status.agent && user_status.bio} </p> */}
                        <>
                          <div className="flex items-center">
                            <img
                              className="mb-5"
                              style={{ maxHeight: '6rem' }}
                              src={
                                user_status.agent &&
                                user_status.agent.agency &&
                                user_status.agent.agency.logo &&
                                user_status.agent.agency.logo !== null &&
                                user_status.agent.agency.logo.path &&
                                ` ${IMAGE_BASE}${
                                  user_status.agent.agency.logo.path
                                }`
                              }
                              alt="Agent logo"
                            />
                          </div>
                          <strong className="text-xl mb-2">
                            {(user_status.agent &&
                              user_status.agent.agency &&
                              user_status.agent.agency.title &&
                              user_status.agent.agency.title) ||
                              ''}
                          </strong>
                          <div className="flex items-center">
                            <i className="material-icons mr-2 text-gray-800 text-sm">
                              explore
                            </i>
                            <span className="text-sm text-gray-800 capitalize">
                              {' '}
                              {(user_status.agent &&
                                user_status.agent.agency &&
                                user_status.agent.agency.address &&
                                user_status.agent.agency.address) ||
                                ''}
                            </span>
                          </div>
                          {/* <div className="flex items-center">
                                    <i className="material-icons mr-2 text-gray-800 text-sm">
                                      phone
                            </i>
                                    <span className="text-sm text-gray-800">
                                      {' '}
                                      {(user_status.agent &&
                                        user_status.agent.agency.phone) ||
                                        ''}
                                    </span>
                                  </div> */}
                          <div className="flex items-center">
                            <i className="material-icons mr-2 text-gray-800 text-sm">
                              smartphone
                            </i>
                            <span className="text-sm text-gray-800">
                              {' '}
                              {(user_status.agent &&
                                user_status.agent.agency &&
                                user_status.agent.agency.mobile &&
                                user_status.agent.agency.mobile) ||
                                ''}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <i className="material-icons mr-2 text-gray-800 text-sm">
                              mail
                            </i>
                            <span className="text-sm text-gray-800">
                              {' '}
                              {(user_status.agent &&
                                user_status.agent.agency &&
                                user_status.agent.agency.email &&
                                user_status.agent.agency.email) ||
                                ''}
                            </span>
                          </div>
                          {/* <div>{each.description || ''}</div> */}
                        </>
                        {/* <img
                  style={{ width: 500, height: 400 }}
                  src={`${IMAGE_BASE}${user_status.agent.logo.path}`}
                  alt="Agent logo"
                /> */}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="text-lg text-gray-800 flex items-center">
                  <i className="material-icons mr-2 text-base">info</i>Basic
                  Details
                  {errors && (errors.basic || errors.tags) && (
                    <div className="text-red-500 italic text-sm pl-2 font-bold">
                      * Fields are missing
                    </div>
                  )}
                </h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <BasicInfo classes={classes} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="text-lg text-gray-800 flex items-center">
                  <i className="material-icons mr-2 text-base">my_location</i>{' '}
                  Address
                  {errors && errors.address && (
                    <div className="text-red-500 italic text-sm pl-2 font-bold">
                      * Fields are missing
                    </div>
                  )}
                </h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Address classes={classes} state={state} match={match} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="text-lg text-gray-800 flex items-center">
                  <i className="material-icons mr-2 text-base">border_inner</i>
                  Area &amp; Road
                  {errors && errors.location_property && (
                    <div className="text-red-500 italic text-sm pl-2 font-bold">
                      * Fields are missing
                    </div>
                  )}
                </h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Location />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="text-lg text-gray-800 flex items-center">
                  <i className="material-icons mr-2 text-base">filter_list</i>
                  Additional Details
                  {errors && errors.building && (
                    <div className="text-red-500 italic text-sm pl-2 font-bold">
                      * Fields are missing
                    </div>
                  )}
                </h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <BuildingInfo classes={classes} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="text-lg text-gray-800 flex items-center">
                  <i className="material-icons mr-2 text-base">image</i> Media
                  {errors && errors.media && (
                    <div className="text-red-500 italic text-sm pl-2 font-bold">
                      * Fields are missing
                    </div>
                  )}
                </h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Media classes={classes} match={match} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {window.location.pathname.includes('project') && (
              <>
                {/* <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <h3 className="text-lg text-gray-800 flex items-center">
                      <i className="material-icons mr-2 text-base">image</i>{' '}
                      Floor Plans
                      {errors && errors.project_floor_plan && (
                                <div className="text-red-500 italic text-sm pl-2 font-bold">
                                  * Fields are missing
                        </div>
                      )}
                    </h3>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ProjectFloor classes={classes} match={match} />
                  </ExpansionPanelDetails>
                </ExpansionPanel> */}
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <h3 className="text-lg text-gray-800 flex items-center">
                      <i className="material-icons mr-2 text-base">image</i>{' '}
                      Payment Plans
                      {errors && errors.project_payment_plan && (
                        <div className="text-red-500 italic text-sm pl-2 font-bold">
                          * Fields are missing
                        </div>
                      )}
                    </h3>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ProjectPayment classes={classes} match={match} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <h3 className="text-lg text-gray-800 flex items-center">
                      <i className="material-icons mr-2 text-base">image</i>{' '}
                      Project Features
                      {errors && errors.project_features && (
                        <div className="text-red-500 italic text-sm pl-2 font-bold">
                          * Fields are missing
                        </div>
                      )}
                    </h3>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ProjectFeatures classes={classes} match={match} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <h3 className="text-lg text-gray-800 flex items-center">
                      <i className="material-icons mr-2 text-base">image</i>{' '}
                      Property Types
                      {errors && errors.project_features && (
                        <div className="text-red-500 italic text-sm pl-2 font-bold">
                          * Fields are missing
                        </div>
                      )}
                    </h3>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ProjectPropertyType classes={classes} match={match} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </>
            )}
            {!window.location.pathname.includes('project') && (
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <h3 className="text-lg text-gray-800 flex items-center">
                    <i className="material-icons mr-2 text-base">
                      monetization_on
                    </i>
                    Price
                    {errors && errors.price && (
                      <div className="text-red-500 italic text-sm pl-2 font-bold">
                        * Fields are missing
                      </div>
                    )}
                  </h3>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Price />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}
            {/* {window.location.pathname.includes('admin') ? (
              <>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <h3 className="text-lg text-gray-800 flex items-center">
                      <i className="material-icons mr-2 text-base">
                        monetization_on
                      </i>
                      Price
                      {errors && errors.price && (
                        <div className="text-red-500 italic text-sm pl-2 font-bold">
                          * Fields are missing
                        </div>
                      )}
                    </h3>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Price />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </>
            ) : (
              ''
            )} */}
            {window.location.pathname.includes('admin') ? (
              <>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <h3 className="text-lg text-gray-800 flex items-center">
                      <i className="material-icons mr-2 text-base w-4">
                        check_circle_outline
                      </i>{' '}
                      Admin Actions
                    </h3>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="w-full">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={one.is_active || false}
                            tabIndex={-1}
                            onClick={handleCheckedChange('is_active')}
                            color="primary"
                          />
                        }
                        label="Is Active"
                      />
                      {/* <FormControlLabel
                        control={
                          <Checkbox
                            checked={one.is_published || false}
                            tabIndex={-1}
                            onClick={handleCheckedChange('is_published')}
                            color="primary"
                          />
                        }
                        label="Is Published"
                      /> */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={one.is_verified || false}
                            tabIndex={-1}
                            onClick={handleCheckedChange('is_verified')}
                            color="primary"
                          />
                        }
                        label="Is Verified"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={one.is_featured || false}
                            tabIndex={-1}
                            onClick={handleCheckedChange('is_featured')}
                            color="primary"
                          />
                        }
                        label="Is Featured"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={one.is_premium || false}
                            tabIndex={-1}
                            onClick={handleCheckedChange('is_premium')}
                            color="primary"
                          />
                        }
                        label="Is Premium"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={one.is_exclusive || false}
                            tabIndex={-1}
                            onClick={handleCheckedChange('is_exclusive')}
                            color="primary"
                          />
                        }
                        label="Is Exclusive"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={one.is_sold_out || false}
                            tabIndex={-1}
                            onClick={handleCheckedChange('is_sold_out')}
                            color="primary"
                          />
                        }
                        label="Is Sold Out"
                      />
                      {/* <FormControlLabel
                        control={
                          <Checkbox
                            checked={one.is_negotiable || false}
                            tabIndex={-1}
                            onClick={handleCheckedChange('is_negotiable')}
                            color="primary"
                          />
                        }
                        label="Is Negotiable"
                      /> */}
                      <div>
                        {window.location.pathname.includes('project') ? (
                          <div className="w-2/3 flex items-center">
                            <div className="flex-1 pl-4 ">
                              <Select
                                className="React_Select"
                                id="category"
                                placeholder="Choose"
                                value={
                                  listDevelopersNormalized[one.developer_id] ||
                                  null
                                }
                                classNamePrefix="select"
                                onChange={handleDropdownChange('developer_id')}
                                isSearchable
                                options={listDevelopers}
                                styles={customStyles}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="w-2/3 flex items-center">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isAgent}
                                  tabIndex={-1}
                                  onClick={handleAgentChange('is_agent')}
                                  color="primary"
                                />
                              }
                              label="Apply as Agent"
                            />
                            {isAgent === true ? (
                              <>
                                <div className="flex-1 pl-4 ">
                                  {/* <select
                                    className="inputbox"
                                    native="true"
                                    name="agents"
                                    value={one.agency_id}
                                    onChange={handleChange('agency_id')}
                                  >
                                    <option
                                      key="0"
                                      name="choose"
                                      value="area-unit"
                                    >
                                      Choose agency
                                    </option>
                                    {agents.map(each => (
                                      <option
                                        key={each._id}
                                        name={each.title}
                                        value={each._id}
                                      >
                                        {each.title}
                                      </option>
                                    ))}
                                  </select> */}

                                  <Select
                                    className="React_Select"
                                    id="category"
                                    placeholder="Choose"
                                    value={
                                      listAgencyNormalized[one.agency_id] ||
                                      null
                                    }
                                    classNamePrefix="select"
                                    onChange={handleDropdownChange('agency_id')}
                                    isSearchable
                                    options={listAgency}
                                    styles={customStyles}
                                  />
                                </div>
                                <div className="flex-1 pl-4 ">
                                  {/* <select
                                    className="inputbox"
                                    native="true"
                                    name="agents"
                                    value={one.agent_id}
                                    onChange={handleChange('agent_id')}
                                  >
                                    <option
                                      key="0"
                                      name="choose"
                                      value="area-unit"
                                    >
                                      Choose agent
                                    </option>
                                    {agent_list.map(each => (
                                      <option
                                        key={each._id}
                                        name={each.name}
                                        value={each._id}
                                      >
                                        {each.name}
                                      </option>
                                    ))}
                                  </select> */}
                                  <Select
                                    className="React_Select"
                                    id="category"
                                    placeholder="Choose"
                                    value={
                                      listAgentsNormalized[one.agent_id] || null
                                    }
                                    classNamePrefix="select"
                                    onChange={handleDropdownChange('agent_id')}
                                    isSearchable
                                    options={listAgents}
                                    styles={customStyles}
                                  />
                                </div>
                              </>
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </>
            ) : (
              ''
            )}
            {window.location.pathname.includes('edit') &&
            !window.location.pathname.includes('admin') ? (
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <h3 className="text-lg text-gray-800 flex items-center">
                    <i className="material-icons mr-2 text-base">info</i>
                    Sold/Rented
                  </h3>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <p>
                      {/* <span className="inline-flex items-center px-4">
                              {one.is_active ? (
                                <i className="material-icons text-sm mr-2 text-teal-500">
                                  check_circle
                          </i>
                              ) : (
                                  <i className="material-icons text-sm mr-2 text-red-600">
                                    cancel
                          </i>
                                )}
                              Is Active
                      </span> */}

                      {/* <span className="inline-flex items-center px-4">
                              {one.is_verified ? (
                                <i className="material-icons text-sm mr-2 text-teal-500">
                                  check_circle
                          </i>
                              ) : (
                                  <i className="material-icons text-sm mr-2 text-red-600">
                                    cancel
                          </i>
                                )}{' '}
                              Is Verified
                      </span> */}

                      {/* <span className="inline-flex items-center px-4">
                              {one.is_featured ? (
                                <i className="material-icons text-sm mr-2 text-teal-500">
                                  check_circle
                          </i>
                              ) : (
                                  <i className="material-icons text-sm mr-2 text-red-600">
                                    cancel
                          </i>
                                )}{' '}
                              Is Featured
                      </span> */}

                      {/* <span className="inline-flex items-center px-4">
                              {one.is_premium ? (
                                <i className="material-icons text-sm mr-2 text-teal-500">
                                  check_circle
                          </i>
                              ) : (
                                  <i className="material-icons text-sm mr-2 text-red-600">
                                    cancel
                          </i>
                                )}{' '}
                              Is Premium
                      </span> */}

                      {/* <span className="inline-flex items-center px-4">
                              {one.is_negotiable ? (
                                <i className="material-icons text-sm mr-2 text-teal-500">
                                  check_circle
                          </i>
                              ) : (
                                  <i className="material-icons text-sm mr-2 text-red-600">
                                    cancel
                          </i>
                                )}{' '}
                              Is Negotiable
                      </span> */}

                      {/* <span className="inline-flex items-center px-4">
                              {one.is_exclusive ? (
                                <i className="material-icons text-sm mr-2 text-teal-500">
                                  check_circle
                          </i>
                              ) : (
                                  <i className="material-icons text-sm mr-2 text-red-600">
                                    cancel
                          </i>
                                )}{' '}
                              Is Exclusive
                      </span> */}
                    </p>
                  </div>
                  {window.location.pathname.includes('user/property/edit') && (
                    <div className="w-full">
                      {isAgentUser && (
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={one.is_sold_out || false}
                                tabIndex={-1}
                                onClick={handleCheckedChange('is_sold_out')}
                                color="primary"
                              />
                            }
                            label="Sold Out/Rented"
                          />
                          {one.is_sold_out && (
                            <>
                              <input
                                className="inputbox w-48"
                                native="true"
                                placeholder="Acutal Price"
                                name="sold out price"
                                value={one.sold_out_price}
                                onChange={handleChange('sold_out_price')}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ) : (
              ''
            )}
            <br />
            {/* <input className="mr-2" type="checkbox" /> I agree to the{' '} */}
            {window.location.pathname === '/admin/property/add' ||
            window.location.pathname ===
              `/admin/property/edit/${match.params.id}` ||
            window.location.pathname.includes('admin') ? (
              <></>
            ) : (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={one.is_active || false}
                      tabIndex={-1}
                      onClick={handleCheckedChange('is_active')}
                      color="primary"
                    />
                  }
                  label="Is Active"
                />
              </>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={one.is_agree || false}
                  tabIndex={-1}
                  onClick={handleCheckedChange('is_agree')}
                  color="primary"
                />
              }
              label="I agree to the "
            />
            <Link
              target="_blank"
              className="-ml-3 inline-block"
              to="/listing-policy"
            >
              {' '}
              <span className="text-secondary relative" style={{ top: '1px' }}>
                listing policy
              </span>
            </Link>
            {/* {window.location.pathname.includes('edit') && (
              <div>
                <p>View Count User: {one.view_count_user || 0}</p>
                <p>View Count Guest: {one.view_count_guest || 0}</p>
              </div>
            )} */}

            <div className="flex justify-between">
              <button
                type="button"
                className="text-red-500 bg-red-100 py-2 px-4 rounded mt-4 bg-white uppercase btn-theme text-sm"
                onClick={handleClear}
              >
                Cancel Posting
              </button>
              <button
                type="button"
                className="text-white py-2 px-4 rounded mt-4 bg-primary hover:bg-secondary uppercase btn-theme text-sm"
                onClick={handleSave}
                disabled={loading}
              >
                {!one.is_active && 'Save as Draft'}
                {one.is_active === true
                  ? window.location.pathname.includes('edit')
                    ? 'Update Property'
                    : 'Post Property'
                  : null}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  enums: PropTypes.object.isRequired,
  loadEnumRequest: PropTypes.func.isRequired,
  state: PropTypes.array.isRequired,
  loadStateRequest: PropTypes.func.isRequired,
  loadDistrictRequest: PropTypes.func.isRequired,
  loadMunicipalityRequest: PropTypes.func.isRequired,
  loadAreaRequest: PropTypes.func.isRequired,
  loadAgentsRequest: PropTypes.func.isRequired,
  loadLocationRequest: PropTypes.func.isRequired,
  loadDevelopersRequest: PropTypes.func.isRequired,
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
  placeholder: state => ({
    color: '#000',
    fontSize: '15px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
};

const withStyle = withStyles(styles);

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  query: makeSelectQuery(),
  enums: makeSelectEnum(),
  state: makeSelectState(),
  address: makeSelectAddress(),
  agents: makeSelectAgents(),
  user_status: makeSelectUserStatus(),
  is_project: makeSelectIsProject(),
  basic: makeSelectBasic(),
  is_land: makeSelectIsLand(),
  is_land: makeSelectIsLand(),
  developers: makeSelectDevelopers(),
  current_user: makeSelectUser(),
  agent_list: makeSelectAgentList(),
  agent_loading: makeSelectAgentLoading(),
  user: MakeSelectUserProfile(),
  auto_loading: makeSelectAutoLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push, enqueueSnackbar },
);

export default compose(
  withRouter,
  withStyle,
  // withReducer,
  // withSaga,
  withConnect,
)(AddEdit);
