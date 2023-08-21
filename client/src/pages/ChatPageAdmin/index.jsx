import React, { useContext, useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const ChatPageAdmin = observer(() => {
  const { userStore, chatStore } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        await chatStore.getChats();
      } catch (err) {
        return toast.error(err.e);
      }
    };

    fetchChats();
  }, [userStore.users.length]);

  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        {
          chatStore.chats?.map(({ chatId, email, name }) => (
            <Paper
              className={styles.chat}
              key={chatId}
            >
              <Box className={styles.chat__header}>
                <ChatIcon
                  fontSize={'large'}
                  color={'success'}
                />
                <Typography variant={'h5'}>Чат с пользователем</Typography>
              </Box>
              <Box className={styles.chat__email}>
                <AlternateEmailIcon
                  fontSize={'large'}
                  color={'success'}
                />
                <Typography variant={'h5'}>Email:</Typography>
                <Paper sx={{ padding: '5px' }}>
                  { email }
                </Paper>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box className={styles.chat__footer} >
                  <DriveFileRenameOutlineIcon
                    fontSize={'large'}
                    color={'success'}
                  />
                  <Typography variant={'h5'}>Имя:</Typography>
                  <Paper sx={{ padding: '5px' }}>
                    { name }
                  </Paper>
                </Box>
                <Button
                  onClick={() => navigate(`chat/${chatId}`)}
                  size={'medium'}
                  variant={'contained'}
                >
                  Написать
                </Button>
              </Box>
            </Paper>
          ))
        }
      </Box>
      <ToastContainer />
    </Box>
  );
});

export {
  ChatPageAdmin,
};
