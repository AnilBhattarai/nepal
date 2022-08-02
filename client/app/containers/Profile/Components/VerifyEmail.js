/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectCode } from '../selectors';
import * as mapDispatchToProps from '../actions';

class VerifyEmail extends React.PureComponent {
  static propTypes = {
    setCodeValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    clearCode: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.clearCode();
  }

  handleChange = name => event => {
    event.persist();
    this.props.setCodeValue({ key: name, value: event.target.value });
  };

  handleVerify = () => {
    this.props.verifyEmailRequest(this.props.code);
  };

  handleResend = () => {
    this.props.resendCodeRequest();
  };

  render() {
    const { code } = this.props;
    return (
      <React.Fragment>
        <h1 className="text-2xl mb-4 font-bold">Enter Code</h1>
        <div className="flex items-center">
          <input
            style={{ maxWidth: '232px' }}
            placeholder="Enter Code"
            className="inputbox mr-2"
            id="code"
            type="text"
            value={code || ''}
            onChange={this.handleChange('code')}
          />
          <button
            className="py-2 px-6 rounded text-sm text-white bg-primary uppercase btn-theme"
            onClick={this.handleVerify}
          >
            Verify
          </button>

          <button
            className="ml-2 py-2 rounded text-secondary text-sm"
            onClick={this.handleResend}
          >
            Resend Verification Code
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({});

const withStyle = withStyles(styles);

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withStyle,
)(VerifyEmail);
