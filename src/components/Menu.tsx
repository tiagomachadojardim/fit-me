import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Menu.scss'; 


interface MenuProps {
  pageTitle: string;
}

const Menu: React.FC<MenuProps> = ({ pageTitle }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [isRestaurantPage] = useState(window.location.pathname === '/Restaurant');


  

  const toggleLogin = () => {
    const newIsLoggedIn = !isLoggedIn;
    setIsLoggedIn(newIsLoggedIn);
    localStorage.setItem('isLoggedIn', String(newIsLoggedIn));
  };




  if (pageTitle !== "Home") {
    return null; 
  }

  return (
    <div className="menu">
      <div className="logo">
        <Link to={"/"}><img className="logo" src={require("../img/Logo.png")} alt="logo"/></Link>
        
      </div>
      <div className="search">
      
      <div className="search-container">
      
          <input type="text" placeholder="Enter item or restaurant you are looking for" className="search-input" />
          <img className="search-icon" src={require("../img/Vector.png")} alt="icon"/>
        </div>

        <Link to={isRestaurantPage ? "#" : "/Restaurant"}>
  <img
    className={`bag ${isRestaurantPage ? 'active' : ''}`}
    src={require("../img/Bag.png")}
    alt="bag"
    onClick={(e) => {
      if (isRestaurantPage) {
        e.preventDefault(); 
      }
    }}
  />
</Link>

        <Link to="/Login">
        <button onClick={toggleLogin} className={`login-button ${isLoggedIn ? 'sign-out' : ''}`}>
            {isLoggedIn ? 'Sign Out' : 'Sign In'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
