import { Component } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import AuthInput from '../../components/AuthInput/authInput';
import CountrySelect from '../../components/CountrySelect/countrySelect';
import styles from './authPage.module.css';

import { validateInput, validateForm } from '../../utils/authFormValidator';
import { authStart, switchAuthType } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AuthPage extends Component {

    state = {
        formControl: {
            username: {
                value: '',
                required: true,
                touched: false,
                isValid: false
            },
            password: {
                value: '',
                required: true,
                touched: false,
                isValid: false
            },
            country: {
                value: 'Vietnam'
            }
        },
        formIsValid: false,
        formIsTouched: false
    }

    changeHandler(event, type) {
        let inputType = type;
        let value = event.target.value;  

        if (inputType === 'username' || inputType === 'password') {
            this.setState(prevState => {
                let updatedState = { ...prevState };
                updatedState.formControl[inputType].value = value;
                updatedState.formControl[inputType].touched = true;
                updatedState.formControl[inputType].isValid = validateInput(value);
                updatedState.formIsValid = validateForm(updatedState.formControl);
                updatedState.formIsTouched = true;
                return updatedState;
            })
        } else if (inputType === 'country') {
            this.setState(prevState => {
                let updatedState = { ...prevState };
                updatedState.formControl.country.value = value;
                updatedState.formIsTouched = true;
                return updatedState;
            })
        }
    }

    submitHandler() {
        const authType = this.props.authType;
        const username = this.state.formControl.username.value;
        const password = this.state.formControl.password.value;
        const country = this.state.formControl.country.value;

        this.props.authStart(authType, username, password, country);
    }
    
    componentDidMount() {
        if (this.props.isAuth) {
            this.props.history.push('/');
        }        
    }

    componentDidUpdate() {
        if (this.props.isAuth) {
            this.props.history.push('/');
        }
    }

    render() {
        let readyToSubmit = this.state.formIsValid && this.state.formIsTouched;
        let hasValidationError = !this.state.formIsValid && this.state.formIsTouched;
        const validationError = <p style={{ color: 'red' }}>Username and Password must have at least 5 characters.</p>;
        let authErrorMessage = <p style={{ color: 'red' }}>{this.props.authErrorMessage}</p>;
        let spinner = <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
        />
        let hasAuthError = this.props.hasAuthError;

        return (
            <div>
                <h1 className={styles.greeting}>Sign in to have more fun with FunWithFlags</h1>

                <Row>
                    <Col
                        lg={{ span: 4, offset: 4 }}
                        md={{ span: 6, offset: 3 }}
                        sm={{ span: 8, offset: 2 }}
                        xs={{ span: 10, offset: 1 }}
                    >

                        <Form className={styles.authForm}>
                            <Row>
                                {
                                    ["username", "password"].map((inputName, index) => (
                                        <AuthInput
                                            label={inputName.charAt(0).toUpperCase() + inputName.slice(1)}
                                            type={inputName}
                                            onChangeHandler={(e) => this.changeHandler(e, inputName)}
                                            key={index}
                                            isValid={
                                                (this.state.formControl[inputName].isValid && this.state.formControl[inputName].touched) ||
                                                (!this.state.formControl[inputName].touched)
                                            }
                                        />
                                    ))
                                }

                                {this.props.authType === 'login' ? null : <CountrySelect onChangeHandler={(e) => this.changeHandler(e, "country")} />}


                                <Col
                                    lg={{ span: 10, offset: 1 }}
                                    md={{ span: 10, offset: 1 }}
                                    sm={{ span: 10, offset: 1 }}
                                    xs={{ span: 10, offset: 1 }}
                                    className={[styles.errCol, "mt-2", "mb-2"].join(" ")}
                                >
                                    {hasValidationError ? validationError : null}
                                    {hasAuthError ? authErrorMessage : null}
                                </Col>

                                <Col
                                    lg={{ span: 10, offset: 1 }}
                                    md={{ span: 10, offset: 1 }}
                                    sm={{ span: 10, offset: 1 }}
                                    xs={{ span: 10, offset: 1 }}
                                    className={[styles.btnCol, "mt-3"].join(" ")}
                                >
                                    <Button
                                        variant="primary"
                                        disabled={!readyToSubmit || this.props.loading}
                                        onClick={() => this.submitHandler()}
                                        style={{ marginBottom: "10px" }}
                                    >
                                        {this.props.authType === 'login' ? 'Sign in' : 'Sign up'}
                                        {this.props.loading ? ' ... ' : null }
                                        {this.props.loading ? spinner : null }
                                    </Button>

                                    <Button
                                        variant="primary"
                                        onClick={() => this.props.switchAuthType()}
                                        style={{ marginBottom: "10px" }}
                                    >
                                        Switch to {this.props.authType === 'login' ? 'Sign up' : 'Sign in'}
                                    </Button>

                                </Col>

                            </Row>
                        </Form>

                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        hasAuthError: state.auth.hasError,
        authErrorMessage: state.auth.errorMessage,
        isAuth: state.auth.isAuth,
        loading: state.auth.loading,
        authType: state.auth.authType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authStart: (authType, username, password, country) => dispatch(authStart(authType, username, password, country)),
        switchAuthType: () => dispatch(switchAuthType())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthPage));

