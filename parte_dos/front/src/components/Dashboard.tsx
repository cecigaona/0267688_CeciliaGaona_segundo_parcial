import React, { useEffect, useState } from 'react'
import { Activity, User, Weight, Ruler, Calendar, LogOut } from 'lucide-react'
import { api } from '../services/api'

interface DashboardProps {
  userId: number
  onLogout: () => void
}

interface UserData {
  ID?: number
  UserID?: number
  Edad: number
  Estatura: number
  Peso: number
  Nombre: string
  Genero: string
}

function Dashboard({ userId, onLogout }: DashboardProps) {
  const [healthData, setHealthData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const data = await api.getUserData(userId)
        setHealthData(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch user data:', err)
        setError('Could not load your health data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Activity className="w-10 h-10 text-blue-500 animate-pulse" />
          <p className="mt-4 text-gray-600">Loading your health data...</p>
        </div>
      </div>
    )
  }

  if (error || !healthData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <div className="bg-red-100 p-3 rounded-full inline-block">
              <Activity className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">Data Error</h2>
            <p className="mt-2 text-gray-600">{error || "Could not load your health data"}</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Return to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 border-b pb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Health Dashboard</h1>
                <p className="text-gray-600">Welcome back, {healthData.Nombre}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Name Card */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-700">Personal Info</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Name: <span className="font-semibold text-gray-800">{healthData.Nombre}</span></p>
                <p className="text-gray-600">Gender: <span className="font-semibold text-gray-800">{healthData.Genero}</span></p>
              </div>
            </div>

            {/* Age Card */}
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-700">Age</h3>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-4xl font-bold text-gray-800">{healthData.Edad}</span>
                <span className="text-gray-600 mb-1">years</span>
              </div>
            </div>

            {/* Height Card */}
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Ruler className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-700">Height</h3>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-4xl font-bold text-gray-800">{healthData.Estatura.toFixed(1)}</span>
                <span className="text-gray-600 mb-1">cm</span>
              </div>
            </div>

            {/* Weight Card */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Weight className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-700">Weight</h3>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-4xl font-bold text-gray-800">{healthData.Peso.toFixed(1)}</span>
                <span className="text-gray-600 mb-1">kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
