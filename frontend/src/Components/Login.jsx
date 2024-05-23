import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useState ,useContext} from 'react';
import { UserContext } from '../Context/UserContext';

const preventRefresh = (e) => {
	e.preventDefault();
};

export default function Login() {

	const [username,setUsername]  = useState('')
  const [password,setPassword] = useState('')
  const [errormsg,setErrorMsg] = useState(false)
  const {userInfo,setUserInfo} = useContext(UserContext)

  const login = async (ev)=>{
    ev.preventDefault();
		console.log("Inside Login")
    const res = await fetch('http://localhost:3000/api/auth/login',{
      method:'POST',
      body : JSON.stringify({username,password}),
      headers : {'Content-Type':'application/json'},
    })
		res.json().then( res =>{
			console.log(res)
			if(res.success){
				setErrorMsg("Login Successful");
				setUserInfo(res.userDoc)
				localStorage.setItem('jwttoken',res.token);
			} else {
				setErrorMsg("Invalid credentials");
			}
		})

  }

	if(userInfo){
		return (
			<Navigate to={'/home'}/>
		)
	}
	
	return (
		<div className="wrapper signIn">
			<div className="illustration">
				<img src="https://thumbs.dreamstime.com/b/happy-person-looking-smartphone-hand-reading-message-surfing-internet-smiling-man-holding-mobile-phone-scrolling-social-287236446.jpg" alt="illustration" />
			</div>
			<div className="form" >
				<div className="heading">LOGIN</div>
				<p style={{color:"red",fontWeight:"bold"}}>{errormsg}</p>
				<form onSubmit={login}>
					<div>
						<label htmlFor="name">Name</label>
						<input type="text" id="name" placeholder="Enter your name" 
						       value={username} 
                   onChange={ev => setUsername(ev.target.value)}/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" placeholder="Enter you Password" 
						       value={password} 
                   onChange={ev => setPassword(ev.target.value)} />
					</div>
					<button type="submit">
						Submit
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/signup"> Sign In </Link>
				</p>
			</div>
		</div>
	);
}
