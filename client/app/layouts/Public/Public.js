import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import routes from '../../routes/public';

import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import { makeSelectLocation } from '../../containers/App/selectors';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import StaticContentDiv from '../../components/StaticContentDiv';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route component={NotFoundPage} />
  </Switch>
);

const checkPathname = pathname => {
  switch (pathname) {
    case '/login-admin':
    case '/editor-file-select':
      return false;

    default:
      break;
  }
  return true;
};

const microsites = ['mobile'];

const PublicLayout = ({ location }) => {
  const { pathname } = location;
  const showHeaderAndFooter = checkPathname(pathname);

  const checkSite = microsites.includes(pathname.split('/')[2]);

  return (
    <>
      {showHeaderAndFooter && checkSite === false && <Header />}
      <div className="flex-1 min-h-screen">{switchRoutes}</div>
      {showHeaderAndFooter && checkSite === false && <Footer />}
      <StaticContentDiv contentKey="sticky-banner" />
      <StaticContentDiv contentKey="road-block" />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});
export default connect(mapStateToProps)(PublicLayout);
