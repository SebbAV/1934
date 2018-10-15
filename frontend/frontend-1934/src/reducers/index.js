import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import scoresReducer from './reducer_scores';
const rootReducer = combineReducers({
  form:formReducer,
  scores:scoresReducer
});

export default rootReducer;
