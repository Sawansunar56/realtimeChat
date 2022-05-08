import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({name: "", email: "",  password:"", cpassword: ""})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;

    // handles the to and fro of data with the backend
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    const json = await response.json()
    
    console.log(json)

    if(json.success) {
      // This is for the storage of the web token inside the local storage And navigate for the redirect
      localStorage.setItem('token', json.authToken);
      navigate('/')
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className='py-14 px-28 bg-indigo-400 shadow-xl shadow-indigo-400/50 absolute left-[32rem] top-32 rounded-lg'>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <div className='flex flex-col m-2'>
            <label htmlFor="" className='text-white mb-1'>Name</label>
            <input className='rounded-md focus:outline-none pl-2 py-1' value={credentials.name} onChange={onChange} name="name" id="name" type="text" />
          </div>
          <div className='flex flex-col m-2'>
            <label htmlFor="" className='text-white mb-1'>Email Address</label>
            <input className='rounded-md focus:outline-none pl-2 py-1' value={credentials.email} onChange={onChange} name="email" id="email" type="email" />
          </div>
          <div className='flex flex-col m-2'>
            <label htmlFor="" className='text-white mb-1'>Password</label>
            <input className="rounded-md focus:outline-none pl-2 py-1 " value={credentials.password} onChange={onChange} name="password" id="password" type="password" />
          </div>
          <div className='flex flex-col m-2'>
            <label htmlFor="" className='text-white mb-1'>Confirm Password</label>
            <input className="rounded-md focus:outline-none pl-2 py-1 " value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" type="password" />
          </div>
          <button className='self-center btn' type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup