import axios from 'axios';
import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config';
import { getAccessToken,getType } from '../utils/common-utils';


const API_URL="";
const axiosInstance=axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
});

axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
            config.params=config.TYPE.params;
        }else if (config.TYPE.query){
            config.url=config.url+'/'+config.TYPE.query;
        }
        return config;
    },
    function(error){
        console.log('request error:',error)
        return Promise.reject(error);
    }

);

axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function(error){
        //stop global loader here
        console.log('response error:',error.response?error.response :  error.message)
        return Promise.reject(processError(error));
    }
)


const processResponse=(response)=>{
    if (response?.status===200){
        return{isSuccess:true,data:response.data}
    }else{
        return{
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
    }
}

    
const processError=(error)=>{
    if(error.response){
        console.log('error in response',error.toJSON())
        return{

            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailures,
            code:error.response.status

        };

    }else if (error.request){
        console.log('error in request',error.toJSON())
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:""
        };

    }else{

        console.log('error in network',error.toJSON())
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        };



    }
};


const API={};

for (const [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body, isMultipart = false)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data:value.method=='DELETE' ?{}:body,
            responseType:value.responseType,
            headers: {
                authorization:getAccessToken(),
                "Accept": "application/json, multipart/form-data", 
                "Content-Type": isMultipart ? "multipart/form-data" : "application/json"
                // "Content-Type":"multipart/form-data"
        },
        timeout: 30000,
        TYPE: getType(value,body),
            
        });
    }

export {API};
