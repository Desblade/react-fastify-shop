import React from 'react';
import { Box } from '@mui/material';
import { LoginForm } from './Components/LoginForm';
import styles from './index.module.scss';

const LoginPage = () => (
  <Box className={styles.container}>
    <LoginForm />
  </Box>
)

export {
  LoginPage,
};
