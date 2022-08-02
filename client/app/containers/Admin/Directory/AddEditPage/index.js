import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Chip } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectTempPhone,
  makeSelectCategories,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import Input from '../../../../components/customComponents/Input';

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
const key = 'directory';

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
    push,
    tempPhone,
    categories,
    loadEnumRequest,
    setTempPhone,
  } = props;

  useEffect(() => {
    clearErrors();
    if (match.params && match.params.id) {
      loadOneRequest(match.params.id);
    }
    loadEnumRequest();
  }, []);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleGoBack = () => {
    push('/admin/service-category-manage');
  };

  const handleSave = () => {
    addEditRequest();
  };

  const handleCheckedChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleTempPhone = e => {
    e.persist();
    setTempPhone(e.target.value);
  };

  const insertPhone = event => {
    event.preventDefault();
    if (one.phone.indexOf(tempPhone) === -1) {
      setOneValue({
        key: 'phone',
        value: [...one.phone, tempPhone],
      });
      setTempPhone('');
    }
    return { tempPhone: setTempPhone('') };
  };

  const handleDeletePhone = index => () => {
    const chipData = [...one.phone];

    chipData.splice(index, 1);
    props.setOneValue({ key: 'phone', value: chipData });
  };

  let listCategoriesNormalized = {};
  const listCategories = categories.map(each => {
    const obj = {
      label: each.title,
      value: each._id,
    };
    listCategoriesNormalized = {
      ...listCategoriesNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  console.log(listCategories);
  console.log(categories);

  listCategories.unshift({ label: 'Choose Category', value: '' });

  const handleDropdownChange = name => event => {
    setOneValue({ key: name, value: event.value });
  };

  return loading && loading === true ? (
    <Loading />
  ) : (
      <>
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
                ? 'Edit Directory Category'
                : 'Add Directory Category'}
            </PageHeader>
          </div>
          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Name"
                inputclassName="inputbox"
                inputid="grid-name"
                inputType="text"
                value={one.name}
                onChange={handleChange('name')}
                error={errors.name}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Email"
                inputclassName="inputbox"
                inputid="grid-value"
                inputType="email"
                value={one.email}
                onChange={handleChange('email')}
                error={errors.email}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="grid-title"
              >
                Phone
            </label>

              <form onSubmit={insertPhone}>
                <input
                  className="inputbox"
                  placeholder="Press enter after each phone no."
                  id="blog-tags"
                  type="text"
                  value={tempPhone || ''}
                  name="Phone"
                  onChange={handleTempPhone}
                />
              </form>
              <div className="mt-2">
                {one.phone.map((number, index) => {
                  const icon = null;
                  return (
                    <Chip
                      key={`${number}-${index}`}
                      icon={icon}
                      label={number}
                      onDelete={handleDeletePhone(index)}
                      className="mb-2 mr-2"
                    />
                  );
                })}
              </div>
              <div id="component-error-text">{errors.phone && errors.phone}</div>
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Address"
                inputclassName="inputbox"
                inputid="grid-value"
                inputType="text"
                value={one.address}
                onChange={handleChange('address')}
                error={errors.address}
              />
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Website"
                inputclassName="inputbox"
                inputid="grid-value"
                inputType="text"
                value={one.website}
                onChange={handleChange('website')}
                error={errors.website}
              />
            </div>

            <div className="w-full md:w-1/2">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="grid-country-code-2"
              >
                Description
            </label>
              <textarea
                className="inputbox"
                id="grid-description"
                type="text"
                value={one.description}
                onChange={handleChange('description')}
              />
              <div id="component-error-text">{errors.description}</div>
            </div>
            <div className="w-full md:w-1/2">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="grid-country-code-2"
              >
                Directory Category
            </label>

              <Select
                className="React_Select"
                id="category"
                placeholder="Choose"
                value={listCategoriesNormalized[one.service_category] || null}
                classNamePrefix="select"
                onChange={handleDropdownChange('service_category')}
                isSearchable
                options={listCategories}
                styles={customStyles}
              />
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
};

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: '#fff',
    borderColor: '#e0e3e8',
    minHeight: '35px',
    height: '35px',
    width: '100%',
    boxShadow: state.isFocused ? null : null,
    marginRight: '8px',
  }),
  placeholder: state => ({
    color: '#000',
    fontSize: '15px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
};

const withStyle = withStyles(styles);
const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  tempPhone: makeSelectTempPhone(),
  categories: makeSelectCategories(),
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
