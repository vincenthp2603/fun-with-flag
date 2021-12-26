import { Component } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import CongratulationModal from '../../../../../components/FlagQuizModals/congratulationModal';

import { connect } from 'react-redux';
import { moveToNextQuestion, gotoStartScreen, startSubmitScore, closeCongratulationModal } from '../../../../../redux/actions/flagquiz';
import styles from './resultScreen.module.css';

class ResultScreen extends Component {
    render() {
        let message = this.props.result ? "🔥Congrats, you picked the right answer.🔥" : "🌧️ Good luck next time 🌧️, the correct answer is: ";
        let finishMessage = "🔥Congratulation, you finished the Flagquiz.🔥";

        let rightAnswerIndex = this.props.quiz.rightAnswerIndex;
        let correctAnswerString = this.props.quiz.answerArray[rightAnswerIndex];
        let correctAnswer;

        if (this.props.quiz.questionType === 'COUNTRY_TO_FLAG') {
            correctAnswer = (
                <img
                    src={correctAnswerString}
                    alt={"Loading pic failed!"}
                    style={{ border: "1px solid #000", margin: "20px 0", maxWidth: "80%" }}
                ></img>
            )
        } else {
            correctAnswer = <h1>{correctAnswerString}</h1>
        }

        let nextButton = (
            <Button onClick={() => this.props.moveToNextQuestion()}>
                Next question
            </Button>
        )

        let submitSpinner = <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
        />

        let submitButton = (
            <Button
                disabled={!this.props.isAuth || this.props.loading}
                className={this.props.isAuth ? "" : styles.disabledBtn}
                onClick={() => this.props.submitScore(this.props.score, this.props.authToken)}
                style={{marginBottom: "10px"}}
            >
                {this.props.loading ? "Submitting ... " : "Submit your score!"}
                {this.props.loading ? submitSpinner: null}
            </Button>
        )

        let endGameButtons = (
            <div>
                <Button
                    variant="success"
                    onClick={() => this.props.startNewGame()}
                    style={{marginBottom: "10px"}}
                >
                    New Game
                </Button>
                {this.props.scoreSubmitted ? null : submitButton}
            </div>
        )


        return (
            <div>
                <CongratulationModal 
                    show={this.props.showModal}
                    onCloseModal={() => this.props.closeModal()}
                />
                <h3>{message}</h3>
                {this.props.result ? null : correctAnswer}
                <h3
                    style={{
                        margin: "50px 0"
                    }}
                >
                    You now have {this.props.score}/{this.props.maxScore} {this.props.score > 1 ? "points" : "point"}.
                </h3>

                {this.props.hasError ? <p style={{ color: "red", margin: "10px 0" }}>{this.props.errorMessage}</p> : null}
                {this.props.currentQuizIndex + 1 !== this.props.maxScore ? nextButton : endGameButtons}
                {this.props.currentQuizIndex + 1 === this.props.maxScore ? <h3 style={{ marginTop: "20px" }}>{finishMessage}</h3> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        result: state.flagquiz.lastResult,
        score: state.flagquiz.score,
        maxScore: state.flagquiz.quizzes.length,
        quiz: state.flagquiz.quizzes[state.flagquiz.currentQuizIndex],
        currentQuizIndex: state.flagquiz.currentQuizIndex,
        scoreSubmitted: state.flagquiz.scoreSubmitted,
        hasError: state.flagquiz.screenHasError,
        errorMessage: state.flagquiz.errorMessage,
        showModal: state.flagquiz.showCongratulation,
        loading: state.flagquiz.loading,
        isAuth: state.auth.isAuth,
        authToken: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        moveToNextQuestion: () => dispatch(moveToNextQuestion()),
        startNewGame: () => dispatch(gotoStartScreen()),
        submitScore: (score, token) => dispatch(startSubmitScore(score, token)),
        closeModal: () => dispatch(closeCongratulationModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);