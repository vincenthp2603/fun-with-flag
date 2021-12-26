import flagpediaReducer from './reducers/flagpedia';
import authReducer from './reducers/auth';
import flagquizReducer from './reducers/flagquiz';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    flagpedia: flagpediaReducer,
    auth: authReducer,
    flagquiz: flagquizReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;