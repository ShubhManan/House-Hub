import {configureStore} from "@reduxjs/toolkit"
import user from './userSlice'
import chat from './chatSlice'

const store = configureStore({
    reducer : {user,chat}
});
export default store;