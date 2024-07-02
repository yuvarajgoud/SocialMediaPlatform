import React, { useEffect ,useState} from 'react';
import './Comment.css';
import axios from 'axios';

const Comment = ({postId}) => {
  const [comments,setComments] = useState([]);
  const [newComment,setNewComment] = useState("");
  const [user,setUser] = useState({})
  useEffect(()=>{
    async function fetchUser(){
      const res = await axios.post("http://localhost:3000/api/auth/checkLogin",{
        token:localStorage.getItem('token')
      });
      const user = res.data.userDoc;
      setUser({...user,username:user.username,userId:user.userId});
    }
    async function fetchComments(){
        const res = await axios.get(`http://localhost:3000/api/posts/${postId}/comments/`);
        console.log(res.data);
        setComments(res.data);
    }
    fetchComments();
    fetchUser();
  },[])
  async function handlePost(){
    const res1 = await axios.post(`http://localhost:3000/api/posts/${postId}/comments/`,{
      content : newComment,
      userId : user.userId,
      username : user.username,
      postId
    })
    setComments(res1.data);
    console.log(comments)
    setNewComment("");
  }
  async function handleDelete(commentId){
    const res = await axios.delete(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`)
    setComments(res.data);
  }
  return (
    <div className="comments-container">
      {comments.map((comment) => (
        <div key={comment._id} className='cont'>
          <div className="comment">
            <div className="comment-user">{comment.username}</div>
            <div className="comment-text">{comment.content}</div>
          </div>
          {comment.userId === user.userId ? (
            <button className="delete-button" onClick={() => handleDelete(comment._id)}>
            ❌
          </button>
          ) : (<div></div>)}
        </div>
      ))}
      <div className="new-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="input-comment"
        />
        <button onClick={handlePost} className="post-button">
          post
        </button>
      </div>
    </div>
  );
};

export default Comment;