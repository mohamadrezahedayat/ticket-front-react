import React, { useContext, useEffect, useState } from 'react';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import Zone from '../../event/components/Zone';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { baseURL } from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Label from '../../shared/styledComponent/Label';
import Radio from '../../shared/styledComponent/Radio';
import Div from '../../shared/styledComponent/Div';
import Button from '../../shared/styledComponent/Button';
import Input from '../../shared/styledComponent/Input';
import { Colors } from '../../shared/styledComponent/functions';

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
            bgcolor='#373737'
            activecolor={Colors.tertiary}
            color='#fff'
            margin='.5rem,1rem'
            value='free'
            onClick={(e) => changeStatusHandler(e)}
          >
            Set Free
          </Button>
          <Button
            value='inactive'
            bgcolor={Colors.grey}
            activecolor={Colors.tertiary}
            color='#fff'
            margin='.5rem,1rem'
            onClick={(e) => changeStatusHandler(e)}
          >
            set inactive
          </Button>
          <Button
            value='reserved'
            bgcolor={Colors.secondaryLight}
            activecolor={Colors.tertiary}
            color='#fff'
            margin='.5rem,1rem'
            onClick={(e) => changeStatusHandler(e)}
          >
            set reserved
          </Button>
          <Button
            value='sold'
            bgcolor='#1b2b17'
            activecolor={Colors.tertiary}
            color='#fff'
            margin='.5rem,1rem'
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
            id='price'
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
          name='selectMode'
          label='by Zone'
          checked={selectByZone}
          value='byZone'
          onChange={() => setselectByZone(!selectByZone)}
        />
        <Radio
          id='bySeat'
          name='selectMode'
          label='by Seat'
          value='bySeat'
          checked={!selectByZone}
          onChange={(e) => {
            setselectByZone(!selectByZone);
          }}
        />
      </Div>
      <Div>
        <Label>Config Mode:</Label>
        <Radio
          id='statusMode'
          name='configMode'
          label='Status Mode'
          checked={configMode === 'status'}
          value='status'
          onChange={(e) => {
            changeConfigModeHandler(e);
          }}
        />
        <Radio
          id='priceMode'
          name='configMode'
          label='Price Mode'
          value='price'
          checked={configMode === 'price'}
          onChange={(e) => {
            changeConfigModeHandler(e);
          }}
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
          bgcolor='transparent'
          border={Colors.primaryDark}
          color={Colors.primaryDark}
          onClick={onEdit}
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
