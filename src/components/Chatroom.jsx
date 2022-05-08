import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';


// domain of the backend server for socket
const socket = io('http://localhost:5000');

const Chatroom = () => {
  let navigate = useNavigate();

  // Dummy Data
  const [ chatList, setChatList ] = useState([["Going", "ME"] , ["To ", "ME"], ["Space", "ME"]]);
  const [ chat, setChat ] = useState();

  // handles the messaging part
  useEffect(() => {
    socket.emit('new-user-joined', 'Sawan')
    socket.on('receive', ({message, name})=> {

      // prevState is required so that we don't get delayed state
      setChatList((prevState) => ([...prevState, [message, name]]))
      console.log(message);
    })

    // This the code that eliminates the problem of two items appearing with a single input.
    // Currently I don't know why this is but this makes it all work.
    return () => {
      // on unmount remove the socket listeners.
      socket.removeAllListeners(); 
    }
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem('token'))
    if(!localStorage.getItem('token')) {
      navigate("/login");
    }
  }, [])
  

  // On Submit the function sends the message to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    // socket.emit('new-user-joined', 'Sawan');
    setChatList([...chatList, [chat.chat, "ME"]])
    socket.emit('chat-send', chat.chat);
  }

  // basic handleChange function so that input works.
  const handleChange = (e) => {
    setChat({...chat, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div className='absolute flex flex-col top-20 w-full'>

        {chatList.map((chat) => {
          return <Chat text={chat[0]} user={chat[1]} />
        })}
      <div className='self-end chatbox-right'>
        Hello
      </div>
      </div>
  

        <form className='m-2 fixed bottom-2 left-4 flex' onSubmit={handleSubmit}>
          <input className='mr-2 self-stretch bg-slate-400 focus:outline-none pl-4 rounded-xl border-2 border-black h-10 placeholder:text-red-900' type="text" name="chat" onChange={handleChange} placeholder="Type Something" />
          <button className='text-emerald-100 active:bg-emerald-700 bg-emerald-600 shadow-xl shadow-emerald-600/50 py-1 px-2 rounded-xl' type='submit'>Submit</button>
        </form>
      
    </>
  )
}

export default Chatroom