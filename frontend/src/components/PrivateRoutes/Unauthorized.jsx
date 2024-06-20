import React from 'react'

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-lg text-gray-700">You do not have permission to view this page.</p>
      </div>
    </div>
  )
}

export default Unauthorized
