import * as ACTION_TYPES  from '../actiontypes';

const initialState = {
    name: "Vietnam",
    capital: "Hanoi",
    flagUrl: "https://res.cloudinary.com/vcloudinary/image/upload/v1727461005/vz9g1vjj0lcd5g0l0ahm.gif",
    loading: false,
    error: false,
    errorMessage: ""
}

const waitForFlagResult = (prevState) => {
    return {
        ...prevState,
        loading: true,
        error: false
    }
}

const handleFlagResult = (prevState, name, capital, url) => {
    return {
        ...prevState,
        name: name,
        capital: capital,
        flagUrl: url,
        loading: false
    }
}

const handleFlagError = (prevState, message) => {
    return {
        ...prevState,
        loading: false,
        error: true,
        errorMessage: message
    }
}

export default function flagpediaReducer(state=initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.WAIT_FOR_FLAG_RESULT: return waitForFlagResult(state);
        case ACTION_TYPES.HANDLE_FLAG_RESULT: return handleFlagResult(state, action.name, action.capital, action.url);
        case ACTION_TYPES.HANDLE_FLAG_ERROR: return handleFlagError(state, action.message);
        default:
            return state
    }
}