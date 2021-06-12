import { configureStore } from '@reduxjs/toolkit';
import reducer from './projects';

/**
 * Benefits of createStore function from the redux-toolkit is that,
 * 1. We do not need to import the devToolsEnhancer functions from the redux-devtools-extension,
 * 2. We will be able to dispatch asynchronous actions.
 * @returns {Object}
 */

export default function() {
    return configureStore({ reducer });
};
