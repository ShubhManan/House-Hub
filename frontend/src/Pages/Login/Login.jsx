import TextInput from '../../components/TextInput/TextInput'
import {useFormik} from 'formik'
import styles from './Login.module.css'
import loginSchema from '../../schemas/loginSchema'
import {useDispatch} from 'react-redux'
import {setUser} from '../../store/userSlice'
import {login} from '../../api/internal'
import {useNavigate} from 'react-router-dom'

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async() =>{
        const data = {
            email : values.username,
            password : values.password
        }
        const response = await(login(data));
        if(response.status === 200)
        {
            const user = {
                _id :response.data.user._id,
                email :response.data.user.email,
                name :response.data.user.name,
                phoneNumber :response.data.user.phoneNumber,
                isAdmin : response.data.user.admin,
                auth : response.data.auth
            }
            console.log(user);
            dispatch(setUser(user));     
            navigate('/tenant');       
        }
    }
    const {values,touched,handleBlur,handleChange,errors}=useFormik({
        initialValues : {
            email : '',
            password : ''
        },
        validationSchema : loginSchema
    });
    return(
        <div className={styles.loginWrapper}>
            <div className={styles.loginHeader}>Login in to your account</div>
            <TextInput
            type="text"
            value={values.username}
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder='username'
            error={errors.username && touched.username ? 1 : undefined}
            errormessage ={errors.username}
            />
            <TextInput
            type="password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange = {handleChange}
            placeholder="password"
            error={errors.password && touched.password ? 1 : undefined}
            errormessage ={errors.password}
            />
            <button className={styles.logInButton} onClick={handleLogin}>Login</button>
            <span>Dont have an account ? <button className={styles.createAccount} onClick={()=>navigate('/signup')}>Register</button></span>
            {/* {error !== ''?<p className='styles.errormessage'>{error}</p>:''} */}
        </div>
    )
}
export default Login;