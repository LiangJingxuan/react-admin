import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV==='development'
const service = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/239464' : '',

});

service.interceptors.request.use(config=>{
    return config
})
service.interceptors.response.use(res=>{
    if(res.data.code===200){
        return res.data.data
    }else{
        // 全局处理错误
        message.error(res.data.errMsg);
    }
})

// 查询公告列表
export const getArticles = (offset=0, limited=10)=>{
    return service.post('/ts/getAllNotice',{
        offset,
        limited
    })
}
// 删除公告列表
export const delArticlesById = (id)=>{
    return service.post('/ts/delNoticeById',{
        id
    })
}
// 获取公告详情
export const getArticlesById = (id)=>{
    return service.post('/ts/getNoticeById',{
        id
    })
}
// 修改公告
export const editArticlesById = (id, data)=>{
    return service.post(`/ts/upNoticeById/${id}`,data)
}
