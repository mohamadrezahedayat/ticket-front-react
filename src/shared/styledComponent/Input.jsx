import styled from 'styled-components';
import { setMargin, setPadding } from './functions';
import Label from './Label';
import Div from './Div';

const Input = (props) => {
  return (
    <Div>
      {props.label && (
        <Label htmlFor={props.id} fontSize='1.1rem'>
          {props.label}
        </Label>
      )}
      <InputWrapper
        name={props.name}
        id={props.id}
        checked={props.checked}
        value={props.value}
        onChange={props.onChange}
      />
    </Div>
  );
};
const InputWrapper = styled.input.attrs((props) => ({
  id: props.id,
  type: 'number',
  name: props.name,
  value: props.value,
}))`
  ${setMargin('0,.5rem')}
  ${setPadding('.5rem')}
  width:10rem;
`;

export default Input;
