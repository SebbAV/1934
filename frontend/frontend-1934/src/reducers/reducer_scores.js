import _ from 'lodash';
import { USER_GET_SCORES,USER_POST_SCORES  } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case USER_GET_SCORES:
            return action.payload.data;
        case USER_POST_SCORES:
            return action.payload.data;
        default:
            return state;
    }
}