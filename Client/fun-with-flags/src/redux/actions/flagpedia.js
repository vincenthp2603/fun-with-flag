import axios from '../../utils/axios';
import * as ACTION_TYPES  from '../actiontypes';

export const getFlagResult = searchString => {
    return (dispatch) => {
        dispatch(waitForFlagResult());
        axios.get('/api/countries/country', {
            params: {
                name: searchString
            }
        })
        .then(res => {
            //console.log(res);
            const name = res.data.name;
            const url = res.data.url;
            const capital = res.data.capital;
            dispatch(handleFlagResult(name, capital, url));
        })
        .catch(err => {
            console.log(err.response);
            let message = 'Unidentified Error!'
            if (err.response) {
                message = err.response.data.message
            }
            dispatch(handleFlagError(message));
        })
    }
}

export const waitForFlagResult = () => {
    return {
        type: ACTION_TYPES.WAIT_FOR_FLAG_RESULT
    }
}

export const handleFlagResult = (name, capital, url) => {
    return {
        type: ACTION_TYPES.HANDLE_FLAG_RESULT,
        name: name,
        capital: capital,
        url: url
    }
}

export const handleFlagError = (message) => {
    return {
        type: ACTION_TYPES.HANDLE_FLAG_ERROR,
        message: message
    }
}