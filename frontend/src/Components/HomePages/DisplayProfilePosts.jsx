import { useEffect, useState } from "react"
import axios from "axios";
import Post from "./Post";

export default function DisplayProfilePosts({posts,deletePost,editPost}){
  return(
    <>
    {posts.length === 0 ? (<h1>No Posts to Show</h1>) : (
    <div className="display-post-container">
      {posts.map((post, index) => (
        <Post key={post._id}
          postId = {post._id} 
          username={post.username} 
          title={post.title} 
          content={post.content}  
          likes = {post.likes}
          imageUrl = {post.imageUrl}
          flag = {true}
          deletePost = {deletePost}
          editPost = {editPost}/>
      ))}
    </div>)}
    </>
  )
}