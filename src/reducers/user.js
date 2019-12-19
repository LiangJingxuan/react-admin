import type from '../actions/actionTypes'
import { stat } from 'fs';

const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'));
const initState = {
    ...userInfo,
    isLogin: Boolean(window.localStorage.getItem('token')) || Boolean(window.sessionStorage.getItem('token')),
    isLoading: false
}

export default (state=initState, action)=>{
    switch(action.type){
        case type.START_LOGIN :
            return {
                ...state,
                isLoading: true
            }
        case type.LOGIN_SUCCESS :
            return {
                ...state,
                ...action.payload.userInfo,
                isLogin: true,
                isLoading: false
            }
        case type.LOGIN_FAILED :
            return {
                id: '',
                displayName: '',
                avatar: '',
                isLogin: false,
                isLoading: false,
                roles: ''
            }
        case type.CHANGE_AVATAR :
            return {
                ...state,
                avatar: action.payload.avatarUrl
            }
        default :
            return state;
    }
}