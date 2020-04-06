import axios from "axios";
import * as notification from "./notification";
import * as authToken from "./authTokenHandler";
import { baseURL } from '../config';

// const  baseUrl  = 'https://localhost:1337';

axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(function (config) {
    const userID = authToken.getUserID()
    config.headers.common['Authorization'] = authToken.get();
    if(config.data && userID){
        const { data } = config;
        data.createdBy = userID;
        return ({ ...config , data}); 
    }

    return config;

  }, function (error) {
    return Promise.reject(error);
  });
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const get = async ({ url }) => {
    try{
        const { data } = await axios({ method:'get' , url});
        return data;
    }catch( exception ){
        handleFail(exception);
        return { status : 0 , message : exception };
    }finally{}  
}

const post = async ( config ) => { 
    try{
        const { data } = await axios({method: 'post', ...config } );
            return { status : 1 , message : data };
    }catch( exception ){
        handleFail(exception);
        return { status : 0 , message : exception };
    }finally{}  
}

const put = async ( config ) => { 
    try{
        const { data } = await axios({method: 'put', ...config } );
            return { status : 1 , message : data };
    }catch( exception ){
        handleFail(exception);
        return { status : 0 , message : exception };
    }finally{}  
}

const deleteMethod = async ( config ) => { 
    try{
        const { data } = await axios({method: 'delete', ...config } );
            return { status : 1 , message : data };
    }catch( exception ){
        handleFail(exception);
        return { status : 0 , message : exception };
    }finally{}  
}


const handleFail = ( exception ) => {
    try{
    const { data } = exception.response;
        console.log(data.message);
        console.error(exception.response);
        if(exception.response.status === 404){
            notification.Error('Unable to contact server. Please check console for more details');
        }else{
            notification.Error(data.message);
        }
    }catch(e){
        notification.Error('Unable to contact server. Please check console for more details');
        console.log(e);
    }   
}

export default { get , post , put , deleteMethod};