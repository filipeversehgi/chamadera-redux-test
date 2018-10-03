export default function courseReducer(state = [], action) {
    switch (action.type) {
        case 'CREATE_COURSE':
            return [ 
                ...state, 
                Object.assign({}, action.course)
            ];
        
        case 'EDIT_COURSE':
            const i = state.findIndex(i => i.id === action.course.id);
            return [
                ...state.slice(0, i),
                Object.assign({}, state[i], action.course),
                ...state.slice(i+1)
            ]
    
        default:
            return state;
    }
}