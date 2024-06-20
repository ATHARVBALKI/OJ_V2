import React, { useEffect, useState } from 'react';
import { deleteProblem, getProblems } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const ProblempageAdmin = () => {
  const [problems, setProblems] = useState(null);
  const navigate = useNavigate();

  const getAllProblems = async () => {
    try {
      const response = await getProblems();
      setProblems(response);
      console.log(response); // Fix: log the response instead of problems
    } catch (error) {
      console.error('Unable to fetch all problems:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProblem(id, navigate);
      // After deletion, refetch the problems
      getAllProblems();
    } catch (error) {
      console.error('Unable to delete the problem:', error);
    }
  };

  useEffect(() => {
    getAllProblems();
  }, []);

  const handleOnClick = (id) => {
    navigate(`/singleprob/${id}`);
  };

  const handleUpdateClick = (id) => {
    navigate(`/updateprob/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">EXPLORE PROBLEMS</h1>
      <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {problems &&
          problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition duration-200 p-6 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-4">{problem.title}</h2>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleOnClick(problem._id)}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  onClick={() => handleUpdateClick(problem._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => handleDelete(problem._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </nav>
    </div>
  );
};

export default ProblempageAdmin;
