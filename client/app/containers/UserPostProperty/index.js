/**
 *
 * UserPostProperty
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectDefaultData } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'userPostProperty';

export const UserPostProperty = props => {
  const {} = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return <div>User Post Property form</div>;
};

UserPostProperty.propTypes = {
  defaultActionRequest: PropTypes.func.isRequired,
  defaultData: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  defaultData: makeSelectDefaultData(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(UserPostProperty);
