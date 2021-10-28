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
          {Auth.getProfile().data.username}'s Village
        </Link>
     
      <Link to="/leaderboard" >
          Leaderboard
        </Link>
     
      <Link to="/tradeboard" >
          Tradeboard
        </Link>

      <Link to="/tradeform" >
          Create Trade
        </Link>

      <Link to="/stats" >
          Stats
        </Link>
      
      <button onClick={logout}>
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
          Signup
        </Link>
   
    <Link to="/leaderboard" >
          Leaderboard
        </Link>
    
    <Link to="/stats" >
          Stats
    </Link>
       
    </nav>
  )
}

export default Navbar