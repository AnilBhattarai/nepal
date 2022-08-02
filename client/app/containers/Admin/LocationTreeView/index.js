/**
 *
 * LocationTreeView
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import * as mapDispatchToProps from './actions';
import { makeSelectLocation } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'locationTreeView';
const childCount = (array, id, findKey) =>
  array.filter(arr => arr[findKey] === id).length;

export const LocationTreeView = props => {
  const {
    loadLocationRequest,
    setActiveRequest,
    location: { allState, allDistrict, allVdc, allArea },
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [openSet, setOpenSet] = useState({});

  useEffect(() => {
    loadLocationRequest();
  }, []);

  const handleCollapse = () => {
    setOpenSet({});
  };

  useEffect(() => {
    if (allState && allState.length > 0) {
      allState.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }
  }, [allState]);

  useEffect(() => {
    if (allDistrict && allDistrict.length > 0) {
      allDistrict.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }
  }, [allDistrict]);

  useEffect(() => {
    if (allVdc && allVdc.length > 0) {
      allVdc.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }
  }, [allVdc]);

  useEffect(() => {
    if (allArea && allArea.length > 0) {
      allArea.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }
  }, [allArea]);

  const handleExpand = () => {
    const ids = [];
    const idsObj = {};
    allState.map(each => {
      ids.push(each._id);
    });
    allDistrict.map(each => {
      ids.push(each._id);
    });
    allVdc.map(each => {
      ids.push(each._id);
    });
    allArea.map(each => {
      ids.push(each._id);
    });
    ids.map(e => (idsObj[e] = true));
    setOpenSet(idsObj);
  };

  const handleSetClick = val => {
    setOpenSet({ ...openSet, [val]: !openSet[val] });
  };

  //   _id: "5dc2b85acb116c2448f5d001"
  // is_active: true
  // is_sub: false

  const handleCheckedChange = (name, id) => event => {
    setActiveRequest({
      key: name,
      data: { is_active: event.target.checked, _id: id },
    });
  };

  console.log('openSet', openSet);

  return (
    <>
      <div>
        <Helmet>
          <title>Location Tree View</title>
          <meta name="description" content="Description of LocationTreeView" />
        </Helmet>
      </div>
      <div className="px-4 mt-5">
        <button className="mb-2" type="button" onClick={handleCollapse}>
          Collapse All
        </button>
        <span className="text-gray-800 px-4">|</span>
        <button className="mb-2" type="button" onClick={handleExpand}>
          Expand All
        </button>
      </div>
      <div className="bg-white flex flex-wrap justify-between p-2 pb-0 px-4">
        {allState &&
          allState.map(state => (
            <ul
              className="w-full md:w-1/3 border mb-2 -ml-2 -mr-2"
              key={state._id}
            >
              <li className="py-2 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm">
                <div
                  className="flex justify-between"
                  // onClick={() => handleSetClick(state._id)}
                >
                  <div
                    className="w-56 flex flexwrap"
                    onClick={() => handleSetClick(state._id)}
                  >
                    {openSet[state._id] ? (
                      <div className="text-grey-darker hover:text-primary">
                        <IndeterminateCheckBoxOutlinedIcon />
                      </div>
                    ) : (
                      <div className="text-grey-darker hover:text-primary">
                        <AddBoxOutlinedIcon />
                      </div>
                    )}
                    {` ${state.name}`}
                    {` (${childCount(allDistrict, state._id, 'state_id')})`}
                  </div>
                  <Checkbox
                    checked={state.is_active || false}
                    tabIndex={-1}
                    onClick={handleCheckedChange('state', state._id)}
                    color="default"
                    style={{
                      paddingTop: 0,
                      paddingBottom: '0',
                      borderLeft: '1px solid #eeeeee',
                      borderRadius: '0',
                    }}
                  />
                </div>
              </li>
              <Collapse in={openSet[state._id]} timeout="auto" unmountOnExit>
                <div className="list-reset pl-4">
                  {allDistrict
                    .filter(districts => districts.state_id === state._id)
                    .map(district => (
                      <div key={district._id}>
                        <li className="border-b border-gray-200 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm">
                          <div className="flex justify-between">
                            <div
                              className="w-56 flex flexwrap"
                              onClick={() => {
                                handleSetClick(district._id);
                              }}
                            >
                              {openSet[district._id] ? (
                                <div className="text-grey-darker hover:text-primary">
                                  <IndeterminateCheckBoxOutlinedIcon />
                                </div>
                              ) : (
                                <div className="text-grey-darker hover:text-primary">
                                  <AddBoxOutlinedIcon />
                                </div>
                              )}
                              {` ${district.name}`}
                              {` (${childCount(
                                allVdc,
                                district._id,
                                'district_id',
                              )})`}
                            </div>

                            <Checkbox
                              className="bg-red-800"
                              checked={district.is_active || false}
                              tabIndex={-1}
                              onClick={handleCheckedChange(
                                'district',
                                district._id,
                              )}
                              style={{
                                paddingTop: 0,
                                paddingBottom: '0',
                                color: '#0291DDed',
                                borderLeft: '1px solid #eeeeee',
                                borderRadius: '0',
                              }}
                            />
                          </div>
                        </li>
                        <Collapse
                          in={openSet[district._id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <div className="list-reset pl-4">
                            {allVdc
                              .filter(vdcs => vdcs.district_id === district._id)
                              .map(vdc => (
                                <div key={vdc._id}>
                                  <li className="border-b border-gray-200 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-800 hover:text-primary text-sm">
                                    <div
                                      className="flex justify-between"
                                      // onClick={() => handleSetClick(vdc._id)}
                                    >
                                      <div
                                        className="w-56 flex flexwrap"
                                        onClick={() => handleSetClick(vdc._id)}
                                      >
                                        {openSet[vdc._id] ? (
                                          <div className="text-grey-darker hover:text-primary">
                                            <IndeterminateCheckBoxOutlinedIcon />
                                          </div>
                                        ) : (
                                          <div className="text-grey-darker hover:text-primary">
                                            <AddBoxOutlinedIcon />
                                          </div>
                                        )}
                                        {` ${vdc.name}`}
                                        {` (${childCount(
                                          allArea,
                                          vdc._id,
                                          'vdcmunicipality_id',
                                        )})`}
                                      </div>

                                      <Checkbox
                                        checked={vdc.is_active || false}
                                        tabIndex={-1}
                                        onClick={handleCheckedChange(
                                          'vdc',
                                          vdc._id,
                                        )}
                                        color="default"
                                        style={{
                                          paddingTop: 0,
                                          paddingBottom: '0',
                                          color: '#4baea0',
                                          borderLeft: '1px solid #eeeeee',
                                          borderRadius: '0',
                                        }}
                                      />
                                    </div>
                                  </li>
                                  <Collapse
                                    in={openSet[vdc._id]}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <div className="list-reset">
                                      {allArea
                                        .filter(
                                          areas =>
                                            areas.vdcmunicipality_id ===
                                            vdc._id,
                                        )
                                        .map(area => (
                                          <div
                                            className="pl-12 bg-gray-200 mb-1 last:mb-0"
                                            key={area._id}
                                          >
                                            <li className="flex justify-between">
                                              <div className="w-56 flex flexwrap">
                                                {` ${area.name}`}
                                              </div>
                                              <Checkbox
                                                checked={
                                                  area.is_active || false
                                                }
                                                tabIndex={-1}
                                                onClick={handleCheckedChange(
                                                  'area',
                                                  area._id,
                                                )}
                                                color="primary"
                                                style={{
                                                  paddingTop: 0,
                                                  paddingBottom: '0',
                                                  borderLeft:
                                                    '1px solid #FFFFFF',
                                                  borderRadius: '0',
                                                }}
                                              />
                                            </li>
                                          </div>
                                        ))}
                                    </div>
                                  </Collapse>
                                </div>
                              ))}
                          </div>
                        </Collapse>
                      </div>
                    ))}
                </div>
              </Collapse>
            </ul>
          ))}
      </div>
    </>
  );
};

LocationTreeView.propTypes = {
  // defaultActionRequest: PropTypes.func.isRequired,
  // defaultData: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(LocationTreeView);
