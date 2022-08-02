import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import CKEditor from 'react-ckeditor-component';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import Helmet from 'react-helmet';
// import moment from 'moment';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import withStyles from '@material-ui/core/styles/withStyles';
// import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardBody from '@material-ui/core/CardContent';
// import CardFooter from '@material-ui/core/CardActions';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
// import { spacing, palette } from '@material-ui/system';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectFeedback,
  makeSelectFeedbackLoading,
  makeSelectFeedbackErrors,
  makeSelectOne,
  makeSelectComplains,
  makeSelectOptions,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
// import AddField from '../../../../components/AddField';
import Input from '../../../components/customComponents/Input';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Loading from '../../../components/Loading';

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

const key = 'listView';
const Feedback = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {
    setFeedbackValue,
    postFeedbackRequest,
    feedback,
    loading,
    errors,
    one,
    complains,
    loadComplainTypeRequest,
    setOptionsValue,
    options,
    clearFeedback,
  } = props;

  // const [options, setOptions] = useState({});

  useEffect(() => {
    loadComplainTypeRequest();
  }, []);
  useEffect(() => {
    setFeedbackValue({ key: 'property_id', value: one._id });
    clearFeedback();
  }, [one._id]);

  const handleChange = name => event => {
    event.persist();
    setFeedbackValue({ key: name, value: event.target.value });
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setFeedbackValue({ key: name, value: event.target.checked });
  };

  const handleListinChange = listing => {
    setFeedbackValue({ key: 'is_listing_correct', value: listing });
  };

  const handleOptionsChange = (name, title) => event => {
    event.persist();
    setOptionsValue({ key: name, value: event.target.checked });

    const index = feedback.reason.indexOf(name);
    if (index >= 0) {
      const chipData = [...feedback.reason];
      chipData.splice(index, 1);
      setFeedbackValue({
        key: 'reason',
        value: chipData,
      });
    } else {
      setFeedbackValue({
        key: 'reason',
        value: [...feedback.reason, name],
      });
    }
  };

  const handleSave = () => {
    postFeedbackRequest();
  };

  return (
    <>
      <div>
        <PageContent>
          {/* <div className="w-full pb-4">
            <div className=" flex flex-wrap justify-center items-center">
              <button
                type="button"
                className={`bg-gray-200 text-sm py-2 px-6 rounded-l-full ${feedback.is_listing_correct &&
                  `bg-green-600 text-green-100`} `}
                onClick={() => handleListinChange(true)}
              >
                YES
              </button>
              <button
                type="button"
                className={`bg-gray-200 text-sm py-2 px-6 rounded-r-full ${!feedback.is_listing_correct &&
                  `bg-red-600 text-red-100`} `}
                onClick={() => handleListinChange(false)}
              >
                NO
              </button>
            </div>
          </div> */}

          {feedback.is_listing_correct && (
            <div className="mt-4">
              <h3 className="text-2xl">Have Feedbacks?</h3>
              <p>We are always open for any kind of feedbacks.</p>
            </div>
          )}

          {!feedback.is_listing_correct && (
            <div className="">
              <div className="mt-4">
                <h3 className="text-2xl">Report Property?</h3>
                <p>Kindly let us know what are the details to report.</p>
              </div>
              <ul>
                {complains &&
                  complains.length > 0 &&
                  complains.map(each => (
                    <li>
                      <label className="flex relative mt-2">
                        <input
                          type="checkbox"
                          className="absolute opacity-0 customCheckbox w-4 h-4"
                          checked={options[each._id] || false}
                          onClick={handleOptionsChange(each._id, each.title)}
                        />
                        <span className="bg-gray-200 border rounded-sm bg-gray-100 w-4 h-4 inline-flex items-center justify-center mr-2 tick">
                          <i className="material-icons opacity-0 text-secondary">
                            check
                          </i>
                        </span>
                        <span className="text-sm">{each.title}</span>
                      </label>
                    </li>
                  ))}
              </ul>
              {errors && errors.reason && (
                <div id="component-error-text">{errors.reason}</div>
              )}
            </div>
          )}

          <div className="mt-4">
            <Input
              label="Email"
              inputclassName="inputbox "
              inputid="email"
              inputType="text"
              value={feedback.email}
              onChange={handleChange('email')}
              error={errors.email}
            />
          </div>
          <div className="mt-4">
            <Input
              label="Mobile No."
              inputclassName="inputbox "
              inputid="mobile_no"
              inputType="text"
              value={feedback.mobile_no}
              onChange={handleChange('mobile_no')}
              error={errors.mobile_no}
            />
          </div>

          <div className="mt-4">
            <label className="font-bold text-gray-700" htmlFor="reasons">
              Remarks
            </label>
            <textarea
              className="inputbox"
              value={feedback.description}
              onChange={handleChange('description')}
            />
            {errors && errors.description && (
              <div id="component-error-text">{errors.description}</div>
            )}
          </div>



          <div>
            <button
              type="button"
              className="text-white py-2 px-4 rounded mt-4 bg-secondary w-full"
              onClick={handleSave}
              disabled={loading}
            >
              {feedback.is_listing_correct && (<span> {loading ? '...' : 'Submit Feedback'}</span>)}
              {!feedback.is_listing_correct && (<span> {loading ? '...' : 'Report Property'}</span>)}
            </button>
          </div>
        </PageContent>
      </div>
    </>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withStyle = withStyles(styles);

const mapStateToProps = createStructuredSelector({
  feedback: makeSelectFeedback(),
  loading: makeSelectFeedbackLoading(),
  errors: makeSelectFeedbackErrors(),
  one: makeSelectOne(),
  complains: makeSelectComplains(),
  options: makeSelectOptions(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withRouter,
  withStyle,
  withConnect,
)(Feedback);
