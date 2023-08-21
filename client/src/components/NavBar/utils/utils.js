export const handlerLeave = (setAnchorEl, userStore) => {
  setAnchorEl(null);
  userStore.logout();
  localStorage.removeItem('token');
  localStorage.removeItem('pathAvatar');
};

export const handlerTo = (route, setAnchorEl, navigate) => {
  setAnchorEl(null);
  navigate(route);
};

export const handleMenu = (setAnchorEl, event) => {
  setAnchorEl(event.currentTarget);
};