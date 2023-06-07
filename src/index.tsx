import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux';
import { myFirstTheme } from './myFirstTheme';
import { ThemeProvider } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend} from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  // <React.StrictMode>
  <DndProvider backend={HTML5Backend}>
    <ThemeProvider theme={myFirstTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </DndProvider>
  // </React.StrictMode>
);