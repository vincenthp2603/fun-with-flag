import { Component } from "react";
import { Col, Spinner } from "react-bootstrap";
import io from 'socket.io-client';
import socketBaseURL from "../../../../utils/socketBaseUrl";

import { connect } from 'react-redux';
import { startFetchScores, fetchScoresSuccess } from '../../../../redux/actions/flagquiz';

import styles from './halloffame.module.css';

class HallOfFame extends Component {

    constructor(props) {
        super(props);
        this.setState({
            socket: null,
            scoreRecords: []
        })
    }

    componentDidMount() {
        //console.log(`socketBaseURL: ${socketBaseURL}`);
        const socket = socketBaseURL !== '' ? io(socketBaseURL) : io();
        socket.on('halloffame', (records) => {
            this.props.updateScoreRecords(records);
        })
        this.setState({ socket: socket });
        this.props.fetchScoreRecords();
    }

    componentWillUnmount() {
        if (this.state.socket) {
            this.state.socket.disconnect();
        }
    }

    render() {
        let recordSpinner = <Spinner animation="border" size="lg" variant="primary"></Spinner>

        let records = this.props.records.map((rec, index) => {
            let decoration = '';
            switch (index) {
                case 0: {
                    decoration = '🔥👑🔥';
                    break;
                }
                case 1: {
                    decoration = '🔥🔥';
                    break;
                }
                case 2: {
                    decoration = '🔥';
                    break;
                }
                default:
                    break;
            }
            return (
                <div 
                    key={index}
                    className={styles.record}
                >
                    <span className={[styles.nameSpan, styles.recordDetail].join(' ')}>
                        {index+1}.{decoration} <p>{rec.username}</p>
                    </span>
                    <span className={[styles.scoreSpan, styles.recordDetail].join(' ')}>
                        <p>{rec.score}</p>
                    </span>                
                </div>
            )
        })

        return (
            <Col
                lg={{ span: 3, offset: 0 }}
                md={{ span: 3, offset: 0 }}
                sm={{ span: 10, offset: 1 }}
                xs={{ span: 10, offset: 1 }}
            >
                <div className={styles.hallOfFame}>
                    <h3>Hall Of Fame</h3>
                    { this.props.loading ? recordSpinner : records }
                    { 
                        this.props.records.length === 0 && !this.props.hasError ? 
                            <h6>Seems like there is no one here yet. It's your chance to be the first one to set foot in the 🔥Hall of Fame🔥</h6> : 
                            null 
                    }
                    { this.props.hasError ? <p style={{ color: "red" }}>{this.props.errorMessage}</p> : null }
                </div>
            </Col>
        )
    }
}

const mapStateToProps = state => {
    return {
        records: state.flagquiz.records,
        loading: state.flagquiz.recordsLoading,
        hasError: state.flagquiz.recordsHasError,
        errorMessage: state.flagquiz.recordsErrorMessage
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchScoreRecords: () => dispatch(startFetchScores()),
        updateScoreRecords: (records) => dispatch(fetchScoresSuccess(records))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HallOfFame);