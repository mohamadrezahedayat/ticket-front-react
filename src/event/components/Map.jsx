import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';
import Button from '../../shared/styledComponent/Button';

mapboxgl.accessToken =
  'pk.eyJ1IjoibW9oYW1hZHJlemFoZWRheWF0IiwiYSI6ImNrcnNhcTZ4MDB1emoycHFteWJ6OTR4NjAifQ.1QfxJLnPlbID50wPqBfyPg';

export default function Map({ location }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(location[0]);
  const [lat, setLat] = useState(location[1]);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mohamadrezahedayat/cksyx7fdf6s5718o7sjmdgvq3',
      center: [lng, lat],
      zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <MapWrapper>
      <div ref={mapContainer} className='map-container' />
    </MapWrapper>
  );
}
const MapWrapper = styled.div`
  grid-column: full-start/full-end;
  grid-row: 5 / span 2;
  .map-container {
    height: 40rem;
    width: 100%;
  }
`;
