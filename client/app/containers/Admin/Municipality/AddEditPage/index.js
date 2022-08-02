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
  makeSelectDistrict,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';

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

const key = 'municipality';

const AddEdit = props => {
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
    district,
    loadDistrictRequest,
    push,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    console.log('From addEdit page', props.match.params.id);
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
    loadDistrictRequest();
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
    push(`/admin/municipality`);
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  return loading && loading == true ? (
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
                ? 'Edit Municipality'
                : 'Add Municipality'}
            </PageHeader>
          </div>
          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="district"
              >
                District
            </label>
              <select
                className="inputbox"
                native="true"
                value={one.districtID}
                onChange={handleChange('districtID')}
              // inputprops={{ value: one.country || '', name: 'country' }}
              >
                {district.map(each => (
                  <option
                    key={each.districtID}
                    name={each.district_name}
                    value={each.districtID}
                  >
                    {each.district_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="grid-vlaue"
              >
                Municipality name
            </label>
              <input
                className="inputbox"
                id="grid-municipality-name"
                type="text"
                value={one.municipality_name}
                onChange={handleChange('municipality_name')}
              />
              <div id="component-error-text">{errors.municipality_name}</div>
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
            <div className="w-full md:w-1/2 pb-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="grid-country-code-2"
              >
                Municipality ID
            </label>
              <input
                className="inputbox"
                id="grid-municipality-id"
                type="number"
                value={one.municipalityID}
                onChange={handleChange('municipalityID')}
              />
              <div id="component-error-text">{errors.municipalityID}</div>
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
  push: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  classes: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  district: PropTypes.array.isRequired,
  loadDistrictRequest: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles);
// const withReducer = injectReducer({ key: 'areaUnit', reducer });
// const withSaga = injectSaga({ key: 'areaUnit', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  district: makeSelectDistrict(),
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
