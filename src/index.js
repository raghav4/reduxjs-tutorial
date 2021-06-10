import store from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

/**
 * Subscribing to a store.
 * 
 * This subscribe method returns a method to unsubscribe from a store.
 * This is important because it is possible that the user navigates away from the current page and in that new page
 * we do not have that UI components, so we should have subscriptions to that store.
 * Because this subscription could cause memory leaks.
 */

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
store.dispatch(bugAdded('Bug 1'));
store.dispatch(bugAdded('Bug 2'));

store.dispatch(bugResolved(1));

store.dispatch(bugAdded('Bug 3'));

unsubscribe();
// Now after Unsubscribig we are not going to get notified of the action dispatch.
// Because we have Unsubscribed before.

store.dispatch(bugRemoved(2));
console.log(store.getState());
