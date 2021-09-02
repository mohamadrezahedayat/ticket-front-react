import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, imageAddress } from '../../shared/apis/server';

const Shows = () => {
  const [shows, setshows] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await api.get('shows?fields=-_v');
      setshows(res.data.data.data);
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
  return <div className='shows'> {renderShows()} </div>;
};

export default Shows;
