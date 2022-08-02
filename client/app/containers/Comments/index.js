/**
 *
 * Comments
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';

// @material
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/ModeComment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectComment,
  makeSelectCommentLoading,
  makeSelectOne,
  makeSelectReplyRequesting,
  makeSelectOwnComment,
  makeSelectCommentPostLoading,
} from './selectors';
import { makeSelectUser, makeSelectToken } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { DATE_FORMAT } from '../App/constants';
import avatar from '../../assets/img/user.svg';
import DeleteDialog from '../../components/DeleteDialog';

const key = 'comments';

export const Comments = props => {
  const {
    commentLoading,
    commentPostLoading,
    comments,
    one,
    // blog_id,
    user,
    isOpen,
    isClose,
    owner,
    replyReq,
    commentFor,
    ownComments,
    setOneValue,
    id,
    push,
    token,
    loadMyCommentRequest,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.clearOne();
    if (id !== undefined) {
      props.loadOwnCommentRequest({ key: commentFor, id });
    }
    if (id && token) {
      // all approved comment
      props.loadCommentRequest({ key: commentFor, id });
      // my all !approved comment
      // props.loadOwnCommentRequest({ key: commentFor, id });
    }
  }, [id]);

  useEffect(() => {
    if (!replyReq) {
      setIsReply(false);
    }
  }, [replyReq]);

  const [open, setOpen] = useState(false);
  const [delOpen, setdelOpen] = useState(false);
  const [deleteId, setdeleteId] = useState('');
  const [isReply, setIsReply] = useState(false);
  const [reply, setReply] = useState('');
  const [replyCommentId, setReplyCommentId] = useState('');

  const handleComment = name => e => {
    e.persist();
    props.setOneValue({ key: name, value: e.target.value });
  };

  // post comment
  const handlePostComment = () => {
    props.postCommentRequest({ key: commentFor, id });
    setOpen(false);
  };

  // edit post comment
  const handleEditComment = _id => {
    loadMyCommentRequest({ key: commentFor, id });
    setOpen(false);
    props.clearOne();
    // push(`/forum/details/${_id}`);
  };

  const handleClose = () => {
    setOpen(false);
    props.clearOne();
  };

  const handleDelOpen = id => {
    setdelOpen(true);
    setdeleteId(id);
  };

  const handledelClose = () => {
    setdelOpen(false);
  };

  const handleDeleteComment = id => {
    props.deleteCommentRequest(id);
    setdelOpen(false);
  };

  const handleIsReply = id => {
    setIsReply(true);
    setReplyCommentId(id);
  };

  const handleReply = e => {
    setReply(e.target.value);
  };
  const handleEdit = (value, myId) => {
    setOneValue({ key: 'title', value });
    setOneValue({ key: '_id', value: myId });
    // console.log(value, 'value');
    setOpen(true);
  };

  const closeReply = () => {
    setIsReply(false);
  };

  const handleReplyComment = () => {
    props.replyCommentRequest({ comment_id: replyCommentId, value: reply });
  };

  const redirectToLogin = () => {
    push(`/signup-user`, {
      from: {
        pathname: window.location.pathname,
      },
    });
  };
  return commentLoading ? (
    <div>Loading....</div>
  ) : (
      <div className="">
        <h2 className="font-bold text-sm mb-2 text-2xl font-bold">
          Comments
        {/* ({comments && comments.totaldata}) */}
        </h2>
        <DeleteDialog
          open={delOpen}
          doClose={handledelClose}
          doDelete={() => handleDeleteComment(deleteId)}
        />
        {user && user.id ? (
          <div className="relative">
            <textarea
              className="appearance-none w-full outline-none resize-none mt-2 p-4 relative rounded pb-10 border border-gray-300 mb-10"
              name="comment"
              id="comments"
              rows="3"
              placeholder="write comment..."
              value={open ? '' : one.title}
              onChange={handleComment('title')}
            />
            {/* forum comment handler */}
            <button
              type="button"
              disabled={commentPostLoading}
              className="text-secondary uppercase text-sm tracking-widest absolute left-0 bottom-0 py-2 mx-2 flex items-center"
              onClick={handlePostComment}
            >
              POST COMMENT <i className="material-icons ml-2">send</i>
            </button>
          </div>
        ) : (
            <div
              className="bg-gray-100 border text-sm border-gray-300 rounded mt-4 px-4 py-2 flex hover:shadow-lg ease-in-out cursor-pointer loginlink hide-mobile"
              onClick={redirectToLogin}
            >
              Please Login to Post Comment
            </div>
          )}

        {/* The given code right below is for comments which are not approved */}
        {ownComments &&
          ownComments.data &&
          ownComments.data.comment.map(each => (
            <div key={each._id}>
              <div className="flex py-4 border-b border-dotted sans-serif">
                <img src={avatar} alt="" className="opacity-25 w-10 h-10" />
                <div className="pl-4 flex-1">
                  <div className="flex">
                    <div className="w-1/2">
                      <h5 className="text-sm font-bold">
                        {typeof each.added_by === 'string' &&
                          each.added_by === user.id
                          ? user.name
                          : each.added_by.name}
                      </h5>
                      <span className="text-xs">
                        {moment(each.added_at).format(DATE_FORMAT)}{' '}
                      </span>
                    </div>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="comment-edit-dialog"
                    >
                      <DialogTitle id="comment-edit-dialog">
                        <div>
                          <textarea
                            name="edit-comment"
                            id="edit_comment"
                            cols="45"
                            rows="5"
                            value={one.title}
                            onChange={handleComment('title')}
                          />
                          {/* comment edit save button */}
                          <button
                            type="button"
                            className="py-2 px-6 rounded mt-4 text-sm text-blue bg-primary uppercase btn-theme"
                            onClick={() => handleEditComment(one._id)}
                          >
                            Save
                        </button>
                        </div>
                      </DialogTitle>
                    </Dialog>
                    <Dialog
                      open={isReply}
                      onClose={closeReply}
                      aria-labelledby="reply-comment-dialog"
                    >
                      <DialogTitle>
                        <div className="mt-2 p-4 shadow relative rounded pb-10 border border-gray-500 mb-10">
                          <textarea
                            className="appearance-none w-full outline-none resize-none"
                            name="reply"
                            id="reply"
                            rows="5"
                            placeholder={`Reply to ${each.added_by.name}`}
                            value={reply}
                            onChange={handleReply}
                          />
                        </div>
                      </DialogTitle>
                      {/* <DialogActions>
                      <Button onClick={closeReply} color="secondary">
                        Cancel
                      </Button>
                        <Button onClick={handleReplyComment} color="primary">
                          Reply
                      </Button>
                    </DialogActions> */}
                    </Dialog>
                    <div className="w-1/2 text-right">
                      {/* {owner === user.id && !each.reply ? (
                      <button
                        type="button"
                        className="text-blue-500"
                        onClick={() => handleIsReply(each._id)}
                      >
                        Reply
                      </button>
                    ) : (
                      ''
                    )} */}
                      {/* {(typeof each.added_by === 'string' &&
                each.added_by === user.id) ||
              each.added_by._id === user.id ? ( */}

                      {// each.status !== 'approved' &&
                        each.added_by._id === user.id ? (
                          // &&
                          // each.is_deleted === 'false'
                          <>
                            <h2>Comment waiting to get verified</h2>
                            <button
                              type="button"
                              className="px-2"
                              onClick={() => handleEdit(each.title, each._id)}
                            >
                              <i className="material-icons text-blue-500 hover:text-blue-700">
                                edit
                          </i>
                            </button>
                            <button
                              type="button"
                              className="px-2"
                              onClick={() => handleDelOpen(each._id)}
                            >
                              <i className="material-icons text-red-500 hover:text-red-700">
                                delete
                          </i>
                            </button>
                          </>
                        ) : (
                            ''
                          )}
                    </div>
                  </div>
                  {/* title here */}
                  <p className="italic mb-2">{each.title}</p>
                  {/* {each.reply && (
                  <div className="ml-6">
                    {each.reply.title}{' '}
                    <span className="text-gray-700 text-sm">
                      {each.reply.added_by.name || 'You'}
                    </span>
                  </div>
                )} */}
                </div>
              </div>
            </div>
          ))}

        {/* Below is the comment data mapping section */}
        {comments &&
          comments.comment &&
          comments.comment.map(each => (
            <div key={each._id}>
              <div className="flex py-4 border-b border-dotted sans-serif">
                <img src={avatar} alt="" className="opacity-25 w-10 h-10" />
                <div className="pl-4 flex-1">
                  <div className="flex">
                    <div className="w-1/2">
                      <h5 className="text-sm font-bold">
                        {typeof each.added_by === 'string' &&
                          each.added_by === user.id
                          ? user.name
                          : each.added_by.name}
                      </h5>
                      <span className="text-xs">
                        {moment(each.added_at).format(DATE_FORMAT)}{' '}
                      </span>
                    </div>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="comment-edit-dialog"
                    >
                      <DialogTitle id="comment-edit-dialog">
                        <div>
                          <textarea
                            name="edit-comment"
                            id="edit_comment"
                            cols="45"
                            rows="5"
                            value={one.title}
                            onChange={handleComment('title')}
                          />
                          {/* comment edit save button */}
                          <button
                            type="button"
                            className="py-2 px-6 rounded mt-4 text-sm text-blue bg-primary uppercase btn-theme"
                            onClick={handleEditComment}
                          >
                            Save
                        </button>
                        </div>
                      </DialogTitle>
                    </Dialog>
                    <Dialog
                      open={isReply}
                      onClose={closeReply}
                      aria-labelledby="reply-comment-dialog"
                    >
                      <DialogTitle>
                        <div className="mt-2 p-4 shadow relative rounded pb-10 border border-gray-500 mb-10">
                          <textarea
                            className="appearance-none w-full outline-none resize-none"
                            name="reply"
                            id="reply"
                            rows="5"
                            placeholder={`Reply to ${each.added_by.name}`}
                            value={reply}
                            onChange={handleReply}
                          />
                        </div>
                      </DialogTitle>
                      {/* <DialogActions>
                      <Button onClick={closeReply} color="secondary">
                        Cancel
                      </Button>
                        <Button onClick={handleReplyComment} color="primary">
                          Reply
                      </Button>
                    </DialogActions> */}
                    </Dialog>
                    <div className="w-1/2 text-right">
                      {/* {owner === user.id && !each.reply ? (
                      <button
                        type="button"
                        className="text-blue-500"
                        onClick={() => handleIsReply(each._id)}
                      >
                        Reply
                      </button>
                    ) : (
                      ''
                    )} */}
                      {/* {(typeof each.added_by === 'string' &&
                      each.added_by === user.id) ||
                    each.added_by._id === user.id ? ( */}

                      {each.status !== 'approved' &&
                        each.added_by._id === user.id &&
                        each.is_deleted === 'false' ? (
                          <>
                            <h2>Comment waiting to get verified</h2>
                            <button
                              type="button"
                              className="px-2"
                              onClick={() => handleEdit(each.title, each._id)}
                            >
                              <i className="material-icons text-blue-500 hover:text-blue-700">
                                edit
                          </i>
                            </button>
                            <button
                              type="button"
                              className="px-2"
                              onClick={() => handleDelOpen(each._id)}
                            >
                              <i className="material-icons text-red-500 hover:text-red-700">
                                delete
                          </i>
                            </button>
                          </>
                        ) : (
                          ''
                        )}
                    </div>
                  </div>
                  {/* title here */}
                  <p className="italic mb-2">{each.title}</p>
                  {each.reply && (
                    <div className="ml-6">
                      {each.reply.title}{' '}
                      <span className="text-gray-700 text-sm">
                        {each.reply.added_by.name || 'You'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        {/* {!comments.comment.length ? (
          <div className="bg-gray-100 border text-sm border-gray-300 rounded mt-4 px-4 py-2 flex ">
            Nobody has commented yet. Be the first commenter!
        </div>
        ) : null} */}
      </div>
    );
};

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  commentLoading: PropTypes.bool.isRequired,
  ownComments: PropTypes.object.isRequired,
  commentFor: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  setOneValue: PropTypes.func.isRequired,
  postCommentRequest: PropTypes.func.isRequired,
  // loadOneRequest: PropTypes.func.isRequired,
  loadCommentRequest: PropTypes.func.isRequired,
  clearOne: PropTypes.func.isRequired,
  deleteCommentRequest: PropTypes.func.isRequired,
  loadMyCommentRequest: PropTypes.func.isRequired,
  loadOwnCommentRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComment(),
  one: makeSelectOne(),
  commentLoading: makeSelectCommentLoading(),
  commentPostLoading: makeSelectCommentPostLoading(),
  user: makeSelectUser(),
  replyReq: makeSelectReplyRequesting(),
  ownComments: makeSelectOwnComment(),
  token: makeSelectToken(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(withConnect)(Comments);
