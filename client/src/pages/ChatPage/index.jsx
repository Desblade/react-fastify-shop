import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Card, Paper, TextField, Typography } from '@mui/material';
import io from 'socket.io-client';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:5100');

const ChatPage = observer(() => {
  const { userStore: { user }, chatStore } = useContext(Context);
  const scrollbarsRef = useRef(null);
  const [messageText, setMessageText] = useState('');
  const pathAvatar = localStorage.getItem('pathAvatar');
  const { chatId } = useParams();
  const roomName = chatId;
  const messageStylesForSender = {
    display: 'flex',
    justifyContent: 'flex-end',
  };
  const messageStyleForRecipient = {
    display: 'flex',
    justifyContent: 'flex-start',
  };

  useEffect(() => {
    socket.emit('joinRoom', roomName, chatId);

    socket.on('allMessages', (allMessagesJSON) => {
      const allMessages = JSON.parse(allMessagesJSON);

      chatStore.setAllReceivedMessages(allMessages);
      scrollToBottom();
    });

    socket.on('message', (dataJson) => {
      const data = JSON.parse(dataJson);

      chatStore.setReceivedMessage(data);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const scrollToBottom = () => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollTop(scrollbarsRef.current.getScrollHeight());
    }
  };

  const handleSendMessage = () => {
    if (messageText) {
      const dataJson = JSON.stringify({
        chatId,
        roomName,
        messageText,
        name: user.name,
        userId: user.id,
        email: user.email,
        path: pathAvatar,
      });

      scrollToBottom();
      socket.emit('message', dataJson);
      setMessageText('');

    } else {
      return toast.error('Напишите свое сообщение');
    }
  };

  return (
    <Box className={styles.container}>
      <Card
        elevation={10}
        className={styles.card}
      >
        <Scrollbars
          ref={scrollbarsRef}
          style={{ height: 300 }}
          thumbSize={50}
        >
          <Box className={styles.messages}>
            {
                chatStore.receivedMessages.length &&
                  chatStore.receivedMessages?.map(({ messageText, id, name, email, path }) => (
                    <Box
                      sx={user.email === email ? messageStylesForSender : messageStyleForRecipient}
                    >
                      <Paper
                        key={id}
                        className={styles.message}
                      >
                        <Box className={styles.message__text}>
                          <Box className={styles.message__avatar}>
                            {
                              path
                                ? <Avatar src={path}></Avatar>
                                : <Avatar>{ name[0] }</Avatar>
                            }
                            <Typography>{ name }</Typography>
                          </Box>
                          <Typography>{ messageText }</Typography>
                        </Box>
                      </Paper>
                    </Box>
                  ))
            }
          </Box>
        </Scrollbars>
        <Box className={styles.card__footer}>
          <TextField
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            fullWidth
            multiline
            maxRows={2}
            placeholder={'Ваше сообщение'}
            label={'Сообщение'}
          />
          <Button onClick={handleSendMessage}>Написать</Button>
        </Box>
      </Card>
      <ToastContainer />
    </Box>
  );
});

export {
  ChatPage,
};
