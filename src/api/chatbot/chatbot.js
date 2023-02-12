import service from "../../utils/request";
export const sendQuestion= (params)=>{
    return service({//获取新闻列表
        url:'/bot',
        method:'get',
        params
    })
}