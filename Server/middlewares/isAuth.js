const jwt = require('jsonwebtoken');
const User = require('../model/user');
const JWT_SECRET = process.env.JWT_SECRET;

const isAuth = async (req, res, next) => {
    let authHeader = req.get('Authorization');

    if (!authHeader || authHeader === "Bearer ") {
        req.isAuth = false;
        return next();
    }

    let token = authHeader.split(' ')[1];
    
    try {
        let decoded = jwt.verify(token, JWT_SECRET);
        let username = decoded.username;
        let user = await User.findOne({ username: username });
        req.isAuth = true;
        req.user = user;
        return next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Sorry, this might be an server-side error!" });
    }
}

module.exports = isAuth;