import React, { useState } from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import { TransitionsModal } from '../../components/TransitionsModal';
import { AddItem } from './Components/AddItem';
import { ToastContainer } from 'react-toastify';
import styles from './index.module.scss';
import { DeleteItem } from './Components/DeleteItem';
import { UpdateItem } from './Components/UpdateItem';

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box
      className={styles.container}
    >
      <Typography variant={'h4'}>Панель администратора</Typography>
      <Card
        variant={'outlined'}
        className={styles.card}
      >
        <Button onClick={() => setOpen(true)}>Добавить товар</Button>
        <Button onClick={() => setOpenUpdateModal(true)}>Изменить товар</Button>
        <Button onClick={() => setOpenDeleteModal(true)}>Удалить товар</Button>
        <TransitionsModal
          open={open}
          setOpen={setOpen}
        >
          <AddItem
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setOpen={setOpen}
          />
        </TransitionsModal>
        <TransitionsModal
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
        >
          <UpdateItem setOpenUpdateModal={setOpenUpdateModal} />
        </TransitionsModal>
        <TransitionsModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
        >
          <DeleteItem setOpenDeleteModal={setOpenDeleteModal} />
        </TransitionsModal>
      </Card>
      <ToastContainer />
    </Box>
  );
}

export {
  AdminPage,
};
