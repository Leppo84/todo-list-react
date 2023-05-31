import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux';
import { myFirstTheme } from './myFirstTheme';
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  // <React.StrictMode>
    <ThemeProvider theme={myFirstTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  // </React.StrictMode>
);