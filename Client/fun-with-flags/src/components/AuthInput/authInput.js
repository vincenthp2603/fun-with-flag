import { Col, Form } from 'react-bootstrap';
import styles from './authInput.module.css';

const authInput = (props) => {
    return (
        <Col
            lg={{ span: 10, offset: 1 }}
            md={{ span: 10, offset: 1 }}
            sm={{ span: 10, offset: 1 }}
            xs={{ span: 10, offset: 1 }}
        >
            <Form.Group className="mb-3">
                <Form.Label>{ props.label }</Form.Label>
                <Form.Control 
                    type={ props.type }
                    onChange={ props.onChangeHandler } 
                    className={ props.isValid ? "" : styles.invalid }
                    value= { props.currentValue }
                />
            </Form.Group>
        </Col>
    )
}

export default authInput;