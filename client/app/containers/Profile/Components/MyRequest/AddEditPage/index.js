import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import 'react-datepicker/dist/react-datepicker.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectPurpose,
  makeSelectCategory,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../../components/PageContent/PageContent';
import Loading from '../../../../../components/Loading';

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

const key = 'myRequest';

const AddEdit = props => {
  const {
    clearErrors,
    loadOneRequest,
    loadPurposeRequest,
    match,
    one,
    classes,
    loading,
    errors,
    setOneValue,
    addEditRequest,
    push,
    purpose,
    category,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadPurposeRequest();
    console.log('From addEdit page', props.match.params.id);
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  console.log('value of one', one);

  // const handleEditorChange = (e, name) => {
  //   const newContent = e.editor.getData();
  //   setOneValue({ key: name, value: newContent });
  // };

  // const handleCheckedChange = name => event => {
  //   event.persist();
  //   setOneValue({ key: name, value: event.target.checked });
  // };

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  // const handleDateChange = name => date => {
  //   setOneValue({
  //     key: name,
  //     value: moment(date).format('YYYY/MM/DD'),
  //   });
  // };

  const handleGoBack = () => {
    push('/user/request');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  return loading && loading === true ? (
    <Loading />
  ) : (
    <>
      {/* <Helmet>
        <title>
          {match && match.params && match.params.id
            ? 'Edit Country'
            : 'Add Country'}
        </title>
      </Helmet> */}
      <div>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <IconButton
              className={`${classes.backbtn} cursor-pointer`}
              onClick={handleGoBack}
              aria-label="Back"
            >
              <BackIcon />
            </IconButton>
            {match && match.params && match.params.id
              ? 'Edit'
              : 'Tell us what you want'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-name"
            >
              Name
            </label>
            <input
              className="inputbox"
              id="grid-name"
              type="text"
              value={one.name}
              onChange={handleChange('name')}
            />
            <div id="component-error-text">{errors.name}</div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="inputbox"
              id="grid-email"
              type="email"
              value={one.email}
              onChange={handleChange('email')}
            />
            <div id="component-error-text">{errors.email}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-name"
            >
              Phone
            </label>
            <input
              className="inputbox"
              id="grid-phone"
              type="text"
              value={one.phone}
              onChange={handleChange('phone')}
            />
            <div id="component-error-text">{errors.phone}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-purpose"
            >
              Purpose
            </label>
            <select
              className="inputbox"
              native="true"
              value={one.purpose}
              onChange={handleChange('purpose')}
              // inputprops={{ value: one.country || '', name: 'country' }}
            >
              <option key="0" name="Choose Purpose" value="0">
                Choose Purpose
              </option>
              {purpose.map(each => (
                <option key={each._id} name={each.tite} value={each._id}>
                  {each.title}
                </option>
              ))}
            </select>
            <div id="component-error-text">{errors.purpose}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-purpose"
            >
              Category
            </label>
            <select
              className="inputbox"
              native="true"
              value={one.category}
              onChange={handleChange('category')}
              // inputprops={{ value: one.country || '', name: 'country' }}
            >
              <option key="0" name="Choose category" value="0">
                Choose category
              </option>
              {category.map(each => (
                <option key={each._id} name={each.tite} value={each._id}>
                  {each.title}
                </option>
              ))}
            </select>
            <div id="component-error-text">{errors.category}</div>
          </div>

          <div className="mt-0 w-full md:w-1/2 ">
            <label className="text-sm" htmlFor="message">
              Message
            </label>
            <textarea
              className="inputbox"
              cols="45"
              rows="5"
              value={one.message}
              maxLength="140"
              onChange={handleChange('message')}
            />
            <div>{one.message.length} / 140</div>
            <div id="component-error-text">{errors.message}</div>
          </div>

          <br />
          <button
            type="button"
            className="text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme"
            onClick={handleSave}
          >
            Request
          </button>
        </PageContent>
      </div>
    </>
  );
};

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  loadPurposeRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  purpose: PropTypes.array.isRequired,
};

const withStyle = withStyles(styles);

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  purpose: makeSelectPurpose(),
  category: makeSelectCategory(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withRouter,
  withStyle,
  // withReducer,
  // withSaga,
  withConnect,
)(AddEdit);
