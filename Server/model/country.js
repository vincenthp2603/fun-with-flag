const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    notation: {
        type: String
    },
    capital: {
        type: String,
        required: true
    },
    flagUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Country', CountrySchema);