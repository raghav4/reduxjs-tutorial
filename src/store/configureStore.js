import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import error from './middleware/error';
import api from './middleware/api';
import reducer from './reducer';

/**
 * Benefits of createStore function from the redux-toolkit is that,
 * 1. We do not need to import the devToolsEnhancer functions from the redux-devtools-extension,
 * 2. We will be able to dispatch asynchronous actions.
 * @returns {Object}
 */

export default function() {
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            error,
            logger('console'),
            api,
        ],
    });
};
