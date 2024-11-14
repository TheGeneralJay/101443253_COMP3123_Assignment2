// ---------------------------------------------
// Database Connection
// ---------------------------------------------
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const user = require("../custom_modules/models/user"); 
const employee = require("../custom_modules/models/employee");
const uri = "mongodb+srv://admin:pass@full-stack.a7zfj.mongodb.net/?retryWrites=true&w=majority&appName=full-stack";

module.exports = { MongoClient, mongoose, uri, user, employee };