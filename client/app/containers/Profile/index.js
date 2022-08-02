import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  Informtions,
  ChangePasswords,
  BlogPage,
  VerifyEmail,
  Dashboard,
  BlogAddEditPage,
  BlogListPage,
  LoginLogs,
  ApplyForBuilder,
  ApplyForAuthor,
  ApplyForAgent,
  UserLoginLogs,
  UserComments,
  MyProjects,
  MyProperty,
  MyRequest,
  MyPropertyAdd,
  MyRequestAdd,
  MyProjectAdd,
  MyFavorites,
  MySearches,
  MyLeads,
  MyLeadAdd,
  SavedSearches,
} from './Pages/Loadable.js';
import PageLayout from './Components/PageLayout';

import reducer from './reducer';
import saga from './saga';

const key = 'userPersonalInformationPage';

const ProfileSection = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div className="bg-white">
      <PageLayout>
        <Switch>
          <Route exact path="/user/profile/dashboard" component={Dashboard} />
          <Route
            exact
            path="/user/profile/saved-searches"
            component={SavedSearches}
          />

          <Route
            exact
            path="/user/profile/information"
            component={Informtions}
          />
          <Route exact path="/user/profile" component={Informtions} />
          <Route exact path="/user/profile/verify" component={VerifyEmail} />
          <Route
            exact
            path="/user/profile/change-password"
            component={ChangePasswords}
          />
          <Route
            exact
            path="/user/member/developer"
            component={ApplyForBuilder}
          />
          <Route exact path="/user/member/author" component={ApplyForAuthor} />
          <Route exact path="/user/member/agent" component={ApplyForAgent} />
          <Route exact path="/user/login-logs" component={LoginLogs} />
          <Route exact path="/user/blog" component={BlogListPage} />
          <Route exact path="/user/news/add" component={BlogAddEditPage} />
          <Route exact path="/user/news/list" component={BlogListPage} />
          <Route
            exact
            path="/user/profile/change-password"
            component={ChangePasswords}
          />
          <Route
            exact
            path="/user/news/edit/:slug_url"
            component={BlogAddEditPage}
          />
          <Route exact path="/user/comments" component={UserComments} />
          <Route exact path="/user/loginlogs" component={UserLoginLogs} />
          <Route exact path="/user/property" component={MyProperty} />
          <Route exact path="/user/favorites" component={MyFavorites} />
          <Route exact path="/user/recent-searches" component={MySearches} />
          <Route exact path="/user/property/add" component={MyPropertyAdd} />
          <Route
            exact
            path="/user/property/edit/:id"
            component={MyPropertyAdd}
          />
          <Route exact path="/user/project" component={MyProjects} />
          <Route exact path="/user/project/add" component={MyProjectAdd} />
          <Route exact path="/user/project/edit/:id" component={MyProjectAdd} />
          <Route exact path="/user/request" component={MyRequest} />
          <Route exact path="/user/request/add" component={MyRequestAdd} />
          <Route exact path="/user/request/edit/:id" component={MyRequestAdd} />
          <Route exact path="/user/leads" component={MyLeads} />
          <Route exact path="/user/leads/add" component={MyLeadAdd} />
        </Switch>
      </PageLayout>
    </div>
  );
};

export default ProfileSection;
