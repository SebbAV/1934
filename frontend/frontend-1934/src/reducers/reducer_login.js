import _ from 'lodash';
import { USER_LOGIN, USER_ADD, USER_FORGOT_PASSWORD } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case USER_LOGIN:
            return action.payload.data;
        case USER_ADD:
            return action.payload.data;
        case USER_FORGOT_PASSWORD:
            return action.payload.data;
        default:
            return state;
    }
}