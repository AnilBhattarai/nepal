/**
 *
 * Single View
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

const List = props => {
  const { data } = props;

  return (
    <div>
      <img
      className="w-full mt-2 md:mt-3 lg:mt-4"
        src={
          data && data.image && data.image.path
            ? `${IMAGE_BASE}${data.image.path}`
            : ``
        }
      />
      {/* <p className="absolute bottom-0">{data.caption || ''}</p> */}
    </div>
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
)(List);
