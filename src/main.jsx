import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import EmotApp from './EmotApp.jsx'

import { BrowserRouter } from 'react-router-dom';

import store from './store/store'
import { Provider } from 'react-redux'

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
