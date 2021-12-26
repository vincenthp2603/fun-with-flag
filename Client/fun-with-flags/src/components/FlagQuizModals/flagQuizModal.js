import { Modal, Button } from 'react-bootstrap';

const FlagQuizModal = props => {
    return (
        <Modal show={props.show} centered>
            <Modal.Header>
                <Modal.Title>Sign in to have more fun</Modal.Title>
            </Modal.Header>
            <Modal.Body>Sign in to have the chance to get your name in the Hall of Fame</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={props.onOfferReject}
                >
                    Nah, just want to look around
                </Button>
                <Button
                    variant="primary"
                    onClick={props.onOfferAgree}
                >
                    Sign me in
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FlagQuizModal;