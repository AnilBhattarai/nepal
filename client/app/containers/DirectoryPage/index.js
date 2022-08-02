import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import withStyles from '@material-ui/core/styles/withStyles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectCategories,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import tempImg from '../../images/default.jpg';
import { IMAGE_BASE } from '../App/constants';
import Loading from '../../components/Loading';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

const key = 'directoryPage';

const BindIndividual = (data, title, path, linkKey, handleSelect) => {
  let k = '';
  const gData = {};
  if (data && data.length) {
    for (let i = 0; i < data.length; i++) {
      data[i].title = title ? data[i][title] : data[i].name;
      k = data[i].title.charAt(0).toUpperCase();
      if (gData[k] && gData[k].length) {
        gData[k].push(data[i]);
      } else {
        gData[k] = [data[i]];
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Directory Page</title>
      </Helmet>
      <div className="p-8 flex flex-wrap">
        {gData &&
          Object.keys(gData).map(x => (
            <div className="w-1/4 p-4" key={`${x}`}>
              <div className="text-5xl opacity-50 font-bold border-b border-blue-800">
                {x}
              </div>
              {gData[x] &&
                gData[x].map(y => (
                  <div
                    key={y._id}
                    className="cursor-pointer block no-underline text-sm mt-2 text-blue hover:underline"
                    onClick={() => handleSelect(y)}
                  >
                    {y.title}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-next`} onClick={onClick}>
      <i className="material-icons"> keyboard_arrow_right </i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-prev`} onClick={onClick}>
      <i className="material-icons"> keyboard_arrow_left </i>
    </div>
  );
}

const DirectoryPage = props => {
  const {
    all: { data },
    loading,
    loadAllRequest,
    categories,
    loadEnumRequest,
  } = props;
  const [activeTab, setActiveTab] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleSelect = selected => {
    setSelectedData(selected);
    setShowInfo(true);
  };

  const handleClose = () => {
    setShowInfo(false);
  };

  const changeTab = id => {
    setActiveTab(id);
    let tempData = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].service_category === id) {
        tempData.push(data[index]);
      }
    }
    setCurrentData(tempData);
  };
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    window.scrollTo(0, 0);
    loadAllRequest();
    loadEnumRequest();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveTab(categories[0]._id);
    }

    let tempData = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].service_category === categories[0]._id) {
        tempData.push(data[index]);
      }
    }
    setCurrentData(tempData);
  }, [categories]);

  let settings = {
    dots: false,
    adaptiveHeight: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToScroll: 5,
    slidesToShow: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  try {
    if (settings && typeof settings === 'string') {
      settings = JSON.parse(settings);
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-center uppercase text-primary text-2xl">
        <span className="text-4xl">Welcome to</span>
        <br />
        The <span className="text-orange-500">largest</span> directory
      </h1>
      <p className="text-center mt-4 text-gray-700">
        Where you can find builders, contractors, engineers, architectures,
        interiors
      </p>

      <div className="mt-4 bg-gray-100 rounded-lg border border-gray-400 directorySlider">
        <Slider {...settings} className="border-b border-gray-400 relative">
          {categories &&
            categories.length > 0 &&
            categories.map(each => (
              <button
                className={` tracking-tight truncate font-bold text-blue px-6 py-4 whitespace-no-wrap ${activeTab === each._id ? `border-b-2 border-orange-600` : ''
                  }`}
                style={
                  activeTab === each._id
                    ? {
                      boxShadow: 'inset 0 -2px 0 #F78F17',
                    }
                    : {}
                }
                onClick={() => changeTab(each._id)}
              >
                {each.title}
              </button>
            ))}
        </Slider>

        {categories &&
          categories.length > 0 &&
          categories.map(each => (
            <>
              {activeTab === each._id &&
                BindIndividual(
                  currentData,
                  'name',
                  '/developer/&developer_id=',
                  '_id',
                  handleSelect,
                )}
            </>
          ))}
      </div>

      {selectedData && selectedData !== null && (
        <Dialog open={showInfo} onClose={handleClose}>
          <DialogTitle>
            Information
            <div
              className="rounded-full inline-flex items-center justify-center mr-4 mt-4 cursor-pointer absolute right-0 top-0 bg-red-500 text-white hover:bg-red-600 w-6 h-6"
              onClick={handleClose}
            >
              <i className="material-icons"> close </i>
            </div>
          </DialogTitle>
          <DialogContent>
            <p>Name: {selectedData.name || ''}</p>
            <p>Address: {selectedData.address || ''}</p>
            <p>Email: {selectedData.email || ''}</p>
            <p>
              Phone:{' '}
              {selectedData.phone && selectedData.phone.length > 0
                ? selectedData.phone.join(',')
                : ''}
            </p>
            <p>Website: {selectedData.website || ''}</p>
            <p>Description: {selectedData.description || ''}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
DirectoryPage.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.object.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  categories: makeSelectCategories(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps },
);

export default compose(
  withConnect,
  memo,
)(DirectoryPage);
