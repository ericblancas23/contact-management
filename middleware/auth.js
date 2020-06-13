const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //check to see if token is in header
    const token = req.header('x-auth-token');
    //check if token is valid
    if(!token) {
        return res.status(401).json({ message: "no token authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ message: "token is not valid"})
    }
}