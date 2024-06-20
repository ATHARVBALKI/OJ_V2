import React, { useEffect, useState } from 'react';
import { getProblems } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const ProblemsPage = () => {
  const [problems, setProblems] = useState(null);
  const navigate = useNavigate();

  const getAllProblems = async () => {
    try {
      const response = await getProblems();
      setProblems(response);
      console.log(problems);
    } catch (error) {
      console.error('Unable to Fetch all problems:', error); // More informative error handling
    }
  };

  useEffect(() => {
    getAllProblems();
  }, []);

  const handleOnClick = (id) => {
    navigate(`/singleprob/${id}`);
    // console.log(id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">EXPLORE PROBLEMS</h1>
      <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {problems &&
          problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition duration-200 p-4 text-center"
            >
              <button className="text-xl font-medium text-white"
              onClick={() => handleOnClick(problem._id)}>{problem.title}</button>
            </div>
          ))}
      </nav>
    </div>
  );
};

export default ProblemsPage;
