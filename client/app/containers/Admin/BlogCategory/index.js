/**
 *
 * BlogCategory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Table from 'components/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import { DATE_FORMAT, IMAGE_BASE } from '../../App/constants';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../../components/Loading';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';

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
export class BlogCategory extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  state = {
    open: false,
    deleteId: '',
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleEdit = id => {
    this.props.push(`/admin/blog-cat-manage/edit/${id}`);
  };

  handleOpen = id => {
    this.setState({ open: true, deleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    this.props.deleteCatRequest(id);
    this.setState({ open: false });
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/blog-cat-manage/add');
  };

  clearFilters = () => {
    this.props.loadAllRequest();
    this.props.clearQuery();
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({
        title,
        order,
        image,
        slug_url,
        is_active,
        added_at,
        updated_at,
        _id,
      }) => [
        title,
        order,
        image && image.path ? (
          <img
            src={`${IMAGE_BASE}${image.path}`}
            style={{ width: 50, height: 50 }}
            alt={image.filename}
          />
        ) : (
          'No Image'
        ),
        '' + is_active,
        moment(added_at).format(DATE_FORMAT),
        moment(updated_at ? updated_at : added_at).format(DATE_FORMAT),
        <>
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
        </>,
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
          <title>News Category Listing</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>News Category Manage</PageHeader>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            round="true"
            onClick={this.handleAdd}
            elevation={0}
          >
            <AddIcon />
          </Fab>
        </div>
        <PageContent loading={loading}>
          <div className="flex">
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_title"
                id="doc-title"
                placeholder="Search Blog Category"
                className="m-auto inputbox"
                value={query.find_title}
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
            </div>
            {/* <button
              aria-label="clear filter"
              className="bg-secondary px-4 py-2 text-white  text-center rounded mr-2"
              onClick={this.clearFilters}
              type="button"
            >
              clear filter
            </button> */}
          </div>

          <Table
            tableHead={[
              'Title',
              'Order',
              'Image',
              'Is Active',
              'Added At',
              'Updated At',
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

const withReducer = injectReducer({
  key: 'BlogCategory',
  reducer,
});
const withSaga = injectSaga({ key: 'BlogCategory', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(BlogCategory);
