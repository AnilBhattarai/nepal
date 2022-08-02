/**
 *
 * Asynchronously loads the component for BlogPage
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import Loading from 'components/Loading';

export const Dashboard = loadable(() => import('./Dashboard'), {
  fallback: <Loading />,
});
export const Informtions = loadable(() => import('./Information'), {
  fallback: <Loading />,
});
export const ChangePasswords = loadable(() => import('./ChangePassword'), {
  fallback: <Loading />,
});
export const ApplyForBuilder = loadable(() => import('./ApplyForBuilder'), {
  fallback: <Loading />,
});
export const ApplyForAuthor = loadable(() => import('./ApplyForAuthor'), {
  fallback: <Loading />,
});
export const ApplyForAgent = loadable(() => import('./ApplyForAgent'), {
  fallback: <Loading />,
});

export const BlogAddEditPage = loadable(() => import('./BlogAddEditPage'), {
  fallback: <Loading />,
});

export const BlogListPage = loadable(() => import('./BlogListPage'), {
  fallback: <Loading />,
});
export const LoginLogs = loadable(() => import('./LoginLogs'), {
  fallback: <Loading />,
});
export const UserLoginLogs = loadable(() => import('./UserLoginLogs'), {
  fallback: <Loading />,
});
export const UserComments = loadable(() => import('./UserComments'), {
  fallback: <Loading />,
});
export const MyProperty = loadable(() => import('./MyProperty'), {
  fallback: <Loading />,
});
export const MyFavorites = loadable(() => import('./MyFavorites'), {
  fallback: <Loading />,
});
export const MyPropertyAdd = loadable(() => import('./MyPropertyAdd'), {
  fallback: <Loading />,
});
export const MyProjects = loadable(() => import('./MyProjects'), {
  fallback: <Loading />,
});
export const MyProjectAdd = loadable(() => import('./MyProjectAdd'), {
  fallback: <Loading />,
});
export const MyRequest = loadable(() => import('./MyRequest'), {
  fallback: <Loading />,
});
export const MyRequestAdd = loadable(() => import('./MyRequestAdd'), {
  fallback: <Loading />,
});
export const VerifyEmail = loadable(() => import('./VerifyEmail'), {
  fallback: <Loading />,
});

export const MyLeads = loadable(() => import('./MyLeads'), {
  fallback: <Loading />,
});

export const MyLeadAdd = loadable(() => import('./MyLeadAdd'), {
  fallback: <Loading />,
});

export const SavedSearches = loadable(() => import('./SavedSearches'), {
  fallback: <Loading />,
});
