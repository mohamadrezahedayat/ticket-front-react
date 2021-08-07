import React, { useEffect, useState } from 'react';
import { api, imageAddress } from '../apis/server';

const Artists = () => {
  const [artistsPhotos, setartistsPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const artists = await api.get('artgroups?fields=images,name&limit=4');
      setartistsPhotos(artists.data.data.data);
    })();
  }, []);

  const imageCards = artistsPhotos.map((artist) => (
    <React.Fragment key={artist.name}>
      <img
        src={`${imageAddress}/artists/${artist.images[0]}`}
        alt={artist.name}
        className='artists__img'
      />
      <div className='artists__detail'>
        <h4 className='heading-4 heading-4--light'>
          {artist.name.toUpperCase()}
        </h4>
        <p className='artists__sold'>Coming Soon</p>
      </div>
    </React.Fragment>
  ));

  return (
    <div className='artists'>
      <h3 className='heading-3'>Hot Artists</h3>
      <div className='artists__list'>{imageCards}</div>
    </div>
  );
};

export default Artists;
