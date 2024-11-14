// Configure Express.
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

// Define server paths for ease of use.
const signupPath = "/api/v1/user/signup";
const loginPath = "/api/v1/user/login";
const employeesPath = "/api/v1/emp/employees";

// Router variables.
const signupRoutes = require("./custom_modules/routes/signupRoutes.js");
const loginRoutes = require("./custom_modules/routes/loginRoutes.js");
const employeeRoutes = require("./custom_modules/routes/employeeRoutes.js");

// Use the routers.
app.use(signupPath, signupRoutes);
app.use(loginPath, loginRoutes);
app.use(employeesPath, employeeRoutes);

app.listen(port, () => {
    console.log(`App listening at port ${port}.`);
});