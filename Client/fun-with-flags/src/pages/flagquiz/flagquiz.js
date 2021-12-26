import { Component, createRef } from 'react';
import { Row } from 'react-bootstrap';
import FlagQuizModal from '../../components/FlagQuizModals/flagQuizModal';
import GameSection from './sections/GameSection/gameSection';
import HallOfFame from './sections/HallOfFameSection/halloffame';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import styles from './flagquiz.module.css';

class FlagQuiz extends Component {
    state = {
        showModal: false
    }

    componentDidMount() {
        if (!this.props.isAuth) {
            this.setState({ showModal: true })
        }
        this.scrollUpRef = createRef();
    }

    componentDidUpdate() {
        if (this.props.isAuth && this.state.showModal) {
            this.setState({ showModal: false })
        }
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    redirectToAuthPage() {
        this.props.history.push('/auth');
    }

    render() {
        return (
            <div>
                <FlagQuizModal
                    show={this.state.showModal}
                    onOfferAgree={() => this.redirectToAuthPage()}
                    onOfferReject={() => this.closeModal()}
                />

                <Row>
                    <div style={{ height: "10px" }} ref={this.scrollUpRef} ></div>
                    <GameSection scrollUpRef={this.scrollUpRef} />
                    <HallOfFame />
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(withRouter(FlagQuiz));