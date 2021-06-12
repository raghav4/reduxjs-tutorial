import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

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

let lastId = 0;

const slice = createSlice({
    name: 'bugs', // Name of the Slice
    initialState: [], 
    reducers: {
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
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            });
        },
        bugResolved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[index].resolved = true;
        },
        bugRemoved: (bugs, action) => {
            bugs = bugs.filter(bug => bug.id !== action.payload.id);
        }
    }
});

export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;

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
