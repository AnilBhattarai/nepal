/**
 *
 * CategoryElement
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { IMAGE_BASE, DATE_FORMAT } from '../../containers/App/constants';
import * as mapDispatchToProps from '../../containers/App/actions';
import {
  makeSelectLatestBlogs,
  makeSelectBlogLoading,
} from '../../containers/App/selectors';
import Skeleton from './skeleton';
import '../CategoryElement/category.css';
import logo from '../../assets/img/logo-icon-white.png';
import clock from '../../assets/img/clock.svg';

const CategoryElement = props => {
  const { cat_id, latestBlogs, loading, size, push } = props;

  useEffect(() => {
    props.loadLatestBlogsRequest({ key: cat_id, value: size });
  }, [cat_id]);

  let hasCategory =
    (latestBlogs[cat_id] &&
      latestBlogs[cat_id].category &&
      latestBlogs[cat_id].category.title) ||
    false;
  return !hasCategory && loading ? (
    <div className="container mx-auto">
      <div className="flex -mx-4">
        <div className="md:w-1/3 px-4">
          <div className="skeleton h-48 mb-6" />
        </div>
        <div className="md:w-1/3 px-4">
          <div className="skeleton h-48 mb-6" />
        </div>
        <div className="md:w-1/3 px-4">
          <div className="skeleton h-48 mb-6" />
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="mt-10">
        <div className="bg-primary h-14 flex items-center pl-8 mb-6">
          <h2 className="font-mukta font-bold text-3xl text-white my-0">
            {latestBlogs[cat_id] &&
              latestBlogs[cat_id].category &&
              latestBlogs[cat_id].category.title}
          </h2>
          <Link
            className="bg-secondary text-xl w-7 h-7 rounded-full text-white ml-5 relative chevron-right"
            to={`/news/category/${latestBlogs[cat_id] &&
              latestBlogs[cat_id].category &&
              latestBlogs[cat_id].category.slug_url}`}
          >
            <i className="material-icons" style={{ fontSize: 24 }}>
              chevron_right
            </i>
          </Link>
        </div>

        {latestBlogs[cat_id] &&
          latestBlogs[cat_id].blogs &&
          latestBlogs[cat_id].blogs.map((each, index) => (
            <div key={each._id} className="flex py-4">
              <div className="flex-1 mr-7">
                <Link
                  className="no-underline hover:text-secondary text-xl font-mukta block text-gray-700"
                  to={`/news/${moment(each.added_at).format('YYYY/MM/DD')}/${
                    each._id
                  }`}
                  // to={`/news/${each.slug_url}`}
                >
                  {each.title}
                </Link>
                <div className="inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date">
                  <img className="mr-2 clock" src={clock} />
                  {moment(each.published_on).fromNow()}
                </div>
              </div>
              <div className="block overflow-hidden w-24 h-24 article-img-container">
                <Link to={`/news/${each.slug_url}`}>
                  <img
                    src={`${IMAGE_BASE}${each &&
                      each.image &&
                      each.image.path}`}
                    className="object-cover article-img"
                    alt={`${each.title}`}
                  />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

CategoryElement.propTypes = {
  loadLatestBlogsRequest: PropTypes.func.isRequired,
  latestBlogs: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  cat_id: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  latestBlogs: makeSelectLatestBlogs(),
  loading: makeSelectBlogLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(withConnect)(CategoryElement);
