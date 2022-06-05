import React, {useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatContext from './context/chats/ChatContext';

const Login = () => {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const context = useContext(ChatContext);
  const { setUsername } = context;

  // Use navigate is the new version of use History and is used to redirect to other links/ pages.
  let history = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    })
    const json = await response.json()
    
    console.log(json)
    if(json.success) {
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('username', json.username);
      setUsername(json.username);
      history("/")
      // props.showAlert("Logged in successfully", "success");
    } else {
      // props.showAlert("Email or Password is incorrect", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div className='p-10 bg-purple-800 shadow-xl shadow-purple-900 absolute left-[37rem] top-40 rounded-lg'>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <div className='flex flex-col m-2'>
            <label htmlFor="" className='text-white mb-1'>Email Address</label>
            <input className='rounded-md focus:outline-none pl-2 py-1' value={credentials.email} onChange={onChange} id="email" name="email" type="email" />
          </div>
          <div className='flex flex-col m-2'>
            <label htmlFor="" className='text-white mb-1'>Password</label>
            <input className="rounded-md focus:outline-none pl-2 py-1" value={credentials.password} onChange={onChange} id="password" name="password" type="password" />
          </div>
          <button className='self-center btn' type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Login