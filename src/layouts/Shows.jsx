import React, { useEffect, useState } from 'react';
import { api, imageAddress } from '../apis/server';

const Shows = () => {
  const [shows, setshows] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get('shows?fields=-__id,-_v');
      setshows(res.data.data.data);
    })();
  }, []);

  const renderShows = shows.map((show) => (
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
          <a className='card__detail-link' href='#'>
            More Details
          </a>
        </div>
      </div>
    </div>
  ));

  return <div className='shows'>{renderShows} </div>;
};

export default Shows;
