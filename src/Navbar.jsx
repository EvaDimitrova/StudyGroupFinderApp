// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home  </Link>
      <Link to="/info">Group Information </Link>
      <Link to ="/login" > Login</Link>
      <Link to ="/createGroup"> Create Group</Link>

    </nav>
  );
};

export default Navbar;