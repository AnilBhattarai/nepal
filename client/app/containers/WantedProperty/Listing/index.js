/**
 *
 * WantedPropertyListing
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from '../actions';
import { makeSelectListing, makeSelectLoading } from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import user from '../../../assets/img/user.svg';

import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Table from '../../../components/Table';
import Loader from '../../../assets/img/loader.svg';
import { IMAGE_BASE } from '../../App/constants';

const key = 'wantedProperty';

export const WantedProperty = props => {
  const {
    listing: { data, page, size, totaldata },
    loading,
    loadListingRequest,
    push,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadListingRequest();
    window.scrollTo(0, 0);
  }, []);

  // const handlePagination = ({ page, size }) => {
  //   loadListingRequest({ page, size });
  // };

  // const tablePagination = { page, size, totaldata };

  // const tableData = data.map(({ name, email, message, purpose, _id }) => [
  //   <div className="px-1 w-1/6">
  //     <div
  //       className="bg-white shadow h-48 rounded-sm p-4 flex flex-col justify-between"
  //       key={`wantedproperty-${_id}`}
  //     >
  //       <p className="">{message && message}</p>
  //       <div>
  //         <p className="font-bold text-black capitalize">{name && name}</p>
  //         <a
  //           className="text-black hover:underline text-sm"
  //           href={`mailto:${email && email}`}
  //         >
  //           {email && email}
  //         </a>
  //       </div>
  //     </div>
  //   </div>,
  // ]);

  // console.log(tableData);

  return (
    <>
      <Helmet>
        <title>Wanted Properties</title>
      </Helmet>
      <div className="bg-gray-50">
        <div className="container mx-auto py-20">
          <h2 className="text-xl lg:text-3xl uppercase font-medium">
            Wanted Properties
          </h2>
          {/* {loading && loading === true && <Loading />} */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {data &&
              data.map(each => (
                <div
                  className="p-5 bg-white shadow rounded-lg h-full overflow-hidden relative "
                  key={each._id}
                >
                  {/* <img style={{ maxHeight: '100%' }}
                      src={
                        each.wanted_image
                          ? `${IMAGE_BASE}${each.wanted_image.path}`
                          : defaultImage
                      }
                    /> */}

                  <div
                    className="flex flex-col justify-between"
                    key={`wantedproperty-${each._id}`}
                  >
                    {each.property_category &&
                      each.property_category.wanted_image &&
                      each.property_category.wanted_image.destination && (
                        <img
                          src={`${IMAGE_BASE}${
                            each.property_category.wanted_image.destination
                          }${each.property_category.wanted_image.filename}`}
                        />
                      )}
                    <div>
                      {each.purpose &&
                      each.purpose._id === '5d660baf7682d03f547a6c48' ? (
                        <span className="bg-orange-500 inline-block text-white font-bold rounded px-1 py-1 text-sm">
                          I Want In Rent
                        </span>
                      ) : (
                        <span className="bg-primary inline-block text-white font-bold rounded px-1 py-1 text-sm">
                          I Want To Buy
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-base py-5">
                      {each.message && each.message}
                    </h4>
                    <p className="font-bold text-sm opacity-70">
                      Targeted Location:
                    </p>
                    <p className="text-xs opacity-50">
                      {each.address.area_id.name}, {each.address.city_id.name},{' '}
                      {each.address.district_id.name}
                    </p>
                    <p className="text-primary font-bold mt-2">
                      Upto: {each.price} (
                      {each.price_label && each.price_label.title})
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

WantedProperty.propTypes = {
  loadListingRequest: PropTypes.func.isRequired,
  listing: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listing: makeSelectListing(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
)(WantedProperty);
