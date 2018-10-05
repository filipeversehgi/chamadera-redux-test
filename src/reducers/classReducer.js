import * as moment from 'moment';
import { v4 } from 'uuid';

export default function classReducer(state = [], action) {
  switch (action.type) {
    case "CHANGE_CLASS_STATUS": {
      console.log('ChangeClassStatus', action);
      const i = state.findIndex(c => c.id === action.classId);
      return [
        ...state.slice(0, i), 
        Object.assign({}, {...state[i], wentTo: action.wentTo}),
        ...state.slice(i+1)
      ];
    }

    case "DELETE_CLASSES":
      return [...state.filter(i => i.disciplineId !== action.disciplineId)];

    case "CREATE_DISCIPLINE":
      return [...state, ...createClassList(action.discipline)];

    case "EDIT_DISCIPLINE":
      return [...state.filter(i => i.discipline.id !== action.discipline.id), ...createClassList(action.discipline)];
    
    case "REMOVE_DISCIPLINE":
      return [...state.filter(i => i.disciplineId !== action.id)];

    default:
      return state;
  }
}

function createClassList(d) {
  const d1 = moment(d.startDate, 'DD/MM/YYYY');
  const d2 = moment(d.endDate, 'DD/MM/YYYY');
  const totalDays = d2.diff(d1, 'days');

  let rep = 1;
  let classList = [];

  for (let i = 0; i <= totalDays; i++) {
    const currentDay = d1.clone().add(i, 'days');

    const numberOfClasses = Object.values(d.classDays)[currentDay.isoWeekday()];

    for (let j = 0; j < numberOfClasses; j++) {
      classList.push({
        id: v4(),
        date: currentDay.format("DD/MM/YYYY"),
        rep,
        wentTo: undefined,
        disciplineId: d.id
      });

      rep++;
    }
  }

  return classList;
}