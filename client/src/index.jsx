import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import { App } from './App';
import { UserStore } from './stores/UserStore';
import { AdminStore } from './stores/AdminStore';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null);

root.render(
	<StyledEngineProvider injectFirst>
    <Context.Provider value={{
			userStore: new UserStore(),
      adminStore: new AdminStore(),
    }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </StyledEngineProvider>
);
