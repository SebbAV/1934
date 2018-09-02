import axios from 'axios';


const API_URL = ''
export const USER_LOGIN ='user_login';
export const USER_ADD ='user_add';
export const USER_FORGOT_PASSWORD = 'user_forgot_password';
export function loginUser(){
    const request = axios.get(`${API_URL}/user/login`).then(() => callback())
    return {
        type: USER_LOGIN,
        payload: request
    }
}
export function registerUser(){
    const request = axios.get(`${API_URL}/user/`).then(() => callback())
    return {
        type: USER_ADD,
        payload: request
    }
}
export function forgotPassword(){
    const request = axios.get(`${API_URL}/forgot/`).then(() => callback())
    return {
        type: USER_FORGOT_PASSWORD,
        payload: request
    }
}