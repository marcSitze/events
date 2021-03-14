const jwt = require('jsonwebtoken');
const config = require('../config/default');

module.exports = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({ "msg": "Not authorized" });
    }

    try {
        const decoded = await jwt.verify(token, config.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(500).json({ "msg": "Server error" });
    }
};