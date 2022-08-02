import React from 'react';
import HomePage from '../containers/HomePage';
import LoginAdminPage from '../containers/LoginAdminPage/Loadable';
import LoginUserPage from '../containers/LoginUserPage/Loadable';
import ForgotPasswordUserPage from '../containers/ForgotPasswordUserPage/Loadable';
import SignupUserPage from '../containers/SignupUserPage/Loadable';
import FaqPage from '../containers/FAQPage/Loadable';
import ContactUsPage from '../containers/ContactUs/Loadable';
import AboutUsPage from '../containers/AboutUsPage/';
import SubscribePage from '../containers/SubscriberPage/Loadable';
import ListPage from '../containers/ListPage/Loadable';
import DeveloperPage from '../containers/Developer/Loadable';
import DirectoryPage from '../containers/DirectoryPage/Loadable';
import HomeLoanPage from '../containers/HomeLoanPage/Loadable';
import AdPage from '../containers/Advertisement/Loadable';
import StaticPage from '../containers/StaticPages/Loadable';
import EventsPage from '../containers/EventsPage/Loadable';
import BuyerPage from '../containers/BuyerPage/Loadable';
import PropertyDetail from '../containers/ListView/DetailPage/Loadable';
import ProjectDetail from '../containers/ListView/ProjectDetailPage/Loadable';
import PropertyDetailMobile from '../containers/ListView/DetailPageMobile/Loadable';
import ProjectDetailMobile from '../containers/ListView/ProjectDetailMobile/Loadable';

import Career from '../containers/Career/Loadable';
import CareerDetail from '../containers/Career/Details/Loadable';
import Forum from '../containers/Forum/Loadable';
import ForumDetail from '../containers/Forum/Details/Loadable';

import EditorFileSelectPage from '../containers/EditorFileSelect';
import BlogPages from '../containers/Blog';
import VerifyEmail from '../containers/VerifyEmail/Loadable';
import UnitConverter from '../containers/UnitConverter/Loadable';
import { DevelopersPage } from '../containers/DevelopersPage';
import WantedList from '../containers/WantedProperty/Listing/Loadable';
import ErrorBounty from '../components/ErrorBoundary/index';
import TrendingList from '../containers/TrendingProperty/Listing/Loadable';
import HotList from '../containers/HotProperty/Listing/Loadable';
import ResetPasswordPage from '../containers/ResetPasswordPage/Loadable';
import AgentList from '../containers/HomePageAgency/Listing/Loadable';
import DeveloperList from '../containers/HomePageDeveloper/Listing/Loadable';
import FeaturedList from '../containers/FeaturedProperty/Listing/Loadable';

import ResourcePage from '../containers/ResourcePage/Loadable';
import AgentPage from '../containers/AgentPage/Loadable';
import DirectoryList from '../containers/HomeComponents/DirectoryList';
import Static from '../containers/StaticPages/static';

