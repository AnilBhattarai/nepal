import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';
import reducer from './reducer';
import saga from './saga';

import StaticContentDiv from '../../components/StaticContentDiv';

import { IMAGE_BASE } from '../App/constants';

const key = 'reources';

const Resources = props => {
  const {
    all: { data, page, size, totaldata, msg },
    loading,
    loadAllRequest,
    query,
  } = props;

  const [tab, setTab] = useState('agent');

  const [seperated, setSeperated] = useState([]);

  useEffect(() => {
    loadAllRequest();
  }, []);

  useEffect(() => {
    let tempArray = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.resource_for === tab) {
        tempArray.push(element);
      }
    }
    setSeperated(tempArray);
  }, [data, tab]);

  return (
    <>
      <Helmet>
        <title>Events</title>
      </Helmet>

      <StaticContentDiv contentKey="resource-top" />
      <div className=" text-lg m-4 p-4 ml-8">
        <button
          type="button"
          onClick={() => setTab('agent')}
          className={`border-b-2 m-2 p-2 ${
            tab === 'agent' ? 'border-blue-600' : ''
          }  `}
        >
          Resources For Agent
        </button>
        <button
          type="button"
          onClick={() => setTab('developer')}
          className={`border-b-2 m-2 p-2 ${
            tab === 'developer' ? 'border-blue-600' : ''
          }  `}
        >
          Resources For Developer
        </button>
      </div>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <>
          {/* {tab === 'agent' && <StaticContentDiv contentKey="resource-agent" />}

          {tab === 'developer' && (
            <>
              <StaticContentDiv contentKey="resource-developer" />
            </>
          )} */}
          <div className="ml-8 ">
            {seperated && seperated.length > 0 ? (
              seperated.map(each => (
                <div className="border-b-2 w-1/3  pb-2 pt-2">
                  <div>
                    <i className="material-icons mr-4 text-base text-secondary text-4xl">
                      picture_as_pdf
                    </i>
                    {each.name}
                    <a
                      href={`${IMAGE_BASE}${each.file_id.path}`}
                      target="_blank"
                    >
                      <i className="material-icons  text-base text-secondary text-4xl transform rotate-180 float-right">
                        publish
                      </i>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <h3>No data found</h3>
            )}
          </div>
        </>
      )}

      {/* <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      aria-label="full width tabs example"
    >
      <Tab label="Item One" {...a11yProps(0)} />
      <Tab label="Item Two" {...a11yProps(1)} />
      <Tab label="Item Three" {...a11yProps(2)} />
    </Tabs>

    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={value}
      onChangeIndex={handleChangeIndex}
    >
      <TabPanel value={value} index={0} dir={theme.direction}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
    </SwipeableViews> */}
    </>
  );
};

Resources.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(Resources);
