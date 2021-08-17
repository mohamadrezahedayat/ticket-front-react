import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { imageAddress, randomApi } from '../../apis/server';
import sprite from '../../../img/sprite.svg';
import { AuthContext } from '../../context/auth-context';

const Sidebar = () => {
  const { isLoggedIn, userPhoto, username, userId } = useContext(AuthContext);

  const profileIcon = !isLoggedIn ? (
    <svg>
      <use xlinkHref={`${sprite}#icon-user`} />
    </svg>
  ) : (
    <img
      src={
        userPhoto && userPhoto !== 'default.jpg'
          ? `${imageAddress}users/${userPhoto}`
          : randomApi(userId)
      }
      alt={username}
    />
  );
  return (
    <div className='sidebar'>
      <div className='navigation'>
        <div className='navigation__button'>
          <Link to='/'>
            <svg>
              <use xlinkHref={`${sprite}#icon-home`} />
            </svg>
          </Link>
        </div>

        <div className='navigation__button'>
          <Link to={!isLoggedIn ? '/auth' : '/account'}>{profileIcon}</Link>
        </div>
        <input
          type='checkbox'
          className='navigation__checkbox'
          id='navi-toggle'
        />
        <label htmlFor='navi-toggle' className='navigation__button'>
          <span className='navigation__icon'>&nbsp;</span>
        </label>
        <div className='navigation__background'>&nbsp;</div>

        <nav className='navigation__nav'>
          <ul className='navigation__list'>
            <li className='navigation__item'>
              <a href='/#' className='navigation__link'>
                <span>01</span>About US
              </a>
            </li>
            <li className='navigation__item'>
              <a href='/#' className='navigation__link'>
                <span>02</span>Contact US
              </a>
            </li>
            <li className='navigation__item'>
              <a href='/#' className='navigation__link'>
                <span>03</span>Buy Ticket
              </a>
            </li>
            <li className='navigation__item'>
              <a href='/#' className='navigation__link'>
                <span>04</span>Scenes
              </a>
            </li>
            <li className='navigation__item'>
              <a href='/#' className='navigation__link'>
                <span>05</span>Artists
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
