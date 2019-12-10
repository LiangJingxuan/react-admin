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

export const getArticles = (limited=10, offset=0)=>{
    return service.post('/ts/getAllNotice',{
        limited,
        offset
    })
}
