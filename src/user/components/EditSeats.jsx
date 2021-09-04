import React, { useContext, useEffect, useState } from 'react';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { Colors } from '../../shared/styledComponent/functions';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/styledComponent/Button';
import Label from '../../shared/styledComponent/Label';
import Input from '../../shared/styledComponent/Input';
import Radio from '../../shared/styledComponent/Radio';
import { baseURL } from '../../shared/apis/server';
import Div from '../../shared/styledComponent/Div';
import Zone from '../../event/components/Zone';

const EditSeats = ({ event, onEdit }) => {
  const { capacity } = event;
  const { token } = useContext(AuthContext);
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

  // fill initial capacity state so we can process user seat configurations
  useEffect(() => {
    setInitialCapacity(capacity);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capacity]);

  const changeStatusHandler = (e) => {
    changeStatus(e.target.value);
    !selectByZone ? setselectedSeats([]) : setselectedZones([]);
  };

  const changeConfigModeHandler = (e) => {
    setconfigMode(e.target.value);
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
    if (configMode === 'status') {
      return (
        <Div>
          <Button
            value='free'
            color='#fff'
            margin='.5rem,1rem'
            bgcolor='#373737'
            activecolor={Colors.tertiary}
            onClick={(e) => changeStatusHandler(e)}
          >
            Set Free
          </Button>
          <Button
            color='#fff'
            value='inactive'
            margin='.5rem,1rem'
            bgcolor={Colors.grey}
            activecolor={Colors.tertiary}
            onClick={(e) => changeStatusHandler(e)}
          >
            set inactive
          </Button>
          <Button
            color='#fff'
            value='reserved'
            margin='.5rem,1rem'
            activecolor={Colors.tertiary}
            bgcolor={Colors.secondaryLight}
            onClick={(e) => changeStatusHandler(e)}
          >
            set reserved
          </Button>
          <Button
            value='sold'
            color='#fff'
            bgcolor='#1b2b17'
            margin='.5rem,1rem'
            activecolor={Colors.tertiary}
            onClick={(e) => changeStatusHandler(e)}
          >
            set sold
          </Button>
        </Div>
      );
    } else {
      return (
        <Div rowLeft margin='1rem 0 0 0'>
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
          <Button onClick={setPriceHandler}>Set price</Button>
        </Div>
      );
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        height: 'calc(100vh - 22rem)',
      }}
    >
      <Div>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay />}
        <Label>Select Mode:</Label>
        <Radio
          id='byZone'
          value='byZone'
          label='by Zone'
          name='selectMode'
          checked={selectByZone}
          onChange={() => setselectByZone(!selectByZone)}
        />
        <Radio
          id='bySeat'
          value='bySeat'
          label='by Seat'
          name='selectMode'
          checked={!selectByZone}
          onChange={(e) => {
            setselectByZone(!selectByZone);
          }}
        />
      </Div>
      <Div>
        <Label>Config Mode:</Label>
        <Radio
          value='status'
          id='statusMode'
          name='configMode'
          label='Status Mode'
          onChange={(e) => {
            changeConfigModeHandler(e);
          }}
          checked={configMode === 'status'}
        />
        <Radio
          value='price'
          id='priceMode'
          name='configMode'
          label='Price Mode'
          onChange={(e) => {
            changeConfigModeHandler(e);
          }}
          checked={configMode === 'price'}
        />
      </Div>
      <Div>{renderConfigInput()}</Div>
      {seatsState.map((zone) => (
        <Zone key={zone._id} zone={zone} offsetX={0} offsetY={10} unit={2.5} />
      ))}
      <Div absPosition={{ y: 'bottom,1rem', x: 'left,1rem' }}>
        <Button margin='0,1rem, 0, 0' onClick={saveSeatHandler}>
          Save
        </Button>
        <Button
          onClick={onEdit}
          bgcolor='transparent'
          border={Colors.primaryDark}
          color={Colors.primaryDark}
        >
          Cancel
        </Button>
      </Div>
      <Div absPosition={{ y: 'bottom,1rem', x: 'right,5rem' }}>
        <Button
          bgcolor={`${tooltipMode ? Colors.greyDark : Colors.secondaryDark}`}
          onClick={() => settooltipMode(!tooltipMode)}
        >{`${tooltipMode ? 'Disable' : 'Enable'} Tooltip`}</Button>
      </Div>
    </div>
  );
};

export default EditSeats;