const publicRoutes = [
  {
    exact: true,
    path: '/',
    component: HomePage,
  },
  {
    exact: true,
    path: '/home',
    component: HomePage,
  },
  {
    exact: true,
    path: '/verify/:email/:code',
    component: VerifyEmail,
  },
  {
    exact: true,
    path: '/verify/:email',
    component: VerifyEmail,
  },
  {
    exact: true,
    path: '/editor-file-select',
    component: EditorFileSelectPage,
  },
  {
    exact: true,
    path: '/login-admin',
    component: LoginAdminPage,
  },
  {
    exact: true,
    path: '/login-user',
    component: LoginUserPage,
  },
  {
    exact: true,
    path: '/signup-user',
    component: SignupUserPage,
  },
  {
    exact: true,
    path: '/forgot-password-user',
    component: ForgotPasswordUserPage,
  },
  {
    exact: false,
    path: '/events',
    component: EventsPage,
  },
  {
    exact: true,
    path: '/reset-password/:email/:code',
    component: ResetPasswordPage,
  },
  {
    exact: true,
    path: '/reset-password/:email',
    component: ResetPasswordPage,
  },
  {
    exact: true,
    path: '/faq',
    component: FaqPage,
  },
  {
    exact: false,
    path: '/news',
    component: BlogPages,
  },
  {
    exact: true,
    path: '/contact',
    component: ContactUsPage,
  },
  {
    exact: true,
    path: '/about-us/mobile',
    component: AboutUsPage,
  },
  {
    exact: true,
    path: '/about-us',
    component: AboutUsPage,
  },
  {
    exact: true,
    path: '/term-and-condition',
    render: props => (
      <StaticPage
        contentKey="term-and-condition"
        title="Term And Condiitions - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/term-and-condition/mobile',
    render: props => (
      <StaticPage
        contentKey="term-and-condition"
        title="Term And Condiitions - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/instructions',
    render: props => (
      <StaticPage
        contentKey="instructions"
        title="Instructions - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/privacy-policy',
    render: props => (
      <StaticPage
        contentKey="privacy-policy-content"
        title="Privacy Policy - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/privacy-policy/mobile',
    render: props => (
      <StaticPage
        contentKey="privacy-policy-content"
        title="Privacy Policy - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/data-policy',
    render: props => (
      <StaticPage
        contentKey="data-policy"
        title="Data Policy - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/cookies-policy',
    render: props => (
      <StaticPage
        contentKey="cookies-policy"
        title="Cookies Policy - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/forum-rules',
    render: props => (
      <StaticPage
        contentKey="forum-rules"
        title="Forum Rules - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/listing-policy/mobile',
    render: props => (
      <StaticPage
        contentKey="listing-policy"
        title="Listing Policy - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/listing-policy',
    render: props => (
      <StaticPage
        contentKey="listing-policy"
        title="Listing Policy - Nepal Homes"
        {...props}
      />
    ),
  },
  {
    exact: true,
    path: '/list',
    component: ListPage,
  },

  {
    exact: true,
    path: '/list/:query',
    component: ListPage,
  },

  {
    exact: true,
    path: '/developer/:query',
    component: DeveloperPage,
  },
  {
    exact: true,
    path: '/directory',
    render: props => (
      <ErrorBounty>
        <DirectoryPage />
      </ErrorBounty>
    ),
    // component: DirectoryPage,
  },
  {
    exact: true,
    path: '/home-loan',
    component: HomeLoanPage,
  },
  {
    exact: true,
    path: '/advertise',
    component: AdPage,
  },
  {
    exact: true,
    path: '/buyer-guide',
    component: BuyerPage,
  },
  {
    exact: true,
    path: '/detail/:slug',
    component: PropertyDetail,
  },
  {
    exact: true,
    path: '/property/mobile/:slug',
    component: PropertyDetailMobile,
  },
  {
    exact: true,
    path: '/project/mobile/:slug',
    component: ProjectDetailMobile,
  },
  {
    exact: true,
    path: '/project/:slug',
    component: ProjectDetail,
  },
  {
    exact: true,
    path: '/careers',
    component: Career,
  },
  {
    exact: true,
    path: '/careers/:slug',
    component: CareerDetail,
  },
  {
    exact: true,
    path: '/forum',
    component: Forum,
  },
  {
    exact: true,
    path: '/forum/details/:id',
    component: ForumDetail,
  },
  {
    exact: true,
    path: '/unit-converter',
    component: UnitConverter,
  },
  {
    path: '/forum/add',
    component: ForumDetail,
    exact: true,
  },
  {
    exact: false,
    path: '/properties/wanted',
    component: WantedList,
  },
  {
    exact: false,
    path: '/properties/trending',
    component: TrendingList,
  },
  {
    exact: false,
    path: '/properties/hot',
    component: HotList,
  },
  {
    exact: false,
    path: '/agencies',
    component: AgentList,
  },
  {
    exact: false,
    path: '/developers/all',
    component: DeveloperList,
  },
  {
    exact: false,
    path: '/agent/:id',
    component: AgentPage,
  },
  {
    exact: false,
    path: '/properties/featured',
    component: FeaturedList,
  },
  {
    exact: true,
    path: '/resources',
    component: ResourcePage,
  },
  {
    exact: true,
    path: '/directories',
    component: DirectoryList,
  },
];

export default publicRoutes;
