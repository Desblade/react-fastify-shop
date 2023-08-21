import React, { useContext, useEffect } from 'react';
import { AppRouter } from './components/AppRouter';
import { MenuAppBar } from './components/NavBar';
import { Context } from './index';

function App() {
  const { userStore } = useContext(Context);``

  useEffect(() => {
    const checkToken = async () => {
      try {
        await userStore.checkToken();
      } catch (e) {
        console.error(e);

        localStorage.removeItem('token');
      }
    };

    checkToken();
  }, []);

  return (
    <div>
      <MenuAppBar />
      <AppRouter />
    </div>
  );
}

export {
  App,
};
