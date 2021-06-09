import React from 'react';
import { Logo } from '../assets';


const Header = () => {
  return (
    <header>
      <div className="container">
        <img
          src={Logo}
          height="50"
          alt="efishery logo"
        />
      </div>
    </header>
  )
}

export default Header
