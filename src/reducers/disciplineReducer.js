export default function disciplineReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_DISCIPLINE':
      return [
        ...state,
        Object.assign({}, action.discipline)
      ]
    
    case 'EDIT_DISCIPLINE': {
      const i = state.findIndex(i => i.id === action.discipline.id);
      return [
        ...state.slice(0, i),
        Object.assign({}, state[i], action.discipline),
        ...state.slice(i+1)
      ]
    }

    case 'REMOVE_DISCIPLINE': {
      const i = state.findIndex(i => i.id === action.id);
      return [
        ...state.slice(0, i),
        ...state.slice(i+1)
      ]
    }
  
    default:
      return state;
  }
}