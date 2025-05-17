import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './utils/ProtectedRoute'
import Home from './pages/Home'
import Layout from './Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {

  const queryClient = new QueryClient({
      defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
    },
  },
  })

  return (
    <QueryClientProvider client={queryClient} >
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
    <ReactQueryDevtools initialIsOpen={false} /> 
  </QueryClientProvider>
  )
}

export default App
