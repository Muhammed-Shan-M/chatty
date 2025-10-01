import React, { useEffect } from 'react'

import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Setting } from './pages/Setting'
import { Profile } from './pages/Profile'

import { Loader } from 'lucide-react'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { ToastContainer,Bounce  } from 'react-toastify'
import { useThemeStore } from './store/themeStore'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" size={40} />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to={'/'} />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
        <Route path='/settings' element={<Setting />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to={'/login'} />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

    </div>
  )
}

export default App
