import { useEffect, useState } from 'react';
import styles from './Chat.module.css'
import { useParams } from 'react-router-dom';
import { fetchChatId, getAllMessages, getPropById, sendNewMessage1 ,fetchChatByProp} from '../../api/internal';
import { useSelector } from 'react-redux';
import CommentList from '../../components/CommentList/CommentList';
import Loader from '../../components/Loader/Loader';
import io from 'socket.io-client'
const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
let socket;
socket = io(REACT_APP_INTERNAL_API_PATH);
function Chat (){
    const [newComment,setNewComment] = useState('');
    const [property,setProperty] = useState([]);
    const [owner,setOwner] = useState([]);
    const [chats,setChats]=useState([]);
    const [allchats,setallchats]=useState([]);
    const [fetchagain,setFetchagain] = useState(true);

    const sender = useSelector(state => state.user._id);
    const params = useParams();
    const propId = params.id;

    
    useEffect(()=>{
        async function getProp(){
            getPropById(propId).then((propResponse) => {
                setProperty(propResponse.data.prop);
                setOwner(propResponse.data.prop.owner); 
                const data ={
                    prop : propResponse.data.prop._id
                }
                fetchChatId(data).then((chatResponse)=>{
                        setChats((chatResponse.data[0])._id);
                        const data = {
                            chat : (chatResponse.data[0])._id
                        }
                        getAllMessages(data).then((allchatresponse)=>{
                            setallchats(allchatresponse.data);
                        })
                    })            
                });
            }
            getProp();
            // setallchats([]);
            // setChats([]);
            // setOwner([]);
            // setProperty([]);
        },[]);
    useEffect(()=>{
        socket.emit("join chat",propId);
        socket.on("message received",(data)=>newMessagereceived(data));

    })
    const newMessagereceived = (data)=>{
        if(sender !== data.sender)
        {
            setallchats([...allchats,data.msg]);
            setFetchagain(!fetchagain);
        }
    }
    useEffect(()=>{
        const data = {
            chat : chats
        }
        getAllMessages(data).then((allchatresponse)=>{
            setallchats(allchatresponse.data);
        })
    },[fetchagain])

    const sendMessage = async ()=>{
        const data = {
            chat : chats,
            sender,
            receiver : owner._id,
            content : newComment
        }
        setNewComment('')
        sendNewMessage1(data).then((newMessage)=>{
            setallchats([...allchats,data.content]);
            const data2 = {
                prop : propId,
                msg : data.content ,
                sender,           
            }
            socket.emit("new message sent",data2);
            setFetchagain(!fetchagain);
        });
    }
    return (
        <div className={styles.right}>
          <div className={styles.commentsWrapper}>
            {/* {allchats.length} */}
            <CommentList comments = {allchats} />

            <div className={styles.postComment}>
              <input
                className={styles.input}
                placeholder="comment goes here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />              
              <button
                className={styles.postCommentButton}
                onClick={sendMessage}>post</button>
            </div>
          </div>
        </div>
    )
}
export default Chat;