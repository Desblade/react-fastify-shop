import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import { Context } from '../../index';
import { adminRouters, authRouters, publicRouters } from '../../utils/routers';

const AppRouter = observer(() => {
  const { userStore } = useContext(Context);

  return (
    <Routes>
      {userStore.user.role === 'admin' && (
        <>
          {adminRouters.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </>
      )}
      {userStore.isAuth ? (
        <>
          {authRouters.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </>
      ) : (
        <>
          {publicRouters.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </>
      )}
    </Routes>
  );
});

export {
  AppRouter,
};
