import moment from "moment";
//datetime all 20221231015930
export const dta="YYYYMMDDHHmmss"
//输入一个时间和当前时间做对比
export const fromNow = (date,formate)=>{
    return moment(date,formate).fromNow();
}