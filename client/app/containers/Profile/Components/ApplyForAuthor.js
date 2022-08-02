/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import moment from 'moment';

// @material-ui/core
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

// core components
import {
  makeSelectAuthorData,
  makeSelectLoading,
  makeSelectOne,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import Loading from '../../../components/Loading';
import Loader from '../../../assets/img/loader.svg';
import { makeSelectUser } from '../../App/selectors';
import { DATE_FORMAT } from '../../App/constants';

class ApplyForAuthor extends React.PureComponent {
  static propTypes = {
    applyAuthorRequest: PropTypes.func.isRequired,
    authorDataRequest: PropTypes.func.isRequired,
    setAuthorValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    errors: PropTypes.object,
    authorData: PropTypes.object,
  };

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.authorDataRequest();
  }

  handleChangeBio = event => {
    this.props.setAuthorValue({ key: 'bio', value: event.target.value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleApply = () => {
    this.setState({ open: false });
    this.props.applyAuthorRequest();
  };

  render() {
    const { errors, authorData, loading, currentUser, one } = this.props;
    const { open } = this.state;
    if (currentUser.email_verified === false) {
      return (
        <>
          <Helmet>
            <title>Author</title>
          </Helmet>
          <h1 className="text-2xl font-bold mb-4">Author </h1>
          <div className="border-red-500 border text-red-600 font-bold bg-red-100 px-4 py-2 mt-10 rounded">
            Verify email first!
          </div>
        </>
      );
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>Author</title>
        </Helmet>
        <h1 className="text-2xl font-bold mb-4">
          Author{' '}
          {authorData && authorData.is_verified === true && (
            <div className="mb-4 inline-flex items-center bg-teal-200 border border-teal-400 px-2 py-1 rounded-full text-teal-600 text-sm ml-2 leading-none">
              <i className="material-icons mr-1 text-sm">verified_user</i>
              verified
            </div>
          )}
        </h1>
        {authorData && authorData.is_verified === true && (
          <div>
            <h1 className="text-2xl font-bold mt-4">Bio</h1>
            {authorData.bio && authorData.bio}
            <h1 className="text-2xl font-bold mt-4">Verified at</h1>
            {authorData.verified_at &&
              moment(authorData.verified_at).format(DATE_FORMAT)}
            {one && one.social_link && one.social_link.fb !== '' && (
              <>
                <h1 className="text-2xl font-bold mt-4">Facebook</h1>
                <a href={one.social_link.fb} target="_blank">
                  {one.social_link.fb}
                </a>
              </>
            )}
            {one && one.social_link && one.social_link.twitter !== '' && (
              <>
                <h1 className="text-2xl font-bold mt-4">Twitter</h1>
                <a href={one.social_link.twitter} target="_blank">
                  {one.social_link.twitter}
                </a>
              </>
            )}

            {one && one.social_link && one.social_link.linkedIn !== '' && (
              <>
                <h1 className="text-2xl font-bold mt-4">LinkedIn</h1>
                <a href={one.social_link.linkedIn} target="_blank">
                  {one.social_link.linkedIn}
                </a>
              </>
            )}
          </div>
        )}
        {loading && loading === true ? <Loading /> : <></>}
        {loading && loading === true ? (
          <img src={Loader} style={{ width: '100px' }} alt="loading" />
        ) : (
          <>
            {authorData && authorData.is_verified === false && (
              <>
                <div className="w-full pb-4">
                  <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                    Short Bio
                  </label>
                  <FormControl
                    className="md:w-1/2"
                    // error={errors && errors.bio && errors.bio.length > 0}
                  >
                    <textarea
                      className="inputbox"
                      id="bio"
                      type="text"
                      rows="5"
                      value={authorData.bio || ''}
                      onChange={this.handleChangeBio}
                    />
                    {/* <FormHelperText id="component-error-text">
              {errors && errors.bio}
            </FormHelperText> */}
                  </FormControl>
                </div>
                <button
                  type="button"
                  className="text-white py-2 px-4 rounded mt-4 w-1/2 bg-primary font-bold"
                  onClick={this.handleOpen}
                >
                  Apply For Author
                </button>
              </>
            )}

            <Dialog
              open={open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              maxWidth="sm"
            >
              <div className="p-4 border-b">
                Are you sure you want to apply for Author?
              </div>
              <DialogActions>
                <button
                  className="text-white py-2 px-4 rounded mt-4 w-full bg-primary font-bold"
                  onClick={() => this.handleApply()}
                  color="primary"
                >
                  Apply
                </button>
                <button
                  className="text-red-500 border border-red-500 py-2 px-4 rounded mt-4 w-full bg-white font-bold"
                  onClick={this.handleClose}
                  color="primary"
                >
                  Cancel
                </button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authorData: makeSelectAuthorData(),
  loading: makeSelectLoading(),
  currentUser: makeSelectUser(),
  one: makeSelectOne(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(withConnect)(ApplyForAuthor);
