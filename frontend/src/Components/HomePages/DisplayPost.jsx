import { useEffect, useState } from "react";
import './DisplayPost.css';
import Post from "./Post";

export default function DisplayPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await fetch('http://localhost:3000/api/posts');
      res = await res.json();
      console.log(res);

      if (res) {
        setPosts(res);
      } else {
        console.log("Posts Not fetched");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="display-posts">
      {posts.map((post) => (
        <Post 
          key={post._id} 
          username={post.username} 
          title={post.title} 
          content={post.content} 

        />
      ))}
    </div>
  );
}