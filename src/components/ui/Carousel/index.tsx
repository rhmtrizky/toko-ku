// carousels/Responsive.js
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner from '../../../../public/bannerWeb.jpg'; // Make sure the path is correct

const ResponsiveCarousel = () => {
  const items = [
    {
      id: 1,
      imageUrl: banner,
    },
    {
      id: 2,
      imageUrl: banner,
    },
  ];

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
      {items.map((item) => (
        <div
          key={item.id}
          className="lg:h-[97vh] md:h-[75vh] sm:h-[38vh] h-[38vh] w-full bg-color-cream relative"
        >
          <div className="w-full h-full bg-blue-500 flex items-center justify-center">
            <img
              src={item.imageUrl.src} // Correctly reference the imported image
              alt="slides"
              className="h-full w-full"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ResponsiveCarousel;
