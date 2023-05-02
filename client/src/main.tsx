import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AppContextProvider } from './AppContext'




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   
  <AppContextProvider>

    <App/>
  </AppContextProvider>
   
    
   
  </React.StrictMode>
)
