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
import { makeSelectCollections } from './selectors';

import './Home.css';

const key = 'homeComponents';

export const CollectionList = props => {
  const { loadCollectionRequest, collections } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadCollectionRequest();
  }, []);

  return (
    <>
      {collections && collections.length > 0 && (
        <div class="bg-white py-10 hidden lg:block">
          <div class="container mx-auto lg:flex items-center">
            <div class="lg:w-1/3">
              <span class="bg-secondary rounded px-3 text-sm leading-6 inline-block text-white">
                collections
              </span>
              <h2 class="font-black text-6xl mt-6 uppercase">
                Useful Collections
              </h2>
              <p class="opacity-70 text-lg mt-6">
                Fill up your property details and sell without any hassle.
              </p>
            </div>

            <div class="w-2/3">
              <ul className="masonary p-20">
                {collections && collections.length > 0 ? (
                  collections.map(each => (
                    <li>
                      <Link
                        to={each.link}
                        className="rounded-2xl block overflow-hidden h-full relative"
                      >
                        <img
                          className="object-cover"
                          src={
                            each.media && each.media.path
                              ? `${IMAGE_BASE}${each.media.path}`
                              : ''
                          }
                          alt={each.title}
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 w-full px-5 mb-5">
                          <h3 className="text-white mt-4 text-2xl font-bold">
                            {each.title}
                          </h3>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <h2>Load collections</h2>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

CollectionList.propTypes = {
  loadCollectionRequest: PropTypes.func.isRequired,
  collections: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  collections: makeSelectCollections(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(CollectionList);
