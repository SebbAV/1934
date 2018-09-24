import axios from 'axios';


const API_URL = 'http://localhost:5555'
export const USER_LOGIN = 'user_login';
export const USER_ADD = 'user_add';
export const USER_FORGOT_PASSWORD = 'user_forgot_password';
export const USER_CHECK_CODE = 'user_check_code';
export const USER_RESET_PASSWORD = 'user_reset_password';
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