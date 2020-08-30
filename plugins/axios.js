// 使用axios的拦截器拦截页面的所有请求错误，并弹出对应的图示
import {Message} from "element-ui";

export default function({$axios,redirect}){
    $axios.onError(err=>{
        const {statusCode,message} = err.response.data;
        // 还未使用
        if(statusCode===401 || statusCode===403){
            Message.warning({message:"请先登录"});
            redirect("/user/login")
        }
        console.log(err.response);
        if(statusCode === 400){
            Message.warning({message})
        }
    })
}

