import { combineReducers } from 'redux';
import courses from './courseReducer';
import disciplines from './disciplineReducer';

const rootReducer = combineReducers({
    courses,
    disciplines
});

export default rootReducer;