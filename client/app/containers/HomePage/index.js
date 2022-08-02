/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import StaticContentDiv from '../../components/StaticContentDiv';
import * as mapDispatchToProps from '../Blog/actions';
import RecentBlogs from '../Blog/components/RecentBlogsHome';
import FeaturedProperty from '../FeaturedProperty/Loadable';
import UsefulCollections from '../HomeComponents/Collections';
import DirectorySlider from '../HomeComponents/DirectorySlider';
import PropertyCategory from '../HomeComponents/PropertyCategory';
import Agency from '../HomePageAgency/Loadable';
import Developer from '../HomePageDeveloper/Loadable';
import HomeSearch from '../HomeSearch/Loadable';
import HotProperty from '../HotProperty/Loadable';
import Projects from '../Projects/Loadable';
import RecentProperty from '../RecentProperty/Loadable';
import TrendingProperty from '../TrendingProperty/Loadable';
import WantedProperty from '../WantedProperty/Loadable';
import PopUP from '../../components/PopUp/Loadable';

/* eslint-disable react/prefer-stateless-function */
const HomePage = props => {
  const { loadRecentBlogsRequest } = props;
  useEffect(() => {
    loadRecentBlogsRequest();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Nepal Property Real Estate - Sell Buy Rent Homes and Properties In
          Nepal Real Estate - nepalhomes.com
        </title>
      </Helmet>
      <div className="min-h-screen">
        <PopUP pop_up_key="road-block" />
        <HomeSearch />
        <PropertyCategory />
        <Projects />
        <StaticContentDiv contentKey="homepage-advertise" />
        <HotProperty />
        <FeaturedProperty />
        <StaticContentDiv contentKey="post-property" />
        <RecentProperty />
        <StaticContentDiv contentKey="core-services" />
        {/* <TrendingProperty /> */}
      </div>
      <WantedProperty />
      <UsefulCollections />
      {/* <Developer /> */}
      <Agency />
      {/* <DirectorySlider />
      <StaticContentDiv contentKey="mobile-app" /> */}
      <StaticContentDiv contentKey="explore-tools" />
      <div className="container mx-auto pt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl lg:text-3xl uppercase font-medium">
            News &amp; Articles
          </h2>
          <Link
            to="/news"
            className="w-10 h-10 inline-flex items-center justify-center shadow-lg rounded-full"
          >
            <i className="material-icons text-primary text-lg">chevron_right</i>
          </Link>
        </div>
        <div className="layout-1 layout-1-extend notitle mt-12">
          <RecentBlogs />
        </div>
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(HomePage);
