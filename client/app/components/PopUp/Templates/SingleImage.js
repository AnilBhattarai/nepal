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
import LinkBoth from '../../../components/LinkBoth';
import { IMAGE_BASE } from '../../../containers/App/constants';
import logo from '../../../assets/img/logo.png';

const key = 'popUp';

const List = props => {
  const { data } = props;

  return (
    <div
      className="absolute"
      style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
    >
      <img className="h-10 mx-auto mb-10" src={logo} />
      <p className="text-center uppercase text-gray-400 text-sm mb-2">
        Advertisement
      </p>
      <LinkBoth to={(data.link && data.link) || '#'}>
        <img
          className="mx-auto max-h-screen max-w-screen"
          src={
            data && data.image && data.image.path
              ? `${IMAGE_BASE}${data.image.path}`
              : ``
          }
        />
        {/* <p className="absolute bottom-0">{data.caption || ''}</p> */}
      </LinkBoth>
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
