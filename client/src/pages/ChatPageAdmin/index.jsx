import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';

const ChatPageAdmin = observer(() => {
  const { userStore, chatStore } = useContext(Context);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const filteredChats = chatStore.chats.filter(({ name, email }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()) ||
    email.toLowerCase().includes(searchValue.toLowerCase()));

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

  const handleSearch = () => {

  }

  return (
    <Box className={styles.container}>
      <Box>
        <Box className={styles.search}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="search">
              Email или Имя
            </InputLabel>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={'Поиск...'}
              id="search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box className={styles.wrapper}>
          {
            filteredChats?.map(({ chatId, email, name }) => (
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
    </Box>
  );
});

export {
  ChatPageAdmin,
};
