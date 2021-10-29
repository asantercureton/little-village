import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (Auth.loggedIn()) {
    return (
      <nav className ="header nav"> 
      <Link to="/me" >
          My Village
        </Link>
     
      <Link to="/leaderboard" >
          Leaderboard
        </Link>
     
      <Link to="/tradeboard" >
          Tradeboard
        </Link>

      <button className="btn manage-btn" onClick={logout}>
          Logout
        </button>   
      </nav>
    );
  }
  // If logged out show login controls
  return (
    <nav className ="header nav ">
    <Link to="/login" >
          Login
        </Link>
    
    <Link to="/signup" >
          Sign Up
        </Link>
   
    <Link to="/leaderboard" >
          Leaderboard
        </Link>

    </nav>
  )
}

export default Navbar