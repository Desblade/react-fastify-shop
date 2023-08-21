import React from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { handleMenu, handlerLeave, handlerTo } from '../../utils/utils';
import { AccountCircle } from '@mui/icons-material';
import { CART_PAGE, MAIN_PAGE, PROFILE_PAGE } from '../../../../utils/consts';
import styles from './index.module.scss';

const AvatarWithMenu = ({ userStore, setAnchorEl, anchorEl, navigate }) => (
  <div>
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={(e) => handleMenu(setAnchorEl, e)}
      color="inherit"
    >
      {userStore.path ? (
        <Avatar
          sx={{ width: 60, height: 60 }}
          src={userStore.path}
        />
      ) : (
        <AccountCircle />
      )}
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem
        onClick={() => handlerTo(PROFILE_PAGE, setAnchorEl, navigate)}
      >
        Мой профиль
      </MenuItem>
      <MenuItem
        onClick={() => handlerTo(MAIN_PAGE, setAnchorEl, navigate)}
      >
        Магазин
      </MenuItem>
      <MenuItem
        onClick={() => handlerTo(CART_PAGE, setAnchorEl, navigate)}
      >
        Корзина
      </MenuItem>
      <MenuItem
        onClick={() => handlerLeave(setAnchorEl, userStore)}
      >
        Выйти
      </MenuItem>
    </Menu>
  </div>
)

export {
  AvatarWithMenu,
};
