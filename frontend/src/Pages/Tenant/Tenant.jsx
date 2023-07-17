import { useState, useEffect } from "react";
import {getAllProperties} from '../../api/internal'
import styles from './Tenant.module.css'
import { useNavigate } from "react-router-dom";
function Tenant(){
    const navigate = useNavigate();
    const [properties,setProperties] = useState([]);
    useEffect(()=>{
          const initialState = {
            receiver : '',
            chatId : '',
            propertyId : ''
        }
    
        async function getAllPropertiesCall(){
            const response = await getAllProperties();
            if(response.status===200)
            {
                console.log(response);
                setProperties(response.data);
            }
        }
        getAllPropertiesCall();
        setProperties([]);
    },[])
    // console.log(properties);

    return (
        <div>
            {properties.map((property) => (
        <div
          id={property._id}
          className={styles.blog}
          onClick={()=> navigate(`/property/${property._id}`)}
         
        >
          <h1>{property.title}</h1>
          <img src={property.photo} />
          <p>{property.rent}</p>
        </div>
      ))}
        </div>
    );
}
export default Tenant;