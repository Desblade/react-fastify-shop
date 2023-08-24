import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Card, CircularProgress, Paper, Typography } from '@mui/material';
import RedeemIcon from '@mui/icons-material/Redeem';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { MAIN_PAGE } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';

const CartPage = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const { userStore } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await userStore.getItems();
      } catch (e) {

      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [userStore.items.length]);

  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        {
          !isLoading
            ? userStore.items.length
                ? userStore.items.map(({ id, path, name, description, price, count }) => (
                  <Card
                    key={id}
                    className={styles.item}
                  >
                    <Box className={styles.container__info}>
                      <Paper
                        sx={{
                          width: '40%',
                          height: '100%',
                          backgroundSize: 'cover',
                          backgroundImage: `url(${path})`,
                        }}
                      ></Paper>
                      <Box className={styles.text}>
                        <Typography variant={'h4'}>{ name }</Typography>
                        <Typography>{ description }</Typography>
                      </Box>
                    </Box>
                    <Box className={styles.priceInfo__container}>
                      <Box className={styles.priceInfo}>
                        <Typography className={styles.cart}>В корзине: { count }</Typography>
                        <Box className={styles.costButton}>
                          <Typography className={styles.cost}>${ price }</Typography>
                          <Button
                            color={'success'}
                            size={'large'}
                            variant={'contained'}
                          >
                            <RedeemIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                ))
                : (
                  <Box className={styles.noItems}>
                    <Typography
                      className={styles.noItems__text}
                      variant={'h2'}
                    >
                      Ни один предмет еще не был добавлен в коризну...
                    </Typography>
                    <Button
                      onClick={() => navigate(MAIN_PAGE)}
                      sx={{ width: '15%' }}
                      size={'large'}
                      variant={'contained'}
                      color={'success'}
                    >
                      К покупкам!
                    </Button>
                  </Box>
                )
            : (
                <div className={styles.containerLoader}>
                  <CircularProgress color={'success'} />
                </div>
            )
        }
      </Box>
    </Box>
  );
});

export {
  CartPage,
};
