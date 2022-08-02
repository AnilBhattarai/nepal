import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import View from '@material-ui/icons/RemoveRedEye';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';

// core components
import Table from 'components/Table';

import injectSaga from '../../../../utils/injectSaga';
import injectReducer from '../../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';

import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import DeleteDialog from '../../../../components/DeleteDialog';
import Loading from '../../../../components/Loading';
import { makeSelectUser } from '../../../App/selectors';

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
export class BlogListingPage extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    classes: PropTypes.object,
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
    this.props.push('/user/news/add');
  };
  handleEdit = slug_url => {
    this.props.push(`/user/news/edit/${slug_url}`);
  };
  handleView = slug_url => {
    this.props.push(`/news/${slug_url}`);
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

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  render() {
    const { classes, currentUser } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData =
      data &&
      data.map(
        ({ title, slug_url, category, added_at, is_active, tags, _id }) => {
          return [
            title,
            (category && category.map(each => each.title).join(', ')) || 'No',
            moment(added_at).format('MMM Do YY'),
            '' + is_active,
            tags.join(','),
            <React.Fragment>
              {/* <Tooltip
                id="tooltip-top"
                title="Edit Blog"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                  onClick={() => this.handleEdit(_id)}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + ' ' + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip> */}
              <Tooltip
                id="tooltip-top"
                title="View Blog"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                  onClick={() => this.handleView(_id)}
                >
                  <View
                    className={
                      classes.tableActionButtonIcon + ' ' + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
              {/* <a href={`/news/${slug_url}`} target="_blank">
              view blog
            </a> */}
              {/* <Tooltip
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
                    className={
                      classes.tableActionButtonIcon + ' ' + classes.close
                    }
                  />
                </IconButton>
              </Tooltip> */}
            </React.Fragment>,
          ];
        },
      );
    return (
      <>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>Blog Listing</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>My Blogs</PageHeader>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            round="true"
            onClick={this.handleAdd}
            elevation={0}
            disabled={!currentUser.email_verified}
          >
            <AddIcon />
          </Fab>
        </div>
        {/* <PageContent loading={loading}> */}
        {/* <div className="flex justify-end">
          <div className="flex relative">
            <input
              type="text"
              name="find_title"
              id="blog-title"
              placeholder="Search Blogs"
              className="m-auto inputbox"
              value={query.find_title}
              onChange={this.handleQueryChange}
            />
            <IconButton
              aria-label="Search"
              className="waftsrchstyle"
              onClick={this.handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div> */}
        <div className={loading ? 'opacity-50' : ''}>
          <Table
            tableHead={[
              'Title',
              'Category',
              'Added At',
              'Is Active',
              'Tags',
              'Actions',
            ]}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
        </div>
        {/* </PageContent> */}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  currentUser: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'blogManagePage', reducer });
const withSaga = injectSaga({ key: 'blogManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(BlogListingPage);
