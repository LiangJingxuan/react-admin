import type from './actionTypes'
import { getNotificationsList } from '../requests'

const startMarkAsRead = ()=>{
    return{
        type: type.START_MORK_AS_READ
    }
}
const finishMarkAsRead = ()=>{
    return{
        type: type.FINISH_MORK_AS_READ
    }
}

// 标记已读
export const markNotificationAsReadById = (id)=>{
    return dispatch =>{
        dispatch(startMarkAsRead())
        // 模拟服务端请求
        setTimeout(()=>{
            dispatch({
                type: type.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload: {
                    id
                }
            })
            dispatch(finishMarkAsRead())
        },1500)
    }
}
// 标记已读全部
export const markAllNotificationsRead = ()=>{
    return dispatch =>{
        dispatch(startMarkAsRead())
        // 模拟服务端请求
        setTimeout(()=>{
            dispatch({
                type: type.MARK_NOTIFICATIONS_AS_READ
            })
            dispatch(finishMarkAsRead())
        },1500)
    }
}
// 查询全部通知
export const getNotificationsListAll = ()=>{
    return dispatch =>{
        dispatch(startMarkAsRead())
        getNotificationsList()
            .then(res=>{
                dispatch({
                    type: type.RECIVED_NOTIFICATIONS,
                    payload: {
                        list: res.list
                    }
                })
                dispatch(finishMarkAsRead())
            })
            .catch(err=>{
                console.log(err)
            })
    }
}