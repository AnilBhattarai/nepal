import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  makeSelectBlogList,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectHighlight,
  makeSelectShowcase,
  makeSelectShowcaseLoading,
  makeSelectTrending,
  makeSelectHighlightLoading,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import HighLightList from '../components/HighlightList';
import Showcase from '../components/Showcase';
import Trending from '../components/Trending';
import CategoryElement from '../../../components/CategoryElement';
import RecentBlogs from '../components/RecentBlogs2';

import StaticContentDiv from '../../../components/StaticContentDiv';

/* eslint-disable react/prefer-stateless-function */
export class BlogListPage extends React.Component {
  static propTypes = {
    loadBlogListRequest: PropTypes.func.isRequired,
    blogList: PropTypes.object,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadBlogListRequest();
    this.props.loadHighlightRequest();
    this.props.loadShowcaseRequest();
    this.props.loadTrendingRequest();
    this.props.loadRecentBlogsRequest();
  }

  handlePagination = paging => {
    this.props.loadBlogListRequest(paging);
  };

  render() {
    const {
      blogList: { data, page, size, totaldata },
      highlight,
      showcase,
      showcaseLoading,
      trending,
      // loading,
      highlightLoading,
    } = this.props;
    const pagination = { page, size, totaldata };

    return (
      <React.Fragment>
        <Helmet>
          <title>News</title>
        </Helmet>


        <StaticContentDiv contentKey="news-main-top" />

        <HighLightList
          loading={highlightLoading}
          currentBlogs={highlight}
          pagination={pagination}
          handlePagination={this.handlePagination}
        />

        <StaticContentDiv contentKey="news-main-middle-top" />

        <Showcase loading={showcaseLoading} showcase={showcase} />

        <StaticContentDiv contentKey="news-main-middle-bottom" />


        <div className="container mx-auto lg:flex">
          <div className="lg:w-3/4 lg:pr-10">
            <div className="layout-2 no-container no-bg">
              <CategoryElement cat_id="5e589c17b58f1858909b37f8" size={3} />
            </div>
          </div>
          <div className="lg:w-1/4 mt-16 lg:mt-32 headline-only">
            <RecentBlogs />
          </div>
        </div>

        <div className="layout-4 container mx-auto pb-12">
          <CategoryElement cat_id="5e50ef913a2d6e0439d7d310" size={4} />
        </div>
        <div className="layout-4 container mx-auto inverted pb-12">
          <CategoryElement cat_id="5e56b4ad907dbc64dd298a23" size={4} />
        </div>

        <div className="container mx-auto lg:flex pb-12">
          <div className="lg:w-3/4 lg:pr-4">
            <div className="layout-7 no-container item4">
              <CategoryElement cat_id="5d8776d06632a20550bc4916" size={4} />
            </div>
          </div>
          <div className="lg:w-1/4">
            <Trending loading={trending.length === 0} trending={trending} />
          </div>
        </div>

        <div className="layout-4 container mx-auto pb-12">
          <CategoryElement cat_id="5e50ee583a2d6e0439d7d304" size={4} />
        </div>
        <div className="layout-4 container mx-auto pb-12">
          <CategoryElement cat_id="5e50eeb43a2d6e0439d7d307" size={4} />
        </div>
        <div className="layout-4 container mx-auto pb-12">
          <CategoryElement cat_id="5e50ef0c3a2d6e0439d7d30c" size={4} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  blogList: makeSelectBlogList(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  highlight: makeSelectHighlight(),
  showcase: makeSelectShowcase(),
  showcaseLoading: makeSelectShowcaseLoading(),
  trending: makeSelectTrending(),
  highlightLoading: makeSelectHighlightLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(BlogListPage);
