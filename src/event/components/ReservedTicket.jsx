import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Ticket from './Ticket';
import { Colors } from '../../shared/styledComponent/variables';
import { setAbsPos, setColor } from '../../shared/styledComponent/functions';
import { Heading4 } from '../../shared/styledComponent/Typography';
import { setMediaQuery } from '../../shared/styledComponent/mediaQueries';

const ReservedTicket = ({ price, code, width }) => {
  const [ticketWidth, setticketWidth] = useState(width);

  useEffect(() => {
    setticketWidth(`${Math.round(width - 60)}px`);
  }, [width]);

  return (
    <TicketWrapper width={ticketWidth}>
      <Ticket className='ticket__svg' width={ticketWidth} />
      <div className='ticket-entities'>
        <Heading4 className='price-label'>price:</Heading4>
        <Heading4 className='price-value'>{`${price}$`}</Heading4>
        <Heading4 className='seat-label'>Zone Row Column</Heading4>
        <Heading4 className='seat-value'>{code}</Heading4>
      </div>
    </TicketWrapper>
  );
};

export default ReservedTicket;

const TicketWrapper = styled.div`
  position: relative;
  width: ${(props) => props.width};
  display: flex;

  & .ticket__svg {
    height: 100%;
  }

  & .ticket-entities {
    ${setAbsPos()}
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1em repeat(3, 1fr) 1em;
    grid-template-columns: 1em repeat(3, 1fr) 2em repeat(3, 1fr) 1em;

    & .price-label {
      grid-column: 2 / span 2;
      grid-row: 2/3;
      justify-items: flex-end;
      font-size: 1.5rem;
      font-weight: 100;
      letter-spacing: 1px;
      ${setColor(Colors.white)}
    }

    & .price-value {
      grid-column: 3 / span 2;
      grid-row: 3/4;
      justify-items: flex-end;
      align-items: flex-end;
      font-size: 1.5rem;
      font-weight: 100;
      letter-spacing: 1px;
      ${setColor(Colors.white)}
    }
    & .seat-label {
      grid-column: 6 / span 3;
      grid-row: 2/3;
      font-size: 1rem;
      font-weight: 100;
      align-self: center;
      justify-self: center;
      ${setColor(Colors.white)}
      ${setMediaQuery(
        { isMinWidth: false, breakPoint: '66.25em' },
        `font-size:.9rem`
      )}
      ${setMediaQuery(
        { isMinWidth: false, breakPoint: '62.5em' },
        `font-size:.8rem`
      )}
       ${setMediaQuery(
        { isMinWidth: false, breakPoint: '56.25em' },
        `font-size:1rem`
      )}
    }
    & .seat-value {
      grid-column: 6 / span 3;
      grid-row: 3 / span 1;
      justify-self: center;
      align-self: center;
      font-weight: 500;
      letter-spacing: 1px;
      font-size: 1.4rem;
      font-weight: 100;
      ${setColor(Colors.white)}
      ${setMediaQuery(
        { isMinWidth: false, breakPoint: '62.5em' },
        `font-size:1.3rem`
      )}
      ${setMediaQuery(
        { isMinWidth: false, breakPoint: '58.75em' },
        `font-size:1.2rem`
      )}
      ${setMediaQuery(
        { isMinWidth: false, breakPoint: '56.25em' },
        `font-size:1.4rem`
      )}
    }
  }
`;
