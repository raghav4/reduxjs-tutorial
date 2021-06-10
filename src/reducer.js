import * as actions from './actionTypes';
let lastId = 0;

// !! Provide the inital state
export default function reducer(state = [], action) {
    switch(action.type) {
        /**
         * The payload of our action should contain the minimal information we need to update our system.
         * In the case of adding a bug we do not need to add an id, or resolved property.
         * 
         * Everything should be computed here as this is where we implement our business logic.
         */
        case actions.BUG_ADDED: return [
            ...state,
            {
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            }
        ];
        case actions.BUG_RESOLVED: {
            return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true });
        }
        case actions.BUG_REMOVED: return state.filter(bug => bug.id !== action.payload.id);
        // If we dispatch an action that doesn't exist, we don't want our system to blow up.
        // So return the current state.
        default:
            return state;
    }
}