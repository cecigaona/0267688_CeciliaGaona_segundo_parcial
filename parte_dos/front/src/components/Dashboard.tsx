import React from 'react'
import { Activity, User, Weight, Ruler, Calendar } from 'lucide-react'

function Dashboard() {
  const healthData = {
    name: "John Doe",
    age: 32,
    height: "180cm",
    weight: "75kg",
    gender: "Male"
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
                <p className="text-gray-600">Welcome back, {healthData.name}</p>
              </div>
            </div>
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
                <p className="text-gray-600">Name: <span className="font-semibold text-gray-800">{healthData.name}</span></p>
                <p className="text-gray-600">Gender: <span className="font-semibold text-gray-800">{healthData.gender}</span></p>
              </div>
            </div>

            {/* Age Card */}
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-700">Age</h3>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-4xl font-bold text-gray-800">{healthData.age}</span>
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
                <span className="text-4xl font-bold text-gray-800">{healthData.height}</span>
              </div>
            </div>

            {/* Weight Card */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Weight className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-700">Weight</h3>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-4xl font-bold text-gray-800">{healthData.weight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard