import { useEffect } from 'react';
import Comment from '../Comment/Comment';
import Loader from '../Loader/Loader';
import styles from './CommentList.module.css'
function CommentList (comments){
        return (
          <div className={styles.commentListWrapper}>
                {/* <h1 style={{color : 'white'}}>{comments.comments.length}</h1> */}
            <div className={styles.commentList}>
              {comments.length === 0 ? (
                <div className={styles.noComments}>No comments posted</div>
                ) : (
                    comments.comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                        ))
                        )}
            </div>
          </div>

        );
}
export default CommentList