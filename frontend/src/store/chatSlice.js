import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    receiver : '',
    chatId : '',
    propertyId : ''
}

export const chatSlice = createSlice({
    name : 'chats',
    initialState,
    reducers : {
        setChat : (state,action) =>{
            const {receiver,chatId,propertyId} = action.payload;
            state.receiver = receiver
            state.chatId = chatId 
            state.propertyId = propertyId
        },
        resetChat: (state,action) =>{
            state.receiver = ''
            state.chatId = '' 
            state.propertyId = ''
        },
    },
});

export const{setChat,resetChat} = chatSlice.actions;
export default chatSlice.reducer;