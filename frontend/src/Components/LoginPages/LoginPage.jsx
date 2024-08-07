import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useState ,useContext} from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './styles.css'

const preventRefresh = (e) => {
	e.preventDefault();
};

export default function Login() {

	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
		const [errormsg,setErrormsg] = useState('')
    const { auth ,setAuth} = useContext(AuthContext);

   async function login (ev){
			ev.preventDefault();
      const res = await fetch('http://localhost:3000/api/auth/login',{
        method:'POST',
        body : JSON.stringify({username,password}),
        headers : {'Content-Type':'application/json'},
      })
      res.json().then( res =>{
        console.log(res)
        if(res.success){
          setAuth({ token : res.token, isAuthenticated: true });
					console.log(auth)
          localStorage.setItem('token',res.token);
        } else {
          setErrormsg("Invalid Credentials")
        }
      })
    }

		if(auth.isAuthenticated){
			return (
				<Navigate to={'/protected/home'}/>
			)
		}
	return (
		<>
		<h1 className='heading'>Connectify</h1>
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
				<h2 align="center" className="or">
            OR
        </h2>
				<p>
					Don't have an account ? <Link to="/signup"> Sign Up </Link>
				</p>
			</div>
		</div>
		</>
	);
}
