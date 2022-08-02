import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectToken } from '../../App/selectors';
import { makeSelectMessage } from '../selectors';
import * as mapDispatchToProps from '../actions';
import { logoutRequest } from '../../App/actions';

import SideMenu from './SideMenu';
function PageLayout(props) {
  return props.message === 'Session Expired' ? (
    <>
      <div className="p-24 text-center">
        <h2> You Have Been Logged Out </h2>
        <button
          onClick={() => props.logoutRequest()}
          className="underline text-secondary"
          type="button"
        >
          Click here to login again
        </button>
      </div>
    </>
  ) : (
    <div className="container mx-auto">
      <div
        className="flex justify-between"
        key={`staticsidebar-${props.token}`}
      >
        <SideMenu />
        <div className="flex-1 px-8 py-4 border-l">{props.children}</div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  message: makeSelectMessage(),
});

const withConnect = connect(
  mapStateToProps,
  { mapDispatchToProps, logoutRequest },
);

export default compose(withConnect)(PageLayout);
