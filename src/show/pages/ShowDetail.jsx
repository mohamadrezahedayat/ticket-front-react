import React from 'react';
import { Link, useParams } from 'react-router-dom';
const ShowDetail = ({ id }) => {
  let { showId } = useParams();

  return (
    <div>
      <h3>show details is:</h3>
      <h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia iure
        libero, deleniti sequi commodi odio minima enim ad eligendi obcaecati
        ducimus quo reiciendis, tempore dicta quam qui nemo recusandae ex.
      </h4>
      <p>show detail: {showId}</p>
      <Link to={`/eventdetail/121212`}>buy ticket?</Link>
    </div>
  );
};

export default ShowDetail;
