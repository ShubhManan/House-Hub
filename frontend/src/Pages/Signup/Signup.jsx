import signupSchema from "../../schemas/singupSchema";
import TextInput from '../../components/TextInput/TextInput'
import styles from './Signup.module.css'
import { useState } from "react";
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signup} from '../../api/internal'
import { setUser } from "../../store/userSlice";
function Signup(){
    const [error,setError] = useState([]);
    const dispatch = useDispatch();
    const navigate  = useNavigate();

    const handleSignup = async()=>{
        const data = {
            name : values.name,
            email : values.email,
            phoneNumber : values.phonenumber,
            password : values.password,
            confirmPassword : values.confirmPassword
        }; 
        const response = await signup(data);
        console.log(response);
        if(response.status === 201)
        {
            const user = {
                _id : response.data.user._id,
                email : response.data.user.email,
                name: response.data.name,
                phonenumber : response.data.phonenumber,
                auth : response.data.auth,
            }
            dispatch(setUser(user));
            navigate('/tenant')
        }
        else 
        {
            setError(response.response.data.message);
        }
    }
    const {values,touched,handleBlur,handleChange,errors} = useFormik({
        initialValues :{
            name : '',
            email : '',
            phonenumber :'',
            password :'',
            confirmPassword : ''
        },
        validationSchema : signupSchema,
    });
    return(
        <div className={styles.signupWrapper}>
        <div className={styles.signupHeader}>Create an account</div>
        <TextInput
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="name"
          error={errors.name && touched.name ? 1 : undefined}
          errormessage={errors.name}
        />
  
        <TextInput
          type="text"
          name="phonenumber"
          value={values.phonenumber}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="phonenumber"
          error={errors.phonenumber && touched.phonenumber ? 1 : undefined}
          errormessage={errors.phonenumber}
        />
  
        <TextInput
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="email"
          error={errors.email && touched.email ? 1 : undefined}
          errormessage={errors.email}
        />
  
        <TextInput
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="password"
          error={errors.password && touched.password ? 1 : undefined}
          errormessage={errors.password}
        />
  
        <TextInput
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="confirm password"
          error={
            errors.confirmPassword && touched.confirmPassword ? 1 : undefined
          }
          errormessage={errors.confirmPassword}
        />
  
        <button
          className={styles.signupButton}
          onClick={handleSignup}
        >
          Sign Up
        </button>
  
        <span>
          Already have an account?{" "}
          <button className={styles.login} onClick={() => navigate("/login")}>
            Log In
          </button>
        </span>
  
        {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
      </div>
    );
}
export default Signup;