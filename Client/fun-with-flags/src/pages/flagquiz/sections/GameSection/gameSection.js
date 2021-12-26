import { Component } from 'react';
import { Col, Button, Spinner } from 'react-bootstrap';
import QuizScreen from './GameScreen/quizScreen';
import ResultScreen from './GameScreen/resultScreen';

import { connect } from 'react-redux';
import { fetchQuizzes } from '../../../../redux/actions/flagquiz';

import styles from './gameSection.module.css';

class GameSection extends Component {

    render() {
        let quizScreen = <QuizScreen scrollUpRef={this.props.scrollUpRef} />;
        let resultScreen = <div className={styles.alignWrapper}><ResultScreen /></div>;

        let startScreenSpinner = this.props.loading ?
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            /> : null;

        let startScreen = (
            <div className={styles.alignWrapper}>
                <h1
                    style={{
                        marginBottom: "50px",
                    }}
                >
                    Give Flagquiz a try? 🤔
                </h1>
                <Button onClick={() => this.props.fetchQuizzes()} disabled={this.props.loading}>
                    {this.props.loading ? "Fetching quizzes ... " : "Start Flagquiz!"}
                    {startScreenSpinner}
                </Button>
                {this.props.hasError ? <p style={{ color: "red", margin: "10px 0" }}>{this.props.errorMessage}</p> : null}
            </div>
        )

        return (
            <Col
                lg={{ span: 7, offset: 1 }}
                md={{ span: 7, offset: 1 }}
                sm={{ span: 10, offset: 1 }}
                xs={{ span: 10, offset: 1 }}
                style={{ marginBottom: "20px"}}
            >
                <div className={styles.gameSection}>

                    {!this.props.gameOn ? startScreen : null}
                    {(this.props.gameOn && !this.props.gamePause) ? quizScreen : null}
                    {(this.props.gameOn && this.props.gamePause) ? resultScreen : null}

                </div>
            </Col>
        )
    }
}

const mapStateToProps = state => {
    return {
        gameOn: state.flagquiz.gameOn,
        gamePause: state.flagquiz.gamePause,
        loading: state.flagquiz.loading,
        hasError: state.flagquiz.screenHasError,
        errorMessage: state.flagquiz.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchQuizzes: () => dispatch(fetchQuizzes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSection);