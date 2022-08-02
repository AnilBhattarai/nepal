import ProfileRoute from '../containers/Profile';
import PostProperty from '../containers/UserPostProperty';
import PropertyPost from '../containers/Admin/Property/AddEditPage/Loadable';
// import BlogRoute from '../containers/Profile';
// import UserLoginLogs from '../containers/Profile';

const BlogRoute = ProfileRoute;
const UserLoginLogs = ProfileRoute;

const userRoutes = [
  {
    exact: true,
    path: '/post-property',
    component: PropertyPost,
  },
  {
    exact: false,
    path: '/user',
    component: ProfileRoute,
  },
  {
    exact: false,
    path: '/user/blog',
    component: BlogRoute,
  },
  {
    exact: true,
    path: '/user/loginlogs',
    component: UserLoginLogs,
  },
  {
    exact: true,
    path: '/user/comments',
    component: UserLoginLogs,
  },
];

export default userRoutes;
