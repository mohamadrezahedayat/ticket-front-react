import React from 'react';
import styled from 'styled-components';

import {
  setColor,
  setBorder,
  setBackgroundColor,
  setBoxShadow,
} from '../../shared/styledComponent/functions';
import { Screen } from '../../shared/styledComponent/mediaQueries';
import { Colors } from '../../shared/styledComponent/variables';

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
  td:nth-of-type(5) {
    padding: 0;
  }

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
    width: 4rem;
    padding: 0.5rem;
    margin: 0 1px;
    fill: ${Colors.primary};
    border-radius: 0.5rem;
    &:hover,
    &:active {
      fill: ${Colors.tertiaryDark};
      ${setBoxShadow()}
      transform: translateY(3px);
    }
    /*
    margin-bottom: 1rem;
    outline: none;
    font-size: 1.3rem;
    ${setColor(Colors.secondary)}
    padding: 3px 1rem;
    border-radius: 8px;
    cursor: pointer;
    ${setBorder({ width: '1px', color: Colors.secondary })}
    background-color: transparent;
    ${Screen.tabletPortrait`
    width: 5rem;
    font-size: 1.2rem;
    border-radius: 3px;`}
    &--danger {
      outline: none;
      ${setBorder({ width: '1px', color: Colors.secondary })}
      ${setBackgroundColor(Colors.tertiaryDark)}
      &:hover,
      &:active {
        ${setBorder({ width: '1px', color: Colors.primary })}
        ${setBackgroundColor(Colors.primary)}
        ${setColor(Colors.white)}
      }
    }
    &:hover,
    &:active {
      ${setBorder({ width: '1px', color: Colors.primary })}
      ${setBackgroundColor(Colors.primary)}
      ${setColor(Colors.white)}
    } */
  }
`;
