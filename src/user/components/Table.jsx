import React from 'react';
import styled from 'styled-components';

import {
  setColor,
  setBorder,
  setBackgroundColor,
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
    padding: 1px 2px;
    max-width: 14rem;
    text-align: center;
    ${Screen.tabletPortrait`
    padding: 1px 1px;
    max-width: 10rem;`}
  }
  & th {
    text-transform: capitalize;
  }
  td img {
    width: 10rem;
    border-radius: 100%;
    ${Screen.tabletPortrait`width: 7rem;`}
    ${Screen.phone`width: 4rem;`}
  }

  & tr {
    ${setBackgroundColor(`${Colors.greyLight}66`)}
  }
  & tr:hover {
    ${setBackgroundColor(`${Colors.primary}4c`)}
  }

  & th {
    padding: 3px;
    text-align: center;
    ${setBackgroundColor(Colors.primary)}
    ${setColor(Colors.white)}
  }

  .opration {
    text-align: center;
  }

  .opration__button {
    width: 6rem;
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
    }
  }
`;
