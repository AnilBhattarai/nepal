import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';

// core components
import Table from 'components/Table';

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
class ContentsListingPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    deleteOneRequest: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
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
    open: false,
    deleteId: '',
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/page-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/page-manage/edit/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
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

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  clearFilters = () => {
    this.props.loadAllRequest();
    this.props.clearQuery();
  };

  render() {
    const { open } = this.state;
    const {
      classes,
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ name, key, is_active, published_from, published_to, _id }) => [
        name,
        key,
        moment(published_from).format('MMM Do YY'),
        moment(published_to).format('MMM Do YY'),
        `${is_active}`,
        <>
          <Tooltip
            id="tooltip-top"
            title="Edit"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Edit"
              className={classes.tableActionButton}
              onClick={() => this.handleEdit(_id)}
            >
              <Edit
                className={`${classes.tableActionButtonIcon} ${classes.edit}`}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            id="tooltip-top-start"
            title="Remove"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => this.handleOpen(_id)}
            >
              <Close
                className={`${classes.tableActionButtonIcon} ${classes.close}`}
              />
            </IconButton>
          </Tooltip>
        </>,
      ],
    );
    return (
      <>
        <DeleteDialog
          open={open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>Pages</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Pages</PageHeader>
          {/* <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            round="true"
            onClick={this.handleAdd}
            elevation={0}
          >
            <AddIcon />
          </Fab> */}
        </div>
        <PageContent loading={loading}>
          <div className="flex justify-end">
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_name"
                id="contents-name"
                placeholder="Search by name"
                className="m-auto inputbox"
                value={query.find_name}
                onChange={this.handleQueryChange}
                style={{ paddingRight: '50px' }}
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

            <div className="waftformgroup relative flex">
              <input
                type="text"
                name="find_key"
                id="contents-key"
                placeholder="Search Contents  by key"
                className="m-auto inputbox pr-6"
                value={query.find_key}
                onChange={this.handleQueryChange}
                style={{ paddingRight: '50px' }}
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

            <div>
              <button
                aria-label="clear filter"
                className="bg-secondary px-4 py-1 text-white  text-center rounded ml-2"
                onClick={this.clearFilters}
                type="button"
              >
                clear filter
              </button>
            </div>
          </div>

          <Table
            tableHead={[
              'Name',
              'Key',
              'Pub From',
              'Pub To',
              'Is Active',
              'Action',
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

const withReducer = injectReducer({ key: 'pageManagePage', reducer });
const withSaga = injectSaga({ key: 'pageManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ContentsListingPage);
