import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import StaticContentDiv from '../../components/StaticContentDiv';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectIsRequesting,
  makeSelectSuccess,
  makeSelectErrorMsg,
  makeSelectContactDetail,
} from './selectors';
import * as mapDispatchToProps from './actions';
import { RECAPTCHA_SITE_KEY } from '../App/constants';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Lato', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};
const recaptchaRef = React.createRef();
class ContactUs extends React.Component {
  state = { name: '', email: '', subject: '', message: '', reCaptcha: '' };

  componentDidMount() {
    window.scrollTo(0, 0)
    // this.props.ContactDetailRequest();
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.success !== this.props.success && nextProps.success) {
      this.setState({ name: '', email: '', subject: '', message: '' }, () => {
        window.grecaptcha && window.grecaptcha.reset();
      });
    }
  }

  handleSave = () => {
    this.props.saveContactRequest(this.state);
  };

  onSubmit = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    this.props.onSubmit(recaptchaValue);
  };

  onChange = e => {
    this.setState({
      reCaptcha: e,
    });
  };

  render() {
    const { isRequesting, contactDetail } = this.props;
    const { name, email, subject, message } = this.state;

    return (
      <>
        <Helmet>
          <title>Contact Us</title>
        </Helmet>

        <div className="container">
          <div className="text-sm">
            <div className="">
              <div className="max-w-2xl mx-auto pb-10">
                <h1 className="text-3xl text-center pt-10 uppercase">Contact Us</h1>
                <p className="text-sm text-center">We will get back to you as soon as posible.</p>
                <div className="flex my-6">
                  <div className="w-full md:w-1/2 pr-2">
                    <label>Your Name</label>
                    <input className="inputbox bg-white text-gray-800"
                      id="name"
                      type="name"
                      name="name"
                      value={name}
                      onChange={this.handleChange('name')}
                    />
                  </div>
                  <div className="w-full md:w-1/2  pl-2">
                    <label>Your Email</label>
                    <input className="inputbox bg-white text-gray-800"
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange('email')}
                    />
                  </div>
                </div>
                <label>Subject</label>
                <input className="inputbox bg-white text-gray-800 mb-4"
                  id="subject"
                  type="subject"
                  name="subject"
                  value={subject}
                  onChange={this.handleChange('subject')}
                />
                <label>Your Message</label>
                <textarea className="inputbox bg-white text-gray-800"
                  id="message"
                  multiline
                  rows="4"
                  placeholder="Message"
                  value={message}
                  onChange={this.handleChange('message')}
                />

                <div className="flex justify-between">
                  <div className="md:w-1/2 my-4">
                    {isRequesting && isRequesting == true ? (
                      <CircularProgress color="primary" disableShrink />
                    ) : (
                        <form onSubmit={this.onSubmit}>
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={this.onChange}
                          />
                        </form>
                      )}
                  </div>
                  <div className="md:w-1/2 my-4 text-right">
                    <button
                      type="button"
                      className="text-white py-2 px-4 rounded mt-4 bg-secondary inline-block font-bold"
                      disabled={isRequesting}
                      onClick={this.handleSave}
                    >
                      Send Message
                </button>
                  </div>
                </div>
                <div>
                  <h1>{this.props.error}</h1>
                </div>
              </div>
            </div>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7066.069580993461!2d85.32533357434428!3d27.685319581204077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19bed80297ef%3A0xa88f57446083f344!2sBuddhanagar%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1574074926677!5m2!1sen!2snp" className="w-full" height="450" />

          {/* <StaticContentDiv contentKey="contactdetail" /> */}

        </div>
      </>
    );
  }
}

ContactUs.propTypes = {
  saveContactRequest: PropTypes.func.isRequired,
  ContactDetailRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectIsRequesting(),
  success: makeSelectSuccess(),
  error: makeSelectErrorMsg(),
  contactDetail: makeSelectContactDetail(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'contactUs', reducer });
const withSaga = injectSaga({ key: 'contactUs', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ContactUs);
