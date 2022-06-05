import React from 'react'

const Chat = (props) => {
  const { text, username } = props;
  const data = '9:12 AM'
  return (
    <div className={`${username === 'ME' ? 'chatbox-left' : 'self-end chatbox-right'} flex flex-col`}>
      <div className='text-xs text-yellow-300'>
        {username}
      </div>
      <div className="text-md">
        {text}
      </div>
      <div className='text-xs self-end text-blue-50'>
        {data}
      </div>
    </div>
  )
}

export default Chat