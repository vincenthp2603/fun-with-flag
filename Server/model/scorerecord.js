const mongoose = require('mongoose');

const scoreRecordSchema = mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports =  mongoose.model('ScoreRecord', scoreRecordSchema);