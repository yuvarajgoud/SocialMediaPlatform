
import { Navigate } from 'react-router-dom';
import '../../Styles/styles.css'

import { useState } from 'react';

export default function Create(){

  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [redirect,setRedirect] = useState('')
  
  async function createNewPost(ev){
    ev.preventDefault();
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3000/api/posts',{
        method:'POST',
        body : JSON.stringify({title,content,token}),
        headers : {'Content-Type':'application/json'},
      })
      res.json().then( res =>{
        console.log(res)
        if(res.newPost){
          setRedirect(true)
          alert("Post Created")
        } else {
          alert("Post Not created")
        }
      })
  }
  if(redirect){
    return(
      <Navigate to={'/home'} />
    )
  }
  return (
    <>
      <div className="wrapper signIn">
			<div className="form" >
				<div className="heading">Create New Post</div>
				<form onSubmit={createNewPost}>
					<div>
						<label htmlFor="title">Title</label>
						<input type="text" id="name" placeholder="Enter title" 
						       value={title} 
                   onChange={ev => setTitle(ev.target.value)}/>
					</div>
					<div>
						<label htmlFor="content">Content</label>
						<textarea type="text-area" id="password" placeholder="Enter content" 
						       value={content} 
                   onChange={ev => setContent(ev.target.value)} />
					</div>
					<button type="submit">
						Create Post
					</button>
				</form>
			</div>
		</div>
    </>
  )
}