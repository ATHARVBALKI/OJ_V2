import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProblembyid, updateProblem } from "../../services/operations/authAPI";

const UpdateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    inputformat: "",
    outputformat: "",
    sampleinput1: "",
    sampleoutput1: "",
  });

  const { id } = useParams(); // Get the problem ID from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await getProblembyid(id);
        setFormData(response.data.problem); // Set the form data to the existing problem data
      } catch (error) {
        console.error("Unable to fetch problem:", error);
      }
    };

    fetchProblem();
  }, [id]);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with only the fields that have changed
    const updatedData = {};
    for (const key in formData) {
      if (formData[key]) {
        updatedData[key] = formData[key];
      }
    }

    dispatch(updateProblem(id, updatedData, navigate));
  };

  const {
    title,
    description,
    difficulty,
    inputformat,
    outputformat,
    sampleinput1,
    sampleoutput1,
  } = formData;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Problem</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Title</label>
          <input
            type="text"
            name="title"
            value={title || ""}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Description</label>
          <textarea
            name="description"
            type="text"
            value={description || ""}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="4"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Difficulty</label>
          <select
            name="difficulty"
            value={difficulty || ""}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Input Format</label>
          <textarea
            name="inputformat"
            value={inputformat || ""}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Output Format</label>
          <textarea
            name="outputformat"
            value={outputformat || ""}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Sample Input 1</label>
          <textarea
            name="sampleinput1"
            value={sampleinput1 || ""}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Sample Output 1</label>
          <textarea
            name="sampleoutput1"
            value={sampleoutput1 || ""}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
