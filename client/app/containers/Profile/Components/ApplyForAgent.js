/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectAgency,
  makeSelectNewAgency,
  makeSelectAgentData,
  makeSelectLoading,
  makeSelectOpenAgencyForm,
  makeSelectAgencyErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageContent from '../../../components/PageContent/PageContent';
import { IMAGE_BASE } from '../../App/constants';
import Loader from '../../../assets/img/loader.svg';
import defaultImage from '../../../assets/img/logo.png';
import Loading from '../../../components/Loading';
import { makeSelectUser } from '../../App/selectors';
class ApplyForAgent extends React.PureComponent {
  static propTypes = {
    applyAgentRequest: PropTypes.func.isRequired,
    setAgentValue: PropTypes.func.isRequired,
    loadAgencyRequest: PropTypes.func.isRequired,
    agentDataRequest: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object,
  };

  state = {
    open: false,
    openAgency: true,
    images: {
      logo: defaultImage,
    },
  };

  componentDidMount() {
    this.props.loadAgencyRequest();
    this.props.agentDataRequest();
    this.props.setOpenAgencyForm(false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.newAgency !== nextProps.newAgency) {
      const { newAgency } = nextProps;
      if (newAgency.logo && newAgency.logo.fieldname) {
        const logo =
          newAgency.logo &&
          newAgency.logo.path &&
          `${IMAGE_BASE}${newAgency.logo.path}`;
        this.setState({
          ...newAgency,
          images: { logo },
        });
      }
    }
  }

