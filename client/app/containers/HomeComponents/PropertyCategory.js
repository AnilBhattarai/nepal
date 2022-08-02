/**
 *
 * PropertyCategory
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectPropertyCategory } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { IMAGE_BASE } from '../App/constants';

const key = 'homeComponents';

export const PropertyCategory = props => {
  const { loadPropertyCategoryRequest, category } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadPropertyCategoryRequest();
  }, []);

  return (
    <div className="container mx-auto flex flex-wrap">
      {category && category.length > 0
        ? category.map(each => (
            <Link
              className="w-1/2 sm:w-1/3 lg:w-1/6 p-5 border-r border-gray-100 text-center border-b lg:border-b-0"
              to={`/list/&find_property_category=${each._id}`}
            >
              <img
                src={
                  each.media && each.media.path
                    ? `${IMAGE_BASE}${each.media.path}`
                    : ''
                }
                className="h-12 mx-auto"
                alt={each.title}
              />
              <span className="font-bold text-sm mt-4">{each.title || ''}</span>
              <span className="font-bold text-sm mt-4">{each.count || ''}</span>
            </Link>
          ))
        : ''}
    </div>
  );
};

PropertyCategory.propTypes = {
  loadPropertyCategoryRequest: PropTypes.func.isRequired,
  category: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectPropertyCategory(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(PropertyCategory);
