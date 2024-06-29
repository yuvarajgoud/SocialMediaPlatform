
import { Navigate } from 'react-router-dom';
import './Create.css'

import { useState } from 'react';
import Navbar from './Navbar';

export default function Create(){

  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [image,setImage] = useState(null)
  const [redirect,setRedirect] = useState('')
  async function createNewPost(ev){
    ev.preventDefault();
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('title',title)
    formData.append('content',content)
    formData.append('image',image)
    const res = await fetch('http://localhost:3000/api/posts',{
        method:'POST',
        body : formData,
        headers: {
          'authorization': `Bearer ${token}`
        },
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
      <Navigate to={'/protected/home'} />
    )
  }
  return (
    <>
      <div className='main-container'>
        <Navbar/>
      </div>
      <div>
        <div className="create-post-container">
          <form className="create-post-form" onSubmit={createNewPost}>
            <h2>Create New Post</h2>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="caption">Content</label>
              <textarea
                id="caption"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="file"
                id="imageUrl"
                name='image'
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <button type="submit" className="create-post-button">Create New Post</button>
          </form>
        </div>
      </div>
    </>
  )
}