import axios from 'axios';


const API_URL = 'http://localhost:5555'
export const USER_LOGIN = 'user_login';
export const USER_ADD = 'user_add';
export const USER_FORGOT_PASSWORD = 'user_forgot_password';
export const USER_CHECK_CODE = 'user_check_code';
export const USER_RESET_PASSWORD = 'user_reset_password';
export const USER_GET_SCORES = 'user_get_scores';
export const USER_POST_SCORES = 'user_post_scores'
export const STOP_AI = 'stop_ai'
export const INITIALIZE_AI = 'initialize_ai'
export const SEND_TO_AI = 'send_to_ai'



export function loginUser(values, callback) {
    console.log(values)
    const request = axios.post(`${API_URL}/v1/user/login`, values).then((response) => {
        console.log(response)
        callback()
    })
    return {
        type: USER_LOGIN,
        payload: request
    }
}
export function registerUser(values,callback) {
    const request = axios.post(`${API_URL}/v1/user/`,values).then(() => callback())
    return {
        type: USER_ADD,
        payload: request
    }
}
export function resetPassword(values,callback) {
    const request = axios.put(`${API_URL}/v1/user/password_reset/`,values).then(() => callback())
    return {
        type: USER_RESET_PASSWORD,
        payload: request
    }
}
export function forgotPassword(values,callback) {
    const request = axios.post(`${API_URL}/v1/user/forgot/`,values).then(() => callback())
    return {
        type: USER_FORGOT_PASSWORD,
        payload: request
    }
}
export function verifyCode(values,callback){
    const request = axios.get(`${API_URL}/v1/user/check_code/${values}`).then((request) => callback(request))
    return {
        type: USER_CHECK_CODE,
        payload: request
    }
}

export function getScores(values){
    scores = ''
    const request = axios.get(`${API_URL}/v1/user/${scores}/${values}`)
    return {
        type: USER_GET_SCORES,
        payload:request
    }
}
export function postScores(values){
    console.log(values)
    const request = axios.post(`${API_URL}/v1/match`,values)
    return {
        type: USER_POST_SCORES,
        payload:request
    }
}
export function sendAI(values){
    const request = axios.post(`${API_URL}/v1/aimodel/move`,values)
    return {
        type: SEND_TO_AI,
        payload:request
    }
}
export function startAI(values){
    const request = axios.post(`${API_URL}/v1/aimodel`)
    return {
        type:INITIALIZE_AI,
        payload:request
    }
}
export function stopAI(values){
    const request = axios.post(`${API_URL}/v1/aimodel/stop`)
    return {
        type: STOP_AI,
        payload:request
    }
}
