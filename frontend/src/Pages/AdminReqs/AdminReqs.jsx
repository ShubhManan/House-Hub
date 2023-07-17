import { useState, useEffect } from "react";
import {acceptProp, getAllPropertyReqs, rejectReq} from '../../api/internal'
import styles from './AdminReqs.module.css'
import { useNavigate } from "react-router-dom";
function AdminReqs(){
    const navigate = useNavigate();
    const [properties,setProperties] = useState([]);
    useEffect(()=>{
        async function getAllPropertiesCall(){
            const response = await getAllPropertyReqs();
            if(response.status===200)
            {
              setProperties(response.data);
            }
        }
        getAllPropertiesCall();
        setProperties([]);
    },[])
    const handleAccept = (data)=>{
      acceptProp(data);
      window.location.reload();
    }
    const handleReject = (data) =>{
      rejectReq(data);
      window.location.reload();
    }

    return (
        <div>
            {properties.map((property) => (
        <div
          id={property._id}
          className={styles.blog}     
        >
          <h1>{property.title}</h1>
          <img src={property.photo} />
          <p>{property.rent}</p>
          <button
          className={styles.acceptButton}
          onClick={()=>handleAccept(property._id)}
        >
          Accept
        </button>
        <button
          className={styles.rejectButton}
          onClick={()=>handleReject(property._id)}
        >
          Reject
        </button>
        </div>
      ))}
        </div>
    );
}
export default AdminReqs;