const Country = require('../model/country');
const ScoreRecord = require('../model/scorerecord');
const createQuizzes = require('../utils/create-quizzes');
const io = require('../socketIO/socketio');

exports.getQuizzes = async (req, res, next) => {
    try {
        let countries = await Country.find({});
        let quizzes = createQuizzes(countries, 30);

        return res.status(200).json(quizzes);

    } catch (err) {
        console.log(err);
        let error = new Error();
        error.statusCode = 500;
        error.message = "Sorry, this might be an server-side error!";
        return next(error);
    }
}

exports.getScores = async (req, res, next) => {
    try {
        let scoreRecords = await ScoreRecord.find({}).sort({ score: 'desc', createdAt: 'desc' })
                                            .limit(10).populate('user');
        scoreRecords = scoreRecords.map(record => {
            return {
                score: record.score,
                username: record.user.username
            }
        })

        return res.status(200).json(scoreRecords);

    } catch (err) {
        console.log(err);
        let error = new Error();
        error.statusCode = 500;
        error.message = "Sorry, this might be an server-side error!";
        return next(error);
    }
}

exports.postScore = async (req, res, next) => {
    try {
        if (!req.isAuth) {
            let error = new Error();
            error.statusCode = 403;
            error.message = "You need to be authenticated to submit score!";
            return next(error);            
        }

        let score = req.body.score;
        let userId = req.user._id;
        await ScoreRecord.create({
            score: score,
            user: userId
        })
        
        res.status(201).end();
   
    } catch (err) {
        console.log(err);
        let error = new Error();
        error.statusCode = 500;
        error.message = "Sorry, this might be an server-side error!";
        next(error);
    }

    try {
        let scoreRecords = await ScoreRecord.find({}).sort({ score: 'desc', createdAt: 'desc' })
                                            .limit(10).populate('user');
        scoreRecords = scoreRecords.map(record => {
            return {
                score: record.score,
                username: record.user.username
            }
        })

        io.getIO().emit('halloffame', scoreRecords)
    } catch (err) {
        console.log('WebSocket Error');
        console.log(err);
    }
}