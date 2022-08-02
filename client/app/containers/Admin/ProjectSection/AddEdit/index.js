import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Paper, Chip } from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectSearchResult,
  makeSelectProjectLoading,
  makeSelectTempProjects,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import { IMAGE_BASE, DATE_FORMAT } from '../../../App/constants';
import OpenWithIcon from '@material-ui/icons/OpenWith';

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

const DragHandle = SortableHandle(() => (
  <span className="hover:shadow-lg ease-in-out cursor-move mr-2">
    <OpenWithIcon />
  </span>
));

const SortableItem = SortableElement(({ value }) => (
  <div className="w-full sm:w-1/3 md:1/4 xl:w-1/5 mr-2 border mb-4 rounded">
    {value}
  </div>
));

const SortableList = SortableContainer(
  ({
    properties,
    handleStartDateChange,
    handleDelete,
    handleEndDateChange,
    errors,
  }) => {
    return (
      <div className="w-full flex flex-wrap">
        {properties.map((property, index) => (
          <SortableItem
            key={property.id.property_id}
            index={index}
            value={
              <>
                <div>
                  <img
                    className="w-full object-cover h-32"
                    src={`${IMAGE_BASE}${property.id.media.images[0].id.path}`}
                    alt="property"
                  />
                </div>

                <CardContent>
                  <Typography component="p" style={{ minHeight: '40px' }}>
                    {'Property id:'} {property.id.property_id} <br />
                    {/* Price: Rs.{' '}
                    {property.id.price ? property.id.price.value : ''} */}
                  </Typography>
                  {/* <FormControlLabel
                        control={
                          <Checkbox
                            checked={isDate}
                            tabIndex={-1}
                            onClick={handleIsDateChange('is_Date')}
                            color="primary"
                          />
                        }
                        label="Add Date?"
                      />
                      {isDate === true ? ( */}
                  {/* <div className="w-full">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Start date"
                    >
                      Start date:
                    </label>
                    <input
                      className="inputbox"
                      id="start_date"
                      type="date"
                      // value={
                      //   (property.start_date &&
                      //     moment(property.start_date)) ||
                      //   moment(Date.now())
                      // }
                      value={moment(property.start_date).format('YYYY-MM-DD')}
                      name="start_date"
                      onChange={handleStartDateChange(index)}
                    />
                  </div> */}
                  {/* <div className="w-full">
                    <label
                      className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                      htmlFor="Start date"
                    >
                      End date:
                    </label>
                    <input
                      className="inputbox"
                      id="end_date"
                      type="date"
                      // value={
                      //   (property.end_date &&
                      //     moment(property.end_date)) ||
                      //   moment(Date.now())
                      // }
                      value={moment(property.end_date).format('YYYY-MM-DD')}
                      name="end_date"
                      onChange={handleEndDateChange(index)}
                    />
                  </div> */}
                  <DragHandle />
                  {/* ) : (
                        ''
                      )} */}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleDelete(index)}
                  >
                    REMOVE
                  </Button>
                </CardActions>
              </>
            }
          />
        ))}
      </div>
    );
  },
);

const key = 'propertySection';

