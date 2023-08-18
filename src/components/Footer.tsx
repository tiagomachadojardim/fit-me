import React from 'react';
import './Footer.scss';
const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
      <img className="logo-footer" src={require("../img/Logo-footer.png")} alt="logo-footer"/>
      <div className='footer-content-center'>
        <a href="/">About us</a>
        <a href="/">Delivery</a>
        <a href="/">Help & Support</a>
        <a href="/">T&C</a>

      </div>
        <p> Contact : <h4>+91 1234567899</h4></p>
      </div>
      <div className='footer-icon'>
          <a href="https://pt-br.facebook.com/"><img className="icon-face" src={require("../img/face.png")} alt="icon-face"/></a>
          <a href="https://www.instagram.com/"><img className="icon-inst" src={require("../img/inst.png")} alt="icon-inst"/></a>
          <a href="https://twitter.com/"><img className="icon-twitter" src={require("../img/twitter.png")} alt="icon-twitter"/></a>

      </div>
    </footer>
  );
};

export default Footer;
