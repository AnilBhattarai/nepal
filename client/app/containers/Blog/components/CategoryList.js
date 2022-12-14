import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';

import { makeSelectCategory, makeSelectCategoryLoading } from '../selectors';
import { loadCategoryRequest } from '../actions';
import saga from '../saga';

const key = 'blogPage';

/* eslint-disable react/prefer-stateless-function */
const CategoryListingPage = props => {
  useInjectSaga({ key, saga });
  useEffect(() => {
    props.loadCategoryRequest();
  }, []);
  return (
    <div className="flex items-center h-full">
      {props.category.map(each => (
        <div key={each._id} className="pr-8">
          <Link
            className="block py-3 no-underline text-gray-700 hover:text-black whitespace-no-wrap font-mukta text-lg"
            to={`/news/category/${each.slug_url}`}
          >
            {each.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

CategoryListingPage.propTypes = {
  category: PropTypes.array.isRequired,
  loadCategoryRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  loading: makeSelectCategoryLoading(),
});

const mapDispatchToProps = {
  loadCategoryRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryListingPage);
