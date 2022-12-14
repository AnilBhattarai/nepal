import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRecentBlogsIsLoading,
  makeSelectRecentBlogs,
} from '../selectors';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import RecentBlogsSkeleton from '../Skeleton/RecentBlogs';
import clock from '../../../assets/img/clock.svg';

function RecentBlogs(props) {
  if (props.loading) {
    return <div />;
  }
  return (
    <div className="">
      <div className="bg-primary h-14 flex items-center pl-8">
        <h2 className="font-mukta font-bold text-3xl text-white my-0">
          ताजा अपडेट
        </h2>
      </div>
      {props.blogs.map(blog => (
        <div
          key={`recents-${blog._id}`}
          className="flex py-5  border-b border-gray-300 borderlist"
        >
          <div className="w-2 h-6 flex flex-col mt-1">
            <span className="w-2 h-3 inline-block bg-primary" />
            <span className="w-2 h-3 inline-block bg-secondary" />
          </div>
          <div className="flex-1 px-4">
            <Link
              className="no-underline hover:text-secondary text-xl font-mukta block leading-tight text-gray-800 font-bold md:font-normal"
              to={`/news/${moment(blog.added_at).format('YYYY/MM/DD')}/${
                blog._id
                }`}
            >
              {blog.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

RecentBlogs.propTypes = {
  loading: PropTypes.bool.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectRecentBlogsIsLoading(),
  blogs: makeSelectRecentBlogs(),
});

export default connect(mapStateToProps)(RecentBlogs);
