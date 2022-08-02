import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

import Input from '../customComponents/Input';

const AddField = props => {
  const { data, handleChange, index, handleDelete, hasError } = props;

  return (
    <div className="flex w-1/3 items-center mb-4">
      <Input
        inputclassName="inputbox"
        inputid="state_name"
        inputType="text"
        value={data}
        name="name"
        error={index == hasError ? 'Already entered' : ''}
        onChange={e => handleChange(e.target.value, index)}
        errorClassName="block"
      >
        <div onClick={handleDelete}>
          <DeleteIcon />
        </div>
      </Input>
    </div>
  );
};

AddField.defaultProps = {
  hasError: false,
};

export default AddField;
