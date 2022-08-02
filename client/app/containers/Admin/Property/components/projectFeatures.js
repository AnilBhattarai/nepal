/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import Dropzone from 'react-dropzone';

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';

import {
  //   makeSelectMedia,
  makeSelectEnum,
  makeSelectErrors,
  makeSelectProjectFeatures,
  makeSelectMediaLoading,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
// import DragDrop from '../../../../assets/img/drag_drop.png';
import { IMAGE_BASE } from '../../../App/constants';

import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';

const ProjectFeatures = props => {
  const {
    addProjectFeatureRequest,
    deleteProjectFeatureRequest,
    images,
    media_loading,
    match,
    enums,
    errors,
    setProjectFeature,
    setProjectValue,
    projectFeatures,
    classes,
    setOneValue,
  } = props;

  // const [tempImage, setTempImg] = React.useState(defaultImage);

  const handleAdd = () => {
    addProjectFeatureRequest();
    // console.log('images', images);
    // setDocumentValue(...images);
  };

  //   const handleDelete = id => {
  //     deleteProjectFeatureRequest(id);
  //   };
  const handleDelete = index => () => {
    const chipData = [...projectFeatures];

    chipData.splice(index, 1);
    setOneValue({ key: 'project_features', value: chipData });
  };

  const handleFeatureChange = index => e => {
    // console.log('value from handleCaptionChange', e.target.value, index);
    setProjectFeature({ index, value: e.target.value });
  };

  const handleValueChange = index => e => {
    // console.log('value from handleCaptionChange', e.target.value, index);
    setProjectValue({ index, value: e.target.value });
  };

  // if (media_loading) return <Loading />;

  return (
    <div className="w-full">
      {media_loading ? <Loading /> : ''}
      <div className="w-full md:w-1/3 pb-4">
        <div style={{ display: 'flex' }}>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            round="true"
            onClick={handleAdd}
            elevation={0}
            size="small"
          >
            <AddIcon />
          </Fab>
          <div id="component-error-text">
            {errors.project_features ? errors.project_features : ''}
          </div>
        </div>
      </div>
      <div className="w-full py-4">
        <div className="flex flex-wrap">
          {projectFeatures &&
            projectFeatures.map((each, index) => (
              <div className="w-1/3 p-2 relative" key={index}>
                <select
                  className="inputbox"
                  native="true"
                  value={each.feature}
                  onChange={handleFeatureChange(index)}
                // onChange={() => alert('hello')}
                // inputprops={{ value: country || '', name: 'country' }}
                >
                  <option key="0" name="choose" value="area-unit">
                    Choose Project features
                  </option>
                  {enums.project_features &&
                    enums.project_features.map(a => (
                      <option key={a._id} name={a.title} value={a._id}>
                        {a.title}
                      </option>
                    ))}
                </select>
                <div>
                  <label
                    className="block font-bold text-black text-sm my-2"
                    htmlFor="grid-value"
                  >
                    Title
                  </label>
                  <input
                    className="inputbox w-full"
                    id="grid-basic-value"
                    type="text"
                    value={each.value || ''}
                    onChange={handleValueChange(index)}
                  />
                </div>
                <button
                  type="button"
                  className="bg-black w-8 rounded-full h-8 text-center mt-2 hover:bg-red-500"
                  onClick={handleDelete(index)}
                >
                  <i className="material-icons text-white text-sm">
                    delete_forever
                  </i>
                </button>
              </div>
            ))
            // ) : (
            //   <span> None </span>
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  enums: makeSelectEnum(),
  errors: makeSelectErrors(),
  projectFeatures: makeSelectProjectFeatures(),
  media_loading: makeSelectMediaLoading(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectFeatures);
