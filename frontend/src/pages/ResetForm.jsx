import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

function ResetForm() {
  const [formData, setFormData] = useState({
    email: '',
    password:"",
    confirmPassword:""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    dispatch(resetPassword(formData, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl text-white mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetForm;
