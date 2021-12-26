import { Component } from 'react';
import { Row, ProgressBar } from 'react-bootstrap';
import AnswerCard from '../../../../../components/AnswerCard/answerCard';
import styles from './quizScreen.module.css';
import { connect } from 'react-redux';

class QuizScreen extends Component {
    render() {
        let questionType = this.props.quiz.questionType;
        let answerArray = this.props.quiz.answerArray;

        return (
            <div>
                <h4 className={styles.quizQuestion}>Question {this.props.quizNumber}: {this.props.quiz.question}</h4>

                {
                    questionType === 'FLAG_TO_COUNTRY' ?
                        <img
                            src={this.props.quiz.questionUrl}
                            className={styles.questionImg}
                            alt="Error loading pic!"
                        >
                        </img> : null
                }

                <ProgressBar
                    className={styles.progressBar}
                    now={this.props.progressBarPercentage}
                />

                <Row>
                    {
                        answerArray.map((answer, index) => {
                            return (
                                <AnswerCard
                                    key={index}
                                    index={index}
                                    answer={answer}
                                    questionType={questionType}
                                    scrollUpRef={this.props.scrollUpRef}
                                />
                            )
                        })
                    }
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quiz: state.flagquiz.quizzes[state.flagquiz.currentQuizIndex],
        quizNumber: state.flagquiz.currentQuizIndex + 1,
        progressBarPercentage: state.flagquiz.progressBar
    }
}

export default connect(mapStateToProps)(QuizScreen);