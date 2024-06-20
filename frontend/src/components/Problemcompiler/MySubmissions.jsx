import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getsubmissions } from '../../services/operations/authAPI'; // Replace with your actual API import

const MySubmissions = () => {
  const { userid, problemid } = useParams();

  const [submissions, setSubmissions] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  const fetchSubmissions = async () => {
    try {
      const data = await getsubmissions(); // Replace with your actual API endpoint
      const filteredSubmissions = data.filter(submission => 
        submission.userId === userid && submission.problemId === problemid
      );
      setSubmissions(filteredSubmissions.reverse()); // Reverse the data to have the latest submissions on top
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [userid, problemid]);

  const handleCodeClick = (code, result) => {
    setSelectedCode(code);
    setSelectedResult(result);
  };

  const handleCloseCode = () => {
    setSelectedCode(null);
    setSelectedResult(null);
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen p-4">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Submissions</h1>
      {selectedCode && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-11/12 md:w-3/4 lg:w-3/5 max-h-3/5 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Submitted Code</h2>
              <button onClick={handleCloseCode} className="bg-red-500 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-auto max-h-96">{selectedCode}</pre>
            {selectedResult && (
              <div className={`text-center mt-4 ${selectedResult.includes("Accepted") ? "text-green-500" : "text-red-500"}`}>
                {selectedResult}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Problem
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Result
              </th>
              <th className="px-6 py-3 text-xs text-center font-medium text-gray-700 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Submitted At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Code
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No submissions found
                </td>
              </tr>
            ) : (
              submissions.map((submission, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {submission.firstname} {submission.lastname}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{submission.problemTitle}</div>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      submission.result.includes("Accepted")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } rounded-full text-center`}
                  >
                    {submission.result}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 text-center">{submission.language}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(submission.submittedAt).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleCodeClick(submission.code, submission.result)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      View Code
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmissions;
