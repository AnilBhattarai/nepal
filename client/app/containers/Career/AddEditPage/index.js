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
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardBody from '@material-ui/core/CardContent';
import CardFooter from '@material-ui/core/CardActions';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { spacing, palette } from '@material-ui/system';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
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

const key = 'career';

const AddEdit = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {
    clearErrors,
    loadOneRequest,
    match,
    one,
    classes,
    loading,
    errors,
    setOneValue,
    addEditRequest,
  } = props;

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    push('/admin/career');
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
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Job_title
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.job_title}
              onChange={handleChange('job_title')}
            />
            <div id="component-error-text">{errors.job_title}</div>
          </div>

          <FormControlLabel
            control={
              <Checkbox
                checked={one.is_active || false}
                tabIndex={-1}
                onClick={handleCheckedChange('is_active')}
                color="primary"
              />
            }
            label="Is Active"
          />

          <br />
          <button
            type="button"
            className="text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme"
            onClick={handleSave}
          >
            Save
          </button>
        </PageContent>
      </div>
    </>
  );
};

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withStyle = withStyles(styles);

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withRouter,
  withStyle,
  withConnect,
)(AddEdit);
