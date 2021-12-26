const Country = require('../model/country');
const editDistance = require('../utils/edit-distance');

exports.getCountry = async (req, res, next) => {
    try {
        let notation = req.query.name.toLowerCase().split(' ').join('-');
        if (notation === '') notation = 'vietnam';

        const country = await Country.findOne({ notation: notation });
        
        if (!country) {
            let countries = await Country.find({});
            countries.sort((ctry1, ctry2) => {
                if (editDistance(notation, ctry1.notation) < editDistance(notation, ctry2.notation)) {
                    return -1
                };
                return 1;
            })
                        
            countries = countries.slice(0, 3).map(ctry => ctry.name);

            let error = new Error();
            error.statusCode = 404;
            error.message = `Country not found, did you mean ${countries[0]}, ${countries[1]} or ${countries[2]}?`;
            return next(error);
        }

        res.status(200).json({
            name: country.name,
            url: country.flagUrl,
            capital: country.capital
        })

    } catch (err) {
        console.log(err);
        let error = new Error();
        error.statusCode = 500;
        error.message = "Sorry, this might be an server-side error!";
        return next(error);
    }
}