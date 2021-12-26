const { Router } = require('express');
const authController = require('../controller/auth');

const router = Router();

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/update-user', authController.updateUser);

module.exports = router;