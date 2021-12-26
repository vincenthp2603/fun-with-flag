import * as ACTION_TYPES from '../actiontypes';
import {  handleFlagResult } from './flagpedia';
import axios from '../../utils/axios';

export const authStart = (authType, username, password, country) => {
    return (dispatch) => {
        dispatch(waitForAuthResult());
        let url = `/api/auth/${authType}`;
        let loginBody = {
            username: username,
            password: password
        }

        let signupBody = {
            ...loginBody,
            country: country
        }

        const body = authType === 'login' ? loginBody : signupBody

        axios.post(url, body)
            .then(res => {
                //console.log(res);
                let username = res.data.username;
                let token = res.data.token;
                let countryname = res.data.country.name;
                let capital = res.data.country.capital;
                let flagUrl = res.data.country.flagUrl;

                localStorage.setItem('username', username);
                localStorage.setItem('country', countryname);
                localStorage.setItem('token', token);
                localStorage.setItem('expiresIn', `${new Date().getTime() + 3600*1000}`);

                dispatch(handleFlagResult(countryname, capital, flagUrl));
                dispatch(authSuccess(username, countryname, token));
                setTimeout(() => dispatch(authLogout()), 3600*1000);
            })
            .catch(err => {
                //console.log(err);
                let message = 'Unidentified Error!';
                if (err.response) {
                    message = err.response.data.message;
                }
                dispatch(authFail(message));
            })
    }
}

export const authFail = (message) => {
    return {
        type: ACTION_TYPES.AUTH_FAIL,
        message: message
    }
}

export const authSuccess = (username, country, token) => {
    return {
        type: ACTION_TYPES.AUTH_SUCCESS,
        username: username,
        country: country,
        token: token
    }
}

export const waitForAuthResult = () => {
    return {
        type: ACTION_TYPES.AUTH_WAIT_FOR_RESULT
    }
}

export const authLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('country');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');

    return {
        type: ACTION_TYPES.AUTH_LOGOUT
    }
}

export const switchAuthType = () => {
    return {
        type: ACTION_TYPES.AUTH_SWITCH_TYPE
    }
}

export const updateUserInfo = (updateData) => {
    return {
        type: ACTION_TYPES.AUTH_UPDATE_USER_INFO,
        updateData: updateData
    }
}