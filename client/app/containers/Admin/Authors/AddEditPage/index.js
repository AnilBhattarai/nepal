import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import BackIcon from '@material-ui/icons/ArrowBack';
import MailIcon from '@material-ui/icons/Mail';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { IMAGE_BASE } from '../../../App/constants';
import * as mapDispatchToProps from '../actions';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectAuthorData,
  makeSelectErrors,
  makeSelectLoading,
} from '../selectors';

class AddEdit extends React.PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  state = {
    isSecure: false,
    open: false,
    reason: '',
    tempImage: '',
  };

  componentDidMount() {
    // this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.authorDataRequest(this.props.match.params.id);
    }
  }

  handleVerifyAuthor = () => {
    this.props.applyAuthorRequest({
      id: this.props.match.params.id,
      name: this.props.authorData.name,
      email: this.props.authorData.email,
      reason: this.state.reason,
      bio: this.props.authorData.author.bio,
    });
  };

  handleCheckedAuthor = name => event => {
    event.persist();
    this.props.setAuthorValue({
      key: 'is_verified',
      value: event.target.checked,
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeReason = e => {
    this.setState({ reason: e.target.value });
  };
  handleBack = () => {
    this.props.history.goBack();
  };

  handleSocialLink = name => event => {
    event.persist();
    this.props.setSocialLinkValue({ key: name, value: event.target.value });
  };

  handleChange = name => event => {
    event.persist();
    this.props.setAuthorValue({ key: name, value: event.target.value });
  };

  handleAdd = (files, name) => {
    // setNewFile(true);
    const file = files[0];
    this.props.addPhotoRequest({
      id: this.props.match.params.id,
      file: files[0],
    });
    // const reader = new FileReader();
    // reader.addEventListener(
    //   'load',
    //   () => {
    //     this.setState({ tempImage: reader.result });
    //   },
    //   false,
    // );
    // reader.readAsDataURL(file);
    // this.props.addPhotoRequest(files[0]);
  };

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
      authorData,
      loading,
      errors,
    } = this.props;
    const { open, reason } = this.state;

    console.log(this.state.tempImage);
    return loading && loading == true ? (
      <Loading />
    ) : (
      <>
        <Helmet>
          <title>{id ? 'Edit Author' : 'Add Author'}</title>
        </Helmet>

        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <IconButton
              className={`${classes.backbtn} cursor-pointer`}
              onClick={this.handleBack}
              aria-label="Back"
            >
              <BackIcon />
            </IconButton>
            {id ? 'Edit' : 'Add'} Author
          </PageHeader>
        </div>
        <PageContent>
          <div className="pb-2">
            <span className="font-bold text-xl capitalize mr-2">
              {authorData.name}
            </span>
            <span className="text-md">
              ( <MailIcon /> {authorData.email} )
            </span>
          </div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
              Short Bio
            </label>
            <FormControl className="md:w-full">
              <textarea
                className="inputbox"
                rows="5"
                id="bio"
                type="text"
                value={
                  (authorData && authorData.author && authorData.author.bio) ||
                  ''
                }
                onChange={this.handleChange('bio')}
              />
            </FormControl>
          </div>
          <Dropzone onDrop={this.handleAdd}>
            {({ getRootProps, getInputProps }) => (
              <section className="w-48 h-48 ml-10 mt-6 text-primary hover:text-secondary text-center self-start border border-primary hover:border-secondary rounded-lg border-dashed cursor-pointer">
                <div
                  className="focus:outline-none flex items-center h-full"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {authorData.image ? (
                    <div
                      className="h-full w-full"
                      key={authorData.image._id}
                      // className="w-full sm:w-1/3 md:1/4 xl:w-1/5 mr-2 border mb-4 rounded"
                    >
                      <img
                        className="object-cover"
                        src={
                          authorData.image.path
                            ? `${IMAGE_BASE}${authorData.image.path}`
                            : this.state.tempImage
                        }
                        alt="author"
                      />
                    </div>
                  ) : (
                    <div className="text-center w-full">
                      <i className="material-icons text-6xl">image</i>
                      <p className>Choose File or Drag Here</p>
                      <span className="text-sm text-gray-600">
                        (square size preferred)
                      </span>
                    </div>
                  )}
                </div>
              </section>
            )}
          </Dropzone>

          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2 mt-2">
              Social Links
            </label>
            <ul>
              <li>
                {' '}
                <span className="font-bold"> Facebook</span>{' '}
                <input
                  className="inputbox w-1/2"
                  onChange={this.handleSocialLink('fb')}
                  value={authorData.social_link.fb}
                  placeholder="Enter Facebook link"
                />
              </li>
              <li>
                {' '}
                <span className="font-bold"> Twitter</span>{' '}
                <input
                  className="inputbox w-1/2"
                  onChange={this.handleSocialLink('twitter')}
                  value={authorData.social_link.twitter}
                  placeholder="Enter Twitter link"
                />
              </li>
              <li>
                {' '}
                <span className="font-bold"> LinkedIn</span>{' '}
                <input
                  className="inputbox w-1/2"
                  onChange={this.handleSocialLink('linkedIn')}
                  value={authorData.social_link.linkedIn}
                  placeholder="Enter LinkedIn link"
                />
              </li>
            </ul>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="is_verified"
                checked={authorData.author.is_verified || false}
                onChange={this.handleCheckedAuthor('is_verified')}
              />
            }
            label="Is Verified"
          />
          <button
            className="text-white py-2 px-4 rounded mt-4 bg-primary font-bold"
            onClick={this.handleOpen}
          >
            {authorData.author.is_verified ? 'Verify' : 'Unverify'}
          </button>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
          >
            <h2 className="text-2xl font-bold  border-b pl-4">
              Confirm Verification
            </h2>
            {this.props.authorData.author &&
              this.props.authorData.author.is_verified === true && (
                <div className="p-4">
                  Are you sure you want to verify the author?
                </div>
              )}
            {this.props.authorData.author &&
              this.props.authorData.author.is_verified === false && (
                <div className="p-4">
                  Are you sure you want to unverify the author?
                </div>
              )}
            <div className="w-full  pb-4 px-4  border-b">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="grid-vlaue"
              >
                Reason
              </label>
              <textarea
                className="inputbox"
                id="grid-description"
                type="text"
                rows="5"
                value={reason}
                onChange={this.handleChangeReason}
              />
            </div>

            <DialogActions>
              {this.props.authorData.author &&
                this.props.authorData.author.is_verified === true && (
                  <button
                    type="button"
                    className="text-white py-2 px-4 rounded mt-4 w-full bg-primary font-bold"
                    onClick={() => this.handleVerifyAuthor()}
                    color="primary"
                  >
                    Verify
                  </button>
                )}
              {this.props.authorData.author &&
                this.props.authorData.author.is_verified === false && (
                  <button
                    type="button"
                    className="text-white py-2 px-4 rounded mt-4 w-full bg-red-600 font-bold"
                    onClick={() => this.handleVerifyAuthor()}
                    color="primary"
                  >
                    Unverify
                  </button>
                )}
              <button
                type="button"
                className="text-black py-2 px-4 rounded mt-4 w-full bg-gray-300 font-bold"
                onClick={this.handleClose}
                color="primary"
              >
                Cancel
              </button>
            </DialogActions>
          </Dialog>
        </PageContent>
      </>
    );
  }
}

const withReducer = injectReducer({ key: 'adminAuthorsManagePage', reducer });
const withSaga = injectSaga({ key: 'adminAuthorsManagePage', saga });

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  authorData: makeSelectAuthorData(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },

  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
  EyeIcon: { position: 'absolute', right: 12, top: 6 },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AddEdit);
