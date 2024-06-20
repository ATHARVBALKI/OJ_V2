// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests
// tumhe login page dikhau ya pehle se login manluuu
exports.auth = async (req, res, next) => {
  try {
    const tokenCookie = req.cookies ? req.cookies.token : undefined
    const tokenBody = req.body ? req.body.token : undefined;
    const tokenHeader = req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : undefined;

    // console.log("cookie:", req.cookies);
    // console.log("body:", tokenBody);
    // console.log("header:", tokenHeader);

    // Extracting JWT from request cookies, body, or header
    const token = tokenCookie || tokenBody || tokenHeader ;
    // const token = tokenHeader ;

    console.log("Helllllllooooo--------->>>> YOU ARE IN MIDDLEWARE :)")



    // If JWT is missing, return 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {
      // Verifying the JWT using the secret key stored in environment variables
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      // Storing the decoded JWT payload in the request object for further use
      req.user = decode;
    } catch (error) {
      // If JWT verification fails, return 401 Unauthorized response
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    // If JWT is valid, move on to the next middleware or request handler
    next();
  } catch (error) {
    // If there is an error during the authentication process, return 401 Unauthorized response
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    console.log("Printing AccountType ", req.user.accountType);
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};


// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const User = require("../models/User");

// // Configuring dotenv to load environment variables from .env file
// dotenv.config();

// // Middleware to authenticate user requests
// exports.auth = async (req, res, next) => {
//   try {
//     // Extracting JWT from request cookies, body, or header
//     const token =
//       (req.cookies && req.cookies.token) ||
//       (req.body && req.body.token) ||
//       (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

//     // If JWT is missing, return 401 Unauthorized response
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Token Missing" });
//     }

//     // Verifying the JWT using the secret key stored in environment variables
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//     } catch (error) {
//       return res.status(401).json({ success: false, message: "Invalid token" });
//     }

//     // If JWT is valid, move on to the next middleware or request handler
//     next();
//   } catch (error) {
//     console.error("Error during authentication:", error);
//     return res.status(401).json({
//       success: false,
//       message: "Something went wrong while validating the token",
//     });
//   }
// };

// // Middleware to check if the user is a Student
// exports.isStudent = async (req, res, next) => {
//   try {
//     if (req.user.accountType !== "Student") {
//       return res.status(403).json({
//         success: false,
//         message: "This route is restricted to Students only",
//       });
//     }
//     next();
//   } catch (error) {
//     console.error("Error during role verification:", error);
//     return res.status(500).json({
//       success: false,
//       message: "User role cannot be verified, please try again",
//     });
//   }
// };

// // Middleware to check if the user is an Instructor
// exports.isInstructor = async (req, res, next) => {
//   try {
//     if (req.user.accountType !== "Instructor") {
//       return res.status(403).json({
//         success: false,
//         message: "This route is restricted to Instructors only",
//       });
//     }
//     next();
//   } catch (error) {
//     console.error("Error during role verification:", error);
//     return res.status(500).json({
//       success: false,
//       message: "User role cannot be verified, please try again",
//     });
//   }
// };

// // Middleware to check if the user is an Admin
// exports.isAdmin = async (req, res, next) => {
//   try {
//     if (req.user.accountType !== "Admin") {
//       return res.status(403).json({
//         success: false,
//         message: "This route is restricted to Admins only",
//       });
//     }
//     next();
//   } catch (error) {
//     console.error("Error during role verification:", error);
//     return res.status(500).json({
//       success: false,
//       message: "User role cannot be verified, please try again",
//     });
//   }
// };
