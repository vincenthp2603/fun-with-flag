const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const Country = require('../model/country');

const JWT_SECRET = process.env.JWT_SECRET;

exports.postSignup = async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let countryName = req.body.country;

        let user = await User.findOne({ username: username });

        if (user) {
            let error = new Error();
            error.statusCode = 422;
            error.message = "Username is already exist.";
            return next(error);
        }

        let country = await Country.findOne({ name: countryName });
        let hashedPassword = await bcrypt.hash(password, 12);

        user = new User({
            username: username,
            password: hashedPassword,
            country: country._id
        });

        await user.save();

        let token = jwt.sign({
            username: username,
            country: countryName
        }, JWT_SECRET, { expiresIn: '1h' })

        return res.status(201).json({
            username: username,
            country: country,
            token: token
        });

    } catch (err) {
        console.log(err);
        let error = new Error();
        error.statusCode = 500;
        error.message = "Sorry, this might be an server-side error!";
        return next(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let user = await User.findOne({ username: username });

        if (!user) {
            let error = new Error();
            error.statusCode = 422;
            error.message = "Wrong Username.";
            return next(error);
        }

        let hashedPassword = user.password;
        let passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            let error = new Error();
            error.statusCode = 422;
            error.message = "Wrong Password.";
            return next(error);
        }

        let country = (await user.populate('country')).country;

        let token = jwt.sign({
            username: username,
            country: country.name
        }, JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            username: username,
            country: country,
            token: token
        });

    } catch (err) {
        console.log(err);
        let error = new Error();
        error.statusCode = 500;
        error.message = "Sorry, this might be an server-side error!";
        return next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        if (!req.isAuth) {
            let error = new Error();
            error.statusCode = 403;
            error.message = "You need to be authenticated!";
            return next(error);            
        }

        let user = req.user;

        let password = req.body.password;
        let hashedPassword = user.password;
        let passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            let error = new Error();
            error.statusCode = 422;
            error.message = "Wrong Password.";
            return next(error);
        }

        let newPassword = req.body.newPassword;
        let country = req.body.country;

        if (newPassword !== '') user.password = await bcrypt.hash(newPassword, 12);
        let newCountryId = (await Country.findOne({ name: country }))._id;
        user.country = newCountryId;
        
        await user.save();
        return res.status(200).end();
        
    } catch (err) {
        console.log(err);
        let error = new Error();
        error.statusCode = 500;
        error.message = "Sorry, this might be an server-side error!";
        next(error);
    }
}