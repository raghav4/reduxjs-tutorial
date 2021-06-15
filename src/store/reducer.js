import { combineReducers } from "redux";
import entitiesReducer from './entities';

export default combineReducers({
    entities: entitiesReducer
});

/**
 * If we are not using the "redux-toolkit"
 * and using the reduxjs createStore Function,
 * We have to import a function "applyMiddleware" and call it as the second argument and pass the middleware in it,
 * eg:
 * const store = createStore(reducer, applyMiddleware(logger)); // Store enhancer, we can pass one or more middleware.
 */
