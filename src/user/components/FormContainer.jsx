import styled from 'styled-components';
import {
  setColor,
  setBoxShadow,
  setBackgroundColor,
  setBorder,
} from '../../shared/styledComponent/functions';
import { Colors } from '../../shared/styledComponent/variables';
import { Screen } from '../../shared/styledComponent/mediaQueries';

const FormContainer = styled.div`
  min-width: 50vw;
  grid-column: ${(props) => props.gridColumn};
  grid-row: 2 / -2;
  align-self: start;
  justify-self: start;
  ${setBackgroundColor(`${Colors.greyLight1}35`)}
  border-radius: 2rem;
  padding: 3rem;
  overflow-x: auto;
  ${setBoxShadow()}
  ${Screen.tabletLandscape`
  transform:translateX( calc(( (100vw - 80px ) / -11) + 2rem) ) ;
  
  `}
  ${Screen.phone`
      grid-row: 3/-2;
      grid-column: 1 / -1;
      justify-self: center;
      transform:unset;
    `}

& .form {
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
      background-color: $color-primary-light;
      ${setColor(Colors.white)}
      margin-top: 2rem;
      box-shadow: 2px 5px 0.4rem rgba($color-black, 0.3);
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
      border: 1px solid $color-primary;
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
      }

      /* Firefox */
      input[type='number'] {
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
          background-color:${Colors.primary};
        }
      }
    }

    &__cancel {
      margin-top: 1rem;
      font: inherit;
      padding: 0.5rem 1.5rem;
      border: 1px solid #340068;
      border-radius: 4px;
      background: transparent;
      ${setColor(Colors.primary)}
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      text-align: center;
      &:hover {
        ${setBackgroundColor(Colors.primary)}
        ${setColor(Colors.white)}
      }
    }
    .image-upload {
      &.center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      &__text {
        text-align: center;
        margin: 1rem 0;
      }
      & button {
        margin-bottom: 1rem;
      }

      &__preview {
        width: 13rem;
        height: 13rem;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-bottom: 1rem;
      }

      &__preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default FormContainer;
