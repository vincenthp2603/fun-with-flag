const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: mongoose.Types.ObjectId,
        ref: 'Country'
    }
})

module.exports = mongoose.model('User', userSchema);