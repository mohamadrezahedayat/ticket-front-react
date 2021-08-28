import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { validate } from '../../util/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: !action.validators || validate(action.val, action.validators),
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

const StyledInput = (props) => {
  const {
    onInput,
    id,
    type,
    placeholder,
    label,
    errorText,
    validators,
    rows,
    initialValue,
    initialValid,
    element,
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
    <InputWrapper
      className={!inputState.isValid && inputState.isTouched && 'invalid'}
    >
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  margin: 1rem 0;

  label,
  input,
  textarea {
    display: block;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    width: 100%;
    font: inherit;
    border: 1px solid $color-grey-light;
    background: $color-grey-light;
    padding: 0.15rem 0.25rem;
  }

  input:focus,
  textarea:focus {
    outline: none;
    background: $color-grey-light;
    border-color: $color-primary;
  }

  .invalid label,
  .invalid p {
    color: $color-secondary;
  }

  .invalid input,
  .invalid textarea {
    border-color: $color-secondary;
    background: $color-grey-light;
  }
`;
export default StyledInput;
