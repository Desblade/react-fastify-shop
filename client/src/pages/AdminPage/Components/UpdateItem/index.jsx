import React, { useContext, useState } from 'react';
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import styles from './index.module.scss';
import { toast } from 'react-toastify';
import { Context } from '../../../../index';

const UpdateItem = ({ setOpenUpdateModal }) => {
  const { adminStore } = useContext(Context);
  const [values, setValues] = useState({
    valueId: '',
    valueName: '',
    valueDescription: '',
    valuePrice: '',
    valueFile: null,
  });

  const handleChange = (fieldName) => (e) => {
    if (fieldName === 'valueFile') {
      setValues({ ...values, [fieldName]: e.target.files[0] });
    } else {
      setValues({ ...values, [fieldName]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', values.valueName);
    formData.append('description', values.valueDescription);
    formData.append('price', values.valuePrice);
    formData.append('file', values.valueFile);

    try {
      const message = await adminStore.updateGroceier(formData, values.valueId);

      setOpenUpdateModal(false);

      return toast(message);
    } catch (err) {
      return toast.error(err.e);
    }
  };

  return (
    <Box className={styles.wrapper}>
      <TextField
        value={values.valueId}
        onChange={handleChange('valueId')}
        type={'number'}
        placeholder={'ID товара'}
      />
      <TextField
        value={values.valueName}
        onChange={handleChange('valueName')}
        placeholder={'Название товара'}
      />
      <TextField
        value={values.valueDescription}
        onChange={handleChange('valueDescription')}
        placeholder={'Описание товара'}
      />
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-amount">Цена товара</InputLabel>
        <OutlinedInput
          value={values.valuePrice}
          onChange={handleChange('valuePrice')}
          type="number"
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">₽</InputAdornment>}
          placeholder="Цена товара"
          label="Цена товара"
        />
      </FormControl>
      <TextField
        onChange={handleChange('valueFile')}
        type={'file'}
        placeholder={'Изображение'}
      />
      <Button onClick={handleSubmit}>Изменить</Button>
    </Box>
  );
};

export {
  UpdateItem,
};
