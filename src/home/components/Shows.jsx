import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  setColor,
  setAbsPos,
  setBoxShadow,
  setBackgroundColor,
} from '../../shared/styledComponent/functions';
import concertCover from '../../img/concert-cover.jpg';
import { api, imageAddress } from '../../shared/apis/server';
import { Colors } from '../../shared/styledComponent/variables';

const Shows = () => {
  const [shows, setshows] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('shows?fields=-_v&limit=9');
      setshows(data.data.data);
    })();
  }, []);

  const renderShows = () => {
    return (
      shows &&
      shows.map((show) => (
        <div key={show._id} className='card'>
          <div className='card__image-container'>
            <img
              className='card__image'
              alt={show.name}
              src={`${imageAddress}shows/${show.imageCover}`}
            />
          </div>
          <div className='card__details'>
            <div className='card__detail-center'>
              <h1>
                {`Concert of ${show.artGroup.name}`}
                <br />
                <span>is available</span>
              </h1>
              <p>{show.description}</p>
              <Link
                className='card__detail-link'
                to={`eventdetail/${show._id}`}
              >
                More Details
              </Link>
            </div>
          </div>
        </div>
      ))
    );
  };
  return <ShowWrapper> {renderShows()} </ShowWrapper>;
};

export default Shows;

const ShowWrapper = styled.div`
  grid-column: center-start / center-end;
  margin: 15rem 5rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  grid-template-rows: repeat(3, minmax(27rem, max-content));
  grid-gap: 5rem;

  .card {
    position: relative;
    overflow: hidden;
    object-position: center;
    border-radius: 1.5rem 3rem 3rem 1.5rem;
    ${setBoxShadow()}
    &__image-container {
      width: 100%;
      height: 100%;
    }
    &__image {
      height: 100%;
      width: 100%;
      transition: 0.3s;
      object-fit: contain;
    }

    &__details {
      ${setAbsPos({ x: 'top,0', y: 'left,0' })}
      width: 70%;
      height: 100%;
      ${setBackgroundColor(Colors.secondary)}
      background-image: linear-gradient(
          to right bottom,
          ${Colors.primaryLight}60,
          ${Colors.primaryDark}60
        ),
        url(${concertCover});
      background-size: cover;
      background-repeat: no-repeat;

      transition: 0.5s;
      transform-origin: left;
      transform: perspective(2000px) rotateY(-90deg);
      border-radius: 1.5rem;
    }
    &__detail-center {
      padding: 2rem;
      width: 100%;
      text-align: center;
      background-color: ${Colors.white}6;
      ${setAbsPos({ x: 'top,50%' })}
      transform: translateY(-50%);
      & h1 {
        ${setColor(Colors.primary)}
        line-height: 2rem;
        font-size: 2rem;
        text-transform: capitalize;
      }

      & h1 span {
        font-size: 14px;
        ${setColor(Colors.secondaryDark)}
      }
      & p {
        margin: 10px 0;
        padding: 0;
        ${setColor(Colors.primaryDark)}
      }
    }
    &__detail-link {
      text-decoration: none;
      ${setColor(Colors.white)}
      ${setBackgroundColor(Colors.tertiary)}
      padding: 1rem;
      border-radius: 1rem;
      ${setBoxShadow()}
    }
  }

  .card:hover .card__image {
    filter: brightness(0.3);
  }

  .card:hover .card__details {
    transform: perspective(2000px) rotateY(0deg);
  }
`;
