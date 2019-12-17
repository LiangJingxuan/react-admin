import type from './actionTypes'

// 标记已读
export const markNotificationAsReadById = (id)=>{
    console.log(id)
    return dispatch =>{
        // 模拟服务端请求
        setTimeout(()=>{
            dispatch({
                type: type.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload: {
                    id
                }
            })
        },1500)
    }
}