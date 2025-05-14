import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './utils/ProtectedRoute'
import Home from './pages/Home'
import Layout from './Layout'

function App() {

  return (
    <BrowserRouter> 
      <Routes>
          <Route element={<Login />} path='/login' />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route element={<Home />} path='/' />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>  
  )
}

export default App
