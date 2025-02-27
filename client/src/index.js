import React from 'react';
import ReactDOM from 'react-dom/client';  // Cambié la importación de 'react-dom' a 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store/store';
import App from './App';

// Crear el "root" de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

// Usar 'root.render()' para renderizar la app
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);