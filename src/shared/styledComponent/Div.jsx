import styled from 'styled-components';
import { setAbsPos, setFlex, setHeight, setMargin } from './functions';

const Div = styled.div`
  ${(props) =>
    props.row &&
    setFlex({
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'no-wrap',
      flexDirection: 'row',
    })}
  ${(props) =>
    props.rowLeft &&
    setFlex({
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'no-wrap',
      flexDirection: 'row',
    })}
  ${(props) => props.height && setHeight(props.height)} 
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.absPosition && setAbsPos(props.absPosition)}
`;

export default Div;
