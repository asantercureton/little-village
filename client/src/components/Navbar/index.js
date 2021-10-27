import React from 'react';
import { Link } from 'react-router-dom';
import '../../../src/index.css'

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
          {Auth.getProfile().data.username}'s profile
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
       
    </nav>
  )
}

export default Navbar