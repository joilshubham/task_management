import {API} from '../../backend';

export const signup = user => {
    return fetch (`${API}user/`, {
        method : "POST",
        headers : {
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
};

export const signin = user =>{
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}user/login`,{
        method: "POST",
        body: formData
    })
    .then(response =>{
        return response.json();
    })
    .catch((err) => console.log(err));
};


export const authenticate = (data, next) => {
    if (typeof window !== undefined){
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
};


export const isAuthenticated = () => {
    if (typeof window == undefined){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false;
    }
};


export const signout = next =>{
    const userID = isAuthenticated() && isAuthenticated().user.id

    if (typeof window !== undefined){
        localStorage.removeItem('jwt')

        return fetch(`${API}user/logout/${userID}`,{
            method:'GET'
        })
        .then(response => {
            console.log('Signout success')
            next();
        })
        .catch((err) => {console.log(err)});
    }
};

export const addTaskFunc = (task, id) =>{
    const formData = new FormData()

    for(const name in task){
        formData.append(name, task[name])
    }
    console.log(task)
    return fetch(`${API}tracker/add_task/${id}`,{
        method: "POST",
        body: formData
    })
    .then(response =>{
        return response.json();
    })
    .catch((err) => console.log(err));
};