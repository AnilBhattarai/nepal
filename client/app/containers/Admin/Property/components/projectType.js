/* eslint-disable indent */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dropzone from 'react-dropzone';

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import { IMAGE_BASE } from '../../../App/constants';

import {
  //   makeSelectMedia,
  makeSelectEnum,
  makeSelectErrors,
  makeSelectProjectType,
  makeSelectMediaLoading,
  makeSelectOne,
  makeSelectTempFeature,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
// import DragDrop from '../../../../assets/img/drag_drop.png';

import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';

const DragHandle = SortableHandle(() => (
  <span className="text-secondary cursor-move">
    <OpenWithIcon />
  </span>
));

const SortableItem = SortableElement(({ value }) => <div>{value}</div>);

const SortableList = SortableContainer(
  ({
    items,
    handleImageDelete,
    handleDelete,
    handleTypeChange,
    handleAreaChange,
    handlePriceChange,
    handleImageAdd,
    enums,
    one,
    handleAddFloor,
    handleFloorChange,
    handleFloorImageAdd,
    handleTempFeatureChange,
    handleAddFeature,
    temp_feature,
    handleDeleteFloor,
    handleDeleteFeatureList,
    handleDeleteFeatureImage,
  }) => (
    <div className="w-full py-4">
      {items &&
        items.map((each, index) => (
          <SortableItem
            key={index}
            index={index}
            value={
              <div
                className="px-2 relative bg-gray-100 rounded mb-2"
                key={index}
              >
                <div className="flex justify-end pt-1">
                  <DragHandle />
                  <button
                    type="button"
                    className="w-8 rounded-full h-8 text-center text-red-500 hover:text-red-700 ml-2"
                    onClick={handleDelete(index)}
                  >
                    <i className="material-icons text-2xl">delete_forever</i>
                  </button>
                </div>
                {/* type flats */}
                {(one.basic.property_category === '5d6643ed8f12c7035cd39316' ||
                  one.basic.property_category === '') && (
                  <>
                    <div className="flex mb-2">
                      <div className="w-1/6 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Property Type
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.type || ''}
                          onChange={handleTypeChange(index, 'type')}
                        />
                      </div>
                      <div className="w-1/6 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Area
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.area || ''}
                          onChange={handleAreaChange(index)}
                        />
                      </div>
                      <div className="w-1/6 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Area Unit
                        </label>
                        <select
                          className="inputbox"
                          native="true"
                          name="total_area_unit"
                          value={each.area_option}
                          onChange={handleTypeChange(index, 'area_option')}
                        >
                          <option
                            key="0"
                            name="choose"
                            value="area-unit"
                            disabled={
                              each.area_option !== undefined &&
                              each.area_option !== ''
                            }
                          >
                            Choose area unit
                          </option>
                          {enums.area_unit.map(unit => (
                            <option
                              key={unit._id}
                              name={unit.title}
                              value={unit._id}
                            >
                              {unit.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-1/6 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Price
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="number"
                          value={each.price || ''}
                          onChange={handlePriceChange(index)}
                        />
                      </div>
                      <div className="w-1/6 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Min Price
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="number"
                          value={each.minimum_price || ''}
                          onChange={handleTypeChange(index, 'minimum_price')}
                        />
                      </div>
                      <div className="w-1/6 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Max Price
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="number"
                          value={each.maximum_price || ''}
                          onChange={handleTypeChange(index, 'maximum_price')}
                        />
                      </div>

                      <div className="w-1/6 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Total Unit Count
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="number"
                          value={each.unit_count || ''}
                          onChange={handleTypeChange(index, 'unit_count')}
                        />
                      </div>

                      <div className="w-1/6 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Total Unit
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.total_unit || ''}
                          onChange={handleTypeChange(index, 'total_unit')}
                        />
                      </div>

                      <div className="w-1/5">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Available Unit
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.available_unit || ''}
                          onChange={handleTypeChange(index, 'available_unit')}
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-1 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Bathroom
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.bathroom || ''}
                          onChange={handleTypeChange(index, 'bathroom')}
                        />
                      </div>

                      <div className="flex-1 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Bedroom
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.bedroom || ''}
                          onChange={handleTypeChange(index, 'bedroom')}
                        />
                      </div>

                      <div className="flex-1 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Kitchen
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.kitchen || ''}
                          onChange={handleTypeChange(index, 'kitchen')}
                        />
                      </div>

                      <div className="flex-1 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Puja Room
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.puja_room || ''}
                          onChange={handleTypeChange(index, 'puja_room')}
                        />
                      </div>

                      <div className="flex-1 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Living Room
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.living_room || ''}
                          onChange={handleTypeChange(index, 'living_room')}
                        />
                      </div>
                      <div className="flex-1 px-1">
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Floor
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="number"
                          value={each.floor_no || ''}
                          onChange={handleTypeChange(index, 'floor_no')}
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* type flasts end */}

                {/* type House */}

                {one.basic.property_category === '5d660cb27682d03f547a6c4a' && (
                  <>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Type
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="text"
                          value={each.type || ''}
                          onChange={handleTypeChange(index, 'type')}
                        />
                      </div>
                      <div>
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Min Price
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="number"
                          value={each.minimum_price || ''}
                          onChange={handleTypeChange(index, 'minimum_price')}
                        />
                      </div>
                      <div>
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Max Price
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="number"
                          value={each.maximum_price || ''}
                          onChange={handleTypeChange(index, 'maximum_price')}
                        />
                      </div>

                      <div>
                        <label
                          className="block font-bold text-black text-sm mb-2"
                          htmlFor="grid-value"
                        >
                          Unit Count
                        </label>
                        <input
                          className="inputbox"
                          id="grid-basic-value"
                          type="number"
                          value={each.unit_count || ''}
                          onChange={handleTypeChange(index, 'unit_count')}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap mt-4 -mx-1">
                      {each.floor_plan &&
                        each.floor_plan.length > 0 &&
                        each.floor_plan.map((floor, fIndex) => (
                          <div className="w-1/4 px-2 mb-6">
                            <div>
                              <label
                                className="block font-bold text-black text-sm mb-2"
                                htmlFor="grid-value"
                              >
                                Floor Name
                              </label>
                              <input
                                className="inputbox"
                                id="grid-basic-value"
                                type="text"
                                value={floor.floor_name || ''}
                                onChange={handleFloorChange(
                                  index,
                                  'floor_name',
                                  fIndex,
                                )}
                              />
                            </div>
                            <div className="mt-2">
                              <label
                                className="block font-bold text-black text-sm mb-2"
                                htmlFor="grid-value"
                              >
                                Feature List
                              </label>

                              <input
                                className="inputbox"
                                id="grid-basic-value"
                                type="text"
                                placeholder="Type & Press Enter "
                                // value={
                                //   temp_feature[index] &&
                                //   temp_feature[index][fIndex]
                                //     ? temp_feature[index][fIndex]
                                //     : ''
                                // }
                                // onChange={handleTempFeatureChange(
                                //   index,
                                //   fIndex,
                                // )}

                                onKeyDown={e => {
                                  const { value } = e.target;
                                  if (
                                    e.key === 'Enter' &&
                                    value.trim() !== ''
                                  ) {
                                    handleAddFeature(index, fIndex)(e);
                                  }
                                }}
                              />
                            </div>
                            {floor.feature_list &&
                              floor.feature_list.length > 0 && (
                                <ul style={{ listStyleType: 'none' }}>
                                  {floor.feature_list.map((list, flIndex) => (
                                    <li className="w-full flex justify-between text-sm border-b py-1 my-1">
                                      {list}
                                      <button
                                        onClick={() =>
                                          handleDeleteFeatureList(
                                            index,
                                            fIndex,
                                            flIndex,
                                          )
                                        }
                                      >
                                        <i className="material-icons">delete</i>
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            {floor.image &&
                              floor.image.length > 0 &&
                              floor.image.map((floorImage, flIndex) => (
                                <>
                                  <img
                                    src={`${IMAGE_BASE}${floorImage.path}`}
                                  />
                                  <button
                                    onClick={() =>
                                      handleDeleteFeatureImage(
                                        index,
                                        fIndex,
                                        flIndex,
                                      )
                                    }
                                  >
                                    <i className="material-icons">delete</i>
                                  </button>
                                </>
                              ))}
                            <Dropzone
                              onDrop={files =>
                                handleFloorImageAdd(files, index, fIndex)
                              }
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div className="bg-gray-100 rounded p-2 mt-2">
                                  <div
                                    className="h-full w-full focus:outline-none"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />

                                    <div className="border bg-white shadow px-2 py-1 text-sm inline-flex items-center cursor-pointer rounded">
                                      <i className="material-icons">add</i> Add
                                      Images
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            <div>
                              <button
                                onClick={() => handleDeleteFloor(index, fIndex)}
                                type="button"
                                className="w-8 h-8 rounded-full bg-red-600 inline-flex items-center justify-center text-white"
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </div>
                          </div>
                        ))}
                      <div className="w-1/4 px-2">
                        <div
                          className="border border-dashed rounded h-full p-4 flex justify-center items-center text-center cursor-pointer hover:border-gray-600 flex-col"
                          onClick={() => handleAddFloor(index)}
                        >
                          <i className="material-icons text-5xl">add</i>
                          <br />
                          ADD FLOOR PLAN
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* type House end */}

                {/* type Land */}

                {one.basic.property_category === '5d662c7b8f12c7035cd39315' && (
                  <div>
                    <div className="flex-1 px-1">
                      <label
                        className="block font-bold text-black text-sm mb-2"
                        htmlFor="grid-value"
                      >
                        Type
                      </label>
                      <input
                        className="inputbox"
                        id="grid-basic-value"
                        type="text"
                        value={each.type || ''}
                        onChange={handleTypeChange(index, 'type')}
                      />
                    </div>
                    <div className="flex-1 px-1">
                      <label
                        className="block font-bold text-black text-sm mb-2"
                        htmlFor="grid-value"
                      >
                        Area
                      </label>
                      <input
                        className="inputbox"
                        id="grid-basic-value"
                        type="text"
                        value={each.area || ''}
                        onChange={handleAreaChange(index)}
                      />
                    </div>
                    <div>
                      <select
                        className="inputbox"
                        native="true"
                        name="total_area_unit"
                        value={each.area_option}
                        onChange={handleTypeChange(index, 'area_option')}
                      >
                        <option
                          key="0"
                          name="choose"
                          value="area-unit"
                          disabled={
                            each.area_option !== undefined &&
                            each.area_option !== ''
                          }
                        >
                          Choose area unit
                        </option>
                        {enums.area_unit.map(unit => (
                          <option
                            key={unit._id}
                            name={unit.title}
                            value={unit._id}
                          >
                            {unit.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="block font-bold text-black text-sm mb-2"
                        htmlFor="grid-value"
                      >
                        Price
                      </label>
                      <input
                        className="inputbox"
                        id="grid-basic-value"
                        type="number"
                        value={each.price || ''}
                        onChange={handlePriceChange(index)}
                      />
                    </div>
                    <div className="w-1/6 px-1">
                      <label
                        className="block font-bold text-black text-sm mb-2"
                        htmlFor="grid-value"
                      >
                        Min Price
                      </label>
                      <input
                        className="inputbox"
                        id="grid-basic-value"
                        type="number"
                        value={each.minimum_price || ''}
                        onChange={handleTypeChange(index, 'minimum_price')}
                      />
                    </div>
                    <div className="w-1/6 px-1">
                      <label
                        className="block font-bold text-black text-sm mb-2"
                        htmlFor="grid-value"
                      >
                        Max Price
                      </label>
                      <input
                        className="inputbox"
                        id="grid-basic-value"
                        type="number"
                        value={each.maximum_price || ''}
                        onChange={handleTypeChange(index, 'maximum_price')}
                      />
                    </div>

                    <div className="w-1/6 px-1">
                      <label
                        className="block font-bold text-black text-sm mb-2"
                        htmlFor="grid-value"
                      >
                        Unit Count
                      </label>
                      <input
                        className="inputbox"
                        id="grid-basic-value"
                        type="number"
                        value={each.unit_count || ''}
                        onChange={handleTypeChange(index, 'unit_count')}
                      />
                    </div>
                  </div>
                )}

                {/* type Land end */}
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {each.image &&
                      each.image.length > 0 &&
                      each.image.map(image => (
                        <div className="w-48 h-24 relative m-1 border rounded m-2 overflow-hidden">
                          <img
                            className="w-full"
                            src={
                              image &&
                              image.path &&
                              `${IMAGE_BASE}${image.path}`
                            }
                            alt="property type"
                          />
                          <button
                            type="button"
                            className="bg-black w-10 h-10 absolute right-0 top-0 text-sm text-white flex items-center"
                            onClick={() => handleImageDelete(index, image._id)}
                          >
                            <i className="material-icons text-white text-sm">
                              delete_forever
                            </i>
                          </button>
                        </div>
                      ))}
                  </div>

                  <Dropzone onDrop={files => handleImageAdd(files, index)}>
                    {({ getRootProps, getInputProps }) => (
                      <div className="bg-gray-100 rounded p-2 mt-2">
                        <div
                          className="h-full w-full focus:outline-none"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />

                          <div className="border bg-white shadow px-2 py-1 text-sm inline-flex items-center cursor-pointer rounded">
                            <i className="material-icons">add</i> Add Images
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            }
          />
        ))}
    </div>
  ),
);

const ProjectType = props => {
  const {
    addProjectTypeRequest,
    deleteProjectTypeRequest,
    images,
    media_loading,
    match,
    enums,
    errors,
    setProjectArea,
    setProjectType,
    setProjectPrice,
    projectType,
    classes,
    addProjectImageRequest,
    setOneValue,
    deleteProjectImageSuccess,
    one,
    addProjectTypeFloor,
    setProjectTypeFloor,
    addProjectFloorImageRequest,
    temp_feature,
    setProjectTypeFloorFeature,
    addProjectTypeFloorFeature,
    deleteProjectTypeFloor,
    clearProjectType,
    deleteProjectTypeFeatureList,
    deleteProjectTypeFloorImage,
  } = props;

  // const [tempImage, setTempImg] = React.useState(defaultImage);

  // useEffect(() => {
  //   clearProjectType();
  // }, [one.basic.property_category]);

  const handleAdd = () => {
    addProjectTypeRequest();
    // console.log('images', images);
    // setDocumentValue(...images);
  };

  //   const handleDelete = id => {
  //     deleteProjectTypeRequest(id);
  //   };

  const handleImageAdd = (files, index) => {
    console.log('FILE', files[0]);
    console.log('Index', index);
    addProjectImageRequest({ files, index });
    // setProjectType({ index, value: files[0], name: 'image' });
  };

  const handleFloorImageAdd = (files, index, floor_index) => {
    addProjectFloorImageRequest({ files, index, floor_index });
  };

  const handleDelete = index => () => {
    const chipData = [...projectType];

    chipData.splice(index, 1);
    setOneValue({ key: 'project_property_type', value: chipData });
  };

  const handleDeleteFloor = (index, floor_index) => {
    deleteProjectTypeFloor({ index, floor_index });
  };

  const handleDeleteFeatureList = (index, fIndex, flIndex) => {
    deleteProjectTypeFeatureList({ index, fIndex, flIndex });
  };

  const handleDeleteFeatureImage = (index, fIndex, flIndex) => {
    deleteProjectTypeFloorImage({ index, fIndex, flIndex });
  };
  const handleImageDelete = (index, id) => {
    deleteProjectImageSuccess({ index, id });
  };

  const handleAreaChange = index => e => {
    // console.log('value from handleCaptionChange', e.target.value, index);
    setProjectArea({ index, value: e.target.value });
  };

  const handleTypeChange = (index, type) => e => {
    // console.log('value from handleCaptionChange', e.target.value, index);
    setProjectType({ index, value: e.target.value, name: type });
  };

  const handleFloorChange = (index, type, fIndex) => e => {
    // console.log('value from handleCaptionChange', e.target.value, index);
    setProjectTypeFloor({
      index,
      value: e.target.value,
      name: type,
      floor_index: fIndex,
    });
  };

  const handleAddFloor = index => {
    addProjectTypeFloor(index);
  };

  const handlePriceChange = index => e => {
    // console.log('value from handleCaptionChange', e.target.value, index);
    setProjectPrice({ index, value: e.target.value });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newArray = arrayMove(projectType, oldIndex, newIndex);
    setOneValue({
      key: 'project_property_type',
      value: newArray,
    });
  };

  const handleTempFeatureChange = (index, floor_index) => e => {
    setProjectTypeFloorFeature({ index, floor_index, value: e.target.value });
  };

  const handleAddFeature = (index, floor_index) => e => {
    e.preventDefault();
    e.persist();
    const { value } = e.target;
    const feature = value.trim();
    e.target.value = '';
    if (feature !== '') {
      addProjectTypeFloorFeature({ index, floor_index, value: feature });
    }
  };

  const handleCount = name => event => {
    setOneValue({ key: name, value: event.target.value });
  };

  // if (media_loading) return <Loading />;

  return (
    <div className="w-full">
      {media_loading ? <Loading /> : ''}
      {/* <div className="w-full  flex flex-wrap mb-4">
        <span className="mt-2 mx-2"> Total </span>
        <div className="w-1/4 flex">
          <input
            value={one.unit_count || ''}
            placeholder="Total"
            className="inputbox"
            onChange={handleCount('unit_count')}
          />
        </div>
      </div> */}
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
            {errors.project_property_type ? errors.project_property_type : ''}
          </div>
        </div>
      </div>

      <SortableList
        axis="xy"
        items={projectType}
        onSortEnd={onSortEnd}
        useDragHandle
        handleImageDelete={handleImageDelete}
        handleDelete={handleDelete}
        handleTypeChange={handleTypeChange}
        handleAreaChange={handleAreaChange}
        handlePriceChange={handlePriceChange}
        handleImageAdd={handleImageAdd}
        enums={enums}
        one={one}
        handleFloorChange={handleFloorChange}
        handleAddFloor={handleAddFloor}
        handleFloorImageAdd={handleFloorImageAdd}
        temp_feature={temp_feature}
        handleTempFeatureChange={handleTempFeatureChange}
        handleAddFeature={handleAddFeature}
        handleDeleteFloor={handleDeleteFloor}
        handleDeleteFeatureList={handleDeleteFeatureList}
        handleDeleteFeatureImage={handleDeleteFeatureImage}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  enums: makeSelectEnum(),
  errors: makeSelectErrors(),
  projectType: makeSelectProjectType(),
  media_loading: makeSelectMediaLoading(),
  one: makeSelectOne(),
  temp_feature: makeSelectTempFeature(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectType);
