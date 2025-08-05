const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access, please login first" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();  // Call next() to proceed to next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized access, please login again !" });
    }
}

module.exports = authMiddleware;
