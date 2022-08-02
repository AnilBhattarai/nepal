import React, { useEffect } from 'react';
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
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardBody from '@material-ui/core/CardContent';
// import CardFooter from '@material-ui/core/CardActions';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// import { spacing, palette } from '@material-ui/system';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AddField from '../../../../components/AddField';
import Input from '../../../../components/customComponents/Input';
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

const key = 'vdc';
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
    district,
    addEditRequest,
    setIsActive,
    push,
    setArea,
    addArea,
    deleteArea,
  } = props;

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
  }, []);

  // const handleSelectChange = e => {
  //   console.log('e.target.value from addEdit', e.target.value);
  // };

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };
  const handleCheckedChange = () => {
    setIsActive();
  };

  const handleGoBack = () => {
    push('/admin/vdc-manage');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handelAddFieldChange = (value, index) => {
    setArea({ value, index });
  };

  const handleDelete = index => {
    deleteArea({ index });
  };

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      {/* <Helmet>
        <title>
          {match && match.params && match.params.id
            ? 'Edit vdc'
            : 'Add vdc'}
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
              ? 'Edit Vdc/Municipality'
              : 'Add Vdc/Municipality'}
          </PageHeader>
        </div>
        <PageContent>
          {/* <div className="flex justify"> */}

          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="State Name"
              inputclassName="inputbox disabled:opacity-50 disabled:cursor-not-allowed"
              inputid="state_name"
              inputType="text"
              value={one.state_id.name}
              onChange={handleChange('name')}
              disabled
            />
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="District Name"
              inputclassName="inputbox disabled:opacity-50 disabled:cursor-not-allowed"
              inputid="district_name"
              inputType="text"
              value={one.district_id.name}
              disabled
            />
          </div>
          {/* <div className="waftformgroup  flex relative mr-2 "> */}
          {/* <div className="waftformgroup">
              <label
                className="block  uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="state"
              >
                District
              </label>
              <select
                className="Waftinputbox"
                native="true"
                // name="stateID"
                value={one.districtID}
                // onChange={handleSelectChange}
                onChange={handleChange('districtID')}
                // onClick={() => handleSearch()}
              >
                <option key="0" name="all" value="0">
                  ---
                </option>
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
            </div> */}
          {/* </div> */}

          {/* <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-weight-id"
            >
              State ID
            </label>
            <input
              className="Waftinputbox"
              id="grid-weight-id"
              type="number"
              value={one.stateID}
              onChange={handleChange('stateID')}
            />
            <div id="component-error-text">{errors.stateID}</div>
          </div> */}

          {/* <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-weight-code"
            >
              Region ID
            </label>
            <input
              className="Waftinputbox"
              id="grid-weight-code"
              type="number"
              value={one.regionID}
              onChange={handleChange('regionID')}
            />
            <div id="component-error-text">{errors.regionID}</div>
          </div> */}
          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="Vdc/Municipality Name"
              inputclassName="inputbox"
              inputid="vdc_name"
              inputType="text"
              value={one.name}
              onChange={handleChange('name')}
            />
          </div>
          {/* <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-weight-code"
            >
              vdc Name
            </label>
            <input
              className="Waftinputbox"
              id="grid-weight-code"
              type="text"
              value={one.name}
              onChange={handleChange('name')}
            />
            <div id="component-error-text">{errors.name}</div>
         */}
          {/* <div className="w-full md:w-1/2 pb-4">
            <Checkbox
              checked={one.is_active}
              name="is_active"
              tabIndex={-1}
              onClick={handleCheckedChange}
              color="primary"
              className="inline-block"
              // id="grid-is_active"
              // value={one.is_active}
            />
            <label
              className="inline-block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-is_active"
            >
              Is Active
            </label>
          </div> */}
          <div className="flex flex-col border-gray-300 border-solid border p-4 pb-0 rounded-lg">
            <div className="flex flex-wrap  ">
              {one &&
                one.areas.length > 0 &&
                one.areas.map((each, index) => (
                  <AddField
                    key={index}
                    data={each.name}
                    index={index}
                    handleChange={handelAddFieldChange}
                    handleDelete={() => handleDelete(index)}
                  />
                ))}
            </div>
            <div className="content-start">
              <button
                type="button"
                className="mb-4 py-1 px-2 hover:text-primary rounded border hover:border-primary"
                onClick={addArea}
              >
                <AddIcon />
                Add Items
              </button>
            </div>
          </div>
          <button
            type="button"
            className="text-white py-2 px-4 rounded mt-4 bg-primary btn-waft"
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
  setIsActive: PropTypes.func.isRequired,
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
};

const withStyle = withStyles(styles);

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
  withConnect,
)(AddEdit);
