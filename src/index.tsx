import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import store  from 'services/store';
import { BrowserRouter as Router } from 'react-router-dom';
import {BASE_URL} from './utils/constants'


ReactDOM.render(
  <React.StrictMode>
  <Router basename={BASE_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
