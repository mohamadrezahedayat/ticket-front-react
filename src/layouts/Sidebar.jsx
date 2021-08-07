import sprite from '../img/sprite.svg'

import React from 'react'

const Sidebar = () => {
  return (
    <div className="sidebar">
    <div className="navigation">
      <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__acount">
        <svg>
          <use xlinkHref={`${sprite}#icon-profile-male`} />
        </svg>
      </div>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item"><a href="/#" className="navigation__link"><span>01</span>About US</a></li>
          <li className="navigation__item"><a href="/#" className="navigation__link"><span>02</span>Contact US</a></li>
          <li className="navigation__item"><a href="/#" className="navigation__link"><span>03</span>Buy Ticket</a></li>
          <li className="navigation__item"><a href="/#" className="navigation__link"><span>04</span>Scenes</a></li>
          <li className="navigation__item"><a href="/#" className="navigation__link"><span>05</span>Artists</a></li>
        </ul>
      </nav>
    </div>

  </div>
  )
}

export default Sidebar
