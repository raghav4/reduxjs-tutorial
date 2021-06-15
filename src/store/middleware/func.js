/**
 * Thunk
 * In Redux the actions should be a plain javascript object with "type" property.
 * Sometimes we have to dispatch functions to execute API synchronously, 
 * 
 * This middleware is already built for us as "thunk".
 */

const func = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        action(dispatch, getState);
    } else {
        next(action);
    }
}
