import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getsubmissions } from "../services/operations/authAPI";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const { user } = useSelector((state) => state.profile);

  const fetchSubmissions = async () => {
    try {
      const submissions = await getsubmissions(); // Replace with your actual API endpoint

      // Filter submissions to count only one accepted result for one particular problem
      const uniqueAcceptedSubmissions = {};
      submissions.forEach((submission) => {
        if (
          submission.result === "Accepted" &&
          !uniqueAcceptedSubmissions[submission.userId]
        ) {
          uniqueAcceptedSubmissions[submission.userId] = new Set();
        }
        if (uniqueAcceptedSubmissions[submission.userId]) {
          uniqueAcceptedSubmissions[submission.userId].add(
            submission.problemId
          );
        }
      });

      // Calculate the number of distinct problems solved with accepted result for each user
      const leaderboardData = Object.entries(uniqueAcceptedSubmissions).map(
        ([userId, problems]) => {
          // Find the user's submission to extract the username
          const userSubmission = submissions.find(
            (submission) => submission.userId === userId
          );

          return {
            userId,
            username: userSubmission
              ? `${userSubmission.firstname} ${userSubmission.lastname}`
              : "Unknown", // Provide a fallback value if username is not found
            numProblems: problems.size,
          };
        }
      );

      // Sort the leaderboard based on the number of distinct problems solved
      leaderboardData.sort((a, b) => b.numProblems - a.numProblems);

      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen p-4">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Leaderboard
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Problems Solved
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboard.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.numProblems}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
