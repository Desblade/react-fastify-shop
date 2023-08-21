import React, { useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { Context } from '../../index';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const [flag, setFlag] = useState(false);
  const [fileInput, setFileInput] = useState(undefined);
  const { userStore } = useContext(Context);

  const handlerSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', fileInput);

      const message = await userStore.addAvatar(formData);

      return toast(message);
    } catch (err) {
      return toast(err.e);
    }
  };

  return (
    <div>
      <Button onClick={() => setFlag(true)}>Добавить аватар</Button>
      {
        flag && (
        <div>
          <TextField
            onChange={(e) => setFileInput(e.target.files[0])}
            type={'file'}
          />
          <Button onClick={handlerSubmit}>Отправить</Button>
        </div>
        )
      }
      <ToastContainer />
    </div>
  );
};

export {
  ProfilePage,
};