  onDrop = (files, name) => {
    const file = files[0];
    this.props.setNewAgencyValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.setState({ images: { logo: reader.result } });
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  handleOpenAgency = () => {
    this.setState({ openAgency: !this.state.openAgency });
    this.props.setOpenAgencyForm(false);
  };

  handleOpenAgencyForm = () => {
    this.setState({ openAgency: false });
    // this.setState({ openAgencyForm: true });
    this.props.setOpenAgencyForm(true);
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAgency = () => {
    this.setState({ openAgency: false });
  };

  handleCloseAgencyForm = () => {
    // this.setState({ openAgencyForm: false });
    this.props.setOpenAgencyForm(false);
  };

  handleApply = () => {
    this.props.applyAgentRequest();
    this.setState({ open: false });
  };

  handleChangeBio = event => {
    this.props.setAgentValue({ key: 'bio', value: event.target.value });
  };

  handleDropDownChange = event => {
    this.props.setAgentValue({ key: 'agency', value: event.value });
  };

  handleChange = name => event => {
    event.persist();
    this.props.setNewAgencyValue({ key: name, value: event.target.value });
  };

  handleSaveNewAgency = () => {
    this.props.addAgencyRequest();
    // this.setState({ openAgencyForm: false });
    this.setState({ openAgency: false });
    // this.props.clearAgency();
  };

  handleTitleChange = event => {
    const {
      target: { value },
    } = event;
    this.props.setNewAgencyValue({ key: 'title', value });
    const slug = value
      .trim()
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace('.', '')
      .replace(',', '')
      .replace('!', '')
      .replace('#', '')
      .replace('@', '-');
    this.props.setNewAgencyValue({ key: 'slug_url', value: slug });
  };

  render() {
    const {
      classes,
      one,
      errors,
      agency,
      agentData,
      newAgency,
      loading,
      currentUser,
      openAgencyForm,
    } = this.props;
    const { open, openAgency, agency_id, images } = this.state;

    let listAgencyNormalized = {};
    const listAgency = agency.map(each => {
      const obj = {
        key: each._id,
        label: each.title,
        value: each._id,
      };
      listAgencyNormalized = {
        ...listAgencyNormalized,
        [each._id]: obj,
      };
      return obj;
    });

    if (currentUser.email_verified === false) {
      return (
        <>
          <Helmet>
            <title>Agent</title>
          </Helmet>
          <div className="border-red-500 border text-red-600 font-bold bg-red-100 px-4 py-2 mt-10 rounded">
            You must verify email before applying as agent.
          </div>
        </>
      );
    }
    return (
      <>
        <Helmet>
          <title>Agent</title>
        </Helmet>

        {loading && loading === true ? <Loading /> : <></>}
        {loading && loading === true ? (
          <img src={Loader} style={{ width: '100px' }} alt="loading" />
        ) : (
          <>
            {openAgency && agentData.is_verified === false && (
              <h1 className="text-2xl font-bold">Agent</h1>
            )}

            <div className="max-w-lg">
              {/* <div className="w-full pb-4">
                <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                  Short Bio
                </label>
                <FormControl
                  className="md:w-full"
                  error={errors && errors.bio && errors.bio.length > 0}
                >
                  <textarea
                    className="inputbox"
                    rows="5"
                    id="bio"
                    type="text"
                    value={agentData.bio || ''}
                    onChange={this.handleChangeBio}
                  />
                  <FormHelperText id="component-error-text">
                    {errors && errors.bio}
                  </FormHelperText>
                </FormControl>
              </div> */}
              {openAgency && agentData.is_verified === false && (
                <>
                  <label
                    htmlFor="company"
                    className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                  >
                    Select Agency
                  </label>
                  <div
                  //  error={errors.agency && errors.agency.length > 0}
                  >
                    <Select
                      className="React_Select"
                      id="agency"
                      value={listAgencyNormalized[agentData.agency] || null}
                      classNamePrefix="select"
                      placeholder="Agency"
                      name="agency"
                      onChange={this.handleDropDownChange}
                      isSearchable
                      options={listAgency}
                      styles={customStyles}
                    />
                    {/* <div id="component-error-text">{errors.agency && errors.agency}</div> */}
                  </div>
                  {this.props.agentData.agency && (
                    <div
                      className="border rounded bg-card my-4 shadow p-4 max-w-md"
                      style={{ minHeight: 220 }}
                    >
                      {agency.length > 0 &&
                        agency.map(each =>
                          each._id === this.props.agentData.agency ? (
                            <div key={each._id}>
                              <img
                                className="mb-5"
                                style={{ maxHeight: '6rem' }}
                                src={
                                  each.logo
                                    ? `${IMAGE_BASE}${each.logo.path}`
                                    : defaultImage
                                }
                              />
                              {each.phone && (
                                <strong className="text-primary text-lg mb-2">
                                  {each.title}
                                </strong>
                              )}
                              {each.address && (
                                <div className="flex items-center">
                                  <i className="material-icons mr-2 text-gray-800 text-sm">
                                    explore
                                  </i>
                                  <span className="text-sm text-gray-800 capitalize">
                                    {each.address}
                                  </span>
                                </div>
                              )}
                              {each.phone && (
                                <div className="flex items-center">
                                  <i className="material-icons mr-2 text-gray-800 text-sm">
                                    phone
                                  </i>
                                  <span className="text-sm text-gray-800">
                                    {' '}
                                    {each.phone}
                                  </span>
                                </div>
                              )}
                              {each.mobile && (
                                <div className="flex items-center">
                                  <i className="material-icons mr-2 text-gray-800 text-sm">
                                    smartphone
                                  </i>
                                  <span className="text-sm text-gray-800">
                                    {' '}
                                    {each.mobile}
                                  </span>
                                </div>
                              )}
                              {each.email && (
                                <div className="flex items-center">
                                  <i className="material-icons mr-2 text-gray-800 text-sm">
                                    mail
                                  </i>
                                  <span className="text-sm text-gray-800">
                                    {' '}
                                    {each.email}
                                  </span>
                                </div>
                              )}
                              {/* <div>{each.description || ''}</div> */}
                            </div>
                          ) : null,
                        )}
                    </div>
                  )}
                  <button
                    className="text-white py-2 px-4 rounded mt-4 bg-primary font-bold disabled:opacity-75 disabled:cursor-not-allowed "
                    onClick={this.handleOpen}
                    disabled={
                      agentData.agency === null ||
                      agentData.agency === undefined
                    }
                  >
                    Apply
                  </button>
                  <button
                    className="text-primary py-2 px-4 rounded m-4 hover:underline"
                    onClick={this.handleOpenAgencyForm}
                  >
                    Didn't Find Agency? Add here!
                  </button>
                </>
              )}

              {agentData && agentData.is_verified === true && (
                <>
                  {this.props.agentData.agency && (
                    <div className="border rounded bg-card my-4 shadow p-4 max-w-md">
                      {agency.length > 0 &&
                        agency.map(each =>
                          each._id === this.props.agentData.agency ? (
                            <div key={each._id}>
                              <div className="flex items-center justify-end">
                                <img
                                  className="h-12 mb-5"
                                  src={
                                    each.logo
                                      ? `${IMAGE_BASE}${each.logo.path}`
                                      : defaultImage
                                  }
                                />
                              </div>
                              Subscribed under
                              <h1 className="text-2lg mb-2">
                                {each.title || ''}
                              </h1>
                              <div className="flex items-center">
                                <i className="material-icons mr-2 text-gray-800 text-sm">
                                  explore
                                </i>
                                <span className="text-sm text-gray-800 capitalize">
                                  {' '}
                                  {each.address || ''}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <i className="material-icons mr-2 text-gray-800 text-sm">
                                  phone
                                </i>
                                <span className="text-sm text-gray-800">
                                  {' '}
                                  {each.phone || ''}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <i className="material-icons mr-2 text-gray-800 text-sm">
                                  smartphone
                                </i>
                                <span className="text-sm text-gray-800">
                                  {' '}
                                  {each.mobile || ''}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <i className="material-icons mr-2 text-gray-800 text-sm">
                                  mail
                                </i>
                                <span className="text-sm text-gray-800">
                                  {' '}
                                  {each.email || ''}
                                </span>
                              </div>
                              {/* <div>{each.description || ''}</div> */}
                            </div>
                          ) : null,
                        )}
                    </div>
                  )}
                  <div className="mt-10">
<h2>All Agents List</h2>
</div>
                </>
              )}
            </div>

            {openAgencyForm && (
              <>
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/3 px-2 pb-4">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                      htmlFor="grid-title"
                    >
                      Name
                    </label>
                    <input
                      className="inputbox"
                      id="grid-title"
                      type="text"
                      value={newAgency.title}
                      onChange={this.handleTitleChange}
                    />
                    <div id="component-error-text">
                      {errors && errors.title ? errors.title : ''}
                    </div>
                    {/* <div id="component-error-text">{errors.title}</div> */}
                  </div>
                  <div className="w-full md:w-1/3 px-2 pb-4 hidden">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                      htmlFor="grid-vlaue"
                    >
                      Slug Url
                    </label>
                    <input
                      className="inputbox"
                      id="grid-slug-url"
                      type="text"
                      value={newAgency.slug_url}
                      onChange={this.handleChange('slug_url')}
                    />
                    <div id="component-error-text">
                      {errors && errors.slug_url ? errors.slug_url : ''}
                    </div>
                    {/* <div id="component-error-text">{errors.slug_url}</div> */}
                  </div>
                  <div className="w-full md:w-1/3 px-2 pb-4">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                      htmlFor="grid-vlaue"
                    >
                      E-mail
                    </label>
                    <input
                      className="inputbox"
                      id="grid-email"
                      type="text"
                      value={newAgency.email}
                      onChange={this.handleChange('email')}
                      autoComplete="off"
                    />
                    <div id="component-error-text">
                      {errors && errors.email ? errors.email : ''}
                    </div>
                    {/* <div id="component-error-text">{errors.email}</div> */}
                  </div>
                  <div className="w-full md:w-1/3 px-2 pb-4">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                      htmlFor="grid-vlaue"
                    >
                      Website
                    </label>
                    <input
                      className="inputbox"
                      id="grid-website"
                      type="text"
                      value={newAgency.website}
                      onChange={this.handleChange('website')}
                    />
                    <div id="component-error-text">
                      {errors && errors.website ? errors.website : ''}
                    </div>
                    {/* <div id="component-error-text">{errors.website}</div> */}
                  </div>
                  <div className="w-full md:w-1/3 px-2 pb-4">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                      htmlFor="grid-vlaue"
                    >
                      Office Address
                    </label>
                    <input
                      className="inputbox"
                      id="grid-address"
                      type="text"
                      value={newAgency.address}
                      onChange={this.handleChange('address')}
                    />
                    <div id="component-error-text">
                      {errors && errors.address ? errors.address : ''}
                    </div>

                    {/* <div id="component-error-text">{errors.address}</div> */}
                  </div>
                  <div className="w-full md:w-1/3 px-2 pb-4">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                      htmlFor="grid-vlaue"
                    >
                      Phone No.
                    </label>
                    <input
                      className="inputbox"
                      id="grid-phone"
                      type="text"
                      value={newAgency.phone}
                      onChange={this.handleChange('phone')}
                    />
                    <div id="component-error-text">
                      {errors && errors.phone ? errors.phone : ''}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-2 pb-4">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                      htmlFor="grid-vlaue"
                    >
                      Mobile
                    </label>
                    <input
                      className="inputbox"
                      id="grid-mobile"
                      type="text"
                      value={newAgency.mobile}
                      onChange={this.handleChange('mobile')}
                    />
                    <div id="component-error-text">
                      {errors && errors.mobile ? errors.mobile : ''}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-2 pb-4 hidden">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                    htmlFor="grid-vlaue"
                  >
                    Description
                  </label>
                  <textarea
                    className="inputbox"
                    id="grid-description"
                    type="text"
                    rows="5"
                    value={newAgency.description}
                    onChange={this.handleChange('description')}
                  />
                  {/* <div id="component-error-text">{errors.description}</div> */}
                </div>

                <div className="w-full pb-4">
                  <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                    Short Bio
                  </label>
                  <FormControl
                    className="md:w-full"
                    error={errors && errors.bio && errors.bio.length > 0}
                  >
                    <textarea
                      className="inputbox"
                      rows="5"
                      id="bio"
                      type="text"
                      value={agentData.bio || ''}
                      onChange={this.handleChangeBio}
                    />
                    <FormHelperText id="component-error-text">
                      {errors && errors.bio}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className="flex w-1/2 p-2 border rounded">
                  <img src={images.logo || defaultImage} alt="Agency" />
                </div>

                <div className="flex pb-4">
                  <Dropzone
                    onDrop={files => this.onDrop(files, 'logo')}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        <button
                          type="button"
                          className="text-primary mt-2 text-sm border border-primary py-1 px-4 rounded font-bold bg-white hover:bg-gray-100"
                        >
                          Upload Agency Logo
                        </button>
                      </div>
                    )}
                  </Dropzone>
                </div>
                <br />
                <button
                  type="button"
                  className="text-white py-2 px-4 rounded mt-4 bg-primary uppercase btn-theme"
                  onClick={this.handleSaveNewAgency}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="text-primary py-2 px-4 rounded m-4 hover:underline"
                  onClick={this.handleOpenAgency}
                >
                  Go Back
                </button>
              </>
            )}
            <Dialog
              open={open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              maxWidth="sm"
            >
              <div className="p-4 border-b font-bold">
                Are you sure you want to apply for Agent?
              </div>
              <DialogActions>
                <button
                  className="text-white py-2 px-4 rounded mt-4 w-full bg-primary font-bold"
                  onClick={() => this.handleApply()}
                  color="primary"
                >
                  Apply
                </button>
                <button
                  className="text-primary border border-red-500 text-red-500 py-2 px-4 rounded mt-4 w-full bg-white  font-bold"
                  onClick={this.handleClose}
                  color="primary"
                >
                  Cancel
                </button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  agentData: makeSelectAgentData(),
  agency: makeSelectAgency(),
  newAgency: makeSelectNewAgency(),
  loading: makeSelectLoading(),
  currentUser: makeSelectUser(),
  openAgencyForm: makeSelectOpenAgencyForm(),
  errors: makeSelectAgencyErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    // background: state.isFocused || state.isSelected ? '#5897FB' : 'white',
    // color: state.isFocused || state.isSelected ? 'white' : 'black',
    padding: '5px',
  }),

  menuList: () => ({
    background: '#FFFFFF',
    border: '1px solid #5897FB',
  }),

  indicatorSeparator: () => ({
    background: 'transparent',
  }),

  container: provided => ({
    ...provided,
    width: '100%',
    minWidth: '100px',
  }),
};
// const styles = theme => ({});

const withStyle = withStyles(customStyles);

export default compose(
  withConnect,
  withStyle,
)(ApplyForAgent);
