/**
 *
 * CK View
 *
 */

import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import Slider from 'react-slick';

import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { IMAGE_BASE } from '../../../containers/App/constants';

const key = 'popUp';

const CKEditorView = props => {
  const { data } = props;

  return (
    <div
      className="mt-2 md:mt-3 lg:mt-4 w-full"
      dangerouslySetInnerHTML={{ __html: data.description }}
    />
  );
};

const mapStateToProps = createStructuredSelector({});

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(CKEditorView);
