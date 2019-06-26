import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Выбор теста
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Тест 1</MenuItem>
            <MenuItem onClick={popupState.close}>Тест 2</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default MenuPopupState;
