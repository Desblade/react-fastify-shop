import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../../index';
import { CardItem } from '../CardItem';
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';

const CardList = observer(() => {
  const { adminStore: { groceiers } } = useContext(Context);

  return (
    <Box className={styles.cardList}>
      {
        groceiers?.map(({ id, path, name, description, price }) => (
          <CardItem
            id={id}
            path={path}
            key={path}
            name={name}
            description={description}
            price={price}
          />
        ))
      }
      <ToastContainer />
    </Box>
  );
})

export {
  CardList,
};
