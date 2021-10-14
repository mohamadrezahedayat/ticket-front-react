import React, { useEffect, useState } from 'react';

import Ticket from './Ticket';
import Div from '../../shared/styledComponent/Div';
import { H } from '../../shared/styledComponent/Typography';
import { Colors } from '../../shared/styledComponent/variables';

const ReservedTicket = ({ price, code, width }) => {
  const [ticketWidth, setticketWidth] = useState(width);

  useEffect(() => {
    setticketWidth(`${width - 80}px`);
  }, [width]);

  return (
    <Div row>
      <Ticket width={ticketWidth} />
      <H
        as='h4'
        fontSize='1.5rem'
        fontWeight='100'
        letterSpacing='1px'
        color={Colors.white}
        textTransform='capitalize'
        absPosition={{ x: 'top,10%', y: 'left,10%' }}
      >
        price:
      </H>
      <H
        as='h4'
        fontWeight='100'
        fontSize='1.5rem'
        letterSpacing='1px'
        color={Colors.white}
        absPosition={{ x: 'top,40%', y: 'left,20%' }}
      >
        {`${price}$`}
      </H>
      <H
        as='h4'
        fontSize='1rem'
        fontWeight='100'
        textAlign='center'
        color={Colors.white}
        textTransform='capitalize'
        transforms='translateX(50%)'
        absPosition={{ x: 'top,15%', y: 'right,25%' }}
      >
        Zone | Row | Column
      </H>
      <H
        as='h4'
        fontWeight='100'
        fontSize='1.4rem'
        textAlign='center'
        color={Colors.white}
        textTransform='capitalize'
        transforms='translateX(50%)'
        absPosition={{ x: 'top,45%', y: 'right,25%' }}
      >
        {code}
      </H>
    </Div>
  );
};

export default ReservedTicket;
