import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './utils/ProtectedRoute'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter> 
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<ProtectedRoute />}>
            <Route element={<Home />} path='/' />
        </Route>
      </Routes>
    </BrowserRouter>  
  )
}

export default App
