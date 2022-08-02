import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { IMAGE_BASE } from '../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectDirectory } from './selectors';

const key = 'homeComponents';

export const DirectoryList = props => {
  const { loadDirectoryRequest, directories } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadDirectoryRequest();
  }, []);

  return (
    <div
      className="bg-purple-500 py-28"
      style={{
        background:
          'linear-gradient(90deg, rgba(38,116,180,1) 0%, rgba(112,92,160,1) 100%)',
      }}
    >
      <div className="w-full flex justify-center">
        <h2 className="font-black text-6xl text-white mt-6">DIRECTORY</h2>
      </div>
      <div className="w-full flex justify-center">
        <p className="opacity-70 text-lg text-white mt-6">
          NepalHomes offers buyer to easy home loan processing.
        </p>
      </div>
      <div className="container mx-auto flex p-4">
        <div className="w-full grid grid-cols-4 gap-5">
          {directories && directories.length > 0 ? (
            directories.map(each => (
              <div className="rounded-lg bg-white py-6 px-2 text-center">
                <img
                  className="h-20 mx-auto"
                  src={
                    each.image && each.image.path
                      ? `${IMAGE_BASE}${each.image.path}`
                      : ''
                  }
                  alt={each.title}
                  loading="lazy"
                />
                <h4 className="text-secondary mt-4">{each.title}</h4>
                <p className="text-sm leading-6 mt-4 opacity-70">
                  {each.description}
                </p>
              </div>
            ))
          ) : (
            <h2>Load Directories</h2>
          )}
        </div>
      </div>
    </div>
  );
};

DirectoryList.propTypes = {
  loadDirectoryRequest: PropTypes.func.isRequired,
  directories: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  directories: makeSelectDirectory(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(DirectoryList);
