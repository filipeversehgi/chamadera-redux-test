import { combineReducers } from 'redux';
import courses from './courseReducer';
import disciplines from './disciplineReducer';
import classes from './classReducer';

const rootReducer = combineReducers({
    courses,
    disciplines,
    classes
});

export default rootReducer;