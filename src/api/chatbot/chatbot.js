import service from "../../utils/request";
export const sendQuestion= (param)=>{
    return service({//获取新闻列表
        url:'/bot?question='+param,
        method:'get'
    })
}