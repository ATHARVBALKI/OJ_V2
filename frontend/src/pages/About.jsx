import React from 'react';

const About = () => {
  return (
    <div className="h-full pt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="max-w-6xl mx-auto p-8 bg-white bg-opacity-90 shadow-2xl rounded-lg text-gray-900 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-opacity-100">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-700">
          About Our Online Judge
        </h1>
        <p className="text-lg font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 p-4 rounded-lg">
          Welcome to our Online Judge platform! We are committed to providing a comprehensive and user-friendly environment for coding enthusiasts and professionals alike. Here’s what makes us unique:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-purple-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <div className="bg-white text-purple-600 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 21H3V8H21ZM3 8L10.5 2.5L18 8M18 8V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H8C7.46957 21 6.96086 20.7893 6.58579 20.4142C6.21071 20.0391 6 19.5304 6 19V8M18 8H21M18 8L21 11V17"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Quality Content</h2>
            <p className="text-center">Our platform offers high-quality problem sets curated by industry experts. We ensure that each problem is challenging and engaging, designed to enhance your problem-solving skills.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-pink-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <div className="bg-white text-pink-600 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12L2 13V17C2 17.5304 2.21071 18.0391 2.58579 18.4142C2.96086 18.7893 3.46957 19 4 19H20C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V13L21 12M3 12L12 3L21 12M3 12H21M16 19V11H8V19"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Real-time Collaboration</h2>
            <p className="text-center">Unlike many other platforms, we provide features that allow for real-time collaboration. Work on problems together, share insights, and grow your knowledge base collectively.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <div className="bg-white text-blue-600 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3L19 12L5 21V3Z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Instant Feedback</h2>
            <p className="text-center">Get instant feedback on your code submissions. Our robust evaluation system checks your code for correctness and efficiency, helping you learn and improve faster.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-green-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <div className="bg-white text-green-600 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10H21M12 4L12 20M9 14L15 14"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Comprehensive Learning Paths</h2>
            <p className="text-center">We offer structured learning paths that guide you from basic to advanced topics. Follow a step-by-step approach to master new skills and technologies.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-yellow-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <div className="bg-white text-yellow-600 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7C17 8.32608 16.4732 9.59785 15.5355 10.5355C14.5979 11.4732 13.3261 12 12 12C10.6739 12 9.40215 11.4732 8.46447 10.5355C7.52678 9.59785 7 8.32608 7 7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2V2ZM12 2V22"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Gamified Experience</h2>
            <p className="text-center">Engage in a gamified coding experience. Earn points, badges, and climb the leaderboard as you solve problems and participate in contests.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-red-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <div className="bg-white text-red-600 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8H21V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V8H6M3 8L12 2L21 8M14 22V12H10V22"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Community Support</h2>
            <p className="text-center">Join our vibrant community. Participate in forums, ask questions, and get help from experienced developers and peers.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-teal-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <div className="bg-white text-teal-600 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 10C19.5523 10 20 9.55228 20 9C20 8.44772 19.5523 8 19 8C18.4477 8 18 8.44772 18 9C18 9.55228 18.4477 10 19 10ZM5 10C5.55228 10 6 9.55228 6 9C6 8.44772 5.55228 8 5 8C4.44772 8 4 8.44772 4 9C4 9.55228 4.44772 10 5 10ZM12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2ZM12 8C9.8 8 7.67392 8.52678 6 9.46447V15.5355C7.67392 16.4732 9.8 17 12 17C14.2 17 16.3261 16.4732 18 15.5355V9.46447C16.3261 8.52678 14.2 8 12 8ZM2 17V9.46447C3.52943 8.52678 5.20435 8 7 8V15C5.20435 15 3.52943 14.4732 2 13.5355ZM19 2H21V22H19V2ZM3 2H5V22H3V2Z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Personalized Recommendations</h2>
            <p className="text-center">Receive personalized problem recommendations based on your skill level and interests. Our AI-driven system ensures that you always have the right challenge to work on.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-indigo-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <div className="bg-white text-indigo-600 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4ZM19 2H21V22H19V2ZM5 2H7V22H5V2ZM2 17V9.46447C3.52943 8.52678 5.20435 8 7 8V15C5.20435 15 3.52943 14.4732 2 13.5355ZM16 6C16 6.53043 16.2107 7.03914 16.5858 7.41421C16.9609 7.78929 17.4696 8 18 8H20C20.5304 8 21.0391 7.78929 21.4142 7.41421C21.7893 7.03914 22 6.53043 22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H18C17.4696 20 16.9609 19.7893 16.5858 19.4142C16.2107 19.0391 16 18.5304 16 18V6Z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Regular Contests</h2>
            <p className="text-center">Compete in regular coding contests and hackathons hosted on our platform. Showcase your skills, win prizes, and get noticed by top tech companies.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-purple-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-110">
            <div className="bg-white text-purple-600 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8H21V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V8H6M3 8L12 2L21 8M14 22V12H10V22"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Secure and Private</h2>
            <p className="text-center">We prioritize your security and privacy. All your data is securely stored and never shared without your consent.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;