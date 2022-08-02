/**
 *
 * PushNotifications
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
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
import MailIcon from '@material-ui/icons/Mail';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectLoading,
  makeSelectUsers,
  makeSelectNotification,
  makeSelectErrors,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Loading from '../../../components/Loading';

import Input from '../../../components/customComponents/Input';

const key = 'pushNotifications';

export const PushNotifications = props => {
  const {
    users,
    notification,
    loading,
    loadUserRequest,
    sendNotificationRequest,
    setNotificationValue,
    errors,
  } = props;

  useEffect(() => {
    loadUserRequest();
  }, []);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleChange = name => event => {
    event.persist();
    setNotificationValue({ key: name, value: event.target.value });
  };

  const handleSend = () => {
    sendNotificationRequest();
  };

  return (
    <>
      <Helmet>
        <title>Push Notifications Send</title>
      </Helmet>
      <div>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>Send Push Notification</PageHeader>
        </div>
        <PageContent loading={loading}>
          <div className="w-full md:w-1/2 pb-4">
            <select
              className="inputbox"
              value={notification.user_id}
              onChange={handleChange('user_id')}
            >
              <option value="all"> Send To All </option>
              {users.length > 0 &&
                users.map(each => (
                  <option value={each.user_id}> {each._id} </option>
                ))}
            </select>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="Title"
              inputclassName="inputbox"
              inputid="grid-title"
              inputType="text"
              value={notification.title}
              onChange={handleChange('title')}
              error={errors.title && errors.title}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-country-code-2"
            >
              Body
            </label>
            <textarea
              className="inputbox"
              id="grid-description"
              type="text"
              value={notification.body}
              onChange={handleChange('body')}
            />
            <div id="component-error-text">{errors.body && errors.body}</div>
          </div>

          <button
            type="button"
            className="text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme"
            onClick={handleSend}
          >
            Send Notification
          </button>
        </PageContent>
      </div>
    </>
  );
};

const styles = {
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
};

PushNotifications.propTypes = {
  loadUserRequest: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  notification: makeSelectNotification(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withStyle = withStyles(styles);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withStyle,
  memo,
)(PushNotifications);
