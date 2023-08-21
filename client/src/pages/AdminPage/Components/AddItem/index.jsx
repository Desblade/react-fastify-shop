import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Context } from '../../../../index';
import styles from './index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const AddItem = ({ setOpen }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    fileInput: undefined,
  });
  const { adminStore } = useContext(Context);

  const handleChange = (field) => (e) => {
    if (field === 'fileInput') {
      setValues({ ...values, [field]: e.target.files[0] });
    } else {
      setValues({ ...values, [field]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const formData = new FormData();
      formData.append('file', values.fileInput);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);

      const message = await adminStore.addGroceier(formData);

      toast(message);
    } catch (err) {
      toast(err.e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TextField
        value={values.name}
        onChange={handleChange('name')}
        sx={{ width: '50%' }}
        placeholder="Название товара"
        label="Название"
      />
      <TextField
        multiline
        maxRows={11}
        value={values.description}
        onChange={handleChange('description')}
        sx={{ width: '50%' }}
        placeholder="Описание товара"
        label="Описание"
      />
      <FormControl sx={{ width: '50%' }}>
        <InputLabel htmlFor="outlined-adornment-amount">Цена</InputLabel>
        <OutlinedInput
          value={values.price}
          onChange={handleChange('price')}
          type="number"
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">₽</InputAdornment>}
          placeholder="Цена товара"
          label="Цена"
        />
      </FormControl>
      <TextField onChange={handleChange('fileInput')} type="file" />
      <Button type="submit">Добавить</Button>
    </form>
  );
};

export {
  AddItem,
};