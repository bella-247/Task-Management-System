import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
import SignUp from './pages/Forms/SignUp';
// import Dashboard from './pages/Dashboard'
// import PrivateRoute from './components/PrivateRoute'
// import { ProvideAuth } from './hooks/useAuth'
// import { ProvideUser } from './hooks/useUser'
// import { ProvideWallet } from './hooks/useWallet'
// import { ProvideTransactions } from './hooks/useTransactions'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<SignUp />} />
        {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  )
}

export default App