import ChatContext from "./ChatContext";
import { useState } from 'react';

const ChatState = (props) => {
  const [ username, setUsername ] = useState("Anonymous");

  return (
    <ChatContext.Provider value={{ username, setUsername }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatState;