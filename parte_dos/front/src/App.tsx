import React, { useState } from 'react'
import { Heart, User, Lock, Activity, Weight, Ruler, Calendar } from 'lucide-react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { api } from './services/api'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.login(username, password)

      if (response.user_id) {
        setUserId(response.user_id)
        setIsLoggedIn(true)
      } else {
        setError('Login failed: Invalid response from server')
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {!isLoggedIn ? (
        <Login
          onLogin={handleLogin}
          error={error}
          isLoading={isLoading}
        />
      ) : (
        <Dashboard
          userId={userId as number}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App
