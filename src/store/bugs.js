import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

/**
 * The "createSlice" function combines creating actions and reducer together.
 * P.S - Mosh Loves this function.
 * 
 * slice is an object with four properties,
 * name,
 * reducer,
 * actions,
 * caseReducers (Kinda like actions)
 * 
 * The actions are prefixed with type of the slice,
 * eg: bugs/bugAdded
 */

/**
 * Steps to indicate Loading Spinner
 * action: bugsRequested
 * reducer: loading = true
 * middleware: dispatch new action before making API call.
 */

let lastId = 0;

const slice = createSlice({
    name: 'bugs', // Name of the Slice
    // initialState: [], 
    initialState: {
        list: [],
        loading: false,
        lastFetch: null, // Useful when we have to implement caching.
    },
    reducers: {
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },
        // name of action using redux toolkit is going to be bugs/bugsReceived
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;  
            bugs.loading = false;
            bugs.lastFetch = Date.now()
        },
        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },
        /**
         * Maps actions to action handlers,
         * We are not using the computed property syntax here [bugAdded.type] as, 
         * bugAdded was an object, in this approach, bugAdded is the name of the property.
         * This is the only place we have to update,
         * 
         * With the createAction() function we can get the type by,
         * const action = createAction('typeName');
         * action.type or action.toString()
         */
        bugAdded: (bugs, action) => {
            bugs.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            });
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },
        bugRemoved: (bugs, action) => {
            bugs = bugs.list.filter(bug => bug.id !== action.payload.id);
        },
        bugAssignedToUser: (bugs, action) => {
            const { bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        }
    }
});

export const { bugAdded, bugRemoved, bugResolved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions;
export default slice.reducer;

const url = '/bugs';

export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;
    dispatch(apiCallBegan({
        url,
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type,
    }));

    // return lastFetch;
};

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId)
);

// export const bugAdded = createAction('bugAdded');
// export const bugRemoved = createAction('bugRemoved');
// export const bugResolved = createAction('bugResolved');

// export default createReducer([], {
//     [bugAdded.type]: (bugs, action) => {
        
//     },
//     [bugResolved.type]: (bugs, action) => {
//         const index = bugs.findIndex(bug => bug.id === action.payload.id);
//         bugs[index].resolved = true;
//     },
//     [bugRemoved.type]: (bugs, action) => {
//         bugs = bugs.filter(bug => bug.id !== action.payload.id);
//     }
// });
