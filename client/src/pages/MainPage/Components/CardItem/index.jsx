import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Box, Typography, Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { Context } from '../../../../index';
import { TransitionsModal } from '../../../../components/TransitionsModal';
import styles from './index.module.scss';

const CardItem = observer(({ id, path, name, description, price }) => {
  const { userStore } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const numberCounter = Number(counter);

      await userStore.addInCart(numberCounter, id);
      setOpen(false);
    } catch (err) {
      toast.error(err.e);
    }
  };

  return (
    <Card className={styles.card}>
      <div
        onClick={() => navigate(`/catalog/${id}`)}
        className={styles.imgContainer}
      >
        <img className={styles.img} src={path} alt={name} />
      </div>
      <Box className={styles.cardContent}>
        <Box className={styles.cardContent__box}>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
        <Box className={styles.cardFooter}>
          <Typography color="green">${price}</Typography>
          {
            userStore.user.role === 'admin' && (
              <Button disabled>
                <Typography>ID: {id}</Typography>
              </Button>
            )
          }
          <Button
            disabled={!userStore.isAuth}
            onClick={() => setOpen(true)}
          >
            Купить
          </Button>
        </Box>
      </Box>
      <TransitionsModal open={open} setOpen={setOpen}>
        <Box className={styles.modalCount}>
          <Typography variant="h5">Вы хотите купить {name}?</Typography>
          <TextField
            type="number"
            sx={{ width: '50%' }}
            value={counter}
            onChange={(e) => setCounter(e.target.value)}
            placeholder="Количество"
            label="Количество"
          />
          <Button onClick={handleAddToCart}>В корзину</Button>
        </Box>
      </TransitionsModal>
    </Card>
  );
});

export {
  CardItem,
};