const AddEdit = props => {
  const {
    clearErrors,
    loadOneRequest,
    loadPropertyRequest,
    match,
    one,
    classes,
    loading,
    errors,
    setOneValue,
    addEditRequest,
    setPropertiesValue,
    tempProjects,
    projectLoading,
    searchResults,
    push,
    setStartDate,
    setEndDate,
  } = props;

  const [isDate, setIsDate] = React.useState(false);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  const handleDelete = index => () => {
    const chipData = [...one.properties];

    chipData.splice(index, 1);
    setOneValue({ key: 'properties', value: chipData });
  };

  const handleTempProperties = e => {
    e.persist();
    setPropertiesValue(e.target.value);
  };

  const insertProperties = event => {
    event.preventDefault();
    let found = false;

    one.properties.map(each => {
      const pid = each.id.property_id;
      // pid == tempProjects ? (found = true) : null;
      if (pid === parseInt(tempProjects, 10)) {
        found = true;
      } else {
        return null;
      }
    });

    if (one.properties.indexOf(tempProjects) === -1 && found === false) {
      // setOneValue({
      //   key: 'properties',
      //   value: [...one.properties, tempProjects],
      // });
      loadPropertyRequest(tempProjects);
      setPropertiesValue('');
    }
    return { tempProjects: setPropertiesValue('') };
  };

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newImage = arrayMove(one.properties, oldIndex, newIndex);
    // setOneValue({ key: 'image', value: newImage });
    setOneValue({
      key: 'properties',
      value: newImage,
    });
  };

  // const handleCaptionChange = index => e => {
  //   console.log('value from handleCaptionChange', e.target.value, index);
  //   props.setCaption({ index, value: e.target.value });
  // };

  const handleStartDateChange = index => event => {
    setStartDate({ index, value: moment(event.target.value) });
  };

  const handleEndDateChange = index => event => {
    setEndDate({ index, value: moment(event.target.value) });
  };

  const handleGoBack = () => {
    push('/admin/property-section');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleIsDateChange = name => event => {
    if (isDate === true) {
      setIsDate(false);
    } else {
      setIsDate(true);
    }
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
              ? 'Edit Property Section'
              : 'Add Property Section'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-property_type"
            >
              Property Section
            </label>
            {window.location.pathname.includes('edit') ? (
              <input
                className="inputbox"
                id="grid-property_type"
                type="text"
                value={one.property_type}
                onChange={handleChange('property_type')}
                disabled
              />
            ) : (
              <input
                className="inputbox"
                id="grid-property_type"
                type="text"
                value={one.property_type}
                onChange={handleChange('property_type')}
              />
            )}

            <div id="component-error-text">{errors.property_type}</div>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-property-title"
            >
              Value
            </label>
            <input
              className="inputbox"
              id="grid-property-title"
              type="text"
              value={one.property_title}
              onChange={handleChange('property_title')}
            />
            <div id="component-error-text">{errors.property_title}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-properties"
            >
              Properties{' '}
              <span className="text-xs italic lowercase">
                (Press enter after each property)
              </span>
            </label>
            <form onSubmit={insertProperties}>
              <input
                className="inputbox"
                id="blog-tags"
                type="text"
                value={tempProjects || ''}
                name="tempProjects"
                onChange={handleTempProperties}
              />
            </form>
            <div id="component-error-text">{errors.properties}</div>
            {/* <Paper>
              {one.properties.map((property, index) => {
                const icon = null;
                return (
                  <>
                    <Chip
                      key={`${property}-${index}`}
                      icon={icon}
                      label={property.property_id}
                      onDelete={handleDelete(index)}
                      className="mb-2 mr-2"
                    />
                  </>
                );
              })}
            </Paper> */}
            <div id="component-error-text">{errors.description}</div>
          </div>
          <div className="w-full">
            <PageContent>
              {projectLoading ? <Loading /> : ''}
              <SortableList
                axis="xy"
                properties={one.properties}
                onSortEnd={onSortEnd}
                useDragHandle
                errors={errors}
                handleDelete={handleDelete}
                handleEndDateChange={handleEndDateChange}
                handleStartDateChange={handleStartDateChange}
              />
            </PageContent>
          </div>
          <br />
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
  loadPropertyRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  setPropertiesValue: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  tempProjects: PropTypes.string.isRequired,
};

const withStyle = withStyles(styles);
// const withReducer = injectReducer({ key: 'roadType', reducer });
// const withSaga = injectSaga({ key: 'roadType', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  tempProjects: makeSelectTempProjects(),
  searchResults: makeSelectSearchResult(),
  projectLoading: makeSelectProjectLoading(),
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
