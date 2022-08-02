/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dropzone from 'react-dropzone';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {
  makeSelectMedia,
  makeSelectEnum,
  makeSelectErrors,
  makeSelectFloorPlanImages,
  makeSelectMediaLoading,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import DragDrop from '../../../../assets/img/drag_drop.png';
import { IMAGE_BASE } from '../../../App/constants';

import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import OpenWithIcon from '@material-ui/icons/OpenWith';

const DragHandle = SortableHandle(() => (
  <span className="hover:shadow-lg ease-in-out cursor-move">
    <OpenWithIcon />
  </span>
));

const SortableItem = SortableElement(({ value }) => (
  <div className="w-full md:w-1/2 -ml-2 -mr-2"> {value}</div>
));

const SortableList = SortableContainer(
  ({ items, handleCaptionChange, handleDelete, errors, enums }) => {
    return (
      <div className="flex flex-wrap justify-between px-2">
        {items.map((each, index) => (
          <SortableItem
            key={index}
            index={index}
            value={
              <div
                className="flex items-center mb-2 border rounded"
                key={each.image && each.image._id}
              >
                <div className="w-10 text-center my-auto border-r text-gray-700">
                  <DragHandle />
                </div>
                <div className="p-4 relative" key={index}>
                  <input
                    className="inputbox inputbox-sm"
                    placeholder="Enter title"
                    id="grid-basic-title"
                    type="text"
                    value={each.title || ''}
                    onChange={handleCaptionChange(index)}
                  />
                  <div className="h-40 w-40 rounded overflow-hidden mt-2">
                    <img
                      className="h-full w-full object-cover"
                      src={`${IMAGE_BASE}${each.image.path}`}
                      alt="property"
                    />
                  </div>
                  <div className="mt-1 hidden">
                    {each.image.encoding} | {each.image.mimetype} |{' '}
                    {each.image.size}
                  </div>
                  <button
                    type="button"
                    className="text-sm text-red-500 flex items-center"
                    onClick={() => handleDelete(each.image._id)}
                  >
                    <i className="material-icons text-red-500 mr-2 text-sm">
                      delete_forever
                    </i>{' '}
                    Delete
                  </button>
                </div>
              </div>
            }
          />
        ))}
      </div>
    );
  },
);

const ProjectFloor = props => {
  const {
    addFloorPlanRequest,
    deleteFloorPlanRequest,
    images,
    media_loading,
    match,
    enums,
    errors,
    setFloorPlanCaption,
    floorPlan,
    deleteFloorPlanSuccess,
    setOneValue,
  } = props;

  // const [tempImage, setTempImg] = React.useState(defaultImage);

  const handleAdd = (files, name) => {
    // console.log('files', files);
    // console.log('name', name);
    addFloorPlanRequest(files);
    // console.log('images', images);
    // setDocumentValue(...images);
  };

  const copyToClipboard = textField => {
    const el = document.createElement('textarea');
    el.value = textField;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleDelete = id => {
    deleteFloorPlanSuccess(id);
  };

  const handleCaptionChange = index => e => {
    setFloorPlanCaption({ index, value: e.target.value });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newImage = arrayMove(floorPlan, oldIndex, newIndex);
    // setOneValue({ key: 'image', value: newImage });
    setOneValue({
      key: 'project_floor_plan',
      value: newImage,
    });
  };

  // if (media_loading) return <Loading />;

  return (
    <div className="w-full">
      {media_loading ? <Loading /> : ''}
      <Dropzone onDrop={handleAdd}>
        {({ getRootProps, getInputProps }) => (
          <div
            className="bg-gray-100 rounded p-2 mb-4"
            style={{
              boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,0.41)',
            }}
          >
            <div className="text-primary text-center border-2 border-gray-400 rounded border-dashed cursor-pointer py-6 text-center hover:border-secondary dropzone-border">
              <div
                className="h-full w-full focus:outline-none"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <i className="material-icons text-secondary">cloud_upload</i>
                <p className="text-primary font-bold text-sm">
                  Drag Files or Click to Upload
                </p>
              </div>
            </div>
          </div>
        )}
      </Dropzone>

      {errors.project_floor_plan ? (
        <div id="component-error-text">
          {errors.project_floor_plan[0].title}
        </div>
      ) : (
        ''
      )}
      {/* <div className="flex flex-wrap -mx-4">
        {floorPlan &&
          floorPlan.map((each, index) => (
            <div className="p-4 relative" key={index}>
              <input
                className="inputbox inputbox-sm"
                placeholder="Enter title"
                id="grid-basic-title"
                type="text"
                value={each.title || ''}
                onChange={handleCaptionChange(index)}
              />
              <div className="h-40 w-40 rounded overflow-hidden mt-2">
                <img
                  className="h-full w-full object-cover"
                  src={`${IMAGE_BASE}${each.image.path}`}
                  alt="property"
                />
              </div>
              <div className="mt-1 hidden">
                {each.image.encoding} | {each.image.mimetype} |{' '}
                {each.image.size}
              </div>
              <button
                type="button"
                className="text-sm text-red-500 flex items-center"
                onClick={() => handleDelete(each.image._id)}
              >
                <i className="material-icons text-red-500 mr-2 text-sm">
                  delete_forever
                </i>{' '}
                Delete
              </button>
            </div>
          ))}
      </div> */}
      <SortableList
        axis="xy"
        items={floorPlan}
        onSortEnd={onSortEnd}
        useDragHandle
        handleCaptionChange={handleCaptionChange}
        errors={errors}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  media: makeSelectMedia(),
  enums: makeSelectEnum(),
  errors: makeSelectErrors(),
  floorPlan: makeSelectFloorPlanImages(),
  media_loading: makeSelectMediaLoading(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectFloor);
