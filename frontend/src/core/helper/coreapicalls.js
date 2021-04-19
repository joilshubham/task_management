import {API} from '../../backend'

export const getProjects = (id) =>{
    return fetch(`${API}tracker/project/${id}`, {method:'GET'})
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getTimeEntry = (id) =>{
    return fetch(`${API}tracker/time_entry/${id}`, {method:'GET'})
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}