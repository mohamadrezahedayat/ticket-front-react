import React from 'react';
import singer from '../..//img/singer-rec.jpg';
import ticket from '../../img/ticket-badge.png';

const Header = () => {
  return (
    <div className='header'>
      <div className='header__card'>
        <img className='header__disk' src={singer} alt='singer' />
        <div>
          <h1 className='header__heading'>
            Shadmehr <span>live in istanbul</span>
          </h1>
          <h3 className='header__date'>30/08/2019</h3>
          <p className='header__text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            cupiditate repellat quis praesentium! Aut dolores possimus ipsa
            voluptatibus beatae dignissimos delectus vitae, nam itaque similique
            deserunt minus doloribus suscipit voluptates?
          </p>
        </div>
        <h2 className='header__footer'>
          Grand Cevahir Hotel Convention Center
        </h2>
        <img src={ticket} alt='ticket' className='header__ticket' />
      </div>
    </div>
  );
};

export default Header;
