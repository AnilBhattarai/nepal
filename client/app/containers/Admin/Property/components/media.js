/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withStyles from '@material-ui/core/styles/withStyles';
import PublishSharp from '@material-ui/icons/PublishSharp';
import Fab from '@material-ui/core/Fab';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
  makeSelectImages,
  makeSelectMediaLoading,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import DragDrop from '../../../../assets/img/drag_drop.png';
import { IMAGE_BASE } from '../../../App/constants';
import Input from '../../../../components/customComponents/Input';

import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import tempImage from '../../../../images/default.jpg';

const DragHandle = SortableHandle(() => (
  <span className="hover:shadow-lg ease-in-out cursor-move mr-2">
    <OpenWithIcon />
  </span>
));

const SortableItem = SortableElement(({ value }) => (
  <div className="w-full md:w-1/3 -ml-2 -mr-2"> {value}</div>
));

const SortableList = SortableContainer(
  ({ items, handleCaptionChange, handleDelete, errors, enums }) => {
    return (
      <div className="flex flex-wrap px-2">
        {items.map((each, index) => (
          <SortableItem
            key={index}
            index={index}
            value={
              <div className="" key={each.id && each.id._id}>
                <div className="p-2 relative">
                  <div className="h-48 w-64 rounded overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={
                        each.id && each.id.path
                          ? `${IMAGE_BASE}${each.id.path}`
                          : tempImage
                      }
                      alt="property"
                    />
                  </div>

                  <div className="flex items-center pt-2">
                    <DragHandle />

                    <select
                      className="inputbox flex-1"
                      style={{ height: 30 }}
                      native="true"
                      value={each.caption}
                      onChange={handleCaptionChange(index)}
                    >
                      <option key="0" name="choose" value="area-unit" disabled>
                        Choose image_caption
                      </option>
                      {enums.image_caption &&
                        enums.image_caption.map(a => (
                          <option key={a._id} name={a.title} value={a._id}>
                            {a.title}
                          </option>
                        ))}
                    </select>

                    <button
                      type="button"
                      className="bg-black w-6 rounded-full h-6 text-center hover:bg-red-500 mx-4"
                      onClick={() => handleDelete(each.id._id)}
                    >
                      <i className="material-icons text-white text-sm">
                        delete
                      </i>
                    </button>
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

const Media = props => {
  const {
    addMediaRequest,
    setMediaValue,
    deleteMediaRequest,
    images,
    media_loading,
    match,
    enums,
    errors,
    media,
    setOneValue,
    deleteMediaSuccess,
  } = props;

  // const [tempImage, setTempImg] = React.useState(defaultImage);

  const handleAdd = (files, name) => {
    addMediaRequest(files);
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
    deleteMediaSuccess(id);
  };

  const handleCaptionChange = index => e => {
    props.setCaption({ index, value: e.target.value });
  };

  const handleMediaChange = name => event => {
    const { value } = event.target;
    if (name === 'youtube_video_id') {
      const vid = value.split('watch?v=')[1];
      if (vid === undefined) {
        alert('Invalid youtube url');
        setOneValue({
          key: 'media',
          value: { ...media, [name]: '' },
        });
      } else {
        setOneValue({
          key: 'media',
          value: { ...media, [name]: vid },
        });
      }
    } else {
      setOneValue({
        key: 'media',
        value: { ...media, [name]: value },
      });
    }
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newImage = arrayMove(media.images, oldIndex, newIndex);
    // setOneValue({ key: 'image', value: newImage });
    setOneValue({
      key: 'media',
      value: { ...media, images: newImage },
    });
  };
  // if (media_loading) return <Loading />;

  return (
    <div className="w-full">
      {media_loading ? <Loading /> : ''}
      {/* <div className="w-full md:w-1/3 pb-4">
        <label
          className="block font-bold text-black text-sm mb-2"
          htmlFor="Image"
        >
          Image
        </label> */}
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
      {errors.media ? (
        <div id="component-error-text">
          {errors.media ? errors.media.images : ''}
        </div>
      ) : null}
      <div className="flex flex-wrap">
        {/* {images &&
          images.map((each, index) => (
            <div className="px-2 py-4 relative" key={index}>
              <div className="h-48 w-64 rounded overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={`${IMAGE_BASE}${each.id.path}`}
                  alt="property"
                />
              </div>

              <div className="flex justify-between py-1">
                <select
                  className="inputbox mr-2"
                  style={{ height: 30 }}
                  native="true"
                  value={each.caption}
                  onChange={handleCaptionChange(index)}
                >
                  <option key="0" name="choose" value="area-unit" disabled>
                    Choose image_caption
                  </option>
                  {enums.image_caption &&
                    enums.image_caption.map(a => (
                      <option key={a._id} name={a.title} value={a._id}>
                        {a.title}
                      </option>
                    ))}
                </select>

                <button
                  type="button"
                  className="bg-black w-8 rounded-full h-8 text-center hover:bg-red-500"
                  onClick={() => handleDelete(each.id._id)}
                >
                  <i className="material-icons text-white text-sm">delete</i>
                </button>
              </div>
            </div>
          ))} */}
      </div>
      <SortableList
        axis="xy"
        items={media.images}
        onSortEnd={onSortEnd}
        useDragHandle
        handleCaptionChange={handleCaptionChange}
        errors={errors}
        handleDelete={handleDelete}
        enums={enums}
      />
      <div className="w-full md:w-1/2 px-2 mt-2">
        <label
          className="block font-bold text-black text-sm mb-2"
          htmlFor="grid-title"
        >
          YouTube Video ID
          <span className="text-xs italic lowercase">
            ( https://www.youtube.com/watch?v=`
          </span>
          <span className=" strong lowercase text-red-600">36WS1zML7Jo</span>
          <span className="text-xs italic lowercase">` )</span>
        </label>
        <div className="w-1/2">
          <input
            className="inputbox"
            id="grid-basic-title"
            placeholder="eg: 36WS1zML7Jo"
            type="text"
            value={media.youtube_video_id || ''}
            onChange={handleMediaChange('youtube_video_id')}
          />
        </div>
        <div id="component-error-text">
          {errors.media ? errors.media.youtube_video_id : ''}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  media: makeSelectMedia(),
  enums: makeSelectEnum(),
  errors: makeSelectErrors(),
  images: makeSelectImages(),
  media_loading: makeSelectMediaLoading(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Media);
