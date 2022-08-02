/**
 *
 * PopUp
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import * as mapDispatchToProps from './actions';
import { makeSelectOne, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import SingleImageView from './Templates/SingleImage';
import CKEditorView from './Templates/CKEditor';
import SliderView from './Templates/Slider';

const key = 'popUp';

export const PopUp = props => {
  const { one, loadPopUpRequest, pop_up_key, loading } = props;

  const [open, setOpen] = useState(false);

  const [tempIndex, setTempIndex] = useState(0);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadPopUpRequest(pop_up_key);
  }, []);

  useEffect(() => { }, [open]);

  useEffect(() => {
    if (one && one.is_active !== undefined && one.is_active === false) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    if (one && one.timer) {
      const interval = setInterval(() => {
        setOpen(false);
      }, Number(one.timer * 1000)); // 1000- for 1 sec
      return () => clearInterval(interval);
    }
  }, [one]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOneByOneClose = tempIndex => {
    const { length } = one.templateRequirement;
    const newIndex = tempIndex + 1;
    if (newIndex < length) {
      setTempIndex(newIndex);
    } else {
      setOpen(false);
    }
  };
  //  show_img_one_by_one
  return (
    <>
      {one && one.template !== 'show_img_one_by_one' && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          aria-labelledby="new-folder"
          className="w-full"
        >
          <DialogContent>
            <div className="relative h-screen">
              {one.templateRequirement.length > 0 &&
                one.template === 'single_image' && (
                  <SingleImageView data={one.templateRequirement[0]} />
                )}
              {one.templateRequirement.length > 0 &&
                one.template === 'ck_editor' && (
                  <CKEditorView data={one.templateRequirement[0]} />
                )}
              {one.templateRequirement.length > 0 &&
                one.template === 'use_slider' && (
                  <SliderView data={one.templateRequirement} />
                )}
              <div
                className="rounded-full cursor-pointer absolute right-0 top-0 bg-red-500 hover:bg-red-600 py-1 px-4"
                onClick={handleClose}
              >
                <span className="text-white text-sm"> Skip This</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {one && one.template === 'show_img_one_by_one' && (
        <Dialog open={open} onClose={() => handleOneByOneClose(tempIndex)}>
          {one.templateRequirement.length > 0 &&
            one.template === 'show_img_one_by_one' && (
              <div className="relative">
                <SingleImageView data={one.templateRequirement[tempIndex]} />
                <div
                  className="rounded-tr cursor-pointer absolute right-0 top-0 bg-red-500 hover:bg-red-600 p-1 px-2"
                  onClick={() => handleOneByOneClose(tempIndex)}
                >
                  <span className="text-white text-sm"> X </span>
                </div>
              </div>
            )}
        </Dialog>
      )}
    </>
  );
};

PopUp.propTypes = {
  loadPopUpRequest: PropTypes.func.isRequired,
  one: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(PopUp);
