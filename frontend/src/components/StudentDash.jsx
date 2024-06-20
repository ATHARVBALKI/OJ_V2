import React from "react";
import { Link } from "react-router-dom";

const StudentDash = () => {
  const links = [
    { name: "Problem of the Day", href: "/problem-of-the-day" },
    { name: "Problemset", href: "/problemset" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Prizes", href: "/prizes" },
    { name: "Submissions", href: "/submissions" },
    { name: 'Contests', href: '/contests' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Student Dashboard</h1>
      </header>
      <main className="p-8">
        <nav className="flex flex-col items-center space-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="w-full max-w-md p-4 text-center bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default StudentDash;
