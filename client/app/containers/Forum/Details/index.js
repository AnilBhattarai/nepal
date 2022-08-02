/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookShareCount,
} from 'react-share';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from '../reducer';
import saga from '../saga';

import forum from '../../../assets/img/forum.png';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectAll,
  // makeSelectFileData,
  // makeSelectDetail,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import { makeSelectUser } from '../../App/selectors';

import ForumSkeleton from './forumSkeleton';
import { DATE_FORMAT } from '../../App/constants';
import BlogComments from '../../Comments';

const key = 'forum';

const ForumDetail = props => {
  const {
    one,
    loading,
    loadOneRequest,
    match,
    user,
    setForumData,
    addEditRequest,
    deleteOneRequest,
    push,
    clearOne,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    // if (Object.keys(user).length <= 1) {
    //   push('/signup-user');
    // }
    clearOne();
    if (match.params.id) {
      loadOneRequest(match.params.id);
    } else {
      setEdit(true);
      setAdd(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length <= 0) {
      push('/signup-user');
    }
  }, [user]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };
  const handleSave = () => {
    addEditRequest();
  };

  const handleDelete = id => {
    deleteOneRequest(id);
  };

  const handleChange = (valueKey, e) => {
    setForumData({ key: valueKey, value: e.target.value });
  };

  const url = window.location.href;
  return (
    <>
      {/* <div className="bg-primary">
        <h1 className="text-3xl font-bold py-10 text-center text-white">
          Welcome to NepalHomes Forum
        </h1>
      </div> */}
      <div className="container mx-auto mb-10 py-2">
        <div className="flex justify-between mt-3 mb-3">
          <div className="w-2/5 px-6">
            <div className="bg-ptn p-2 rounded-xl mb-4">
              <div className="bg-white rounded-xl p-1">
                <div className="p-4">
                  <img className="w-48 mx-auto" src={forum} alt="forum" />
                  <p className="text-gray-500 text-lg text-center">
                    Get your questions answered from real estate experts.
                  </p>
                </div>
                {/* <button
                  type="button"
                  className="bg-secondary w-full uppercase rounded-b-lg tracking-widest p-4 text-sm font-bold text-white"
                  // onClick={handleAdd}
                >
                  Ask a Question ?
                </button> */}
              </div>
            </div>

            <div className="bg-ptn p-2 rounded-xl mb-4">
              <div className="h-full flex flex-col justify-between bg-white rounded-xl p-4">
                <h3 className="font-bold text-xl text-primary">
                  FORUM RULES
                </h3>

                <p className="text-xs leading-loose text-gray-800">
                  Dear Forum Members/Visitors,
                  <br />
                  As you may be aware, the Forum regularly plays host to a
                  variety of robust conversations, varied opinions, and
                  passionate discussions centred on Pakistan’s real estate
                  market – all of which are welcome.
                  <br />
                  Open and frank interaction has always figured as an
                  uncompromising hallmark of this platform, and it will remain
                  so.
                  <br />
                  However, we strongly believe that – going forward – we need to
                  introduce a proper set of rules to check the quality of the
                  discussions that are enacted here.
                </p>

                <Link
                  className="text-secondary text-sm py-2 font-bold"
                  to="/forum-rules"
                >
                  READ MORE
                </Link>
              </div>
            </div>
          </div>

          <div className="w-3/5">
            <div className="bg-ptn p-2 rounded-xl mb-4">
              <div className="h-full bg-white rounded-xl p-8">
                {loading ? (
                  <ForumSkeleton />
                ) : (
                    <div className="h-full">
                      <div>
                        {add && (
                          <>
                            <h2 className="text-2xl font-bold uppercase">
                              <i className="material-icons">help</i> Ask Your
                            Question
                          </h2>
                          </>
                        )}

                        {edit ? (
                          <>
                            {user.id == one.added_by._id ? (
                              <h2 className="text-2xl font-bold uppercase">
                                <i className="material-icons">edit</i> Edit Your
                              Question
                              </h2>
                            ) : null}
                            <div className="mt-4">
                              <label htmlFor="title">Title</label>
                              <input
                                className="inputbox"
                                id="title"
                                type="text"
                                value={one.title || ''}
                                // name={props.name || 'name'}
                                onChange={e => handleChange('title', e)}
                              />
                            </div>
                          </>
                        ) : (
                            <>
                              <div
                                className="border rounded bg-white pr-4 py-1 cursor-pointer 
                  hover:border-primary inline-flex items-center text-primary"
                                onClick={() => push('/forum')}
                              >
                                <i className="material-icons mr-1">
                                  keyboard_arrow_left
                            </i>
                            Back
                          </div>
                              <h2 className="capitalize text-4xl mb-2 leading-tight">
                                {one.title}
                              </h2>
                            </>
                          )}

                        {one.added_by && one.added_by.name && one.updated_by && (
                          <div className="inline-block">
                            <span>Updated by {one.updated_by.name}</span>
                            <span>
                              On {moment(one.updated_at).format(DATE_FORMAT)}
                            </span>
                          </div>
                        )}

                        {/* description area */}
                        {edit ? (
                          <>
                            <div className="mt-4">
                              <label htmlFor="description">Description</label>
                              <textarea
                                rows={5}
                                className="inputbox"
                                id="description"
                                type="text"
                                value={one.description || ''}
                                // name={props.name || 'name'}
                                onChange={e => handleChange('description', e)}
                              />
                            </div>
                          </>
                        ) : (
                            <div className="flex">
                              <span>{one.description}</span>
                            </div>
                          )}

                        {add && (
                          <div className="flex justify-between">
                            <button
                              type="button"
                              className="mb-1 py-2 px-6 rounded mt-4 text-sm text-white bg-white border border-red-500 text-red-500 hover:bg-red-200 uppercase btn-theme"
                              onClick={() => push('/forum')}
                            >
                              Cancel
                          </button>
                            <button
                              type="button"
                              className="mr-1 mb-1 py-2 px-6 rounded mt-4 text-sm text-white bg-primary hover:bg-secondary uppercase btn-theme"
                              onClick={handleSave}
                            >
                              Post Question
                          </button>
                          </div>
                        )}

                        {user.id == one.added_by._id &&
                          one.status !== 'approved' ? (
                            edit ? (
                              <div className="flex justify-between">
                                <button
                                  type="button"
                                  className="mb-1 py-2 px-6 rounded mt-4 text-sm text-white bg-white border border-red-500 text-red-500 hover:bg-red-200 uppercase btn-theme"
                                  onClick={() => handleCancel()}
                                >
                                  Cancel
                            </button>

                                <button
                                  type="button"
                                  className="mr-1 mb-1 py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
                                  onClick={handleSave}
                                >
                                  Save
                            </button>
                              </div>
                            ) : (
                                <div className="flex justify-between pt-10">
                                  <button
                                    type="button"
                                    className="mr-1 mb-1 py-1 px-1 rounded mt-4 text-sm text-red-500 bg-white hover:bg-red-200 border border-red-500 uppercase flex items-center"
                                    onClick={() => handleDelete(one._id)}
                                  >
                                    <i className="material-icons text-base mr-2">
                                      delete
                              </i>{' '}
                              Delete
                            </button>

                                  <button
                                    type="button"
                                    className="mr-1 mb-1 py-1 px-1 rounded mt-4 text-sm text-secondary bg-white hover:bg-secondary hover:text-white border border-secondary uppercase flex items-center"
                                    onClick={handleEdit}
                                  >
                                    <i className="material-icons text-base mr-2">
                                      edit
                              </i>{' '}
                              Edit
                            </button>
                                </div>
                              )
                          ) : (
                            ''
                          )}

                        {/* <div className="flex items-center py-4">
          <FacebookShareButton className="ml-2" url={url}>
            <FacebookIcon size={36} round />
          </FacebookShareButton>
          <span
            className="inline-block ml-1 bg-gray-200 
            rounded border w-8 h-8 text-center text-blue-700 leading-relaxed"
          >
            <FacebookShareCount url={url} />
          </span>
          <LinkedinShareButton className="ml-2" url={url}>
            <LinkedinIcon size={36} round />
          </LinkedinShareButton>
          <TwitterShareButton className="ml-2" url={url}>
            <TwitterIcon size={36} round />
          </TwitterShareButton>
          <EmailShareButton className="ml-2" url={url}>
            <EmailIcon size={36} round />
          </EmailShareButton>
          <WhatsappShareButton className="ml-2" url={url}>
            <WhatsappIcon size={36} round />
          </WhatsappShareButton>
        </div> */}
                      </div>
                      <div>
                        {one._id && one.status === 'approved' && (
                          <BlogComments commentFor="forum" id={one._id} />
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ForumDetail.propTypes = {
  one: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadOneRequest: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  deleteOneRequest: PropTypes.func.isRequired,
  setForumData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  user: makeSelectUser(),
});

export default connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
)(ForumDetail);
