const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const execPromise = promisify(exec);
const renamePromise = promisify(fs.rename);

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, inputPath) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`); // Ensure outPath is in the same directory as the filepath

    const compileCommand = `g++ "${filePath}" -o "${outPath}"`;

    exec(compileCommand, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        reject({ error: compileError, stderr: compileStderr });
        return;
      }

      const runCommand = `"${outPath}" < "${inputPath}"`; // Use < for input redirection

      exec(runCommand, (runError, runStdout, runStderr) => {
        if (runError) {
          reject({ error: runError, stderr: runStderr });
          return;
        }
        if (runStderr) {
          reject(runStderr);
          return;
        }
        resolve(runStdout);
      });
    });
  });
};

const executePython = (filepath, inputPath) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.py`);

    console.log(outPath);

    // Copy the Python file to the output directory (optional)
    fs.copyFileSync(filepath, outPath);

    const runCommand = `python "${outPath}" < "${inputPath}"`;

    exec(runCommand, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
};


const executeC = (filepath, inputPath) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    const compileCommand = `gcc "${filepath}" -o "${outPath}"`;

    exec(compileCommand, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        reject({ error: compileError, stderr: compileStderr });
        return;
      }

      const runCommand = `"${outPath}" < "${inputPath}"`;

      exec(runCommand, (runError, runStdout, runStderr) => {
        if (runError) {
          reject({ error: runError, stderr: runStderr });
          return;
        }
        if (runStderr) {
          reject(runStderr);
          return;
        }
        resolve(runStdout);
      });
    });
  });
};

const executeJava = (filepath, inputPath) => {
  return new Promise((resolve, reject) => {
    // Read the Java file content to get the class name
    //This line reads the content of the Java source file specified by filepath
    //and stores the content in the variable javaFileContent.
    const javaFileContent = fs.readFileSync(filepath, "utf8");

    console.log("filepath", filepath);

    console.log("------------=-=->>>>>>", javaFileContent); //javafilecontent me pura code hai

    //This line uses a regular expression to search for a pattern representing a public class declaration in the Java file content stored in javaFileContent. The regular expression /public\s+class\s+(\w+)/ looks for the keywords "public class" followed by one or more whitespace characters and captures the class name using the (\w+) group.
    const classNameMatch = javaFileContent.match(/public\s+class\s+(\w+)/);

    console.log("classnamematch", classNameMatch);

    if (!classNameMatch) {
      reject("No public class found in the Java file.");
      return;
    }
    const className = classNameMatch[1];

    console.log("classname", className);

    // Get the current file name
    const currentFileName = path.basename(filepath, ".java");
    console.log("currenFilename", currentFileName);

    // If the class name and file name do not match, rename the file
    let newFilePath = null;
    if (currentFileName !== className) {
      console.log("=====", path.dirname(filepath));
      newFilePath = path.join(path.dirname(filepath), `${className}.java`);
      fs.writeFileSync(newFilePath, javaFileContent);
      console.log("new", newFilePath);
      // fs.renameSync(filepath, newFilePath);
      // filepath = newFilePath;
      console.log("filepath", filepath);
    }

    // Compile the Java file
    const compileCommand = `javac -d "${outputPath}" "${newFilePath}"`;
    console.log(compileCommand);
    exec(compileCommand, (compileError, compileStdout, compileStderr) => {
      if (compileError || compileStderr) {
        reject(`Compile error: ${compileError || compileStderr}`);
        return;
      }

      // Run the compiled Java program
      const runCommand = `java -cp "${outputPath}" ${className}`;

      console.log(runCommand);
      const runProcess = exec(runCommand, (runError, runStdout, runStderr) => {
        if (runError || runStderr) {
          reject(`Runtime error: ${runError || runStderr}`);
          // console.log(runError)
          return;
        }
        console.log(runStdout);
        resolve(runStdout);
      });

      // Handle input if provided
      if (inputPath) {
        const inputStream = fs.createReadStream(inputPath);
        inputStream.pipe(runProcess.stdin);
      }
    });
  });
};

module.exports = {
  executeCpp,
  executePython,
  executeC,
  executeJava,
};
