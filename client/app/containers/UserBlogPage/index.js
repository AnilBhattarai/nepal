/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Helmet } from 'react-helmet';
import UserProfileSettingsPage from '../../components/UserProfileSettings';
// import Underconstruction from '../../assets/img/underconstruction.jpg';

class UserBlogPage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title> My Blogs </title>
        </Helmet>
        <UserProfileSettingsPage>
          {/* <img src={Underconstruction} alt="underconstruction" /> */}
        </UserProfileSettingsPage>
      </React.Fragment>
    );
  }
}

export default UserBlogPage;
