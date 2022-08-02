import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';

export default function DeleteDialog(props) {
  const { open, handleClose, handleUpdate } = props;

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <button
            type="button"
            className="absolute right-0 top-0 p-6"
            onClick={handleClose}
          >
            <i className="material-icons" style={{ fontSize: 32 }}>close</i>
          </button>
          <button
            type="button"
            className="btn bg-primary hover:bg-secondary"
            onClick={handleUpdate}
          >
            Update
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
