const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  submitproblem,
  runproblem,
  getsubmissions,
} = require("../controllers/Problem");
// Create a new problem set
router.post("/create", auth, isAdmin, createProblem);
// Get all problem sets
router.get("/", getAllProblems);
// Get a problem set by ID
router.get("/single/:id", getProblemById);
// Update a problem set
router.put("/update/:id", updateProblem);
// Delete a problem set
router.delete("/delete/:id", deleteProblem);

router.post("/submit/:id",auth, submitproblem);

router.post("/run", runproblem);

router.get("/getsubmissions", getsubmissions);

// router.get("/submissions", allsubmissions);
module.exports = router;

