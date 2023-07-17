import axios from 'axios'
const api =axios.create({
    baseURL : process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials : true,
    header:{
        "Content-Type" : "application/json",
    },
});

export const getAllProperties = async(data) =>{
    let response;
    try{
        response = await api.get('/property/all');
    }
    catch(error)
    {
        console.log(error);
    }
    return  response;
};

export const login = async (data) =>{
    let response ;
    try{
        response  = await api.post('/login',data);
    }
    catch(error)
    {
        return error;
    }
    return response;
}

export const signup = async (data) =>{
    let response;
    try{
        response = await api.post('/register',data);
    }
    catch(error)
    {
        return  error;
    }
    return response;
}

export const signout = async () =>{
    let response ;
     try{
        response = await api.post('/logout');
     }
     catch(error)
    {
        return error;
    }
    return response;
}

export const submitProp = async (data) => {
    let response;
    try{
        response = await api.post('/property',data);
    }
    catch(error)
    {
        console.log(error);
    }
    return response;
}

export const getAllPropertyReqs = async() => {
    let response;
    try{
        response = await api.get('/admin/requestproperty');
    }
    catch(error)
    {
        console.log(error);
    }
    return response;
}

export const acceptProp = async (data)=>{
    let response;
    try{
        response = await api.post(`/admin/requestproperty/accept/${data}`)
    }
    catch(error)
    {
        console.log(error);
    }
    return response;
}

export const rejectReq = async (data)=>{
    let response;
    try{
        response = await api.post(`/admin/requestproperty/reject/${data}`)
    }
    catch(error)
    {
        console.log(error);
    }
    return response;
}

export const getPropById = async(id) =>{
    let response;
    try{
        response = await api.get(`/property/${id}`);
    }
    catch(error)
    {
        return error;
    }
    return response;
}

export const rentProp = async(data)=>{
    let response;
    try{
        response = await api.post('/property/rent',data);
    }
    catch(error)
    {
        return error;
    }
    return response;
}

export const fetchChatId = async(data) =>{
    let response;

    try{        
        response = await api.post('/chats',data);
    }
    catch(error)
    {
        return error;
    }
    return response;
}

export const fetchChatByProp = async (data) =>{
    let response;
    const {prop} = data;
    try{
        response = await api.post('/chats/prop')
    }
    catch(error)
    {
        return response;
    }
    return response;
}

export const sendNewMessage1 = async(data) =>{
    console.log(data);
    let response;
    try{
        response = await api.post('/message',data);
    }
    catch(error)
    {
        return response;
    }
    return response;
}

export const getAllMessages = async(data) =>{
    let response;
    try{
        response = await api.post('/message/all',data);
    }
    catch(error)
    {
        return response;
    }
    return response;
}