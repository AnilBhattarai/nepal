/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';

// import { NavLink } from 'react-router-dom';
// import AccountBox from '@material-ui/icons/AccountBox';
// import Error from '@material-ui/icons/Error';
// import NoteAdd from '@material-ui/icons/NoteAdd';
// import Note from '@material-ui/icons/Note';
// import LinkBoth from '../../../components/LinkBoth';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Table from 'components/Table';
import PageContent from '../../../components/PageContent/PageContent';

// core components
import {
  makeSelectDashboardInfo,
  makeSelectLoading,
  makeSelectOfferMsg,
  makeSelectOfferLoading,
  makeSelectNewOfferLoading,
  makeSelectAgentReport,
  makeSelectCategoryReport,
  makeSelectLocationReport,
  makeSelectLoaders,
  makeSelectAgentData,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import Loading from '../../../components/Loading';
import Loader from '../../../assets/img/loader.svg';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import defaultImage from '../../../images/default.jpg';

import CategoryProperties from '../../../containers/Admin/Dashboard/charts/CategoryProperties';
import TopAgent from '../../../containers/Admin/Dashboard/charts/TopAgent';
import TopAreas from '../../../containers/Admin/Dashboard/charts/TopAreas';

const App = props => {
  const {
    classes,
    dashboardInfo,
    loading,
    offer_loading,
    offer_messages: { data, page, size, totaldata },
    new_offer_loading,
    loaders,
    category_report,
    location_report,
    agent_report,
    dashboardInfoRequest,
    loadOfferMsgRequest,
    loadCategoryReportRequest,
    loadLocationReportRequest,
    loadAgentReportRequest,
    agent,
    agentDataRequest,
  } = props;

  const [all_loading, setAllLoading] = useState(true);

  useEffect(() => {
    agentDataRequest();
  }, []);

  useEffect(() => {
    if (agent && agent.is_verified) {
      dashboardInfoRequest();
      loadOfferMsgRequest();
      loadCategoryReportRequest();
      loadLocationReportRequest();
      loadAgentReportRequest();
    }
  }, [agent]);

  useEffect(() => {
    let tempLoading = false;
    Object.keys(loaders).map(function(key, index) {
      if (loaders[key] === true) {
        tempLoading = true;
      }
    });
    if (tempLoading === false && loading === false) {
      setAllLoading(false);
    } else {
      setAllLoading(true);
    }
  }, [loaders, loading]);

  const handlePagination = ({ page, size }) => {
    loadOfferMsgRequest({ page, size });
  };

  const handleLoadMore = ({ page, size }) => {
    const newPage = page + 1;
    loadNewOfferMsgRequest({ page: newPage, size });
  };

  const tablePagination = { page, size, totaldata };

  const tableData =
    data && data.length > 0
      ? data.map(
          ({ _id, name, email, phone, message, added_at, propertyId }) => [
            name,
            email,
            phone,
            message,
            propertyId ? (
              <Link
                to={
                  propertyId.is_project
                    ? `/project/${propertyId.slug_url}`
                    : `/detail/${propertyId.slug_url}`
                }
                target="_blank"
                className="underline text-secondary text-sm cursor-pointer mt-1 block"
              >
                {' '}
                {propertyId.basic.title}{' '}
              </Link>
            ) : (
              'Null'
            ),
            moment(added_at).format(DATE_FORMAT),
          ],
        )
      : [[]];

  return (
    <React.Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="side-nav">
        <h2 className="text-2xl mb-4 font-bold">Dashboard</h2>
        {all_loading && all_loading === true ? (
          <img src={Loader} style={{ width: '100px' }} alt="loading" />
        ) : agent.is_verified ? (
          <>
            {dashboardInfo.status && (
              <div className="flex justify-between mx-8 my-4 hidden">
                {dashboardInfo.status &&
                  dashboardInfo.status.agent &&
                  dashboardInfo.status.agent.agency && (
                    <div className="w-1/2 -ml-8 bg-white rounded p-5 flex justify-between hover:text-black bg-green-100 border border-green-400">
                      <span className="m-auto inline-block text-black text-sm font-bold ml-4  rounded-full bg-waftprimary-light leading-loose">
                        {dashboardInfo.status &&
                          dashboardInfo.status.agent &&
                          dashboardInfo.status.agent.agency && (
                            <>
                              <div className="flex items-center">
                                <img
                                  className="h-8 mb-10"
                                  src={
                                    dashboardInfo.status.agent &&
                                    dashboardInfo.status.agent.agency &&
                                    dashboardInfo.status.agent.agency.logo
                                      ? `${IMAGE_BASE}${
                                          dashboardInfo.status.agent.agency.logo
                                            .path
                                        }`
                                      : defaultImage
                                  }
                                  alt="Agent logo"
                                />
                              </div>
                              <strong className="text-primary text-lg mb-2">
                                {(dashboardInfo.status.agent &&
                                  dashboardInfo.status.agent.agency &&
                                  dashboardInfo.status.agent.agency.title) ||
                                  ''}
                              </strong>
                              {dashboardInfo.status.agent.is_apply &&
                                'Applied as a Agent and '}
                              {dashboardInfo.status.agent.is_verified
                                ? 'Verefied Agent now yu can Upload Property on behalf of this agency'
                                : 'Waiting for Verification'}
                            </>
                          )}
                      </span>
                    </div>
                  )}

                {dashboardInfo.status.builder &&
                  dashboardInfo.status.builder.developer && (
                    <div className="w-1/2 -ml-8 bg-white rounded p-5 flex justify-between hover:text-black bg-green-100 border border-green-400">
                      <span className="m-auto inline-block text-black text-sm font-bold ml-4  rounded-full bg-waftprimary-light leading-loose">
                        {dashboardInfo.status.builder && (
                          <>
                            <div className="flex items-center">
                              <img
                                className="h-8 mb-10"
                                src={
                                  dashboardInfo.status.builder &&
                                  dashboardInfo.status.builder.developer &&
                                  dashboardInfo.status.builder.developer.logo
                                    ? `${IMAGE_BASE}${
                                        dashboardInfo.status.builder.developer
                                          .logo.path
                                      }`
                                    : defaultImage
                                }
                                alt="developer logo"
                              />
                            </div>
                            <strong className="text-primary text-lg mb-2">
                              {(dashboardInfo.status.builder &&
                                dashboardInfo.status.builder.developer &&
                                dashboardInfo.status.builder.developer.name) ||
                                ''}
                            </strong>
                            {dashboardInfo.status.builder.is_apply &&
                              'Applied as a Builder and '}
                            {dashboardInfo.status.builder.is_verified
                              ? 'Verefied. you can Upload Project '
                              : 'Waiting for Verification.'}
                          </>
                        )}
                      </span>
                    </div>
                  )}
              </div>
            )}
            <div className="flex flex-wrap -mx-1 mt-2">
              <div className="w-3/5 px-1">
                <div style={{ height: 350 }} className="bg-white rounded py-5">
                  <h3 className="font-bold text-lg pl-5">Properties Listing</h3>
                  {!all_loading && agent_report.length < 1 ? (
                    <h2 className="ml-4 p-4 mt-4">No data found</h2>
                  ) : (
                    <TopAgent data={agent_report} />
                  )}
                </div>
              </div>
              <div className="w-2/5 px-1">
                <div style={{ height: 350 }} className="bg-white rounded py-5">
                  <h3 className="font-bold text-lg pl-5">By Categories</h3>
                  {!all_loading && category_report.length < 1 ? (
                    <h2 className="ml-4 p-4 mt-4">No data found</h2>
                  ) : (
                    <CategoryProperties data={category_report} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-1 mt-2">
              <div className="w-3/5 px-1">
                <div style={{ height: 350 }} className="bg-white rounded py-5">
                  <h3 className="font-bold text-lg pl-5">Top 10 Areas</h3>
                  {!all_loading && location_report.length < 1 ? (
                    <h2 className="ml-4 p-4 mt-4">No data found</h2>
                  ) : (
                    <TopAreas data={location_report} />
                  )}
                </div>
              </div>
            </div>
            {/* <h2 className="text-2xl mb-4 font-bold">Messages</h2>

              <PageContent loading={offer_loading}>
                <Table
                  tableHead={[
                    'Name',
                    'Email',
                    'Phone',
                    'Message',
                    'Property',
                    'Added at',
                  ]}
                  tableData={tableData}
                />
                {new_offer_loading && <img src={Loader} alt="Loading" />}
                {data.length < totaldata && (
                  <button
                    type="button"
                    className="btn bg-secondary"
                    onClick={() => handleLoadMore({ page, size })}
                  >
                    LoadMore
                </button>
                )}
              </PageContent> */}
          </>
        ) : (
          <div className="border-red-500 border text-red-600 font-bold bg-red-100 px-4 py-2 mt-10 rounded">
            Not verified as agent.
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  dashboardInfo: makeSelectDashboardInfo(),
  loading: makeSelectLoading(),
  offer_messages: makeSelectOfferMsg(),
  offer_loading: makeSelectOfferLoading(),
  new_offer_loading: makeSelectNewOfferLoading(),
  category_report: makeSelectCategoryReport(),
  location_report: makeSelectLocationReport(),
  agent_report: makeSelectAgentReport(),
  loaders: makeSelectLoaders(),
  agent: makeSelectAgentData(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({});

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(App);
