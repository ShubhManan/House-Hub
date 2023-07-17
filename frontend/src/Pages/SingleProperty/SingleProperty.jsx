import { useEffect, useState } from "react";
import styles from './SingleProperty.module.css'
import {fetchChatId, getPropById, rentProp} from '../../api/internal'
import {useNavigate, useParams} from 'react-router-dom'
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux'
import { setChat } from "../../store/chatSlice";

function SingleProperty(){
  const dispatch = useDispatch();
    const [property,setProperty] = useState([]);
    const [owner,setOwner] = useState([]);
    const params = useParams();
    const propId = params.id;
    const rentedBy = useSelector(state => state.user._id);
    const navigate = useNavigate();

    useEffect(()=>{
        async function getProp(){
            const propResponse = await getPropById(propId);
            if(propResponse.status === 200)
            {
                setProperty(propResponse.data.prop);
                setOwner(propResponse.data.prop.owner);
            }
        }
        getProp();
    },[]);
    const handleRent = async()=>{
        const data = {
            propId,
            owner,
            rentedBy
        }
        let response = await rentProp(data);
        // console.group(response);
        if(response.status === 200)
        {
            navigate('/tenant');
        }
    };
    const createChat = async ()=>{
      // let chatid2 = '';
      // if(rentedBy !== owner._id)
      // {
      //       const data ={
      //         owner1 : owner._id,
      //         sender : rentedBy
      //       }
      //       const chatIdResponse = await fetchChatId(data);
      //       chatid2 = (chatIdResponse.data)[0]._id; 
      // }
      //   const chat = {
      //     receiver : owner._id,
      //     chatId : chatid2,
      //     propertyId : propId
      //   }
      //   console.log(chat);
      //   dispatch(setChat(chat));
        navigate(`/chat/${propId}`);
    }
    return (
        <div className={styles.detailsWrapper}>
        <div className={styles.left}>
          <h1 className={styles.title}>Property Owner : {owner.name}</h1>
          <div className={styles.meta}>
            {/* <p>
              @
              {property.authorUsername +
                " on " +
                new Date(property.createdAt).toDateString()}
            </p> */}
          </div>
          <div className={styles.photo}>
            <img src={property.photo} width={250} height={250} />
          </div>
          <p className={styles.content}>{property.rent}</p>
          <p className={styles.content}>{property.rent}</p>
          <p className={styles.content}>{property.rent}</p>
          {(
            <div className={styles.controls}>
              <button
                className={styles.editButton}
                onClick={handleRent}
              >
                Rent this
              </button>
              {/* <button className={styles.deleteButton} onClick={()=>{}}>
                Delete
              </button> */}
            </div>
          )}
        </div>
        <div className={styles.right}>
          <div className={styles.commentsWrapper}>
            {/* <CommentList comments={()=>{}} /> */}
            {/* <h1>History</h1> */}
            <div className={styles.postComment}>
              {/* <input
                className={styles.input}
                placeholder="comment goes here..."
                value={()=>{}}
                onChange={()=>{}}
              />               */}
              <button
                className={styles.postCommentButton}
                onClick={createChat}>Chat</button>
            </div>
          </div>
        </div>
      </div>
    );
}
export default SingleProperty;