import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';


const AdminDashboard = () => {
  const links = [
    { name: 'Students', href: '/students' },
    { name: 'Problem Set', href: '/edit-problem' },
    { name: 'Create a problem', href: '/create' },
    { name: 'Submissions', href: '/submissions' },

  ];

  return (
    <div className="min-h-screen bg-green-900 text-white">
      <header className="bg-green-800 p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      </header>
      <div className="p-8">
        <nav className="flex flex-col items-center space-y-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="w-full max-w-md p-4 text-center bg-green-700 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
