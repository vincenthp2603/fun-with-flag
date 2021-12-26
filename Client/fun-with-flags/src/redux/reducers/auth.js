import * as ACTION_TYPES from '../actiontypes';

const initialState = {
    isAuth: false,
    username: '',
    usercountry: '',
    token: null,
    hasError: false,
    errorMessage: '',
    loading: false,
    authType: 'login'
}

const waitForAuthResult = (prevState) => {
    return {
        ...prevState,
        hasError: false,
        loading: true
    }
}

const authFail = (prevState, message) => {
    return {
        ...prevState,
        hasError: true,
        loading: false,
        errorMessage: message
    }
}

const authSuccess = (prevState, username, country, token) => {
    return {
        ...prevState,
        isAuth: true,
        username: username,
        token: token,
        usercountry: country
    }
}

const switchAuthType = (prevState) => {
    return {
        ...prevState,
        authType: prevState.authType === 'login' ? 'signup' : 'login',
        hasError: false
    }
}

const updateUserInfo = (prevState, updateData) => {
    let updatedState = { ...prevState };
    for (let key in updateData) {
        updatedState[key] = updateData[key]
    };
    return updatedState;
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.AUTH_WAIT_FOR_RESULT: return waitForAuthResult(state);
        case ACTION_TYPES.AUTH_FAIL: return authFail(state, action.message);
        case ACTION_TYPES.AUTH_SUCCESS: return authSuccess(state, action.username, action.country, action.token)
        case ACTION_TYPES.AUTH_SWITCH_TYPE: return switchAuthType(state);
        case ACTION_TYPES.AUTH_UPDATE_USER_INFO: return updateUserInfo(state, action.updateData);
        case ACTION_TYPES.AUTH_LOGOUT: return initialState;
        default:
            return state;
    }
}