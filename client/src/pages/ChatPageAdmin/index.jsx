import React, { useContext, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const ChatPageAdmin = observer(() => {
  const { userStore, adminStore } = useContext(Context);
  
  useEffect(() => {
    const fetchChats = async () => {
      try {
        await adminStore.getChats();
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
          adminStore.chats?.map(({ chatId, email, name }) => (
            <Paper key={chatId}>{ name }</Paper>
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
