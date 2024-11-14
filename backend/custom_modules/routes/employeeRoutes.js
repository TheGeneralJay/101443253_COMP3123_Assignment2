const express = require("express");
const db = require("../db.js");
const { query, validationResult } = require("express-validator");
const router = express.Router();
const errors = require("../errors/errorHandler.js");

// ---------------------------------------------
// DB Connection
// ---------------------------------------------
db.mongoose.connect(db.uri);

// ---------------------------------------------
// Employee Management
// ---------------------------------------------

// ---------------------------------------------
// **** Get Employees ****
// ---------------------------------------------

router.get("/", async (req, res) => {
    try {
        // Grab all employees.
        employees = await db.employee.find({});

        // Return them in JSON.
        res.status(200).json(employees);
    } catch (err) {
        res.status(400).send(errors.DEFAULT_ERROR);
    }
});

// ---------------------------------------------
// **** Create Employees ****
// ---------------------------------------------

router.post("/", async (req, res) => {    
    // Grab request body to help with error handling.
    let { 
        first_name, 
        last_name, 
        email, 
        position, 
        salary, 
        date_of_joining, 
        department
    } = req.body;

    try {
        // If any of the parameters are empty, throw error.
        if (
            first_name == undefined ||
            last_name == undefined ||
            email == undefined ||
            position == undefined ||
            salary == undefined ||
            date_of_joining == undefined ||
            department == undefined
        ) {
            throw new Error();
        }
    } catch (err) {
        res.status(400).send(errors.EMPTY_INPUT_ERROR);
        return;
    }

    // If we get here, try to make the new employee.
    try {
        // Create new employee based on request body.
        const employee = new db.employee(req.body);

        // Save the employee to the DB.
        await employee.save();

        response = {
            "message": "Employee created successfully.",
            "employee_id": employee._id
        }

        // Send success response.
        res.status(201).json(response);

    } catch (err) {
        res.status(400).send(errors.DEFAULT_ERROR);
    }
});

// ---------------------------------------------
// **** Get Employee by ID ****
// ---------------------------------------------

// Validate that the id parameter is not empty (and ensures it is safe from XSS).
router.get(`/:id`, query("id").notEmpty().escape(), async (req, res) => {
    const result = validationResult(req);

    // If there is no proper ID passed in the parameter, throw error.
    // Or, if the ID is not a valid ObjectId, throw error.
    try {
        if (result.isEmpty() || !db.mongoose.isValidObjectId(req.params.id) ) {
            throw new Error();
        }
    } catch (err) {
        res.status(400).json(errors.ID_DOES_NOT_EXIST_ERROR);
        return;
    }

    // If we get here, find the employee and send the result.
    try {
        // Find employee by ID.
        const employee = await db.employee.findById(req.params.id);
        
        // If employee exists...
        if (employee) {
            // Return employee.
            res.status(200).json(employee);
        }

    } catch (err) {
        res.status(400).send(errors.DEFAULT_ERROR);
    }
});

// ---------------------------------------------
// **** Update Employee ****
// ---------------------------------------------

// Validate that the id parameter is not empty (and ensures it is safe from XSS).
router.put(`/:id`, query("id").notEmpty().escape(), async (req, res) => {
    const result = validationResult(req);

    // If there is no proper ID passed in the parameter, throw error.
    // Or, if the ID is not a valid ObjectId, throw error.
    try {
        if (result.isEmpty() || !db.mongoose.isValidObjectId(req.params.id) ) {
            throw new Error();
        }
    } catch (err) {
        res.status(400).json(errors.ID_DOES_NOT_EXIST_ERROR);
        return;
    }

    // If we get here, run the update.
    try {
        // Grab the employee that the user wants to update.
        const employee = await db.employee.findById(req.params.id);
        // Grab the JSON body sent in for update.
        const requestedChanges = req.body;
        // Save the keys of the JSON request for easy access.
        const changeKeys = Object.keys(requestedChanges);

        // Loop through changeKeys...
        changeKeys.forEach(key => {
            // If individual key matches one in the employee schema, update.
            if (employee[key]) {
                employee[key] = requestedChanges[key];
            }
        });

        response = {
            "message": "Employee details updated successfully."
        }

        // Save and send response.
        await employee.save();
        res.status(200).send(response);

    } catch (err) {
        res.status(400).send(errors.DEFAULT_ERROR);
    }
});

// ---------------------------------------------
// **** Delete Employee ****
// ---------------------------------------------

router.delete(`/`, async (req, res) => {

    // If the ID is not a valid ObjectId, throw error.
    try {
        if (!db.mongoose.isValidObjectId(req.query.id) ) {
            throw new Error();
        }
    } catch (err) {
        res.status(400).json(errors.ID_DOES_NOT_EXIST_ERROR);
        return;
    }


    try {
        // Grab the ID from the query params.
        const employeeId = req.query.id;

        // Find employee with ID.
        const employee = await db.employee.findById(employeeId);

        // Delete the employee.
        await employee.deleteOne({ _id: employeeId });

        // Return response to the console.
        response = {
            "message": "Employee deleted successfully."
        }

        // Note: status 204 will not send a response, so I've used
        // 200, which will allow this message to play.
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(errors.DEFAULT_ERROR);
    }
});

module.exports = router;