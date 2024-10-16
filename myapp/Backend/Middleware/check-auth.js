const users = require('../Model/User.js');
const jwt = require('jsonwebtoken');

const protection = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.RefreshToken;

        // Check if refresh token is present....
        if (!refreshToken) {
            return
        }

        // Verify the refresh token....
        const decoded = jwt.verify(refreshToken, process.env.secretToken);

        // Find the user by email
        const user = await users.findOne({ email: decoded.email });

        // Check if the user exists/..
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        req.role = user.role; 

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized please login first', error: error.message });
    }
};

module.exports = protection;
