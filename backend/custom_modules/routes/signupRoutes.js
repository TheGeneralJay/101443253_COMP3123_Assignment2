const express = require("express");
const db = require("../db.js");
const router = express.Router();
const errors = require("../errors/errorHandler.js");

// ---------------------------------------------
// DB Connection
// ---------------------------------------------
db.mongoose.connect(db.uri);

// ---------------------------------------------
// User Management
// ---------------------------------------------

// ---------------------------------------------
// **** Signup ****
// ---------------------------------------------

router.post("/", async (req, res) => {
    // Create a new user using the User schema.
    let { username, email, password } = req.body;

    // Empty params handling.
    try {
        // If any of the input params are empty, throw an error.
        if (username == undefined || email == undefined || password == undefined) {
            throw new Error();
        }
    } catch (err) {
        res.status(400).send(errors.EMPTY_INPUT_ERROR);
        return;
    }
    
    // If we get here, we can create the user.
    try {
        // Grab the current date.
        const createdAt = new Date().toLocaleDateString();

        const user = new db.user({
            username: username,
            email: email,
            password: password,
            created_at: createdAt
        });

        // Save the new user.
        await user.save();

        // Generate the success response.
        response = {
            "message": "User created successfully.",
            "user_id": user._id
        }
        // Send status of 201 and JSON response.
        res.status(201).json(response);
    } catch (err) {
        // Send a default error if anything above fails.
        res.status(400).send(errors.DEFAULT_ERROR);
    }
});

module.exports = router;