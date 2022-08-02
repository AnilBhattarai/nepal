/**
 *
 * OwnComments
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from '../actions';
import { makeSelectOwnComment, makeSelectCommentLoading } from '../selectors';
import { makeSelectUser } from '../../App/selectors';
import reducer from '../reducer';
import saga from '../saga';
import avatar from '../../../assets/img/user.svg';

const key = 'comments';

export const OwnComments = props => {
  const { commentLoading, ownComments, user } = props;
  // console.log(ownComments, 'owncojnc');

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.loadOwnCommentRequest();
  }, []);

  return commentLoading ? (
    <>
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      <div>Loading....</div>
    </>
  ) : (
    <div>
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      {ownComments &&
        ownComments.data &&
        ownComments.data.map(each => (
          <div key={each._id}>
            <div className="flex">
              <div className="w-1/3">
                <Link to={`/news/${each.blog_id.slug_url}#${each._id}`}>
                  <h2>{each.blog_id.title}</h2>
                </Link>
              </div>
              <div className="w-2/3">
                <div className="flex py-4 border-b border-dotted sans-serif">
                  <img src={avatar} alt="" className="opacity-25 w-10 h-10" />
                  <div className="pl-4 flex-1">
                    <div className="flex">
                      <div className="w-1/2">
                        <Link to="/user/profile">
                          <h5 className="text-sm font-bold">
                            {typeof each.added_by === 'string' &&
                            each.added_by === user.id
                              ? user.name
                              : each.added_by.name}
                          </h5>
                        </Link>
                        <span className="text-xs">
                          {moment(each.added_at).format('ll')}{' '}
                        </span>
                      </div>
                    </div>
                    <a href={`/news/${each.blog_id.slug_url}`}>
                      <p>{each.title}</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

OwnComments.propTypes = {
  ownComments: PropTypes.object.isRequired,
  commentLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ownComments: makeSelectOwnComment(),
  commentLoading: makeSelectCommentLoading(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(withConnect)(OwnComments);
