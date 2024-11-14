const mongoose = require("mongoose");
// Password hashing.
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    created_at : Date,
    updated_at : Date
});

// Hashing logic.
UserSchema.pre("save", async function save(next) {
    let user = this;

    // Hash password if modified (or new).
    if (!user.isModified("password")) return next();

    // Salt.
    salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    
    // Password is overridden with the hashed version.
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function comparePassword(pass) {
    return bcrypt.compare(pass, this.password);
}

const User = mongoose.model("User", UserSchema);
module.exports = User;