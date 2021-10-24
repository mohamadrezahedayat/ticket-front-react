import React from 'react';
import styled from 'styled-components';

import {
  setColor,
  setBackgroundColor,
} from '../../shared/styledComponent/functions';
import { Colors } from '../../shared/styledComponent/variables';

const Accordion = ({ id, label, items, checked }) => {
  return (
    <Wrapper className='accordion'>
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
    </Wrapper>
  );
};

export default Accordion;

const Wrapper = styled.div`
  ${setColor(Colors.white)}
  overflow: hidden;
  margin-bottom: 0.5rem;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  & input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  & input:checked + .accordion-label {
    ${setBackgroundColor(Colors.primary)}
  }
  .accordion-content {
    max-height: 0;
    ${setBackgroundColor(Colors.white)}
    ${setColor(Colors.primary)}
    transition: all 0.3s;
  }

  .accordion-content ul {
    li,
    a {
      padding: 0.5rem;
      font-size: 1.4rem;
      display: block;
      border-bottom: 1px solid ${Colors.black};
      text-transform: capitalize;
      text-decoration: none;
      cursor: pointer;
    }
  }

  & input:checked ~ .accordion-content {
    max-height: 100vh;
  }

  .accordion-label {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    ${setBackgroundColor(`${Colors.primary}aa`)}
    font-weight: 400;
    cursor: pointer;
    font-size: 1.5rem;
    &:hover {
      ${setBackgroundColor(`${Colors.primary}ee`)}
    }
  }
  .accordion-label::after {
    content: '\\276F';
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    transition: all 0.3s;
  }

  & input:checked + .accordion-label::after {
    transform: rotate(90deg);
  }
`;
