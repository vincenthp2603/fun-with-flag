import * as ACTION_TYPES  from '../actiontypes';
import { clearAllTimeOuts, clearAllIntervals } from '../../utils/clearTimeoutAndInterval';

import { TIME_OUT, UPDATE_FREQUENCY } from '../actions/flagquiz'; 

const initialState = {
    quizzes: [],
    gameOn: false,
    gamePause: false,
    gameEnd: false,
    lastResult: null,
    currentQuizIndex: -1,
    score: 0, 
    progressBar: 0,
    loading: false,
    screenHasError: false,
    errorMessage: "",
    scoreSubmitted: false,
    showCongratulation: false,
    records: [],
    recordsLoading: false,
    recordsHasError: false,
    recordsErrorMessage: ""
}

const waitForAsyncResult = (prevState) => {
    return {
        ...prevState,
        loading: true
    }
}

const fetchQuizzesFail = (prevState, message) => {
    return {
        ...prevState,
        loading: false,
        screenHasError: true,
        errorMessage: message
    }
}

const startGame = (prevState, quizzes) => {
    return {
        ...prevState,
        quizzes: quizzes,
        currentQuizIndex: 0,
        gamePause: false,
        gameOn: true,
        score: 0,
        progressBar: 0,
        loading: false,
        screenHasError: false,
        errorMessage: ""
    }
}

const answerChosen = (prevState, result) => {
    clearAllTimeOuts();
    clearAllIntervals();
    let score = result ? (prevState.score + 1) : prevState.score;
    return {
        ...prevState,
        score: score,
        gamePause: true,
        lastResult: result,
        progressBar: 0
    }
}

const questionBegin = (prevState) => {
    let nextQuizIndex = prevState.currentQuizIndex + 1;
    
    return {
        ...prevState,
        gamePause: false,
        currentQuizIndex: nextQuizIndex,
        lastResult: null,
        progressBar: 0
    }
}

const updateProgressBar = (prevState) => {
    let updatedProgressBar = (((TIME_OUT*prevState.progressBar/100) + UPDATE_FREQUENCY)/TIME_OUT)*100 + 0.05;

    return {
        ...prevState,
        progressBar: updatedProgressBar >= 100 ? 100 : updatedProgressBar
    }
}

const submitScoreSuccess = (prevState) => {
    return {
        ...prevState,
        loading: false,
        scoreSubmitted: true,
        screenHasError: false,
        showCongratulation: true
    }
}

const submitScoreFail = (prevState, message) => {
    return {
        ...prevState,
        loading: false,
        screenHasError: true,
        errorMessage: message
    }
}

const closeCongratulationModal = (prevState) => {
    return {
        ...prevState,
        showCongratulation: false
    }
}

const gotoStartScreen = (prevState) => {
    return {
        ...initialState,
        records: prevState.records
    }
}

const waitForScoreRecordsResult = (prevState) => {
    return {
        ...prevState,
        recordsLoading: true
    }
}

const fetchScoresSuccess = (prevState, records) => {
    return {
        ...prevState,
        recordsHasError: false,
        recordsLoading: false,
        records: records
    }  
}

const fetchScoresFail = (prevState, message) => {
    return {
        ...prevState,
        recordsErrorMessage: message,
        recordsHasError: true,
        recordsLoading: false
    }
}

export default function flagquizReducer(state=initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.QUIZ_START_GAME: return startGame(state, action.quizzes);
        case ACTION_TYPES.QUIZ_WAIT_FOR_ASYNC_RESULT: return waitForAsyncResult(state);
        case ACTION_TYPES.QUIZ_FETCH_FAIL: return fetchQuizzesFail(state, action.message);
        case ACTION_TYPES.QUIZ_ANSWER_CHOSEN: return answerChosen(state, action.result);
        case ACTION_TYPES.QUIZ_QUESTION_BEGIN: return questionBegin(state);
        case ACTION_TYPES.QUIZ_UPDATE_PROGRESS_BAR: return updateProgressBar(state);
        case ACTION_TYPES.QUIZ_SUBMIT_SCORE_SUCCESS: return submitScoreSuccess(state);
        case ACTION_TYPES.QUIZ_SUBMIT_SCORE_FAIL: return submitScoreFail(state, action.message);
        case ACTION_TYPES.QUIZ_CLOSE_CONGRATULATION_MODAL: return closeCongratulationModal(state);
        case ACTION_TYPES.QUIZ_WAIT_FOR_SCORE_RECORDS_RESULT: return waitForScoreRecordsResult(state);
        case ACTION_TYPES.QUIZ_FETCH_SCORE_RECORDS_SUCESS: return fetchScoresSuccess(state, action.records);
        case ACTION_TYPES.QUIZ_FETCH_SCORE_RECORDS_FAIL: return fetchScoresFail(state, action.message);
        case ACTION_TYPES.QUIZ_GOTO_START_SCREEN: return gotoStartScreen(state);
        default:
            return state;
    }
}