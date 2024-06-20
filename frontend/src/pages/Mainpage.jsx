import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpeg';
import img9 from '../assets/img9.png';
import img10 from '../assets/img10.png';
import img11 from '../assets/img11.jpeg';

const Mainpage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-800">
        <img src={img1} />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-5xl font-bold text-center text-red-500">Welcome to Online Judge</h1>
          <p className="mt-4 text-xl text-center max-w-xl">
            Your ultimate platform for coding competitions and learning.
          </p>
          <Link to="/signup" className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-500">Why Choose Online Judge?</h2>
          <p className="mt-4 text-lg text-black">
            Discover the unique features that make Online Judge your best choice for coding practice and competitions.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img src={img2} alt="Feature 1" className="w-full h-48 object-cover rounded-md" />
            <h3 className="mt-4 text-xl font-semibold text-white">Interactive Coding Challenges</h3>
            <p className="mt-2 text-gray-300">
              Engage with problems that simulate real-world scenarios and enhance your coding skills.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img src={img3} alt="Feature 2" className="w-full h-48 object-cover rounded-md" />
            <h3 className="mt-4 text-xl font-semibold text-white">Quality Content</h3>
            <p className="mt-2 text-gray-300">
              Each problem is curated to ensure you learn something new and valuable.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img src={img4} alt="Feature 3" className="w-full h-48 object-cover rounded-md" />
            <h3 className="mt-4 text-xl font-semibold text-white">Personalized Learning Paths</h3>
            <p className="mt-2 text-gray-300">
              Tailor your learning journey according to your goals and skill level.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-500">Explore Our Platform</h2>
          <p className="mt-4 text-lg text-gray-300">
            A glimpse into what makes Online Judge stand out.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <img src={img6} alt="Gallery 1" className="w-full h-48 object-cover rounded-md" />
          <img src={img7} alt="Gallery 2" className="w-full h-48 object-cover rounded-md" />
          <img src={img8} alt="Gallery 3" className="w-full h-48 object-cover rounded-md" />
          <img src={img9} alt="Gallery 4" className="w-full h-48 object-cover rounded-md" />
          <img src={img10} alt="Gallery 5" className="w-full h-48 object-cover rounded-md" />
          <img src={img11} alt="Gallery 6" className="w-full h-48 object-cover rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
