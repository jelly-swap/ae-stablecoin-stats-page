import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ToastMessage } from 'rimble-ui';

import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.render(
  <>
    <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
    <App />
  </>,
  document.getElementById('root')
);

serviceWorker.register();
