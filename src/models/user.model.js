const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Mongoose "pre-save hook": This function runs automatically before a user document is saved.
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    // Hash the password with a "salt" of 10 rounds.
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Custom method to compare the candidate password with the stored hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;