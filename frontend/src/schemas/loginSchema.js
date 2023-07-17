import * as yup from 'yup'

const loginSchema = yup.object().shape({
    username : yup.string().email().required('email is required'),
    password : yup.string().min(3).max(10).required()
});

export default loginSchema;