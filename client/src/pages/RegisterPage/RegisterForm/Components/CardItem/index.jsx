import React from 'react';
import { Button, Card, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { handleAlignment, handlerShowEmail, handlerShowPhone } from '../../utils/utilsForRegister';
import { PhoneField } from '../PhoneField/PhoneField';
import { EmailField } from '../EmailField/EmailField';
import { PasswordField } from '../PasswordField/PasswordField';
import { PasswordConfirmField } from '../PasswordConfirmField/PasswordConfirmField';
import { LOGIN_PAGE } from '../../../../../utils/consts';
import styles from './index.module.scss';
import { NameField } from '../NameField';

const CardItem = ({
  alignment,
  setAlignment,
  boolValues,
  setBoolValues,
  formik,
  navigate,
}) => (
  <Card className={styles.card}>
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={() => handleAlignment(setAlignment)}
    >
      <ToggleButton
        onClick={() => handlerShowEmail(setBoolValues, boolValues, formik)}
        value={'left'}
      >
        <Typography>Email</Typography>
      </ToggleButton>
      <ToggleButton
        onClick={() => handlerShowPhone(setBoolValues, boolValues, formik)}
        value={'center'}
      >
        <Typography>Номер телефона</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
    {boolValues.showPhoneField ? (
      <PhoneField formik={formik} />
    ) : (
      <EmailField formik={formik} />
    )}
    <NameField formik={formik} />
    <PasswordField formik={formik} />
    <PasswordConfirmField formik={formik} />
    <Button type={'submit'}>Регистрация</Button>
    <Button onClick={() => navigate(LOGIN_PAGE)}>Есть аккаунт?</Button>
  </Card>
);

export {
  CardItem,
};