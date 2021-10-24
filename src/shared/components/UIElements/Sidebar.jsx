import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  setColor,
  setBoxShadow,
  setBackgroundColor,
} from '../../styledComponent/functions';
import { HomeIcon, UserIcon } from './Svgs';
import { Colors } from '../../styledComponent/variables';
import { AuthContext } from '../../context/auth-context';
import { imageAddress, randomApi } from '../../apis/server';
import { Screen } from '../../styledComponent/mediaQueries';

const Sidebar = () => {
  const { isLoggedIn, userPhoto, username, userId } = useContext(AuthContext);

  const profileIcon = !isLoggedIn ? (
    <UserIcon />
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
    <Wrapper className='sidebar'>
      <div className='navigation'>
        <div className='navigation__button'>
          <Link to='/'>
            <HomeIcon />
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
                <span>03</span>FAQ.
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
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  ${setColor(Colors.white)}
  grid-column: 1 / span 1;
  grid-row: 1/-1;
  ${Screen.phone`
    height:8rem;
    grid-column: 1 / -1;
    grid-row: 1/span 1;
  `}
  .navigation {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    height: 100%;
    padding-top: 1.5rem;
    row-gap: 1.5rem;
    ${Screen.phone`
    flex-direction: row;
    row-gap: unset;
    column-gap: 1.5rem;
    padding: 0 0 0 1.5rem;
    `}
    &__button {
      ${setBackgroundColor(Colors.white)}
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
      z-index: 8;
      ${setBoxShadow()}
      text-align: center;
      cursor: pointer;
    }

    &__checkbox {
      display: none;
    }

    &__button svg {
      fill: ${Colors.primary};
      height: 3rem;
      width: 3rem;
      margin: 1rem;
      &:hover {
        fill: ${Colors.primaryLight};
      }
    }

    &__button img {
      height: 100%;
      width: 100%;
      border-radius: 100%;
      &:hover {
        transform: scale(1.3);
        filter: brightness(1.3);
      }
    }

    &__background {
      height: 100%;
      width: 8rem;
      position: fixed;
      top: 0;
      left: 0;
      background-image: linear-gradient(
        to top right,
        ${Colors.primaryLight},
        ${Colors.primaryDark}
      );
      z-index: 4;
      transition: width 0.8s cubic-bezier(0.86, 0, 0.07, 1);
      ${Screen.phone`
        position:absolute;
        width: 100vw;
        height: 8rem;
      `}
    }

    &__nav {
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 7;
      opacity: 0;
      width: 0;
      overflow: hidden;
      transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      ${Screen.phone`
        position: absolute;
        height:0;
        width: 100vw;
      `}
    }

    &__list {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      list-style: none;
      text-align: center;
      z-index: 10;
      ${Screen.phone`
        display:flex;
        transform: translate(-50%, -70%);
        flex-direction:column;
        align-items:center;
      `}
    }

    &__item {
      margin: 1rem;
    }

    &__link {
      &:link,
      &:visited {
        display: inline-block;
        font-size: 3rem;
        font-weight: 300;
        padding: 1rem 2rem;
        ${setColor(Colors.white)};
        text-decoration: none;
        text-transform: uppercase;
        background-image: linear-gradient(
          120deg,
          transparent 0%,
          transparent 50%,
          ${Colors.white} 50%
        );
        background-size: 220%;
        transition: all 0.4s;
        ${Screen.tabletPortrait`font-size:2rem;`}

        span {
          margin-right: 0.5em;
          display: inline-block;
        }
      }

      &:hover,
      &:active {
        background-position: 100%;
        ${setColor(Colors.primary)}
        transform: translateX(1rem);
      }
    }

    //FUNCTIONALITY
    &__checkbox:checked ~ .navigation__background {
      width: 60%;
      ${Screen.phone`
        width: 100%;
        height: 70%;
        border-radius:0 0 5em 5em;
      `}
    }

    &__checkbox:checked ~ .navigation__nav {
      opacity: 1;
      width: 60%;
      ${Screen.phone`width: 100%;height:100%;`}
    }

    //ICON
    &__icon {
      position: relative;
      margin-top: 2.5rem;

      &,
      &::before,
      &::after {
        width: 3rem;
        height: 2px;
        ${setBackgroundColor(Colors.greyDark)}
        display: inline-block;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        transition: all 0.2s;
      }

      &::before {
        top: -0.8rem;
      }
      &::after {
        top: 0.8rem;
      }
    }

    &__button:hover .navigation__icon::before {
      top: -1rem;
    }

    &__button:hover .navigation__icon::after {
      top: 1rem;
    }

    &__checkbox:checked + .navigation__button .navigation__icon {
      background-color: transparent;
    }

    &__checkbox:checked + .navigation__button .navigation__icon::before {
      top: 0;
      transform: rotate(135deg);
    }

    &__checkbox:checked + .navigation__button .navigation__icon::after {
      top: 0;
      transform: rotate(-135deg);
    }
  }
`;
