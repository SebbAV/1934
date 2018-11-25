import _ from 'lodash';
import { USER_GET_SCORES,USER_POST_SCORES,INITIALIZE_AI,SEND_TO_AI } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case USER_GET_SCORES:
            return action.payload.data;
        case USER_POST_SCORES:
            return state;
        case INITIALIZE_AI:
            console.log(action.payload)
            return { ...state, 'generated_door': action.payload.data }
        case SEND_TO_AI:
            console.log(action.payload)
            return { ...state, 'generated_door': action.payload.data }
        default:
            return state;
    }
}