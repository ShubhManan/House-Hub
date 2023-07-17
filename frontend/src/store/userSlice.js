import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    _id : '',
    email : '',
    name : '',
    phoneNumber : '',
    isAdmin : false,
    auth : false
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser : (state,action) =>{
            const {_id,email,name,phoneNumber,auth,isAdmin} = action.payload;
            state._id = _id
            state.email = email
            state.name = name
            state.phoneNumber = phoneNumber
            state.auth = auth
            state.isAdmin = isAdmin
        },
        resetUser: (state,action) =>{
            state._id = ''
            state.email = ''
            state.name = ''
            state.phoneNumber = ''
            state.isAdmin = false
            state.auth = false
        },
    },
});

export const{setUser,resetUser} = userSlice.actions;
export default userSlice.reducer;