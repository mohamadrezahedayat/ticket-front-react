import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import {
  setBackgroundColor,
  setBorder,
  setColor,
} from '../../styledComponent/functions';
import { Colors } from '../../styledComponent/variables';

import { validate } from '../../util/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const {
    id,
    rows,
    type,
    label,
    element,
    onInput,
    className,
    errorText,
    validators,
    placeholder,
    initialValue,
    initialValid,
    autoComplete,
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isTouched: false,
    isValid: initialValid || false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const inputElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        autoComplete={autoComplete}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <FormWrapper
      className={`${className || 'form-control'} ${
        !inputState.isValid && inputState.isTouched && 'invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </FormWrapper>
  );
};

export default Input;

const FormWrapper = styled.div`
  margin: 1rem 0;

  & label,
  & input,
  & textarea {
    display: block;
  }

  & label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & input,
  & textarea {
    width: 100%;
    font: inherit;
    ${setBorder({ width: '1px', style: 'solid', color: Colors.greyLight })}
    ${setBackgroundColor(Colors.greyLight)}
      padding: 0.15rem 0.25rem;
  }

  & input:focus,
  & textarea:focus {
    outline: none;
    ${setBackgroundColor(Colors.greyLight)}
    border-color: ${Colors.primary};
  }

  &.invalid label,
  &.invalid p {
    ${setColor(Colors.secondary)}
  }

  &.invalid input,
  &.invalid textarea {
    border-color: ${Colors.secondary};
    ${setBackgroundColor(Colors.greyLight)}
  }

  & p {
    text-align: center;
    margin: 0.5rem 0;
  }
`;
