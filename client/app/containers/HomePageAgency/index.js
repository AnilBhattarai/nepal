/**
 *
 * Agency
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

// @material-ui/core_components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';

import Table from 'components/Table';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import defaultImage from '../../assets/img/logo.png';
import bgmore from '../../assets/img/bgmore.png';
import Loading from '../../components/Loading';
import { IMAGE_BASE } from '../App/constants';

const key = 'homePageAgency';

export const HomePageAgency = props => {
  const {
    all: { data, page, size, totaldata },
    loading,
    loadAllRequest,
    classes,
    push,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadAllRequest();
  }, []);

  return (
    <>
      {data.length ? (
        <div className="bg-blue-50 py-20">
          <div className="container mx-auto">
            <h2 className="leading-none text-4xl lg:text-6xl uppercase font-black text-center">
              Featured Agencies
            </h2>
            <p className="opacity-50 text-center">
              NepalHomes offers buyer to easy home loan processing.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-16">
              {data.slice(0, data.length - 1).map(each => (
                <div
                  className="rounded relative overflow-hidden bg-white shadow-lg cursor-pointer hover:border-white ease-in-out"
                  key={`agency-${each._id}`}
                >
                  <Link to={`/agent/${each._id}`}>
                    <div className="h-24 p-5 overflow-hidden flex justify-center items-center">
                      <img
                        style={{ maxHeight: '100%' }}
                        src={
                          each.logo
                            ? `${IMAGE_BASE}${each.logo.path}`
                            : defaultImage
                        }
                        alt={each.title}
                      />
                    </div>
                    <h3 className="capitalize text-center text-sm px-2 hover:text-primary">
                      {each.title || ''}
                    </h3>
                    <span className="text-gray-400 text-xs block text-center my-4">
                      {each.total_Property || '0'} properties
                    </span>
                  </Link>
                </div>
              ))}
              <div
                className="rounded relative overflow-hidden bg-white shadow-lg cursor-pointer hover:border-white ease-in-out"
                key={`agency-viewall`}
              >
                <Link
                  className="h-full w-full p-8 flex-col flex bg-primary justify-end items-center"
                  to={`/agencies`}
                  style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${bgmore})`,
                  }}
                >
                  <button className="rounded bg-white px-5 py-2 text-primary inline-block text-sm font-bold">
                    View All
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

HomePageAgency.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  Loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withStyle,
  withConnect,
  memo,
)(HomePageAgency);
