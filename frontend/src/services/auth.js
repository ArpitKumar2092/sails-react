import http from '../utility/http'
import * as authToken from '../utility/authTokenHandler';
import * as notification  from "../utility/notification";

export async function Login( data ){
    authToken.clear();
    const { status , message } = await http.post({
        url:'/account/login',
        data
    });

    if(status === 1){
        authToken.set(message.token);
        authToken.setUserID(message.userID)
        notification.Success('Logged In Succesfully');
    }
    return status;
}

export async function SignUp( data ){
    const response = await http.post({
        url:'/user',
        data
    });
    return response;
}