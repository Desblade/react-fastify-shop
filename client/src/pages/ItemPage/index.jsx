import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../index';

const ItemPage = () => {
  const { userStore } = useContext(Context);
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await userStore.getOne(id);

        setItem(data);
      } catch (e) {
        console.error(e);
      }
    };
    // временное решение
    getData();
  }, []);

  return (
    <div>
      {item?.name}
    </div>
  );
};

export {
  ItemPage,
};
