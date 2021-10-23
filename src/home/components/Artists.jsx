import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import {
  Heading3,
  Heading4Light,
} from '../../shared/styledComponent/Typography';
import { api, imageAddress } from '../../shared/apis/server';
import { Colors } from '../../shared/styledComponent/variables';
import { Screen } from '../../shared/styledComponent/mediaQueries';
import chairs from '../../img/chairs.jpg';

const Artists = ({ className }) => {
  const [artistsPhotos, setartistsPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('artgroups?fields=images,name&limit=6');
      setartistsPhotos(data.data.data);
    })();
  }, []);

  const imageCards = artistsPhotos.map((artist) => (
    <div key={artist.name} className='artists__artist'>
      <img
        className='artists__img'
        alt={artist.name}
        src={`${imageAddress}/artists/${artist.images[0]}`}
      />
      <div className='artists__detail'>
        <Heading4Light>{artist.name}</Heading4Light>
        <p className='artists__sold'>Coming Soon</p>
      </div>
    </div>
  ));

  return (
    <div className={className}>
      <Heading3 color={Colors.white} textAlign='center'>
        Hot Artists
      </Heading3>
      <div className='artists__list'>{imageCards}</div>
    </div>
  );
};

export default styled(Artists)`
  grid-column: col-start 7 / full-end;
  background-color: ${Colors.tertiary};
  background-image: linear-gradient(
      to right,
      ${Colors.tertiary}bc,
      ${Colors.tertiary}05
    ),
    url(${chairs});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 2em;
  overflow-y: auto;

  display: grid;
  grid-template-rows: max-content 1fr;
  grid-row-gap: 2rem;
  ${Screen.tabletLandscape`grid-column: full-start / full-end;`}
  ${Screen.phone`grid-column: 1 / -1;`}

  .artists__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    align-items: stretch;
  }

  .artists__artist {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

  .artists__img {
    width: 8rem;
    border-radius: 50%;
    display: block;
    box-shadow: 2px 3px 4px rgba($color: #000000, $alpha: 0.8);
    transition: all 0.3s;
  }
  .artists__img:hover {
    transform: scale(1.3) rotate(360deg);
    border-radius: 30%;
  }
  .artists__detail {
    & h4 {
      font-weight: 600;
      margin-top: 0.2em;
      text-transform: capitalize;
      text-align: center;
    }
  }
  .artists__sold {
    text-transform: uppercase;
    text-align: center;
  }
`;
