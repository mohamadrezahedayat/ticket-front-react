import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import styled from 'styled-components';

import SeatsPanel from './SeatsPanel';
import Div from '../../shared/styledComponent/Div';
import { baseURL } from '../../shared/apis/server';
import Input from '../../shared/styledComponent/Input';
import Button from '../../shared/styledComponent/Button';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Colors } from '../../shared/styledComponent/variables';
import { AuthContext } from '../../shared/context/auth-context';
import { Checkbox2 } from '../../shared/styledComponent/Checkbox';
import {
  setBackgroundColor,
  setBoxShadow,
} from '../../shared/styledComponent/functions';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { Screen } from '../../shared/styledComponent/mediaQueries';

const EditSeats = ({ event, onEdit }) => {
  const container = useRef();
  const { capacity } = event;
  const [width, setwidth] = useState();
  const [rowMax, setrowMax] = useState();
  const { token } = useContext(AuthContext);
  const [columnMax, setcolumnMax] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const {
    setselectedZones,
    setselectedSeats,
    setselectByZone,
    settooltipMode,
    setconfigMode,
    changeStatus,
    setPrice,
    configMode,
    seatsState,
    tooltipMode,
    selectByZone,
    setInitialCapacity,
  } = useContext(manageSeatsContext);

  const [_price, set_price] = useState();

  const getWidth = useCallback(
    () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    []
  );

  // resize eventHandler, set width state after user resize
  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setwidth(getWidth()), 150);
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [getWidth]);

  // fill initial capacity state so we can process user seat configurations
  useEffect(() => {
    setInitialCapacity(capacity);

    // calculate maximum columns & rows
    const layouts = capacity.map((zone) => zone.layout);
    const colMax = Math.max(
      ...layouts.map((layout) => layout.columns + layout.startColumn)
    );
    const rowMax = Math.max(
      ...layouts.map((layout) => layout.rows + layout.startRow)
    );
    setcolumnMax(colMax);
    setrowMax(rowMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capacity]);

  const changeStatusHandler = (e) => {
    changeStatus(e.target.value);
    !selectByZone ? setselectedSeats([]) : setselectedZones([]);
  };

  const setPriceHandler = () => {
    setPrice(_price);
    !selectByZone ? setselectedSeats([]) : setselectedZones([]);
  };

  const saveSeatHandler = async () => {
    try {
      await sendRequest(
        `${baseURL}/events/${event._id}`,
        'PATCH',
        JSON.stringify({
          capacity: seatsState,
        }),
        {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      console.log(error);
    }

    onEdit();
  };

  const renderConfigInput = () => {
    if (configMode) {
      return (
        <Div className='status-bottom-container'>
          <Button
            value='free'
            color='#fff'
            bgcolor='#373737'
            activecolor={Colors.tertiary}
            onClick={(e) => changeStatusHandler(e)}
          >
            Free
          </Button>
          <Button
            color='#fff'
            value='inactive'
            bgcolor={Colors.grey}
            activecolor={Colors.tertiary}
            onClick={(e) => changeStatusHandler(e)}
          >
            inactive
          </Button>
          <Button
            color='#fff'
            value='reserved'
            activecolor={Colors.tertiary}
            bgcolor={Colors.secondaryLight}
            onClick={(e) => changeStatusHandler(e)}
          >
            reserve
          </Button>
        </Div>
      );
    } else {
      return (
        <Div className='status-bottom-container'>
          <Input
            width='10rem'
            padding='.5rem'
            singleMargin='right,.5rem'
            type='number'
            id='price'
            min='0'
            value={_price}
            onChange={(e) => set_price(e.target.value)}
          />
          <Button className='btn-save' onClick={setPriceHandler}>
            Set price
          </Button>
        </Div>
      );
    }
  };

  // update header text
  useEffect(() => {
    const containerEl = container.current;
    const parent = containerEl.parentElement;
    const header = parent.querySelector('.header');
    var x = document.createElement('a');
    var linkText = document.createTextNode('X');
    x.appendChild(linkText);
    x.title = 'Cancel';
    x.addEventListener('click', onEdit);
    x.className = 'close-bottom';
    header.appendChild(x);
    const h3 = parent.querySelector('.header h3');
    h3.innerText = 'manage seats';
    return () => {
      header.removeChild(x);
    };
  }, [container, onEdit]);

  return (
    <Container className='seats-container' ref={container}>
      <Div>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay />}
        {/* configs */}
        <div className='checkbox-container'>
          <Checkbox2
            width='75'
            height='25'
            active='Zone'
            inactive='Seat'
            checked={selectByZone}
            onChange={() => setselectByZone(!selectByZone)}
          />
          <Checkbox2
            width='90'
            height='25'
            active='Status'
            inactive='Price'
            checked={configMode}
            onChange={() => setconfigMode(!configMode)}
          />
          <Checkbox2
            width='75'
            height='25'
            active='On'
            inactive='Off'
            checked={tooltipMode}
            onChange={() => settooltipMode(!tooltipMode)}
          />
          <Button className='btn-save' onClick={saveSeatHandler}>
            Save
          </Button>
        </div>
        {renderConfigInput()}
        {/* seats */}
        <SeatsPanel
          className='seats-panel'
          columnMax={columnMax}
          rowMax={rowMax}
          width={width}
        ></SeatsPanel>
      </Div>
    </Container>
  );
};

export default EditSeats;

const Container = styled.div`
  min-height: 50vh;
  .checkbox-container {
    display: flex;

    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
  }
  .btn-save {
    font-size: 1.4rem;
    letter-spacing: 1px;
    cursor: pointer;
    border: none;
    ${setBoxShadow()}
    height: 2.5rem;
    background-color: ${Colors.primaryLight};
    border-radius: 2px;
    &:hover {
      background-color: ${Colors.primaryDark};
    }
  }
  .status-bottom-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin: 1rem 0;
    button {
      width: 8rem;
      margin-right: 2rem;
      text-transform: capitalize;
      font-size: 1.3rem;
      letter-spacing: 1px;
      padding: 5px 0;
      font-weight: 500;
      ${setBoxShadow()}
      &:hover,&:active {
        border: none;
      }
    }
  }
  & .seats-panel {
    height: 80vh;
    display: flex;
    flex-direction: column;
    ${setBoxShadow()}
    overflow: hidden;
    border-radius: 3rem;
    ${setBackgroundColor(Colors.white + '5')}
    ${Screen.tabletLandscape` grid-row-start:2;margin-bottom:3rem;`}
  }
`;
