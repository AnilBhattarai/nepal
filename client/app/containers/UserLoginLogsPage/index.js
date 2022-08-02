/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from './reducer';
import saga from './saga';
import Table from '../../components/Table';
import { makeSelectOne, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import PageContent from '../../components/PageContent/PageContent';
import UserProfileSettingsPage from '../../components/UserProfileSettings';
import Loading from '../../components/Loading';
class LoginLogsPage extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    one: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
    logoutRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadOneRequest();
  }

  handlePagination = paging => {
    this.props.loadOneRequest(paging);
  };

  handleLogout = id => {
    this.props.logoutRequest(id);
  };

  render() {
    const {
      classes,
      loading,
      one: { data, page, size, totaldata },
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({
        login_date,
        logout_date,
        ip_address,
        device_info,
        browser_info,
        _id,
        is_active,
      }) => [
        moment(login_date).format('YYYY-MM-DD HH:mm'),
        logout_date ? moment(logout_date).format('YYYY-MM-DD HH:mm') : '',
        ip_address || '',
        device_info || '',
        browser_info || '',
        is_active ? (
          <Button color="primary" onClick={() => this.handleLogout(_id)}>
            LogOut
          </Button>
        ) : (
          ''
        ),
      ],
    );
    return (
      <React.Fragment>
        {loading && loading == true ? <Loading /> : <></>}
        <Helmet>
          <title>Login Logs</title>
        </Helmet>
        {/* <UserProfileSettingsPage> */}

        <div className={`responsiveBlock ${loading ? 'opacity-50' : ''}`}>
          <div className="table-border">
            <Table
              tableHead={[
                'Login Date',
                'Logout Date',
                'IP Address',
                'Device Info',
                'Browser Info',
                'Action',
              ]}
              tableData={tableData}
              pagination={tablePagination}
              handlePagination={this.handlePagination}
              loading={loading}
            />
          </div>
        </div>

        {/* </UserProfileSettingsPage> */}
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'loginLogsPage', reducer });
const withSaga = injectSaga({ key: 'loginLogsPage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const styles = theme => ({
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(LoginLogsPage);
