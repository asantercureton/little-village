import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import image from '../../img/icon.jpg';

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <h1><img className="img" src={image} />  LITTLE VILLAGE</h1>
        </Link>
      </div>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;