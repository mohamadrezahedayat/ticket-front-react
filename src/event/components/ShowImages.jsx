import React from 'react';
import styled from 'styled-components';

const ShowImages = ({ images }) => {
  console.log(images);
  return (
    <Wrapper>
      {/* {images.map((image) => (
        <div>image</div>
      ))} */}
    </Wrapper>
  );
};

export default ShowImages;

const Wrapper = styled.div``;
