import React from 'react';
import Input from './Input';

const DateTimeInput = ({
  dateInitialValue,
  dateInitialValid,
  timeInitialValue,
  timeInitialValid,
  // inputHandler,
  i,
}) => {
  const inputHandler = () => {};
  return (
    <div className='form__date-time-container'>
      <Input
        className='form__input--sidebyside'
        element='input'
        id={`date${i}`}
        type='date'
        label='Date'
        initialValue={dateInitialValue}
        initialValid={dateInitialValid}
        validators={[]}
        errorText='Please enter a valid date.'
        onInput={() => {}}
      />
      <Input
        className='form__input--sidebyside'
        element='input'
        id={`time${i}`}
        type='time'
        label='Time'
        initialValue={timeInitialValue}
        initialValid={timeInitialValid}
        validators={[]}
        errorText='Please enter a valid time.'
        onInput={() => {}}
      />
    </div>
  );
};

export default DateTimeInput;
