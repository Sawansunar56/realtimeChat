import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';
import ChatContext from './context/chats/ChatContext';


// domain of the backend server for socket
const socket = io('http://localhost:5000');

const Chatroom = (props) => {
  let navigate = useNavigate();

  const context = useContext(ChatContext);
  const { username, setUsername } = context;

  // Dummy Data
  const [ chatList, setChatList ] = useState([]);
  const [ chat, setChat ] = useState();

  // handles the messaging part
  useEffect(() => {
    setUsername(localStorage.getItem('username'))
    socket.emit('new-user-joined', username)
    socket.on('receive', ({message, name})=> {

      // prevState is required so that we don't get delayed state
      setChatList((prevState) => ([...prevState, [message, name]]))
      console.log(message);
      const json = JSON.stringify([message, name]);
      socket.emit('receive-save', json)
    })

    // This the code that eliminates the problem of two items appearing with a single input.
    // Currently I don't know why this is but this makes it all work.
    return () => {
      // on unmount remove the socket listeners.
      socket.removeAllListeners(); 
    }
  }, []);

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate("/login");
    }
  }, [])
  

  // On Submit the function sends the message to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    // socket.emit('new-user-joined', 'Sawan');
    setChatList([...chatList, [chat.chat, "ME"]])
    console.log(chat);
    const json = JSON.stringify([chat.chat, "Me"]);
    socket.emit('chat-send', json);
  }

  // basic handleChange function so that input works.
  const handleChange = (e) => {
    setChat({...chat, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div className='absolute flex flex-col top-20 w-full'>

        {chatList.map((chat) => {
          return <Chat text={chat[0]} username={chat[1]} />
        })}
      <h1>{username}</h1> 
      </div>
  

        <form className='m-2 fixed bottom-2 left-4 flex' onSubmit={handleSubmit}>
          <input className='mr-2 self-stretch bg-gray-100 focus:outline-none pl-4 rounded-xl border-2 border-gray-600 h-10 placeholder:text-gray-700' type="text" name="chat" onChange={handleChange} placeholder="Type Something" />
          <button className='text-emerald-100 active:bg-emerald-700 bg-sawan-400 shadow-xl shadow-sawan-500/50 py-1 px-2 rounded-xl' type='submit'>Submit</button>
        </form>
      
    </>
  )
}

export default Chatroom