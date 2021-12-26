import { Component } from "react";
import { Col, Card } from "react-bootstrap";

import { connect } from "react-redux";
import { answerChosen } from '../../redux/actions/flagquiz';

import styles from './answerCard.module.css';

class AnswerCard extends Component {

    onClickHandler(answerIndex) {
        let result = (answerIndex === this.props.rightAnswerIndex);
        if (this.props.scrollUpRef) this.props.scrollUpRef.current.scrollIntoView({ behavior: 'smooth'});
        this.props.answerChosen(result);
    }

    render() {

        return (
            <Col
                lg={6}
                md={6}
                sm={12}
                xs={12}
            >

                <Card 
                    className={styles.answerCard}
                    onClick={() => this.onClickHandler(this.props.index)}
                >
                    {
                        this.props.questionType === 'COUNTRY_TO_FLAG' ?
                            <Card.Img src={this.props.answer}></Card.Img> :
                            <Card.Body>
                                <Card.Text>{this.props.answer}</Card.Text>
                            </Card.Body>
                    }

                    <Card.Body>
                        <Card.Title>{['A', 'B', 'C', 'D'][this.props.index]}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

const mapStateToProps = state => {
    return {
        rightAnswerIndex: state.flagquiz.quizzes[state.flagquiz.currentQuizIndex].rightAnswerIndex
    }
}

const mapDispatchToProps = dispatch => {
    return {
        answerChosen: (result) => dispatch(answerChosen(result))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerCard);
