import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProblem } from "../../services/operations/authAPI";

const CreateProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    inputformat: "",
    outputformat: "",
    sampleinput1: "",
    sampleoutput1: "",
    testCases: [{ input: "", output: "" }],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const {
    title,
    description,
    difficulty,
    inputformat,
    outputformat,
    sampleinput1,
    sampleoutput1,
    testCases,
  } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTestCaseChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTestCases = [...testCases];
    updatedTestCases[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      testCases: updatedTestCases,
    }));
  };

  const handleAddTestCase = () => {
    setFormData((prevData) => ({
      ...prevData,
      testCases: [...prevData.testCases, { input: "", output: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedTestCases = testCases.map((testCase) => ({
      ...testCase,
      output: testCase.output.replace(/\n/g, "\n"), // Replace \r\n with \n
    }));

    dispatch(createProblem({ ...formData, testCases: formattedTestCases }, navigate, token));

    // Reset form data
    setFormData({
      title: "",
      description: "",
      difficulty: "",
      inputformat: "",
      outputformat: "",
      sampleinput1: "",
      sampleoutput1: "",
      testCases: [{ input: "", output: "" }],
    });
  };

  return (
    <div className=" mx-auto p-8 bg-gray-800 shadow-md rounded-lg w-full">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Create a Problem
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-700 rounded mt-2 bg-gray-900 text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Description</label>
          <textarea
            name="description"
            type="text"
            value={description}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-700 rounded mt-2 bg-gray-900 text-white"
            rows="4"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Select Difficulty</label>
          <select
            name="difficulty"
            value={difficulty}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-700 rounded mt-2 bg-gray-900 text-white"
            required
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Input Format</label>
          <textarea
            name="inputformat"
            value={inputformat}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-700 rounded mt-2 bg-gray-900 text-white"
            rows="2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Output Format</label>
          <textarea
            name="outputformat"
            value={outputformat}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-700 rounded mt-2 bg-gray-900 text-white"
            rows="2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Sample Input 1</label>
          <textarea
            name="sampleinput1"
            value={sampleinput1}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-700 rounded mt-2 bg-gray-900 text-white"
            rows="2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Sample Output 1</label>
          <textarea
            name="sampleoutput1"
            value={sampleoutput1}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-700 rounded mt-2 bg-gray-900 text-white"
            rows="2"
            required
          />
        </div>
        {/* Code for test cases */}
        {testCases.map((testCase, index) => (
          <div key={index}>
            <div className="mb-6">
              <label className="block text-gray-300 text-lg">
                Test Case {index + 1}
              </label>
              <div className="mb-3">
                <label className="block text-gray-300">Input</label>
                <textarea
                  name="input"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(e, index)}
                  className="w-full p-3 border border-gray-700 rounded mt-2 bg-gray-900 text-white"
                  rows="2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-300">Output</label>
                <textarea
                  name="output"
                  value={testCase.output}
                  onChange={(e) => handleTestCaseChange(e, index)}
                  className="w-full p-3 border border-gray-700 rounded mt-2 bg-gray-900 text-white"
                  rows="2"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        {/* Button to add more test cases */}
        <button
          type="button"
          onClick={handleAddTestCase}
          className="w-full bg-yellow-500 text-gray-900 p-3 rounded-lg hover:bg-yellow-600 transition duration-200"
        >
          Add Test Case
        </button>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 p-3 rounded-lg hover:bg-yellow-600 transition duration-200 mt-4"
        >
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateProblem;
