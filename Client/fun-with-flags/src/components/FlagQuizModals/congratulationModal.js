import { Modal, Button } from 'react-bootstrap';

const CongratulationModal = props => {
    return (
        <Modal centered show={props.show}>
            <Modal.Header>
                <Modal.Title>Congratulation!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your name is now amongst the best competitors 🔥🔥🔥</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={props.onCloseModal}
                >
                    Okay
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CongratulationModal;