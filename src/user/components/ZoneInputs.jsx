import React, { useState } from 'react';

const ZoneInputs = ({ id, onInput, onRemove, initialValue }) => {
  const [zoneProp, setzoneProp] = useState(initialValue ? initialValue : '');
  const onChangeHandler = (val) => {
    setzoneProp(val);
    onInput(id, val);
  };
  return (
    <div className='form__input--inline--half-center'>
      <button
        type='button'
        onClick={() => {
          onRemove(id);
        }}
      >
        x
      </button>
      <label>{zoneProp ? zoneProp.split(',')[0] : 'New Zone'}</label>
      <input
        element='input'
        id={id}
        type='text'
        value={zoneProp}
        placeholder='zone name, rows counts, columns counts, start row , start column'
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default ZoneInputs;
