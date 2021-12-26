import axios from '../../utils/axios';
import * as ACTION_TYPES from '../actiontypes';

export const TIME_OUT = 10;
export const UPDATE_FREQUENCY = 0.1;

export const waitForAsyncResult = () => {
    return {
        type: ACTION_TYPES.QUIZ_WAIT_FOR_ASYNC_RESULT
    }
}

export const fetchQuizzes = () => {
    return (dispatch) => {
        dispatch(waitForAsyncResult());
        axios.get('/api/game/quizzes')
            .then(res => {
                //console.log(res);
                let quizzes = res.data;
                dispatch(fetchQuizzesSuccess(quizzes));
            })
            .catch(err => {
                console.log(err.response);
                let message = "Unidentified Error!"
                if (err.response) {
                    message = err.response.data.message;
                }
                dispatch(fetchQuizzesFail(message))
            })
    }
}

export const fetchQuizzesSuccess = (quizzes) => {
    return (dispatch) => {
        dispatch(startGame(quizzes));
        setTimeout(() => dispatch(answerChosen(false)), TIME_OUT * 1000);
        setInterval(() => dispatch(updateProgressBar()), UPDATE_FREQUENCY * 1000);
    }
}

export const fetchQuizzesFail = (message) => {
    return {
        type: ACTION_TYPES.QUIZ_FETCH_FAIL,
        message: message
    }
}

export const startGame = (quizzes) => {
    return {
        type: ACTION_TYPES.QUIZ_START_GAME,
        quizzes: quizzes
    }
}

export const answerChosen = (result) => {
    return {
        type: ACTION_TYPES.QUIZ_ANSWER_CHOSEN,
        result: result
    }
}

export const moveToNextQuestion = () => {
    return (dispatch) => {
        dispatch(questionBegin());
        setTimeout(() => dispatch(answerChosen(false)), TIME_OUT * 1000);
        setInterval(() => dispatch(updateProgressBar()), UPDATE_FREQUENCY * 1000);
    }
}

export const questionBegin = () => {
    return {
        type: ACTION_TYPES.QUIZ_QUESTION_BEGIN
    }
}

export const updateProgressBar = () => {
    return {
        type: ACTION_TYPES.QUIZ_UPDATE_PROGRESS_BAR
    }
}

export const gotoStartScreen = () => {
    return {
        type: ACTION_TYPES.QUIZ_GOTO_START_SCREEN
    }
}

export const startSubmitScore = (score, token) => {
    return dispatch => {
        dispatch(waitForAsyncResult());
        axios({
            url: '/api/game/scores',
            headers: { 'Authorization': `Baerer ${token}` },
            method: 'POST',
            data: {
                score: score
            }
        })
            .then(res => {
                //console.log(res);
                dispatch(submitScoreSuccess());
            })
            .catch(err => {
                console.log(err.response);
                let message = "Unidentified Error!"
                if (err.response) {
                    message = err.response.data.message;
                }
                dispatch(submitScoreFail(message))
            })
    }
}

export const submitScoreSuccess = () => {
    return {
        type: ACTION_TYPES.QUIZ_SUBMIT_SCORE_SUCCESS
    }
}

export const submitScoreFail = (message) => {
    return {
        type: ACTION_TYPES.QUIZ_SUBMIT_SCORE_FAIL,
        message: message
    }
}

export const closeCongratulationModal = () => {
    return {
        type: ACTION_TYPES.QUIZ_CLOSE_CONGRATULATION_MODAL
    }
}

export const waitForScoreRecordsResult = () => {
    return {
        type: ACTION_TYPES.QUIZ_WAIT_FOR_SCORE_RECORDS_RESULT
    }
}

export const startFetchScores = () => {
    return dispatch => {
        dispatch(waitForScoreRecordsResult());
        axios.get('/api/game/scores')
            .then(res => {
                let records = res.data;
                dispatch(fetchScoresSuccess(records))
            })
            .catch(err => {
                console.log(err.response);
                let message = "Unidentified Error!"
                if (err.response) {
                    message = err.response.data.message;
                }
                dispatch(fetchScoresFail(message))           
            })
    }
}

export const fetchScoresSuccess = (records) => {
    return {
        type: ACTION_TYPES.QUIZ_FETCH_SCORE_RECORDS_SUCESS,
        records: records
    }
}

export const fetchScoresFail = (message) => {
    return {
        type: ACTION_TYPES.QUIZ_FETCH_SCORE_RECORDS_FAIL,
        message: message
    }
}