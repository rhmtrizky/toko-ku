// carousels/Responsive.js
import { Carousel } from 'react-responsive-carousel';
import { items } from '../../../../item.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ResponsiveCarousel = () => {
  const { responsive } = items;

  return (
    <Carousel
      showArrows={true}
      showIndicators={true}
      infiniteLoop={true}
      dynamicHeight={false}
      showThumbs={false}
      autoPlay={true}
      interval={5000}
    >
      {responsive.map((item) => (
        <div
          key={item.id}
          className="lg:h-[90vh] md:h-[70vh] sm:h-[65vh] h-[65vh] w-full bg-color-cream relative"
        >
          <div className="h-full bg-blue-500 flex items-center justify-center">
            <img
              src={item.imageUrl}
              alt="slides"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 p-4 flex flex-col justify-center text-color-white">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-2">{item?.title}</h2> */}
            <p className="text-gray-600">{item.text}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ResponsiveCarousel;
