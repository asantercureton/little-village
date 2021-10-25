import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <h1>Welcome to Little Village!</h1>
        </Link>
      </div>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;