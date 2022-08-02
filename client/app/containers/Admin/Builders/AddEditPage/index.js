import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectLoading,
  makeSelectErrors,
  makeSelectBuilderData,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import Loading from '../../../../components/Loading';
import MailIcon from '@material-ui/icons/Mail';
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
  };

  componentDidMount() {
    // this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.builderDataRequest(this.props.match.params.id);
    }
  }

  handleVerifyBuilder = () => {
    this.props.applyBuilderRequest({
      id: this.props.match.params.id,
      name: this.props.builderData.name,
      email: this.props.builderData.email,
      reason: this.state.reason,
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

  handleCheckedBuilder = name => event => {
    event.persist();
    this.props.setBuilderValue({
      key: 'is_verified',
      value: event.target.checked,
    });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
      builderData,
      loading,
      errors,
    } = this.props;
    const { open, reason } = this.state;
    return loading && loading == true ? (
      <Loading />
    ) : (
      <>
        <Helmet>
          <title>{id ? 'Edit Builder' : 'Add Builder'}</title>
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
            {id ? 'Edit' : 'Add'} Builder
          </PageHeader>
        </div>
        <PageContent>
          <div className="pb-2">
            <span className="font-bold text-xl capitalize mr-2">
              {builderData.name}
            </span>
            <span className="text-md">
              ( <MailIcon /> {builderData.email} )
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
                  (builderData &&
                    builderData.builder &&
                    builderData.builder.bio) ||
                  ''
                }
                disabled
              />
            </FormControl>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="is_verified"
                checked={builderData.builder.is_verified || false}
                onChange={this.handleCheckedBuilder('is_verified')}
              />
            }
            label="Is Verified"
          />

          <button
            className="text-white py-2 px-4 rounded mt-4 bg-primary font-bold"
            onClick={this.handleOpen}
          >
            Save
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
            {this.props.builderData.builder &&
              this.props.builderData.builder.is_verified === true && (
                <div className="p-4">
                  Are you sure you want to verify the Builder?
                </div>
              )}
            {this.props.builderData.builder &&
              this.props.builderData.builder.is_verified === false && (
                <div className="p-4">
                  Are you sure you want to unverify the Builder?
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
              {this.props.builderData.builder &&
                this.props.builderData.builder.is_verified === true && (
                  <button
                    type="button"
                    className="text-white py-2 px-4 rounded mt-4 w-full bg-primary font-bold"
                    onClick={() => this.handleVerifyBuilder()}
                    color="primary"
                  >
                    Verify
                  </button>
                )}
              {this.props.builderData.builder &&
                this.props.builderData.builder.is_verified === false && (
                  <button
                    type="button"
                    className="text-white py-2 px-4 rounded mt-4 w-full bg-red-600 font-bold"
                    onClick={() => this.handleVerifyBuilder()}
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

const withReducer = injectReducer({ key: 'adminBuildersManagePage', reducer });
const withSaga = injectSaga({ key: 'adminBuildersManagePage', saga });

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  builderData: makeSelectBuilderData(),
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
