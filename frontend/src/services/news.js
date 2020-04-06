import http from '../utility/http'
import * as authToken from '../utility/authTokenHandler';
import * as notification  from "../utility/notification";

export async function getNews(id){
    let x = '';
    if(id){
        x = `/${id}`;
    }
    const data = await http.get({
        url:`/news${x}`
    });
    if(data.status === 0){
        alert('ss');
        return([]);
    }
    return data;
}

export async function UploadImage(picture , id){
    const formData = new FormData();
    formData.append("image", picture);
    const data = await http.post({
        url: id ? '/uploads/update/'+id : '/uploads/image',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    });
    return data.message.files[0];
}

export async function updateNews(data , id){
    const resData = await http.put({
        url:'/news/' + id,
        data,
    });
    return resData;
}
export async function addNews(data){
    const resData = await http.post({
        url:'/news',
        data,
    });
    return resData;
}

export async function deleteNews( id ){

    const resData = await http.deleteMethod({
        url:'/news/' + id,
    });

    return resData;
}
