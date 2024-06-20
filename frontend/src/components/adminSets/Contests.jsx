import React from 'react';
import comingSoonImage from '../../assets/coming-soon.jpg'; // Adjust the path based on your project structure

const Contests = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="bg-gray-700 text-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <img src={comingSoonImage} alt="Coming Soon" className="mb-4" style={{ height: '500px', width: '500px' }} />
        <h1 className="text-4xl font-bold">COMING SOON</h1>
      </div>
    </div>
  );
};

export default Contests;
