import { Component } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import styles from './flagpedia.module.css';

import Flagresult from '../../components/FlagResult/flagresult';

import { connect } from 'react-redux';
import { getFlagResult } from '../../redux/actions/flagpedia';

class Flagpedia extends Component {

    state = {
        searchString: ''
    }

    inputChangeHandler = e => {
        const searchString = e.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                searchString: searchString
            }
        })
    }

    onClickHandler = () => {
        let countryname = this.state.searchString;
        if (this.state.searchString.trim() === '') {
            if(this.props.usercountry !== '') {
                countryname = this.props.usercountry
            } else {
                return;
            } 
        }
        this.props.getFlagResult(countryname);
    }

    render() {
        let flagresult = (
            <Flagresult
                name={this.props.name}
                flagUrl={this.props.flagUrl}
                capital={this.props.capital}
            />
        )

        let error = (
            <Col
                lg={{ span: 4, offset: 4 }}
                md={{ span: 6, offset: 3 }}
                sm={{ span: 8, offset: 2 }}
                xs={{ span: 8, offset: 2 }}
                className={["mt-2", styles.errorCol].join(" ")}
            >
                <Form.Text style={{color: '#fff'}}>
                    {this.props.errorMessage}
                </Form.Text>
            </Col>
        )

        return (
            <div>
                { this.props.isAuth ? <h1 className={styles.greeting}>Hello "{this.props.username}" from {this.props.usercountry} </h1> : null }
                <Row>
                    <Col
                        lg={{ span: 4, offset: 4 }}
                        md={{ span: 6, offset: 3 }}
                        sm={{ span: 8, offset: 2 }}
                        xs={{ span: 8, offset: 2 }}
                    >
                        <Form 
                            className={styles.flagsForm}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter country name here"
                                    onChange={(e) => this.inputChangeHandler(e)}
                                />
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                onClick={() => this.onClickHandler()}
                            >
                                Get the flag!
                            </Button>
                        </Form>
                    </Col>

                    {this.props.error ? error : null}

                    <Col
                        lg={{ span: 4, offset: 4 }}
                        md={{ span: 6, offset: 3 }}
                        sm={{ span: 8, offset: 2 }}
                        xs={{ span: 8, offset: 2 }}
                        className="mt-5"
                        style={{ textAlign: 'center' }}
                    >
                        {this.props.loading ? <Spinner animation="border" variant="primary" /> : flagresult}
                    </Col>

                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.flagpedia,
        isAuth: state.auth.isAuth,
        username: state.auth.username,
        usercountry: state.auth.usercountry
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFlagResult: (searchString) => dispatch(getFlagResult(searchString))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flagpedia);


