
const authTokenName = 'token';
const { localStorage } = window;

const set =  token  => {
    const newToken = token.replace('JWT' , 'Bearer'); 
    localStorage.setItem(authTokenName, newToken);
}

const get = () => {
    const token =  localStorage.getItem(authTokenName)
    if(token){
        return token;
    }else{
        return '';
    }
}

const setUserID = ( ID ) => {
    localStorage.setItem('userID', ID);
}
const getUserID = () => {
    return localStorage.getItem('userID');
}

const clear = () => {
    localStorage.clear();
}

export { set , get , clear , setUserID , getUserID}