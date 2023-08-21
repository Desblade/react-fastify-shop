import React from 'react';
import { Box } from '@mui/material';
import { RegisterForm } from './RegisterForm';
import styles from './index.module.scss';

function RegisterPage() {
  return (
    <Box className={styles.container}>
      <RegisterForm />
    </Box>
  );
}

export {
  RegisterPage,
};
