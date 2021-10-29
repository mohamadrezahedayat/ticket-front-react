import React from 'react';
import styled from 'styled-components';

import {
  setColor,
  setBorder,
  setBoxShadow,
  setBackgroundColor,
} from '../../shared/styledComponent/functions';
import { Colors } from '../../shared/styledComponent/variables';
import { Screen } from '../../shared/styledComponent/mediaQueries';

const Table = ({ headers, body }) => {
  return (
    <TableWrapper>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{body}</tbody>
    </TableWrapper>
  );
};

export default Table;

const svg__button = `
  width: 4rem;
  height: 4rem;
  margin: 0 1px;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
const svg__button__hover = `
  transform: translateY(3px);
  ${setBoxShadow()}
`;

const TableWrapper = styled.table`
  font-size: 1.3rem;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  margin-top: 1rem;
  border-collapse: collapse;
  ${setColor(Colors.primaryDark)}
  ${setBorder({ width: '2px', color: Colors.greyLight1 })}
  ${Screen.tabletPortrait`font-size: 1.1rem;`}
  & td,
  & th {
    ${setBorder({ width: '1px', color: Colors.greyLight1 })}
    padding: .2rem;
    max-width: 15rem;
    text-align: center;
    ${Screen.tabletPortrait`
    max-width: 10rem;`}
  }
  /* td:nth-of-type(5) {
    padding: 0;
  } */

  & th {
    text-transform: capitalize;
    padding: 3px;
    text-align: center;
    ${setBackgroundColor(Colors.primary)}
    ${setColor(Colors.white)}
  }
  td img {
    height: 7.5rem;
    width: 7.5rem;
    vertical-align: middle;
    ${Screen.tabletPortrait`width: 5rem;height: 5rem;`}
    ${Screen.phone`width: 3rem;height: 3rem;`}
    transition: all .5s cubic-bezier(0.19, 1, 0.22, 1);
    &:hover {
      border-radius: 100%;
      transform: scale(1.5) rotate(360deg);
    }
  }
  th input {
    padding: 0.3rem;
    width: 100%;
    background-color: ${Colors.white}c;
    vertical-align: middle;
    &:focus {
      background-color: ${Colors.greyLight2};
    }
  }

  & tr {
    ${setBackgroundColor(`${Colors.greyLight}66`)}
  }
  & tr:hover {
    ${setBackgroundColor(`${Colors.primary}4c`)}
  }

  .edit__button {
    ${svg__button}
    fill: ${Colors.primary};
    &:hover,
    &:active {
      fill: ${Colors.tertiaryDark};
      ${svg__button__hover}
    }
  }
  .delete__button {
    ${svg__button}
    fill: ${Colors.secondaryDark};
    &:hover,
    &:active {
      fill: ${Colors.tertiaryDark};
      ${svg__button__hover}
    }
  }
  .seat__button {
    ${svg__button}
    fill: #3d3d03;
    &:hover,
    &:active {
      fill: ${Colors.tertiaryDark};
      ${svg__button__hover}
    }
  }
`;
