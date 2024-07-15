const users = require('../Model/User.js');

const jwt = require('jsonwebtoken')

const protection = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.RefreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(refreshToken, process.env.secretToken);
        const user = await users.findOne({ email: decoded.email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
};

module.exports = protection
