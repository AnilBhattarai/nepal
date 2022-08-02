import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import 'react-datepicker/dist/react-datepicker.css';
import Dropzone from 'react-dropzone';
import moment from 'moment';

// @material-ui/core components
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { spacing, palette } from '@material-ui/system';

import Grid from '@material-ui/core/Grid';
// import CustomInput from '@material-ui/core/Input';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Input from '../../../components/customComponents/Input';
import reducer from '../reducer';
import saga from '../saga';
import { DATE_FORMAT } from '../../App/constants';

import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectAll,
  makeSelectFileData,
  makeSelectDetail,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import CareerSkeleton from './CareerSkeleton';

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

const AddEdit = props => {
  const {
    all: { data },
    clearErrors,
    loadOneRequest,
    match,
    one,
    detail,
    classes,
    loading,
    push,
    errors,
    setOneValue,
    clearOne,
    fileData,
    deleteMediaSuccess,
  } = props;

  useEffect(() => {
    clearErrors();
    clearOne();
    // console.log(match.params.slug);

    loadOneRequest(match.params.slug);
  }, []);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    push('/careers');
  };

  // const handleSave = () => {
  //   addEditRequest();
  // };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleApply = () => {
    applyRequest();
  };

  const handleAdd = files => {
    // console.log('files', files[0]);
    setOneValue({ key: 'cvFile', value: files[0] });
    // props.addMediaSuccess(files[0]);
  };

  const handleDelete = () => {
    deleteMediaSuccess();
  };

  if (loading) return <CareerSkeleton />;

  return (
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
            {/* {match && match.params && match.params.id
              ? 'Edit career'
              : 'Add career'} */}
            <h2>{detail.job_title}</h2>
          </PageHeader>
        </div>
        <PageContent>
          <p>
            Skills-needed : {detail.skill_requirements} <br />
            Job-Description: {detail.job_descriptions} <br />
            Published Date: {moment(detail.published_on).format(
              DATE_FORMAT,
            )}{' '}
            <br />
            Deadline Date: {moment(detail.deadline_at).format(DATE_FORMAT)}
            <br />
          </p>
          <div>
            <Grid container>
              <Grid item xs={6} sm={6} md={6}>
                <Card>
                  <CardBody>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Input
                          error={errors.name}
                          name="Name"
                          inputId="name"
                          label="Name"
                          value={one.name || ''}
                          onChange={handleChange('name')}
                        />
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Input
                          error={errors.email}
                          name="Email"
                          inputId="email"
                          label="Email"
                          inputType="email"
                          value={one.email || ''}
                          onChange={handleChange('email')}
                        />
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Input
                          error={errors.phone}
                          name="phone"
                          inputId="phone"
                          inputType="phone"
                          label="phone"
                          value={one.phone || ''}
                          onChange={handleChange('phone')}
                        />
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Input
                          error={errors.cover_letter}
                          name="cover_letter"
                          inputId="cover_letter"
                          label="cover_letter"
                          value={one.cover_letter || ''}
                          onChange={handleChange('cover_letter')}
                        />
                      </Grid>
                    </Grid>
                  </CardBody>
                </Card>
              </Grid>
            </Grid>
          </div>

          {/* {loading && loading === true ? <Loading /> : <></>} */}
          <span>
            {' '}
            <h3>Upload CV</h3>
          </span>

          <span>
            {' '}
            <Dropzone onDrop={handleAdd}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Fab
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                    round="true"
                    elevation={0}
                  >
                    <AddIcon />
                  </Fab>
                </div>
              )}
            </Dropzone>{' '}
          </span>

          {errors.cvFile && (
            <div id="component-error-text">{errors.cvFile}</div>
          )}

          {one.cvFile && Object.keys(one.cvFile).length > 0 && (
            <PageContent loading={loading}>
              <div className="flex flex-wrap">
                <div className="w-full sm:w-1/3 md:1/4 xl:w-1/5 mr-2 border mb-4 rounded">
                  <CardContent>
                    <Typography component="p" style={{ minHeight: '30px' }}>
                      {one.cvFile.path}
                      {one.cvFile.size}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </div>
              </div>
            </PageContent>
          )}

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleApply()}
          >
            Apply
          </Button>
          {/* <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-title"
            >
              Title
            </label>
            <input
              className="inputbox"
              id="grid-title"
              type="text"
              value={one.job_title}
              onChange={handleChange('title')}
            />

            <div id="component-error-text">{errors.title}</div>
          </div> */}
          {/* <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-vlaue"
            >
              Value
            </label>
            <input
              className="inputbox"
              id="grid-value"
              type="number"
              value={one.value}
              onChange={handleChange('value')}
            />
            <div id="component-error-text">{errors.value}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-country-code-2"
            >
              Description
            </label>
            <input
              className="inputbox"
              id="grid-description"
              type="text"
              value={one.description}
              onChange={handleChange('description')}
            />
            <div id="component-error-text">{errors.description}</div>
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
          </button> */}
        </PageContent>
      </div>
    </>
  );
};

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  addMediaRequest: PropTypes.func.isRequired,
  deleteMediaRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
  all: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withStyle = withStyles(styles);
const withReducer = injectReducer({ key: 'career', reducer });
const withSaga = injectSaga({ key: 'career', saga });

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  one: makeSelectOne(),
  detail: makeSelectDetail(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  fileData: makeSelectFileData(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
