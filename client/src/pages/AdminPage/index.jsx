import React, { useState } from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import { TransitionsModal } from '../../components/TransitionsModal';
import { AddItem } from './Components/AddItem';
import { ToastContainer } from 'react-toastify';
import styles from './index.module.scss';

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Box className={styles.container}>
      <Typography variant={'h4'}>Панель администратора</Typography>
      <Card variant={'outlined'} className={styles.card}>
        <Button onClick={() => setOpen(true)}>Добавить товар</Button>
        <Button>Изменить товар</Button>
        <Button>Удалить товар</Button>
        <TransitionsModal
          open={open}
          setOpen={setOpen}
        >
          <AddItem setOpen={setOpen} />
        </TransitionsModal>
      </Card>
      <ToastContainer />
    </Box>
  );
};

export {
  AdminPage,
};
