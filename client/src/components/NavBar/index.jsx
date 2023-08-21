import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, Button, AppBar, Toolbar, Typography, ButtonGroup, Badge } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Context } from '../../index';
import { ADMIN_PAGE, CHAT_PAGE, CHAT_PAGE_ADMIN, LOGIN_PAGE } from '../../utils/consts';
import { AvatarWithMenu } from './Components/AvatarWithMenu';
import styles from './index.module.scss';

const MenuAppBar = observer(() => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [countOfMessages, setCountOfMessages] = useState(0);
  const { userStore, chatStore } = useContext(Context);
  const { chatId } = userStore.user;
  const navigate = useNavigate();
  const pathLocalStorage = localStorage.getItem('pathAvatar');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await userStore.getAvatar();
        /*const data = await userStore.getCountOfMessages();*/

        setCountOfMessages(data);
      } catch (e) {
        // Handle error
      }
    };

    if (!pathLocalStorage) {
      fetchData();
    } else {
      userStore.setPath(pathLocalStorage);
    }
  }, [userStore.path, chatStore.receivedMessages.length]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Desblade Shop
          </Typography>
          <Box className={styles.buttons}>
            {userStore.user.role === 'admin' && (
              <ButtonGroup
                size={'small'}
                variant={'contained'}
                color={'success'}
              >
                <Button
                  className={styles.activeButton}
                  onClick={() => navigate(ADMIN_PAGE)}
                >
                  Админ Панель
                </Button>
                <Button
                  className={styles.activeButton}
                  onClick={() => navigate(CHAT_PAGE_ADMIN)}
                >
                  Чат с клиентами</Button>
              </ButtonGroup>
            )}
            {
              (userStore.isAuth && userStore.user.role !== 'admin') && (
                <Badge badgeContent={countOfMessages} color={'success'}>
                  <ChatBubbleIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/chatPageAdmin/chat/${chatId}`)}
                  />
                </Badge>
              )
            }
            {userStore.isAuth ? (
              <AvatarWithMenu
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                userStore={userStore}
                navigate={navigate}
              />
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate(LOGIN_PAGE)}
              >
                Войти
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export {
  MenuAppBar,
};