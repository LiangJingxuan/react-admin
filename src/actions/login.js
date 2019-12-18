import type from './actionTypes'
import { login } from '../requests'

const startLogin = ()=>{
    return {
        type: type.START_LOGIN
    }
}
const loginSuccess = (userInfo)=>{
    return {
        type: type.LOGIN_SUCCESS,
        payload: {
            userInfo
        }
    }
}
const loginFailed = ()=>{
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('token');
    window.localStorage.removeItem('userInfo');
    window.sessionStorage.removeItem('userInfo');
    return {
        type: type.LOGIN_FAILED
    }
}

// 登录操作
export const loginAction = (userInfo)=>{
    return dispatch=>{
        dispatch(startLogin());
        login(userInfo)
            .then(res=>{
                if(res.data.code===200){
                    const {
                        token,
                        ...userInfoRes
                    } = res.data.data;
                    if(userInfo.remember){
                        window.localStorage.setItem('token', token);
                        window.localStorage.setItem('userInfo', JSON.stringify(userInfoRes));
                    }else{
                        window.sessionStorage.setItem('token', token);
                        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfoRes));
                    }
                    dispatch(loginSuccess(res.data.data));
                }else{
                    dispatch(loginFailed())
                }
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(()=>{

            })
    }
}
// 退出登录
export const logout = ()=>{
    return dispatch=>{
        dispatch(loginFailed())
    }
}