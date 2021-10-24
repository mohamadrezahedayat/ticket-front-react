import React from 'react';
import styled from 'styled-components';

const TemplateForm = () => {
  return <Container></Container>;
};

export default TemplateForm;

const Container = styled.div`
  /* min-height: 100vh;
  width: 100%;
  ${setBackground({ img: userImage, color: `${Colors.primary}70` })}

  display: grid;
  grid-template-columns: 8rem repeat(10, 1fr) 8rem;
  grid-template-rows: 8rem repeat(10, 1fr) 8rem;

  .form-container {
    grid-column: 3 / -3;
    grid-row: 2/-1;
    align-self: start;
    justify-self: start;
    ${setBackgroundColor(`${Colors.greyLight1}35`)}
    border-radius: 2rem;
    padding: 3rem;
    ${setBoxShadow()}
    ${Screen.phone`
      grid-row: 3/-1;
      justify-self: center;
    `}
  }

  .form {
    font-weight: 400;
    ${setColor(Colors.primary)}
    display: flex;
    flex-direction: column;
    font-size: 1.6rem;

    &__input {
      margin-bottom: 1.5rem;
      color: inherit;
      padding: 1.25rem 1.75rem;
      border: none;
      width: 100%;

      background-color: #f2f2f2;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
      border-radius: 4px;
    }
    &__submit {
      align-self: flex-end;
      padding: 1.4rem 5rem;
      border-radius: 10rem;
      text-transform: uppercase;
      display: inline-block;
      text-decoration: none;
      border: none;
      cursor: pointer;
      ${setBackgroundColor(Colors.primaryLight)}
      ${setColor(Colors.white)}
      margin-top: 2rem;
      ${setBoxShadow()}
    }
    &__submit--secondary {
      align-self: flex-end;
      background-color: transparent;
      margin-top: 2rem;
      padding: 1.4rem 2rem;
      text-transform: uppercase;
      display: inline-block;
      text-decoration: underline;
      cursor: pointer;
      ${setBorder({ width: '1px', style: 'solid', color: Colors.primary })}
      ${setColor(Colors.primary)}
    }
    & .heading-3 {
      margin-bottom: 2rem;
      font-weight: 400;
      font-size: 2rem;
      text-align: center;
      ${setColor(Colors.primary)}
    }
    &__group {
      margin: 1rem 0;
    }
    &__input--inline {
      color: inherit;
      margin-bottom: -3.6rem;
      margin-top: 1rem;
      align-self: flex-end;
      z-index: 3;
      font-family: inherit;
      cursor: pointer;
      margin-left: 0.5rem;
    }
    &__image-uplader-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin: 2rem;
    }
    &__select-container {
      ${setBorder({ width: '1px', style: 'solid', color: Colors.secondary })}
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 1.5rem 0 0;
      align-items: center;
      padding: 3px;
      margin: 2rem 0;
    }

    &__input--sidebyside {
      margin: 0.4rem 0;
      display: inline-block;
      width: 50%;
      & input,
      & select {
        width: 90%;
      }
    }
    &__number-input {
      padding: 1rem 0;
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      } */

  /* Firefox */
  /* input[type='number'] {
        -moz-appearance: textfield;
      }
    }
    &__inline-button {
      position: absolute;
      top: 3rem;
      right: 2rem;
      margin: 1rem;
      float: right;
      background: transparent;
      border: none;
      ${setColor(Colors.primary)}
      width: 10rem;
      height: 3rem;
      border-radius: 1rem;
      &:hover {
        box-shadow: 2px 2px 2px rgba($color: #000000, $alpha: 0.3);
      }
    }
    &__input--inline--half-center {
      margin-bottom: 1rem 0;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      &:last-of-type {
        margin-bottom: 3rem;
      }

      & input {
        flex: 1;
        margin: 3px;
        ${setBackgroundColor(Colors.greyLight)}
        font-size: 1.4rem;
        padding: 3px;
      }
      & label {
        width: 5rem;
        margin: 0 1rem;
        flex: 0.2;
      }
      button {
        background-color: transparent;
        border: none;
        ${setColor(Colors.primary)}
        padding: 0.5rem;
        width: 3rem;
        height: 3rem;
        margin: 1px;
        &:hover {
          ${setColor(Colors.white)}
          ${setBackgroundColor(Colors.white)}
        }
      }
    }
  }

  .form-control {
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
      border: 1px solid $color-grey-light;
      background: $color-grey-light;
      padding: 0.15rem 0.25rem;
    }

    & input:focus,
    & textarea:focus {
      outline: none;
      background: $color-grey-light;
      border-color: $color-primary;
    }

    &--invalid label,
    &--invalid p {
      color: $color-secondary;
    }

    &--invalid input,
    &--invalid textarea {
      border-color: $color-secondary;
      background: $color-grey-light;
    }
  } */
`;
