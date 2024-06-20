import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/themes/prism.css";
import {
  getProblembyid,
  runproblem,
  submitproblem,
} from "../../services/operations/authAPI";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function CodeEditor({ problemid }) {
  const navigate = useNavigate();
  const defaultCodeSnippets = {
    cpp: `
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, CPP!" << endl;
    return 0;
}`,
    c: `
#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}`,
    py: `
print("Hello, PYTHON!")
`,
    java: `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, JAVA!");
    }
}`,
  };

  const [code, setCode] = useState(defaultCodeSnippets["cpp"]);
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [verdict, setVerdict] = useState("");
  const [activeTab, setActiveTab] = useState("input");

  const getProblem = async () => {
    try {
      const response = await getProblembyid(problemid);
      toast("Here You Go !!!");
      setProblem(response.data.problem);
    } catch (error) {
      console.error("Unable to Fetch problem:", error);
    }
  };

  useEffect(() => {
    getProblem();
  }, [problemid]);

  useEffect(() => {
    setCode(defaultCodeSnippets[language]);
  }, [language]);

  const handleRun = async () => {
    const payload = {
      language: language,
      code,
      input,
    };

    try {
      const { data } = await runproblem(payload);
      console.log("data-->>", data);
      const formattedOutput = data.output.replace(/\n/g, "<br>");
      console.log("formatedddddd", formattedOutput);
      setOutput(formattedOutput);
      setActiveTab("output");
    } catch (error) {
      console.log(error.response);
      toast.error("Compilation error");
      setOutput(error);
      setActiveTab("output");
    }
  };

  const { token } = useSelector((state) => state.auth);
  const handleSubmit = async () => {
    const payload = {
      language: language,
      code,
    };
    try {
      const { data } = await submitproblem(payload, problemid, token);
      console.log(data);
      let verdictHtml = data.success
        ? '<div style="color: green;">Result: All Test Cases Passed</div>'
        : '<div style="color: red;">Result: Wrong Answer</div>';
      verdictHtml += `<div>${data.passedTestCases} out of ${data.totalTestCases} test cases passed</div>`;
      verdictHtml += '<div>Test Cases:</div>';

      // Stop loop on first failed test case
      let stopLoop = false;

      data.results.forEach((result, index) => {
        if (stopLoop) return;

        if (result.passed) {
          verdictHtml += `
            <button style="background-color: green; color: white; padding: 5px; margin: 5px; display: inline-block;">Test Case ${index + 1}</button>
          `;
        } else {
          verdictHtml += `
            <button style="background-color: red; color: white; padding: 5px; margin: 5px; display: inline-block;">Test Case ${index + 1}</button>
          `;
          stopLoop = true; // Stop loop on first failed test case
        }
      });

      setVerdict(verdictHtml);
      setActiveTab("verdict");
    } catch (error) {
      console.log(error);
      setVerdict("Submission error");
      setActiveTab("verdict");
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const getLanguage = () => {
    switch (language) {
      case "cpp":
        return languages.cpp;
      case "c":
        return languages.c;
      case "py":
        return languages.python;
      case "java":
        return languages.java;
      default:
        return languages.cpp;
    }
  };

  const { user } = useSelector((state) => state.profile);
  const mysubmissions = (userId, problemId) => {
    navigate(`/mysubmissions/${userId}/${problemId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center">CodeVerse</h1>
      <h2 className="text-3xl font-bold text-center">"Empowering Coders, One Verse at a Time !"</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => mysubmissions(user._id, problem._id)}
          className="text-center inline-flex items-center text-white bg-blue-500 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
        >
          My Submissions
        </button>
      </div>
      <div className="flex">
        {problem && (
          <div className="w-[50%] p-4 bg-gray-800 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{problem.title}</h2>
            <p className="mt-1 text-md text-gray-400">
              Difficulty: {problem.difficulty}
            </p>
            <p className="mt-2">{problem.description}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Input Format</h3>
              <p className="mt-2">{problem.inputformat}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Output Format</h3>
              <p className="mt-2">{problem.outputformat}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Example</h3>
              <div className="mt-2 font-semibold">Sample 1 INPUT:</div>
              {problem.sampleinput1.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
              <div className="mt-2 font-semibold">Sample 1 OUTPUT:</div>
              {problem.sampleoutput1.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        )}
        <div className="w-[50%] ml-4">
          <div className="flex justify-end mb-4">
            <select
              className="border border-gray-300 rounded-lg py-1.5 px-4 focus:outline-none focus:border-indigo-500"
              onChange={handleLanguageChange}
              value={language}
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="py">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div
            className="bg-gray-900 text-white shadow-md rounded-lg mb-4"
            style={{ height: "300px", overflowY: "auto" }}
          >
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, getLanguage())}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                outline: "none",
                border: "none",
                backgroundColor: "#1e1e1e",
                height: "100%",
                overflowY: "auto",
              }}
            />
          </div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setActiveTab("input")}
              className={`text-center inline-flex items-center text-white px-4 py-2 rounded-lg ${activeTab === "input" ? "bg-blue-500" : "bg-gray-700"}`}
            >
              Input
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`ml-2 text-center inline-flex items-center text-white px-4 py-2 rounded-lg ${activeTab === "output" ? "bg-blue-500" : "bg-gray-700"}`}
            >
              Output
            </button>
            <button
              onClick={() => setActiveTab("verdict")}
              className={`ml-2 text-center inline-flex items-center text-white px-4 py-2 rounded-lg ${activeTab === "verdict" ? "bg-blue-500" : "bg-gray-700"}`}
            >
              Verdict
            </button>
          </div>
          <div className="bg-gray-900 text-white shadow-md rounded-lg p-4" style={{ height: "100px", overflowY: "auto" }}>
            {activeTab === "input" && (
              <textarea
                className="bg-gray-900 text-white border border-gray-700 rounded-lg w-full h-full p-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input here..."
              />
            )}
            {activeTab === "output" && (
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            )}
            {activeTab === "verdict" && (
              <div
                className="whitespace-pre-wrap "
                dangerouslySetInnerHTML={{ __html: verdict }}
              />
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleRun}
              className="text-center inline-flex items-center text-white bg-green-500 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              Run
            </button>
            <button
              onClick={handleSubmit}
              className="ml-2 text-center inline-flex items-center text-white bg-blue-500 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
