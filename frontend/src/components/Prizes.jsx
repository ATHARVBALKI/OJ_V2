import React from "react";

const PrizesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Prizes</h1>
      <div className="flex items-center justify-center bg-white rounded-lg shadow-md p-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">No Prizes Yet</h2>
          <p className="text-lg text-gray-700 mb-6">Check back later for updates on upcoming contests and prizes!</p>
          <p className="text-lg text-gray-700">A new contest is coming soon. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
};

export default PrizesPage;
