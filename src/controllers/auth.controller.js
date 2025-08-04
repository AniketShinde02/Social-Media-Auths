const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerController(req, res) {
    try {
        const { username, password } = req.body;

        // Pehle check karo user exist karta hai ya nahi
        const isUserExist = await userModel.findOne({ username });
        if (isUserExist) {
            // 409 Conflict is a better status code for an existing resource.
            return res.status(409).json({ message: "User already exists" });
        }

        // SECURITY WARNING: Passwords should ALWAYS be hashed before saving.
        // You would use a library like bcrypt here.

        // Agar nahi karta toh naya user banao and store it in a variable
        const user = await userModel.create({
            username, password
        });

        // Use the 'user' variable to get the ID for the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Set the token in a secure, http-only cookie
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "An error occurred during registration." });
    }
}

async function loginController(req, res) {
    try {
        const { username, password } = req.body;

        // Yahan login ka logic likhna hoga
        const user = await userModel.findOne({ username });

        // FIX: Check if the user does NOT exist.
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // SECURITY WARNING: You must compare hashed passwords, not plain text.
         const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "An error occurred during login." });
    }
}

module.exports = {
    registerController,
    loginController
};
