/**
 * Middleware function is the curried version of a function with three parameters.
 */
// SNA
// Or,
// const logger = ({ getState, dispatch }) => next => action => {
const logger = param => store => next => action => {
    /**
     * Store is the object which looks like a store.
     */
    // console.log('Logging', param);
    // console.log('Store', store);
    // console.log('Next', next);
    // console.log('Action', action);
    /**
     * Remember calling next() function in the pipeline,
     * If we don't then the action is not going to call the reducer.
     */
    next(action);
};

export default logger;
