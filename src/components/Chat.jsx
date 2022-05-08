import React from 'react'

const Chat = (props) => {
  const { text, user } = props;
  const data = '9:12 AM'
  return (
    <div className='chatbox-left flex flex-col'>
      <div className='text-xs text-yellow-300'>
        {user}
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