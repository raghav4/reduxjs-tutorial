import { bugAdded, bugRemoved, bugResolved, bugAssignedToUser, getBugsByUser, loadBugs } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';
import configureStore from './store/configureStore';
import * as actions from './store/api';

// It is a bad practice to import all objects in one go but since the module is very small. 
// So, It is ok to do so.

/**
 * Subscribing to a store.
 * 
 * This subscribe method returns a method to unsubscribe from a store.
 * This is important because it is possible that the user navigates away from the current page and in that new page
 * we do not have that UI components, so we should have subscriptions to that store.
 * Because this subscription could cause memory leaks.
 */

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    /**
     * This is something we do in the UI Layer.
     * Whenever the state of our store changed, we refresh the UI, or perform certain operations.
     * 
     * If talking about VanillaJS or Jquery, This is where we are going to refresh our view.
     * In react, re-render.
     */
    console.log('Store State Changed', store.getState());
})

/**
 * Dispatch,
 * newState = reducer(state, action) // Internal state of the store.
 * > Notify the subscribers.
 */

// Dispatching an action.
store.dispatch(userAdded({ name: 'User 1' }));
store.dispatch(userAdded({ name: 'User 2' }));
store.dispatch(projectAdded({ name: 'Project 1' }));
store.dispatch(bugAdded({ description: 'Bug 1' }));
store.dispatch(bugAdded({ description: 'Bug 2' }));

store.dispatch(bugResolved({ id: 1 }));

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
store.dispatch(bugAdded({ description: 'Bug 3' }));
/**
 * getBugsByUser => going to return us a function which accepts our current state as an argument.
 */
const bugs = getBugsByUser(1)(store.getState());
console.log(bugs);

unsubscribe();
// Now after Unsubscribing we are not going to get notified of the action dispatch.
// Because we have Unsubscribed before.

// // store.dispatch(bugRemoved({ id: 2 }));

// Dispatching a function
// store.dispatch((dispatch, getState) => {
//     // Call an API
//     // When the Promise is resolved => dispatch()
//     dispatch({ type: 'bugsReceived', bugs: [1, 2, 3] });
//     // If the promise is rejected dispatch()
//     console.log(getState());
// });

// store.dispatch({
//     type: 'error',
//     payload: {
//         message: 'An Error Occurred'
//     }
// });

// console.log(store.getState());

/**
 * At the UI Layer,
 * We do not wanna know what action should be dispatch, what URL we should be hitting,
 * At the UI Layer, it should be store.dispatch(loadBugs());
 */

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(loadBugs()), 2000);
