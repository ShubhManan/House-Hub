import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../store/userSlice";
function useAutoLogin(){
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(()=>{
        (async function autoLoginCall(){
            try{
                const response = await axios.get(
                    `${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,
                    {
                        withCredentials : true,
                    }
                );
                if(response.status === 200)
                {
                    const user = {
                        _id : response.data.user._id,
                        email : response.data.user.email,
                        name : response.data.user.name,
                        auth: response.data.auth,
                        phoneNumber : response.data.phoneNumber,
                        isAdmin : response.data.user.admin
                    };
                    dispatch(setUser(user));
                }
            }
            catch(error)
            {
                ;
            }
            finally{
                setLoading(false);
            }
        })();
    },[]);
    return loading;
}

export default useAutoLogin;