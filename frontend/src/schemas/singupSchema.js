import * as yup from 'yup'


        const signupSchema = yup.object().shape({
            email : yup.string().email().required('email is required'),
            uname : yup.string().min(3).max(30).required(''),
            password : yup.string().min(3).max(10).required(),
            confirmPassword : yup.string().oneOf([yup.ref('password')]),
            phoneNumber : yup.string().matches('/^[6-9]\d{9}$/').required('phone number is required')
        })
export default signupSchema;