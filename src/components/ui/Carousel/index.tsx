import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '90vh',
  color: '#fff',
  lineHeight: '90vh',
  textAlign: 'center',
  backgroundColor: '#364d79',
  borderRadius: '10px',
};

const CarouselUi = () => {
  return (
    <Carousel
      autoplay
      style={{ height: '100%', width: '100%' }}
    >
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
    </Carousel>
  );
};

export default CarouselUi;
