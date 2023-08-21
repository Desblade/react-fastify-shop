import React, { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Context } from '../../index';
import { CardList } from './Components/CardList';
import styles from './index.module.scss';

const MainPage = () => {
  const { adminStore, userStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenParams = new URLSearchParams(window.location.search);
    const token = tokenParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      userStore.secondStepGoogleAuth(token);

      tokenParams.delete('token');
      tokenParams.delete('paramName');
      const newSearch = tokenParams.toString();
      const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`;
      window.history.replaceState({}, '', newUrl);
    }

    const getData = async () => {
      try {
        await adminStore.getGroceires();
      } catch (e) {} finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [adminStore.groceiers.length]);

  return (
    <Box className={styles.container}>
      {
        isLoading &&
            <div className={styles.containerLoader}>
              <CircularProgress color={'success'} />
            </div>
      }
      { !isLoading && <CardList /> }
    </Box>
  );
}

export {
  MainPage,
};
