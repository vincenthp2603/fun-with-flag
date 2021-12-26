const { Router } = require('express');
const gameController = require('../controller/game');

const router = Router();

router.get('/quizzes', gameController.getQuizzes);

router.get('/scores', gameController.getScores);

router.post('/scores', gameController.postScore);

module.exports = router;