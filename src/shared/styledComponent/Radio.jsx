import styled from 'styled-components';
import Label from './Label';

import { setMargin } from './functions';
const Radio = (props) => {
  return (
    <>
      <InputWrapper
        name={props.name}
        id={props.id}
        checked={props.checked}
        value={props.value}
        onChange={props.onChange}
      />
      <Label htmlFor={props.id} fontSize='1.1rem'>
        {props.label}
      </Label>
    </>
  );
};
const InputWrapper = styled.input.attrs((props) => ({
  id: props.id,
  type: 'radio',
  name: props.name,
  checked: props.checked,
  value: props.value,
}))`
  ${setMargin('0,.5rem,1rem')}
`;

export default Radio;
