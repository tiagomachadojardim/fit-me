import React from 'react';
import './Header.scss'; 
import { Link } from 'react-router-dom';

interface HeaderProps {
  pageTitle: string;
}


const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/"> <img className="logo" src={require("../img/Logo.png")} alt="logo"/></Link>
     
        <h1>{pageTitle}</h1>
       
      </div>
      
    </header>
  );
};

export default Header;
