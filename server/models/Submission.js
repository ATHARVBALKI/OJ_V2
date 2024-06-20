// Import the Mongoose library
const mongoose = require("mongoose");

// Define the submission schema using the Mongoose Schema constructor
const submissionSchema = new mongoose.Schema(
    {
        // Define the user ID field with type ObjectId, required
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User' // This references the User model
        },
        // Define the username field with type String, required, and trimmed
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true
        },
        // Define the problem ID field with type ObjectId, required
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Problem' // This references the Problem model
        },
        // Define the problem title field with type String, required, and trimmed
        problemTitle: {
            type: String,
            required: true,
            trim: true
        },
        language:{
            type: String,
            required: true,
            trim: true
        },
        code: {
            type: String,
            required: true
        },
        // Define the result field with type String, enum values: Accepted, Wrong Answer, Compilation Error
        result: {
            type: String,
            enum: ["Accepted", "Wrong Answer", "Compilation Error"],
            required: true
        },
        // Define the submittedAt field with type Date, default value is the current date and time
        submittedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

// Export the Mongoose model for the submission schema, using the name "Submission"
module.exports = mongoose.model("Submission", submissionSchema);
