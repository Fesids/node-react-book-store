import { useContext, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import axios from 'axios'
import { Home } from './pages/home'
import { Layout } from './components/Layout'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { ListBookPage } from './pages/ListBookPage'
import { CreateBookPage } from './pages/CreateBookPage'
import { Teste } from './pages/Teste'
import { UpdateBookPage } from './pages/UpdateBookPage'
import { BookDetail } from './pages/BookDetail'
import { BookDeletePage } from './pages/BookDeletePage'


axios.defaults.baseURL = "http://localhost:8080/"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      },


      // Book routes


      {
        path: "/book/list",
        element: <ListBookPage/>
      },
      {
        path: "/book/new",
        element: <CreateBookPage/>
      },
      {
        path: "/teste",
        element: <Teste/>
      },{
        path: "/book/update/:id",
        element: <UpdateBookPage/>
      },{
        path: "/book/detail/:id",
        element: <BookDetail/>
      },{
        path: "/book/delete/:id",
        element: <BookDeletePage/>
      }
    ]
  }
])
/*const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },{
        path: "/notes",
        element: <Notes/>
      },{
        path: "/add/notes",
        element: <CreateNote/>
      },
      {
        path: "/notes/:id",
        element: <SingleNote/>
      },
      {
        path: "/update/:id",
        element: <UpdateNote/>
      }
    ]
    
  }
])*/

function App() {
  
  
  return(
    <RouterProvider router={router}/>
   //<RouterProvider router={router}/>
  )

  
}

export default App
