import React from 'react';
import img13 from '../../assets/img13.jpg'

const ProblemDay = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
      <h2 className="text-3xl  font-semibold text-gray-800 mb-2">PROBLEM OF THE DAY</h2>
      <img src={img13} alt="Problem of the Day" className="rounded-lg mb-4" />
      <p className="text-center text-gray-600 text-lg font-bold mb-4">The problem of the day has not been declared yet.</p>
      {/* You can add more information or styling here */}
    </div>
  );
};

export default ProblemDay;
