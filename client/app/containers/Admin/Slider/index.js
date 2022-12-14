import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import qs from 'query-string';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';

// core components
import Fab from '@material-ui/core/Fab';
import Table from 'components/Table/Table';

import { DATE_FORMAT } from '../../App/constants';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  tableActionButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },

  waftsrch: {
    padding: 0,
    position: 'absolute',
    borderLeft: '1px solid #d9e3e9',
    borderRadius: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },
});

/* eslint-disable react/prefer-stateless-function */
export class SliderPage extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  state = {
    display: false,
    open: false,
    deleteId: '',
  };

  componentDidMount() {
    const {
      loadAllRequest,
      query,
      location: { search },
      setQueryObj,
    } = this.props;
    let queryObj = { ...query };
    if (search) {
      queryObj = qs.parse(search);
      setQueryObj(queryObj);
    }

    this.props.loadAllRequest(this.props.query);
  }

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/slider-manage/add');
  };

  handleEdit = id => {
    this.props.clearOne();
    this.props.push(`/admin/slider-manage/edit/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
    const queryString = qs.stringify({
      ...this.props.query,
      [e.target.name]: e.target.value,
    });
    this.props.push({
      search: queryString,
    });
  };

  handleSearch = e => {
    // e.preventDefault();
    this.props.loadAllRequest(this.props.query);
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
    const queryString = qs.stringify(paging);
    this.props.push({
      search: queryString,
    });
  };

  handleOpen = id => {
    this.setState({ open: true, deleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    this.props.deleteOneRequest(id);
    this.setState({ open: false });
  };

  handleToggle = () => {
    this.setState(state => ({ display: !state.display }));
  };

  clearFilters = () => {
    this.props.loadAllRequest();
    this.props.clearQuery();
  };

  render() {
    const { display } = this.state;

    const {
      classes,
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ slider_name, slider_key, images, added_at, _id }) => [
        slider_name,
        slider_key,
        images.length,
        moment(added_at).format(DATE_FORMAT),

        <React.Fragment>
          <div className="flex">
            <button
              aria-label="Edit"
              className=" px-1 text-center leading-none"
              onClick={() => this.handleEdit(_id)}
            >
              <i className="material-icons text-base text-indigo-500 hover:text-indigo-700">
                edit
              </i>
            </button>

            <button
              className="ml-2 px-1 text-center leading-none"
              onClick={() => this.handleOpen(_id)}
            >
              <i className="material-icons text-base text-red-400 hover:text-red-600">
                delete
              </i>
            </button>
          </div>
        </React.Fragment>,
      ],
    );

    return (
      <>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>Slider Listing</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Slider Manage</PageHeader>
        </div>

        <PageContent loading={loading}>
          <div className="flex justify-between">
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_slider_name"
                id="slider-name"
                placeholder="Search Slider"
                className="m-auto inputbox"
                value={query.find_slider_name}
                onChange={this.handleQueryChange}
                onKeyPress={this.handleKeyPress}
              />
              <IconButton
                aria-label="Search"
                className="waftsrchstyle"
                onClick={this.handleSearch}
              >
                <SearchIcon />
              </IconButton>

              {/* <button
                aria-label="clear filter"
                className="bg-secondary px-4 py-1 text-white  text-center rounded ml-2"
                onClick={this.clearFilters}
                type="button"
              >
                clear filter
              </button> */}
            </div>

            <div className="flex">
              <span className="bg-white border border-indigo-200 px-1 mr-2 inline-flex items-center cursor-pointer hover:border-indigo-200 hover:shadow">
                <i className="material-icons text-indigo-600">code</i>
              </span>

              <button
                className="bg-indigo-700 text-white px-2 leading-none items-center flex hover:bg-indigo-600"
                onClick={this.handleAdd}
              >
                <i className="material-icons">add</i>Add Slider
              </button>
            </div>
          </div>

          <div className="bg-gray-900 h-32 my-2 py-2 px-4 text-white font-mono">
            <code className="">
              ...
              <br />
              import SlickSlider from 'client/app/components/SlickSlider';
              <br />
              ...
              <br />
              SlickSlider slideKey="key" />
              <br />
              ...
            </code>
          </div>

          <Table
            tableHead={[
              'Slider Name',
              'Slider Key',
              'Images',
              'Added at',
              'Actions',
            ]}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
        </PageContent>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'sliderManagePage', reducer });
const withSaga = injectSaga({ key: 'sliderManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(SliderPage);
