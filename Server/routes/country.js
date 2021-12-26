const { Router } = require('express');
const { getCountry } = require('../controller/country');

const router = Router();

router.get('/country', getCountry);

module.exports = router;