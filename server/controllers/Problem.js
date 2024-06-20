const Problem = require("../models/Problem");
const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
const {
  executeCpp,
  executePython,
  executeC,
  executeJava,
} = require("./execute");
const { generateFile } = require("./generateFile");
const { generateInputFile } = require("./generateInputFile");
const User = require("../models/User");
const Submission = require("../models/Submission");
// ****Create a new problem **
//****
exports.createProblem = async (req, res) => {
  console.log(req.body);
  try {
    const {
      title,
      description,
      difficulty,
      inputformat,
      outputformat,
      sampleinput1,
      sampleoutput1,
      testCases, // Array of test cases [{ input: string, output: string }]
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !difficulty ||
      !inputformat ||
      !outputformat ||
      !sampleinput1 ||
      !sampleoutput1 ||
      !testCases ||
      testCases.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All Fields including test cases are required in proper format",
      });
    }

    // Create a new problem instance
    const problem = new Problem({
      title,
      description,
      difficulty,
      inputformat,
      outputformat,
      sampleinput1,
      sampleoutput1,
    });

    const testCasesDir = path.join(__dirname, "testcases");
    await fs.mkdir(testCasesDir, { recursive: true });
    // Save the test cases
    const savedTestCases = [];
    for (const { input, output } of testCases) {
      const inputFileName = `${problem._id}-${
        savedTestCases.length + 1
      }-input.txt`;
      const outputFileName = `${problem._id}-${
        savedTestCases.length + 1
      }-output.txt`;
      const inputFilePath = path.join(testCasesDir, inputFileName);
      const outputFilePath = path.join(testCasesDir, outputFileName);

      // Write input and output to files
      await fs.writeFile(inputFilePath, input);
      await fs.writeFile(outputFilePath, output);

      // Add file paths to the problem
      problem.testCases.push({
        inputFilePath,
        outputFilePath,
      });

      savedTestCases.push({
        inputFilePath,
        outputFilePath,
      });
    }

    // Save the problem to the database
    await problem.save();

    return res.status(201).json({
      success: true,
      problem,
      testCases: savedTestCases,
      message: "Problem and test cases created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//* * Delete a problem by ID*
exports.deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const problem = await Problem.findByIdAndDelete(id);
    if (!problem) {
      return res.status(404).send({ error: "Problem not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
// **Update a problem by ID***
exports.updateProblem = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "title",
      "description",
      "difficulty",
      "inputformat",
      "outputformat",
      "sampleinput1",
      "sampleoutput1",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).send({ error: "Problem not found" });
    }
    updates.forEach((update) => (problem[update] = req.body[update]));
    await problem.save();
    // res.send(problem);
    return res.status(200).json({
      success: true,
      problem,
      message: "Problem updated successfully",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
// ***Get all problems*
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    return res.status(200).json({
      success: true,
      problems,
      message: "Problem updated successfully",
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
//****Get a problem by ID***8
exports.getProblemById = async (req, res) => {
  const { id } = req.params;
  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid Problem ID format" });
  }
  try {
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).send({ error: "Problem not found" });
    }
    // console.log(problem)
    return res.status(200).json({
      success: true,
      problem,
      message: "Problem got successfully",
    });
  } catch (error) {
    console.error("Error fetching problem by ID:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.submitproblem = async (req, res) => {
  const { code, language } = req.body;
  const problemId = req.params.id;
  const userid = req.user.id;

  const newuser = await User.findById(userid);
  // Fetch test cases from the database
  const problem = await Problem.findById(problemId);
  try {
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const filePath = await generateFile(language, code);

    const results = [];

    const dirTC = path.join(__dirname, "testcases");

    // Run the code against each test case
    for (let i = 0; i < problem.testCases.length; i++) {
      const inputFilename = `${problemId}-${i + 1}-input.txt`;
      const inputFilePath = path.join(dirTC, inputFilename);
      const outputFilename = `${problemId}-${i + 1}-output.txt`;
      const outputFilePath = path.join(dirTC, outputFilename);

      // Read input and expected output from files
      const [input, expectedOutput] = await Promise.all([
        fs.readFile(inputFilePath, "utf8"),
        fs.readFile(outputFilePath, "utf8"),
      ]);

      // Run the code with the input
      let output = null;

      if (language === "cpp") {
        output = await executeCpp(filePath, inputFilePath);
      } else if (language === "py") {
        output = await executePython(filePath, inputFilePath);
      } else if (language === "java") {
        output = await executeJava(filePath, inputFilePath);
      } else if (language === "c") {
        output = await executeC(filePath, inputFilePath);
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Unsupported language!" });
      }

      // Compare the output with the expected output
      const testResult = {
        input,
        passed: output.trim() === expectedOutput.trim(),
        output,
        expectedOutput
      };

      results.push(testResult);
    }

    // Check if all test cases passed
    const allPassed = results.every((result) => result.passed);
    const totalTestCases = problem.testCases.length;
    const passedTestCases = results.filter((result) => result.passed).length;

    const submission = new Submission({
      userId: newuser._id,
      firstname: newuser.firstName,
      lastname: newuser.lastName,
      problemId: problemId,
      problemTitle: problem.title,
      language: language,
      code: code,
      result: allPassed ? "Accepted" : "Wrong Answer",
    });

    // Save the submission to the database
    await submission.save();

    // Prepare the response message
    let message;
    if (allPassed) {
      message = `All test cases passed (${totalTestCases} test cases)`;
    } else {
      message = `${passedTestCases} out of ${totalTestCases} test cases passed`;
    }

    return res.status(200).json({
      success: allPassed,
      message,
      passedTestCases,
      totalTestCases,
      results: results.map(({ passed }) => ({ passed })),
    });
  } catch (error) {
    const submission = new Submission({
      userId: newuser._id,
      firstname: newuser.firstName,
      lastname: newuser.lastName,
      problemId: problemId,
      problemTitle: problem.title,
      language: language,
      code: code,
      result: "Compilation Error",
    });

    // Save the submission to the database
    await submission.save();

    return res.status(500).json({
      error,
      message: "Compilation error",
    });
  }
};


exports.runproblem = async (req, res) => {
  const { language, code, input } = req.body;
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    let output = null;

    if (language === "cpp") {
      output = await executeCpp(filePath, inputPath);
    } else if (language === "py") {
      output = await executePython(filePath, inputPath);
    }  else if (language === "java") {
      console.log("hhhhheeeellloooooo");
      output = await executeJava(filePath, inputPath);
    } else if (language === "c") {
      output = await executeC(filePath, inputPath);
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Unsupported language!" });
    }

    // return res.status(400).json({ success: false, error: "Unsupported language!" });
    return res.status(200).json({
      success: true,
      filePath,
      output,
      message: "Problem got successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Compilation error",
    });
  }
};

exports.getsubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find(); // Retrieve all users
    return res.status(200).json({
      success: true,
      submissions,
      message: "submissions retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
