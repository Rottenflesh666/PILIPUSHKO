import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './index.css';

const propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

function ConfirmDialog(props) {

  const dialogActions = [
    <FlatButton
      label="Принять"
      backgroundColor="rgb(255, 129, 0)"
      hoverColor="#fcb24b"
      className="confirm-dialog"
      onClick={props.onConfirm}
    />,
  ];

  return (
    <div>
      <Dialog
        title={props.title}
        actions={dialogActions}
        modal={true}
        open={props.open}
      >
        {props.message}
      </Dialog>
    </div>
  );
}

ConfirmDialog.propTypes = propTypes;

export default ConfirmDialog;
