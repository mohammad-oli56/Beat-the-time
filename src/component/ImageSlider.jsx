import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Event slides with title & description
const slides = [
  {
    src: "https://images.squarespace-cdn.com/content/v1/5c53611a0cf57d7ce300be61/1602820773851-FNV7MK3VVAOJ6VX2R2C6/15.+COVER+-+HOW+TO+ATTRACT+CORPORATE+CLIENTS.jpg",
    alt: "Corporate Event",
    title: "Corporate Networking Gala",
    description: "Join top industry leaders for an exclusive corporate networking night.",
  },
  {
    src: "https://www.conventures.com/wp-content/uploads/2018/06/TOS18_28-1000x500.jpg",
    alt: "Tech Conference",
    title: "Tech Innovators Conference",
    description: "Discover cutting-edge technologies and connect with global innovators.",
  },
  {
    src: "https://www.conventures.com/wp-content/uploads/2023/12/TF_Fabrica_26-1000x500.jpg",
    alt: "Modern Expo",
    title: "Modern Business Expo 2025",
    description: "Explore the latest trends and opportunities in the modern business world.",
  },
];

const ImageSlider = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-2xl shadow-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Image */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-2xl"></div>

            {/* Text Content */}
            <div className="absolute bottom-6 left-6 text-white max-w-lg">
              <h2 className="text-lg sm:text-2xl font-bold drop-shadow-md">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base mt-1 opacity-90">
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;