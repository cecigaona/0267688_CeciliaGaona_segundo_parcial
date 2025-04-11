import React, { useState } from 'react'
import { Heart, User, Lock, Activity, Weight, Ruler, Calendar } from 'lucide-react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (username: string, password: string) => {
    // In a real app, this would validate against a backend
    if (username && password) {
      setIsLoggedIn(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard />
      )}
    </div>
  )
}

export default App