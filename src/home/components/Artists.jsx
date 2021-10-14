import styled from 'styled-components';
import React, { Fragment, useEffect, useState } from 'react';

import {
  Heading3,
  Heading4Light,
} from '../../shared/styledComponent/Typography';
import { api, imageAddress } from '../../shared/apis/server';
import { Colors } from '../../shared/styledComponent/variables';
import chairs from '../../img/chairs.jpg';

const Artists = ({ className }) => {
  const [artistsPhotos, setartistsPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('artgroups?fields=images,name&limit=4');
      setartistsPhotos(data.data.data);
    })();
  }, []);

  const imageCards = artistsPhotos.map((artist) => (
    <Fragment key={artist.name}>
      <img
        src={`${imageAddress}/artists/${artist.images[0]}`}
        alt={artist.name}
        className='artists__img'
      />
      <div className='artists__detail'>
        <Heading4Light textTransform='uppercase'>{artist.name}</Heading4Light>
        <p className='artists__sold'>Coming Soon</p>
      </div>
    </Fragment>
  ));

  return (
    <div className={className}>
      <Heading3 color={Colors.white}>Hot Artists</Heading3>
      <div className='artists__list'>{imageCards}</div>
    </div>
  );
};

export default styled(Artists)`
  grid-column: col-start 7 / full-end;
  background-color: ${Colors.tertiary};
  background-image: linear-gradient(
      to right,
      ${Colors.tertiary}cc,
      ${Colors.tertiary}05
    ),
    url(${chairs});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 2rem;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-row-gap: 2rem;
  justify-items: center;
  overflow: hidden;
  .artists__list {
    display: grid;
    grid-template-columns: min-content max-content;
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    align-items: center;
  }
  .artists__img {
    width: 8rem;
    border-radius: 50%;
    display: block;
    box-shadow: 2px 3px 4px rgba($color: #000000, $alpha: 0.8);
    transition: all 0.3s;
  }
  .artists__img:hover {
    transform: scale(1.3);
    border-radius: 30%;
  }
  .artists__sold {
    text-transform: uppercase;
    color: $color-grey-light-2;
    margin-top: -3px;
  }
`;
