export default function classReducer(state = [], action) {
  switch (action.type) {
    case 'CHANGE_CLASS_STATUS':
      return [
        ...state,
        Object.assign({}, action.classe)
      ];

    case 'DELETE_ATTENDANCE':
      const i = state.findIndex(i => i.id === action.id);
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ]
    
    default:
      return state;
  }
}