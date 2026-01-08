import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaAirbnb, FaAmazon, FaApple, FaGoogle, FaMicrosoft, FaSpotify, FaUber } from 'react-icons/fa';

const Brand = () => {

    const brands = [
        { id: 1, icon: <FaGoogle />, name: "Google" },
        { id: 2, icon: <FaAirbnb />, name: "Airbnb" },
        { id: 3, icon: <FaSpotify />, name: "Spotify" },
        { id: 4, icon: <FaAmazon />, name: "Amazon" },
        { id: 5, icon: <FaMicrosoft />, name: "Microsoft" },
        { id: 6, icon: <FaUber />, name: "Uber" },
        { id: 7, icon: <FaApple />, name: "Apple" },
    ];

    return (
        <div className='max-w-7xl mx-auto px-6 py-20 bg-base-100'>
            <div className='text-center mb-12'>
                <h2 className='text-3xl md:text-4xl font-bold text-base-content mb-4'>Trusted By Top Brands</h2>
                <p className='text-base-content/60 text-lg'>Collaborating with industry leaders to create stunning environments.</p>
            </div>

            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 60,
                    },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper py-8"
            >
                {brands.map((brand) => (
                    <SwiperSlide key={brand.id}>
                        <div className="flex flex-col items-center justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 group cursor-pointer">
                            <div className="text-5xl text-base-content/60 group-hover:text-primary transition-colors">
                                {brand.icon}
                            </div>
                            <span className="text-lg font-medium text-base-content/60 group-hover:text-base-content">{brand.name}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Brand;
