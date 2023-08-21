import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Typography, Box, TextField, CircularProgress } from '@mui/material';
import { Context } from '../../../index';
import { MAIN_PAGE } from '../../../utils/consts';
import { validationSchemaForRegister } from './utils/validationSchemaForRegister';
import { TransitionsModal } from '../../../components/TransitionsModal';
import { resetForm } from './utils/utilsForRegister';
import { CardItem } from './Components/CardItem';
import styles from './index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState('left');
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({ userConfirmCode: '' });
  const [boolValues, setBoolValues] = useState({
    isLoading: false,
    showPhoneField: false,
    showEmailField: true,
  });

  const handleSubmit = async () => {
    try {
      await userStore.register({
        email: formik.values.email,
        password: formik.values.password,
        userConfirmCode: values.userConfirmCode,
        name: formik.values.name,
      });

      resetForm(formik, values, setValues);
      setShow(false);
      navigate(MAIN_PAGE);
    } catch (err) {
      resetForm(formik, values, setValues);
      setShow(false);
      toast(err.e);
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: '',
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchemaForRegister,
    onSubmit: async ({ email }) => {
      try {
        setBoolValues({ ...boolValues, isLoading: true });

        await userStore.confirmMail({ email });
      } catch (err) {
        return toast(err.e);
      } finally {
        setBoolValues({ ...boolValues, isLoading: false });
      }
      setShow(true);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <CardItem
        boolValues={boolValues}
        setBoolValues={setBoolValues}
        alignment={alignment}
        setAlignment={setAlignment}
        formik={formik}
        navigate={navigate}
      />
      <ToastContainer />
      {boolValues.isLoading ? (
        <div className={styles.loaderContainer}>
          <CircularProgress color={'success'} />
        </div>
      ) : (
        <TransitionsModal open={show} setOpen={setShow}>
          <Box className={styles.modalForm}>
            <Typography variant={'h4'}>Подтвердите почту</Typography>
            <Typography variant={'h5'}>
              Сообщение на {formik.values.email} уже отправлено!
            </Typography>
            <TextField
              placeholder={'Код подтверждения'}
              label={'Код'}
              value={values.userConfirmCode}
              onChange={(e) =>
                setValues({ ...values, userConfirmCode: e.target.value })
              }
            />
            <Button onClick={handleSubmit}>Подтвердить</Button>
          </Box>
        </TransitionsModal>
      )}
    </form>
  );
};

export {
  RegisterForm,
};
