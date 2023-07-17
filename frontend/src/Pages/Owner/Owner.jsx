import styles from './Owner.module.css'
import TextInput from '../../components/TextInput/TextInput'
import { useState } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { submitProp } from '../../api/internal';
function Owner(){
    const navigate = useNavigate();
    const [photo,setPhoto] = useState('');
    const [rent,setRent] = useState('');
    const owner = useSelector(state =>state.user._id);
    const getPhoto = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setPhoto(reader.result);
        }
    }
    const submitHandler = async () => {
        const data = {
            owner , rent , photo
        }
        const response = await submitProp(data);
        console.log(response);
        if(response.status = 201)
        {
            navigate('/tenant');
        }
        else
        {
            console.log(response);
        }
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>Post a new property over here</div>
            <TextInput
            type="text"
            name="rent"
            placeholder="rent per month"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            style={{ width: "60%" }}
            />
            {/* <textarea
            className={styles.content}
            placeholder="your content goes here"
            maxLength={400}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            /> */}
            <div className={styles.photoPrompt}>
                <p>Choose a photo</p>
                <input
                type = "file"
                name="photo"
                id="photo"
                accept = "image/jpg, image/jpeg, image /png"
                onChange={getPhoto}
                />
            </div>
            <button className={styles.submit} onClick={submitHandler}>SUBMIT</button>
        </div>
    )
}
export default Owner;