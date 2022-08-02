import React, { useState } from 'react';
import DeleteDialog from '../DeleteDialog';
const ToggleButton = props => {
  const { isOn, handleToggle, status, id } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // deleteOneRequest(id);
    handleToggle();
    setOpen(false);
  };

  const handleToggleChange = () => {
    setOpen(true);
  };
  return (
    <>
      {!isOn ? (
        <DeleteDialog
          title="This will also active the district, vdc and area with in this state"
          open={open}
          doClose={handleClose}
          doDelete={() => handleDelete()}
        />
      ) : (
        <DeleteDialog
          title="This will also deactivate the district, vdc and area with in this state"
          open={open}
          doClose={handleClose}
          doDelete={() => handleDelete()}
        />
      )}
      <button
        type="button"
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: isOn ? '#0693DE' : 'rgb(188, 188, 188)',
          padding: '0 10px 0 10px',
          backgroundColor: isOn ? '#0693DE' : 'rgb(188, 188, 188)',
          borderRadius: '15px',
          width: '50px',
          height: '26px',
          position: 'relative',
        }}
        onClick={handleToggleChange}
      >
        {status.loading && status.id == id ? (
          <span
            style={{
              backgroundColor: isOn ? '#FFFFFF' : '#FFFFFF',
              width: '22px',
              height: '22px',
              position: 'absolute',
              borderRadius: '50%',
              top: '1px',
              right: isOn ? '1px' : '',
              left: isOn ? '' : '1px',
            }}
          />
        ) : (
          <span
            style={{
              backgroundColor: isOn ? '#FFFFFF' : '#FFFFFF',
              width: '22px',
              height: '22px',
              position: 'absolute',
              borderRadius: '50%',
              top: '1px',
              right: isOn ? '1px' : '',
              left: isOn ? '' : '1px',
            }}
          />
        )}
      </button>
    </>
  );
};

export default ToggleButton;
