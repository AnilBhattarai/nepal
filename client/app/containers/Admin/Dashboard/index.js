/**
 *
 * Dashboard
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AccountBox from '@material-ui/icons/AccountBox';
import Error from '@material-ui/icons/Error';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Note from '@material-ui/icons/Note';
import {
  makeSelectErrors,
  makeSelectUsers,
  makeSelectInfo,
  makeSelectBlog,
  makeSelectTotalProperties,
  makeSelectMonthProperties,
  makeSelectCategoryProperties,
  makeSelectPostsByAuthors,
  makeSelectUserCount,
  makeSelectTopAgent,
  makeSelectTopAreas,
  makeSelectActiveSold,
  makeSelectPropertiesByPrice,
  makeSelectPending,
  makeSelectLoaders,
} from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import PageHeader from '../../../components/PageHeader/PageHeader';
import LinkBoth from '../../../components/LinkBoth';
import MonthProperties from './charts/MonthProperties';
import UserCount from './charts/UserCount';
import TopAgent from './charts/TopAgent';
import TopAreas from './charts/TopAreas';
import ActiveSold from './charts/ActiveSold';
import PropertiesByPrice from './charts/PropertiesByPrice';
import PostsByAuthor from './charts/PostsByAuthor';
import CategoryProperties from './charts/CategoryProperties';
import { Link } from 'react-router-dom';

const styles = theme => ({
  dashicon: {
    fontSize: '50px',
    display: 'block',
    width: '100%',
    marginBottom: '10px',
    color: '#666',
    '&:hover': {
      color: '#000000',
    },
  },
});

/* eslint-disable react/prefer-stateless-function */
const Dashboard = props => {
  const {
    classes,
    users,
    info,
    errors,
    blogs,
    total_properties,
    month_properties,
    category_properties,
    posts_by_authors,
    loadUserRequest,
    loadErrorRequest,
    loadInfoRequest,
    loadBlogRequest,
    loadTotalPropertiesRequest,
    loadMonthPropertiesRequest,
    loadCategoryPropertiesRequest,
    loadPostsByAuhtorRequest,
    loadUserSignUpCountRequest,
    user_count,
    loadTopAgentRequest,
    top_agent,
    top_areas,
    loadTopAreasRequest,
    loadActiveSoldRequest,
    sold_count,
    loadPropertiesByPriceRequest,
    properties_by_price,
    loadPendingPropertiesRequest,
    pending,
    loaders,
  } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserRequest();
    loadErrorRequest();
    loadTotalPropertiesRequest();
    loadMonthPropertiesRequest();
    loadCategoryPropertiesRequest();
    loadPostsByAuhtorRequest();
    loadUserSignUpCountRequest();
    loadTopAgentRequest();
    loadTopAreasRequest();
    loadActiveSoldRequest();
    loadPropertiesByPriceRequest();
    loadPendingPropertiesRequest();
  }, []);

  useEffect(() => {
    let tempLoading = false;
    Object.keys(loaders).map(function(key, index) {
      if (loaders[key] === true) {
        tempLoading = true;
      }
    });
    setLoading(tempLoading);
  }, [loaders]);
  return loading ? (
    <>
      <div className="flex justify-between mt-3 mb-3">
        <PageHeader>Dashboard</PageHeader>
      </div>
      <div className="flex flex-wrap -mx-1">
        <div className="w-1/6 px-1">
          <div className="bg-white h-24 rounded" />
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white h-24 rounded" />
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white h-24 rounded" />
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white h-24 rounded" />
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white h-24 rounded" />
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white h-24 rounded" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-1 mt-2">
        <div className="w-3/5 px-1">
          <div className="bg-white rounded" style={{ height: 350 }} />
        </div>
        <div className="w-2/5 px-1">
          <div className="bg-white rounded" style={{ height: 350 }} />
        </div>
      </div>
      <div className="flex flex-wrap -mx-1 mt-2">
        <div className="w-2/5 px-1">
          <div className="bg-white rounded" style={{ height: 350 }} />
        </div>
        <div className="w-3/5 px-1">
          <div className="bg-white rounded" style={{ height: 350 }} />
        </div>
      </div>
      <div className="flex flex-wrap -mx-1 mt-2">
        <div className="w-1/2 px-1">
          <div className="bg-white rounded" style={{ height: 350 }} />
        </div>
        <div className="w-1/2 px-1">
          <div className="bg-white rounded" style={{ height: 350 }} />
        </div>
      </div>

      <div className="flex flex-wrap -mx-1 mt-2">
        <div className="px-1">
          <div style={{ width: '14.2%' }} className="bg-white rounded h-24" />
          <div style={{ width: '14.2%' }} className="bg-white rounded h-24" />
          <div style={{ width: '14.2%' }} className="bg-white rounded h-24" />
          <div style={{ width: '14.2%' }} className="bg-white rounded h-24" />
          <div style={{ width: '14.2%' }} className="bg-white rounded h-24" />
          <div style={{ width: '14.2%' }} className="bg-white rounded h-24" />
          <div style={{ width: '14.2%' }} className="bg-white rounded h-24" />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex justify-between mt-3 mb-3">
        <PageHeader>Dashboard</PageHeader>
      </div>

      <div className="flex flex-wrap -mx-1">
        <div className="w-1/6 px-1">
          <div className="bg-white py-4 text-center rounded">
            <span className="text-3xl font-light block text-secondary">
              {total_properties.property}
            </span>
            <span className="uppercase text-gray-600 text-sm">
              Total Properties
            </span>
          </div>
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white py-4 text-center rounded">
            <span className="text-3xl font-light block text-secondary">
              {total_properties.project}
            </span>
            <span className="uppercase text-gray-600 text-sm">
              Total Project
            </span>
          </div>
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white py-4 text-center rounded">
            <Link to="/admin/property#inactive" target="_blank">
              <span className="text-3xl font-light block text-secondary">
                {total_properties.in_active_project_count
                  ? total_properties.in_active_project_count
                  : 0}
              </span>
              <span className="uppercase text-gray-600 text-sm">
                Inactive Properties
              </span>
            </Link>
          </div>
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white py-4 text-center rounded">
            <Link to="/admin/property#unverified" target="_blank">
              <span className="text-3xl font-light block text-secondary">
                {total_properties.un_verified_project_count
                  ? total_properties.un_verified_project_count
                  : 0}
              </span>
              <span className="uppercase text-gray-600 text-sm">
                Unverified Properties
              </span>
            </Link>
          </div>
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white py-4 text-center rounded">
            <Link to="/admin/property#pending" target="_blank">
              <span className="text-3xl font-light block text-secondary">
                {pending.pending_count}
              </span>
              <span className="uppercase text-gray-600 text-sm">
                Pending Properties
              </span>
            </Link>
          </div>
        </div>
        <div className="w-1/6 px-1">
          <div className="bg-white py-4 text-center rounded">
            <Link to="/admin/property#sold" target="_blank">
              <span className="text-3xl font-light block text-secondary">
                {sold_count && sold_count.sold_out_count
                  ? sold_count.sold_out_count
                  : 0}
              </span>
              <span className="uppercase text-gray-600 text-sm">
                Soldout Properties
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-1 mt-2">
        <div className="w-3/5 px-1">
          <div style={{ height: 350 }} className="bg-white rounded py-5">
            <h3 className="font-bold text-lg pl-5">Properties Listing</h3>
            <MonthProperties data={month_properties} />
          </div>
        </div>
        <div className="w-2/5 px-1">
          <div style={{ height: 350 }} className="bg-white rounded py-5">
            <h3 className="font-bold text-lg pl-5">By Categories</h3>
            <CategoryProperties data={category_properties} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-1 mt-2">
        <div className="w-2/5 px-1">
          <div style={{ height: 350 }} className="bg-white rounded py-5">
            <h3 className="font-bold text-lg pl-5">Active Vs Sold</h3>
            <ActiveSold data={sold_count} />
          </div>
        </div>
        <div className="w-3/5 px-1">
          <div style={{ height: 350 }} className="bg-white rounded py-5">
            <h3 className="font-bold text-lg pl-5">Top 10 Areas</h3>
            <TopAreas data={top_areas} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-1 mt-2">
        <div className="w-1/2 px-1">
          <div style={{ height: 350 }} className="bg-white rounded py-5">
            <h3 className="font-bold text-lg pl-5">By Price Range</h3>
            <PropertiesByPrice data={properties_by_price} />
          </div>
        </div>
        <div className="w-1/2 px-1">
          <div style={{ height: 350 }} className="bg-white rounded py-5">
            <h3 className="font-bold text-lg pl-5">Top 10 Agents</h3>
            <TopAgent data={top_agent} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between -mx-1 mt-2">
        {users &&
          users.data &&
          users.data.role &&
          users.data.role.map(each => (
            <div
              className="px-1"
              style={{
                width: '14.2%',
              }}
            >
              <div key={each._id} className="bg-white text-center py-4 rounded">
                <span className="block text-secondary text-xl font-light">
                  {users.data &&
                    users.data.user &&
                    users.data.user.filter(e => e.roles.includes(each._id))
                      .length}
                </span>
                <span className="uppercase text-gray-600 text-sm">
                  {each.role_title}
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-wrap -mx-1 mt-2">
        <div className="w-3/5 px-1">
          <div style={{ height: 350 }} className="bg-white rounded py-5">
            <h3 className="font-bold text-lg pl-5">Daily Signups</h3>
            <UserCount data={user_count} />
          </div>
        </div>
        <div className="w-2/5 px-1">
          <div style={{ height: 350 }} className="bg-white rounded py-5">
            <h3 className="font-bold text-lg pl-5">
              Posts By Authors(
              {posts_by_authors && posts_by_authors.count
                ? posts_by_authors.count
                : 0}
              )
            </h3>
            {posts_by_authors &&
              posts_by_authors.blog &&
              posts_by_authors.blog.length > 0 && (
                <PostsByAuthor data={posts_by_authors.blog} />
              )}
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  loadUserRequest: PropTypes.func.isRequired,
  loadErrorRequest: PropTypes.func.isRequired,
  loadInfoRequest: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  info: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
  info: makeSelectInfo(),
  blogs: makeSelectBlog(),
  total_properties: makeSelectTotalProperties(),
  month_properties: makeSelectMonthProperties(),
  category_properties: makeSelectCategoryProperties(),
  posts_by_authors: makeSelectPostsByAuthors(),
  user_count: makeSelectUserCount(),
  top_agent: makeSelectTopAgent(),
  top_areas: makeSelectTopAreas(),
  sold_count: makeSelectActiveSold(),
  properties_by_price: makeSelectPropertiesByPrice(),
  pending: makeSelectPending(),
  loaders: makeSelectLoaders(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminDashboard', reducer });
const withSaga = injectSaga({ key: 'adminDashboard', saga });
const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
