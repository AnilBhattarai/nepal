/**
 *
 * Agency
 *
 */

// @material-ui/core_components
import withStyles from '@material-ui/core/styles/withStyles';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import useInjectReducer from 'utils/injectReducer';
import useInjectSaga from 'utils/injectSaga';
import defaultImage from '../../assets/img/logo.png';
import { IMAGE_BASE } from '../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading } from './selectors';

const key = 'homePageDeveloper';

export const HomePageDeveloper = props => {
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
        <div className="bg-blue-50">
          <div className="container mx-auto lg:flex">
            <div className="w-1/3 relative hidden lg:block">
              <img
                className="absolute right-0 top-0 max-w-none h-full"
                src="http://localhost:5200/public/files/856262F56FAE397-construction.jpg"
                alt="featured developers"
                loading="lazy"
              />
            </div>

            <div className="flex-1 lg:pl-10 py-20">
              <h2>
                <span className="leading-none block font-bold text-2xl text-gray-300">
                  Featured
                </span>
                <span className="leading-none text-4xl lg:text-6xl uppercase font-black">
                  Developers
                </span>
              </h2>
              <div className="grid gap-6 grid-cols-2 lg:grid-cols-3 relative z-40 lg:-ml-40 mt-10">
                {data.map(each => (
                  <Link
                    className="block rounded relative overflow-hidden bg-white shadow hover:border-white cursor-pointer py-1 px-2 flex items-center ease-in-out"
                    to={`/developer/&developer_id=${each._id}`}
                    key={`developer-${each._id}`}
                  >
                    <>
                      <div className="w-16 h-16 flex items-center overflow-hidden">
                        <img
                          src={
                            each.logo
                              ? `${IMAGE_BASE}${each.logo.path}`
                              : defaultImage
                          }
                          alt={each.name}
                        />
                      </div>

                      <div className="" />
                      <div className="flex-1 px-4 border-l insetShadowLeft ml-2">
                        <span className="font-bold text-gray-900 capitalize block truncate">
                          {each.name || ''}
                        </span>
                        {/* <span className="text-gray-600 text-xs block">
                          {each.address || ''}
                        </span> */}
                        {/* <span
                      className="text-gray-700 text-xs block h-8 overflow-hidden truncate"
                      dangerouslySetInnerHTML={{ __html: each.bio }}
                    /> */}
                      </div>
                    </>
                    <div className="w-full flex justify-between gap-4 p-4">
                      <div>
                        <span>Year Estd</span>
                        <span className="text-blue-600 font-bold">
                          {each.established_year || ''}
                        </span>
                      </div>
                      <div>
                        <span>Projects</span>
                        <span className="text-blue-600 font-bold">
                          {each.projects_no || ''}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
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

HomePageDeveloper.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
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
)(HomePageDeveloper);
