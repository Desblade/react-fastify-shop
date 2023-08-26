import React, { useContext, useState } from 'react';
import styles from './index.module.scss';
import { Box, Button, TextField } from '@mui/material';
import { Context } from '../../../../index';
import { toast } from 'react-toastify';

const DeleteItem = ({ setOpenDeleteModal }) => {
  const { adminStore } = useContext(Context);
  const [valueId, setValueId] = useState('');

  const handleDeleteItem = async () => {
    try {
      if (valueId) {
        const message = await adminStore.deleteGroceier(valueId);

        setValueId('');
        setOpenDeleteModal(false);

        return toast(message);
      }

      return toast.error('Введите ID товара');
    } catch (err) {
      return toast.error(err.e);
    }
  }

  return (
    <Box className={styles.deleteItemModal}>
      <TextField
        value={valueId}
        onChange={(e) => setValueId(e.target.value)}
        sx={{ width: '50%' }}
        type={'number'}
        placeholder={'Введите ID товара'}
      />
      <Button
        onClick={handleDeleteItem}
        variant={'contained'}
        sx={{ width: '25%' }}
      >
        Удалить
      </Button>
    </Box>
  );
};

export {
  DeleteItem,
};
