import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   <Slide direction="up" ref={ref} {...props} />;
// });

export default function DeleteDialog(props) {
  const handleClose = () => {
    props.doClose();
  };

  const handleDialogDelete = () => {
    props.doDelete();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title || 'Do you really want to delete this item??'}
        </DialogTitle>
        <DialogActions style={{ justifyContent: 'center' }}>
          <button
            className="btn bg-red-500 px-4"
            onClick={handleClose}
          >
            No
          </button>
          <button
            className="btn bg-green-500 px-4"
            onClick={handleDialogDelete}
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
