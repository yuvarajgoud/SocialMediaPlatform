import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function SignupPage() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errormsg,setErrorMsg] = useState('');

  const signup = async(ev)=>{
    ev.preventDefault(); 
     fetch('http://localhost:3000/api/auth/signup',{
      method : 'POST',
      body : JSON.stringify({username,email,password}),
      headers : {'Content-Type':'application/json'},
    }).then(async res => await res.json()).
    then( res => {
      if(res.success){
        setErrorMsg('Signup Succesful. Please Login')
      } else {
        setErrorMsg(res.message)
      }
    })
  }

  return (
    <div className="wrapper signUp">
      <div className="illustration">
        <img src="https://thumbs.dreamstime.com/b/happy-person-looking-smartphone-hand-reading-message-surfing-internet-smiling-man-holding-mobile-phone-scrolling-social-287236446.jpg" alt="illustration" />
      </div>
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <p style={{color:"red",fontWeight:"bold"}}>{errormsg}</p>
        <form onSubmit={signup}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="name" placeholder="Enter username" 
                   value={username} 
                   onChange={ev => setUsername(ev.target.value)}/>
          </div>
          <div>
            <label htmlFor="name">E-Mail</label>
            <input type="text" id="email" placeholder="Enter your mail"
                   value={email} 
                   onChange={ev => setEmail(ev.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
              value={password} 
                   onChange={ev => setPassword(ev.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
          <h2 align="center" className="or">
            OR
          </h2>
        </form>
        <p>
          Have an account ? <Link to="/"> Login </Link>
        </p>
      </div>
    </div>
  );
}
