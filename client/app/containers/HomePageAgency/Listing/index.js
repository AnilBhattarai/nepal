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
import Select from 'react-select';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from '../actions';
import {
  makeSelectListing,
  makeSelectLoading,
  makeSelectTotal,
  makeSelectLoadingMore,
} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import user from '../../../assets/img/user.svg';

import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Table from '../../../components/Table';
import Loader from '../../../assets/img/loader.svg';

import { IMAGE_BASE } from '../../App/constants';
import defaultImage from '../../../assets/img/logo.png';
import StaticContentDiv from '../../../components/StaticContentDiv';

const key = 'homePageAgency';

export const HomePageAgencyListing = props => {
  const {
    listing: { data, page, size, totaldata },
    loading,
    loadListingRequest,
    loadTotalRequest,
    total,
    push,
    loadMoreRequest,
    loading_more,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadListingRequest();
    loadTotalRequest();
    window.scrollTo(0, 0);
  }, []);

  const handlePagination = ({ page, size }) => {
    loadListingRequest({ page, size });
  };

  const handleFilter = name => event => {
    loadListingRequest({ page, size, [name]: event.target.value });
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    loadMoreRequest({ page: newPage, size });
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: '#fff',
      color: '#2c357d',
      border: 'none',
      position: 'relative',
      height: '100%',
      width: '100%',
      border: '1px solid #ccc',
      // match with the menu
      // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      // borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        cursor: 'pointer',
        // Overwrittes the different states of border
        // borderColor: state.isFocused ? "red" : "blue"
      },
    }),

    input: state => ({
      color: '#2c357d',
    }),

    placeholder: state => ({
      color: state.isFocused ? '#2c357d' : '#8e90a7',
      position: 'absolute',
    }),

    clearIndicator: state => ({
      color: '#8e90a7',
    }),

    dropdownIndicator: state => ({
      color: state.isFocused ? '#8e90a7' : '#8e90a7',
      padding: '0 8px',
    }),

    singleValue: state => ({
      color: '#8e90a7',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      flex: 1,
      '& span span': {
        color: '#8e90a7',
        whiteSpace: 'nowrap',
        display: 'block',
        width: 12,
      },
    }),

    indicatorSeparator: state => ({
      display: 'none',
    }),

    // indicatorsContainer: (state) => ({
    //   padding: 0,
    // }),

    menu: base => ({
      ...base,
      // override border radius to match the box
      // kill the gap
      color: '#2c357d',
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      fontSize: '14px',
    }),
  };

  const totalAgencies =
    total && total.length > 0
      ? total.map(function state(each) {
          return {
            value: each._id,
            label: each.title,
          };
        })
      : [];

  const handleChange = () => event => {
    push(`/agent/${event.value}`);
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({
      title,
      slug_url,
      email,
      phone,
      address,
      mobile,
      description,
      logo,
      _id,
      agents_count,
      product_count_by_purpose,
      total_Property,
      premium,
      product_count_by_type,
    }) => [
      <div key={`agency-${_id}`} className="w-full h-full">
        <Link to={`/agent/${_id}`}>
          <div className="rounded relative h-full bg-white shadow-sm cursor-pointer hover:border-white ease-in-out">
            <div className="">
              <div className="w-full h-24 mx-auto overflow-hidden px-12 py-4 flex justify-center items-center">
                <img
                  className="max-h-full"
                  src={logo ? `${IMAGE_BASE}${logo.path}` : defaultImage}
                  alt="agency name"
                />
                {premium && premium === true && (
                  <span className="bg-yellow-400 absolute top-0 right-0 rounded-full py-2 px-2 mt-2 mr-2 text-xs">
                    Premium
                  </span>
                )}
              </div>
              <div className="lex-1 text-center w-48 mx-auto">
                <span className="capitalize block text-base font-bold text-black">
                  {title || ''}
                </span>
                {/* <span className="text-gray-600 text-xs block">
                    // {email || ''}
                  </span> */}
              </div>

              <div className="flex justify-center items-center py-4">
                {/* <div className="w-1/2 text-center">
                  <span className="text-primary text-2xl font-bold block">
                    {agents_count || '0'}
                  </span>
                  <span className="opacity-50">Agents</span>
                </div> */}
                {product_count_by_type &&
                  product_count_by_type.length > 0 &&
                  product_count_by_type.map(each => (
                    <div className="w-1/2 text-center">
                      <span className="text-primary text-2xl font-bold block">
                        {each.sum || '0'}
                      </span>
                      <span className="opacity-50">{each.cat}</span>
                    </div>
                  ))}
                <div className="w-1/2 text-center">
                  <span className="text-primary text-2xl font-bold block">
                    {total_Property || '0'}
                  </span>
                  <span className="opacity-50">Properties</span>
                </div>
              </div>
              {/* <span className="text-gray-600 text-sm block flex justify-center">
                  {product_count_by_purpose &&
                  product_count_by_purpose.length > 0
                    ? product_count_by_purpose.map(purpose => (
                        <p>
                          {purpose.cat}: {purpose.sum}
                        </p>
                      ))
                    : ''}
                </span> */}
            </div>
            {/* {agents_count !== 0 && <p>{agents_count} Agents</p>} */}
          </div>
        </Link>
      </div>,
    ],
  );

  return (
    <>
      <Helmet>
        <title>Agency Listing</title>
      </Helmet>
      <div className="bg-blue-50">
        <StaticContentDiv contentKey="agency-list" />

        <div className="container mx-auto py-12">
          {loading && loading === true && <Loading />}
          <div loading={loading.toString()}>
            <div className="flex justify-between mt-5">
              <h2 className="text-3xl font-bold text-gray-600">
                Showing {`${data.length} of ${totaldata}`}
              </h2>

              <div className="inline-flex items-center">
                <span className="font-bold text-sm mr-4">Filter By</span>
                <select
                  className="bg-white h-10 px-6 py-2 text-sm"
                  onChange={handleFilter('find_old')}
                >
                  <option value="">Choose</option>

                  <option value="false">Newest</option>
                  <option value="true">Oldest</option>
                </select>
              </div>
            </div>

            {/* <div className="w-full lg:w-2/5 px-1 mb-1 lg:mb-1">
            <Select
              styles={customStyles}
              placeholder="Search Agencies"
              onChange={handleChange()}
              options={totalAgencies}
              isSearchable
            />
          </div> */}
            <div className="table-grid col-4 mt-10">
              <Table tableData={tableData} />
              {loading_more && (
                <div className="text-center">
                  <img src={Loader} alt="Loading" />
                </div>
              )}
              {data.length < totaldata && (
                <button
                  type="button"
                  className="btn w-full border border-secondary bg-blue-100 mb-8 text-secondary mt-4"
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HomePageAgencyListing.propTypes = {
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
  total: makeSelectTotal(),
  loading_more: makeSelectLoadingMore(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
)(HomePageAgencyListing);
