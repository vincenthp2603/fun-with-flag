import { Component } from 'react';
import { Form, Button, Row, Col, Spinner, Modal } from 'react-bootstrap';
import AuthInput from '../../components/AuthInput/authInput';
import CountrySelect from '../../components/CountrySelect/countrySelect';
import styles from './settingPage.module.css';

import { getFlagResult } from '../../redux/actions/flagpedia';
import { updateUserInfo } from '../../redux/actions/auth';
import { validateInput, validateForm } from '../../utils/authFormValidator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../utils/axios';

class SettingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formControl: {
                newPassword: {
                    value: '',
                    touched: false,
                    isValid: false,
                    required: false
                },
                password: {
                    value: '',
                    touched: false,
                    isValid: false,
                    required: true
                },
                country: {
                    value: ''
                }
            },
            formIsValid: false,
            formIsTouched: false,
            loading: false,
            hasError: false,
            errorMessage: '',
            showModal: false
        }
    }

    changeHandler(event, type) {
        let inputType = type;
        let value = event.target.value;

        if(this.state.hasError) this.setState({ hasError: false });

        if (inputType === 'newPassword' || inputType === 'password') {
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
        this.setState({ hasError: false, loading: true })
        const password = this.state.formControl.password.value;
        const newPassword = this.state.formControl.newPassword.value;
        const country = this.state.formControl.country.value;

        const body = {
            password: password.trim(),
            newPassword: newPassword.trim(),
            country: country
        }

        axios({
            url: '/api/auth/update-user',
            headers: { 'Authorization': `Baerer ${this.props.token}` },
            method: 'POST',
            data: body
        })
            .then(() => {
                localStorage.setItem('country', country);
                this.setState({ loading: false, showModal: true });
                this.props.updateFlag(country);
                this.props.updateUserInfo({ usercountry: country });
            })
            .catch(err => {
                let message = 'Unidentified Error!';
                if (err.response) {
                    message = err.response.data.message;
                }
                this.setState({
                    hasError: true,
                    errorMessage: message,
                    loading: false
                })
            })
    }

    confirmHandler() {
        this.setState({showModal: false});
        this.props.history.push('/');
    }

    componentDidMount() {
        this.setState(prevState => {
            let updatedState = { ...prevState }
            updatedState.formControl.country.value = this.props.usercountry
            return updatedState;
        })

        if (!this.props.isAuth) {
            this.props.history.push('/auth')
        }
    }

    componentDidUpdate(){
        if (!this.props.isAuth) {
            this.props.history.push('/');
        }
    }

    render() {

        let spinner = <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
        />

        let newPasswordInput = this.state.formControl.newPassword;
        let passwordInput = this.state.formControl.password;

        return (
            <div>
                <Modal
                    show={this.state.showModal}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>User Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        User info updated successfully!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="success"
                            onClick={() => this.confirmHandler()}
                        >
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
                
                <h1 className={styles.greeting}>Hi {this.props.username}, change your user information here.</h1>

                <Row>
                    <Col
                        lg={{ span: 4, offset: 4 }}
                        md={{ span: 6, offset: 3 }}
                        sm={{ span: 8, offset: 2 }}
                        xs={{ span: 10, offset: 1 }}
                    >

                        <Form className={styles.authForm}>
                            <CountrySelect
                                priorCountry={this.props.usercountry}
                                onChangeHandler={(e) => this.changeHandler(e, 'country')}
                            />

                            <AuthInput
                                label="New Password"
                                type="password"
                                isValid={
                                    (newPasswordInput.touched && newPasswordInput.isValid) || !newPasswordInput.touched || newPasswordInput.value.trim() === ''
                                }
                                onChangeHandler={(e) => this.changeHandler(e, 'newPassword')}
                                currentValue = { this.state.formControl.newPassword.value }
                            />

                            <AuthInput
                                label="Current Password (required)"
                                type="password"
                                isValid={
                                    (passwordInput.touched && passwordInput.isValid) || !passwordInput.touched
                                }
                                onChangeHandler={(e) => this.changeHandler(e, 'password')}
                                currentValue = { this.state.formControl.password.value }
                            />

                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                {
                                    (!this.state.formIsValid && passwordInput.touched) ?
                                        <p style={{ color: "red" }}>Password must have at least 5 characters.</p> :
                                        null
                                }

                                {
                                    this.state.hasError ?
                                        <p style={{ color: "red" }}>{this.state.errorMessage}</p> :
                                        null
                                }

                                <Button
                                    disabled={!this.state.formIsValid || this.state.loading }
                                    onClick={() => this.submitHandler()}
                                >
                                    Change Info
                                    {this.state.loading ? ' ... ' : ''}
                                    {this.state.loading ? spinner : null}
                                </Button>
                            </div>

                        </Form>

                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        username: state.auth.username,
        usercountry: state.auth.usercountry,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInfo: (updateData) => dispatch(updateUserInfo(updateData)),
        updateFlag: (searchstring) => dispatch(getFlagResult(searchstring))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SettingPage));