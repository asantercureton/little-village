import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Header = () => {
  return (
    <header style={{
      background: `linear-gradient(to right, transparent, rgb(46, 31, 15)),url(${process.env.PUBLIC_URL}/img/banner.jpg)`,
    }}>
      <div id="home-icon" className="col-12 col-lg-6">
        <Link to="/">
          <h1><img alt="iTest" className="img" src={`${process.env.PUBLIC_URL}/img/Itest.jpg`} />  LITTLE VILLAGE</h1>
        </Link>
      </div>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;