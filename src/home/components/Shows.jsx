import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, imageAddress } from '../../shared/apis/server';

const Shows = () => {
  // const [events, setevents] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     const res = await api.get('events?fields=-_v');
  //     setevents(res.data.data.data);
  //   })();
  // }, []);
  // const renderShows = () => {
  //   return events.map((event) => (
  //     <div key={event.show._id} className='card'>
  //       <div className='card__image-container'>
  //         <img
  //           className='card__image'
  //           alt={event.show.name}
  //           src={`${imageAddress}shows/${event.show.imageCover}`}
  //         />
  //       </div>
  //       <div className='card__details'>
  //         <div className='card__detail-center'>
  //           <h1>
  //             {`Concert of ${event.show.artGroup.name}`}
  //             <br />
  //             <span>is available</span>
  //           </h1>
  //           <p>{event.show.description}</p>
  //           <Link className='card__detail-link' to={`eventdetail/${event._id}`}>
  //             More Details
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   ));
  // };
  return <div className='shows'>{/* {renderShows()}  */}</div>;
};

export default Shows;
