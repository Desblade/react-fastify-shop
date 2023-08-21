import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Box, TextField, ButtonGroup, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { ToastContainer, toast } from 'react-toastify';
import { Context } from '../../../../index';
import { MAIN_PAGE, REGISTER_PAGE } from '../../../../utils/consts';
import styles from './index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const { userStore } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value.trim() });
  };

  const handleSubmit = async () => {
    try {
      await userStore.login(values);
      setValues({ email: '', password: '' });
      navigate(MAIN_PAGE);
    } catch (err) {
      toast.error(err.e);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const userFormUrl = await userStore.firstStepGoogleAuth();

      window.location.href = userFormUrl;
    } catch (err) {
      return toast.error(err.e);
    }
  };

  return (
    <Box className={styles.box}>
      <Card className={styles.card}>
        <TextField
          value={values.email}
          onChange={handleChange('email')}
          placeholder="Email"
          label="Email"
        />
        <TextField
          value={values.password}
          onChange={handleChange('password')}
          type="password"
          placeholder="Password"
          label="Password"
        />
        <Button onClick={handleSubmit}>Войти</Button>
        <ButtonGroup sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => navigate(REGISTER_PAGE)}
          >
            Все еще нет аккаунта?
          </Button>
          <Button
            onClick={handleGoogleAuth}
          >
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <GoogleIcon />
              <Typography>Войти вместе с Google</Typography>
            </Box>
          </Button>
        </ButtonGroup>
      </Card>
      <ToastContainer />
    </Box>
  );
};

export {
  LoginForm,
};