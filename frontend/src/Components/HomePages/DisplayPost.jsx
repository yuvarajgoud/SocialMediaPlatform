import { useEffect, useState } from "react";
import './DisplayPost.css';
import Post from "./Post";

export default function DisplayPost({posts}) {
  return (
    <div >
      {posts.map((post, index) => (
        <Post key={post._id} 
          userId = {post.userId}
          postId = {post._id}
          username={post.username} 
          title={post.title} 
          content={post.content}  
          likes = {post.likes}
          imageUrl = {post.imageUrl}
          flag = {false}/>
      ))}
    </div>
  );
}

