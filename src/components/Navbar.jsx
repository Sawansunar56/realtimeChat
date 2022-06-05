import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="shadow-xl shadow-slate-500/50 fixed w-screen z-10">
      <div className="text-white bg-sawan-500 py-5 flex justify-between">
        <h1 className="text-2xl pl-3">{location.pathname === "/" ? 'Chatroom' 
          : location.pathname === "/login" ? "Login" 
          : location.pathname === '/signup' ? "Sign Up" 
          : "Navbar"
          }
        </h1>
        {!localStorage.getItem('token') ?
          <div>
            <Link className="mx-2 btn" to="/login">Login</Link>
            <Link className="mx-2 btn" to="/signup">Sign Up</Link>
          </div>
          : <button className="mx-2 btn" onClick={handleLogOut}>Log Out</button>
        }
      </div>
    </div>
  )
}

export default Navbar