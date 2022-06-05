import './App.css';
import Chatroom from './components/Chatroom';
import Login from './components/Login';
import Signup from './components/Signup';
import ChatState from './components/context/chats/ChatState'
import {
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  
  return (
    <ChatState>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={ <Chatroom /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
          </Routes>
        </div>
    </ChatState>
  )
}

export default App
