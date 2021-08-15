import React from 'react';
// import { Link } from 'react-router-dom';

const Accordion = ({ id, label, items, checked }) => {
  return (
    <div className='accordion'>
      <input type='radio' id={id} name='radio-a' checked={checked} />
      <label className='accordion-label' htmlFor={id}>
        {label}
      </label>
      <div className='accordion-content'>
        <ul>
          {items.map((item) => (
            <li key={item.title} onClick={item.onClick}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
