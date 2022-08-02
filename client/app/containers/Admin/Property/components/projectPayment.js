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
  makeSelectPaymentPlanImages,
  makeSelectMediaLoading,
  makeSelectOne,
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
                <div className="px-2 relative" key={index}>
                  <div className="h-48 w-64 rounded overflow-hidden">
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

                  <div className="flex justify-between my-2 px-8 absolute top-0 left-0 w-full">
                    <button
                      type="button"
                      className="bg-black w-8 rounded-full h-8 text-center hover:bg-blue-500"
                      onClick={() =>
                        copyToClipboard(`${IMAGE_BASE}${each.image.path}`)
                      }
                    >
                      <i className="material-icons text-white text-sm">link</i>
                    </button>

                    <button
                      type="button"
                      className="bg-black w-8 rounded-full h-8 text-center hover:bg-red-500"
                      onClick={() => handleDelete(each.image._id)}
                    >
                      <i className="material-icons text-white text-sm">
                        delete_forever
                      </i>
                    </button>
                  </div>
                  <div>
                    <label
                      className="block font-bold text-black text-sm mb-2"
                      htmlFor="grid-title"
                    >
                      Title
                    </label>
                    <input
                      className="inputbox"
                      id="grid-basic-title"
                      type="text"
                      value={each.title || ''}
                      onChange={handleCaptionChange(index)}
                    />
                  </div>
                </div>
              </div>
            }
          />
        ))}
      </div>
    );
  },
);

const ProjectPayment = props => {
  const {
    addPaymentPlanRequest,
    deletePaymentPlanRequest,
    images,
    media_loading,
    match,
    enums,
    errors,
    setPaymentPlanCaption,
    paymentPlan,
    deletePaymentPlanSuccess,
    setOneValue,
    one,
  } = props;

  // const [tempImage, setTempImg] = React.useState(defaultImage);

  const handleAdd = (files, name) => {
    // console.log('files', files);
    // console.log('name', name);
    addPaymentPlanRequest(files);
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
    deletePaymentPlanSuccess(id);
  };

  const handleCaptionChange = index => e => {
    setPaymentPlanCaption({ index, value: e.target.value });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newImage = arrayMove(paymentPlan, oldIndex, newIndex);
    // setOneValue({ key: 'image', value: newImage });
    setOneValue({
      key: 'project_payment_plan',
      value: newImage,
    });
  };
  // if (media_loading) return <Loading />;

  const handleRange = name => event => {
    const tempRange = { ...one.range };
    tempRange[name] = event.target.value;
    setOneValue({ key: 'range', value: tempRange });
  };

  return (
    <div className="w-full">
      {media_loading ? <Loading /> : ''}
      <div className="w-full  flex flex-wrap mb-4">
        <span className="mt-2 mx-2"> Range </span>
        <div className="w-1/4 flex">
          <input
            value={one.range && one.range.from}
            placeholder="From"
            className="inputbox"
            onChange={handleRange('from')}
          />
        </div>
        <span className="mt-1 mx-2"> - </span>
        <div className="w-1/4 flex">
          <input
            value={one.range && one.range.to}
            placeholder="To"
            className="inputbox"
            onChange={handleRange('to')}
          />
        </div>
        <span className="mt-2 mx-2"> Unit </span>

        <div className="w-1/4 flex">
          <input
            value={one.range && one.range.unit}
            placeholder="Unit"
            className="inputbox"
            onChange={handleRange('unit')}
          />
        </div>
      </div>
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
      {/* <div className="flex flex-wrap">
        {paymentPlan &&
          paymentPlan.map((each, index) => (
            <div className="px-2 relative" key={index}>
              <div className="h-48 w-64 rounded overflow-hidden">
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

              <div className="flex justify-between my-2 px-8 absolute top-0 left-0 w-full">
                <button
                  type="button"
                  className="bg-black w-8 rounded-full h-8 text-center hover:bg-blue-500"
                  onClick={() =>
                    copyToClipboard(`${IMAGE_BASE}${each.image.path}`)
                  }
                >
                  <i className="material-icons text-white text-sm">link</i>
                </button>

                <button
                  type="button"
                  className="bg-black w-8 rounded-full h-8 text-center hover:bg-red-500"
                  onClick={() => handleDelete(each.image._id)}
                >
                  <i className="material-icons text-white text-sm">
                    delete_forever
                  </i>
                </button>
              </div>
              <div>
                <label
                  className="block font-bold text-black text-sm mb-2"
                  htmlFor="grid-title"
                >
                  Title
                </label>
                <input
                  className="inputbox"
                  id="grid-basic-title"
                  type="text"
                  value={each.title || ''}
                  onChange={handleCaptionChange(index)}
                />
                 <select
                      className="inputbox"
                      native="true"
                      value={each.caption}
                      onChange={handleCaptionChange(index)}
                      // onChange={() => alert('hello')}
                      // inputprops={{ value: country || '', name: 'country' }}
                    >
                      <option key="0" name="choose" value="area-unit" disabled>
                        Choose Project features
                      </option>
                      {enums.project_features &&
                        enums.project_features.map(a => (
                          <option key={a._id} name={a.title} value={a._id}>
                            {a.title}
                          </option>
                        ))}
                    </select> 
              </div>
            </div>
          ))
        // ) : (
        //   <span> None </span>
        }
      </div> */}
      <SortableList
        axis="xy"
        items={paymentPlan}
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
  paymentPlan: makeSelectPaymentPlanImages(),
  media_loading: makeSelectMediaLoading(),
  one: makeSelectOne(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectPayment);
