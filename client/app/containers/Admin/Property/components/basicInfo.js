import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CKEditor from 'react-ckeditor-component';
import { Paper, Chip } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

import {
  makeSelectBasic,
  makeSelectEnum,
  makeSelectErrors,
  makeSelectTempTag,
  makeSelectOne,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import WECkEditior from '../../../../components/CkEditor';

const BasicInfo = props => {
  const {
    basic,
    enums,
    errors,
    setOneValue,
    classes,
    tempTag,
    setTagValue,
    one,
    setIsLand,
    setDescriptionValue,
    clearProjectType,
  } = props;

  const handleBasicChange = name => event => {
    const { value } = event.target;
    if (!(value === '') && !value) return;
    setOneValue({ key: 'basic', value: { ...basic, [name]: value } });
    if (
      name === 'property_category' &&
      (value === '5d662c7b8f12c7035cd39315' ||
        value === '5d7e7586f62e89458418c2da')
    ) {
      setIsLand(true);
    } else {
      setIsLand(false);
    }
    if (name === 'property_category') {
      clearProjectType();
    }
    if (name === 'title') {
      const slug = value
        .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
        .toLowerCase()
        .replace(/^\s+|\s+$/gm, '')
        .replace(/\s+/g, '-')
        .trim()
        .toLowerCase();
      setOneValue({
        key: 'slug_url',
        value: slug,
      });
    }
  };

  const handleChange = name => event => {
    setOneValue({ key: name, value: event.target.value });
  };

  const handleEditorChange = evt => {
    setDescriptionValue(evt.editor.getData());
  };

  const handleDelete = index => () => {
    const chipData = [...one.tags];

    chipData.splice(index, 1);
    props.setOneValue({ key: 'tags', value: chipData });
  };
  const handleTempTag = e => {
    e.persist();
    setTagValue(e.target.value);
  };

  const insertTags = event => {
    event.preventDefault();
    if (one.tags.indexOf(tempTag) === -1) {
      setOneValue({
        key: 'tags',
        value: [...one.tags, tempTag],
      });
      setTagValue('');
    }
    return { tempTag: setTagValue('') };
  };

  const handlePropertyTypeChange = name => event => {
    const { value } = event.target;
    const index = basic.property_type.indexOf(value);
    if (index >= 0) {
      const chipData = [...basic.property_type];
      chipData.splice(index, 1);
      setOneValue({ key: 'basic', value: { ...basic, [name]: chipData } });
    } else {
      setOneValue({
        key: 'basic',
        value: { ...basic, [name]: [...basic.property_type, value] },
      });
    }
  };

  // const [value, setValue] = React.useState(0);

  // const handleTabChange = (event, newValue) => {
  //   event.persist();
  //   setValue(newValue);
  // };
  return (
    <div className="w-full">
      <div className="flex -mx-2">
        <div className="w-full md:w-2/3 px-2">
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
            value={basic.title || ''}
            onChange={handleBasicChange('title')}
          />
          <div id="component-error-text">
            {errors.basic ? errors.basic.title : ''}
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2">
          <label
            className="block font-bold text-black text-sm mb-2"
            htmlFor="grid-vlaue"
          >
            Slug URL
          </label>
          <input
            className="inputbox"
            id="grid-value"
            type="text"
            value={one.slug_url || ''}
            onChange={handleChange('slug_url')}
          />
          <div id="component-error-text">{errors ? errors.slug_url : ''}</div>
        </div>
      </div>

      <div className="w-full">
        <label
          className="block font-bold text-black text-sm mb-2"
          htmlFor="grid-country-code-2"
        >
          Description
        </label>
        {/* {window.location.pathname.includes('property') ? (
          <textarea
            className="inputbox h-32"
            id="grid-description"
            type="text"
            value={basic.description || ''}
            onChange={handleBasicChange('description')}
          />
        ) : ( */}
        <CKEditor
          name="description"
          content={basic.description}
          config={{
            allowedContent: true,
            image_previewText: ' ',
            filebrowserBrowseUrl: '/editor-file-select',
            filebrowserUploadUrl: '/api/media/multiple',
          }}
          events={{
            change: evt => handleEditorChange(evt),
            value: basic.description,
          }}
        />
        {/* )} */}

        <div id="component-error-text">
          {errors.basic ? errors.basic.description : ''}
        </div>
      </div>

      <div className="flex justify-between -mx-2">
        <div className="w-full md:w-1/6 px-2">
          <label
            className="block font-bold text-black text-sm mb-2"
            htmlFor="grid-Tags"
          >
            Purpose
          </label>
          <ToggleButtonGroup
            size="large"
            exclusive
            name="property_purpose"
            value={basic.property_purpose}
            onChange={() => null}
            style={{ boxShadow: 'none' }}
          >
            {enums.property_purpose &&
              enums.property_purpose.map(each => (
                <ToggleButton
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '5px',
                    marginBottom: '5px',
                    color: '#999',
                  }}
                  key={each._id}
                  name={each.title}
                  value={each._id}
                  onClick={() =>
                    handleBasicChange('property_purpose')({
                      target: { value: each._id },
                    })
                  }
                >
                  <span className="font-normal text-sm capitalize">
                    {' '}
                    {each.title}
                  </span>
                </ToggleButton>
              ))}
          </ToggleButtonGroup>

          <div id="component-error-text">
            {errors.basic ? errors.basic.property_purpose : ''}
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2">
          <label
            className="block font-bold text-black text-sm mb-2"
            htmlFor="grid-Tags"
          >
            Type
          </label>
          <ToggleButtonGroup
            size="large"
            name="property_type"
            value={basic.property_type || ''}
            onChange={() => null}
            style={{ boxShadow: 'none' }}
          >
            {enums.property_type &&
              enums.property_type.map(each => (
                <ToggleButton
                  className="mr-2"
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '5px',
                    marginBottom: '5px',
                    color: '#999',
                  }}
                  key={each._id}
                  name={each.title}
                  value={each._id}
                  onClick={() =>
                    handlePropertyTypeChange('property_type')({
                      target: { value: each._id },
                    })
                  }
                >
                  <span className="font-normal text-sm capitalize">
                    {' '}
                    {each.title}
                  </span>
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
          <div id="component-error-text">
            {errors.basic ? errors.basic.property_type : ''}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label
            className="block font-bold text-black text-sm mb-2"
            htmlFor="grid-Tags"
          >
            Category
          </label>

          <ToggleButtonGroup
            size="large"
            style={{ boxShadow: 'none', borderRadius: '4px' }}
            name="property_category"
            value={basic.property_category || ''}
            onChange={() => null}
          >
            {enums.property_category &&
              enums.property_category.map(each => (
                <ToggleButton
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '5px',
                    marginBottom: '5px',
                    color: '#999',
                  }}
                  key={each._id}
                  name={each.title}
                  value={each._id}
                  onClick={() =>
                    handleBasicChange('property_category')({
                      target: { value: each._id },
                    })
                  }
                >
                  {each.title}
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
          <div id="component-error-text">
            {errors.basic ? errors.basic.property_category : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  basic: makeSelectBasic(),
  enums: makeSelectEnum(),
  errors: makeSelectErrors(),
  tempTag: makeSelectTempTag(),
  one: makeSelectOne(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasicInfo);
