import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import store from './store/store'

import EmotApp from './EmotApp.jsx'
import './index.css'
import './bootstrap/flatly.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <EmotApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
