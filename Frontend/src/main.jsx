import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Admin from './components/Admin.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Perfil from './components/Perfil.jsx'
import Registro from './components/Registro.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: '/perfil',
    element: <Perfil />
  },
  {
    path: '/registro',
    element: <Registro />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
