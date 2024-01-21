import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from '../redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemProvider from './compoents/ThemProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ThemProvider>
            <App />
          </ThemProvider>
        </Provider>
      </PersistGate>
    </BrowserRouter>
  </React.StrictMode>,
)
