import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { FiChevronDown } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
    {
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        title: "Style Your <span class='text-primary'>Dream</span> Event",
        description: "Professional decoration services for weddings, parties, and corporate events. We bring your vision to life."
    },
    {
        image: "https://images.unsplash.com/photo-1522673607200-1648832cee98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        title: "Premium <span class='text-primary'>Wedding</span> Decor",
        description: "Creating magical moments with elegant floral arrangements and stunning stage setups tailored to your story."
    },
    {
        image: "https://images.unsplash.com/photo-1473186578172-c141e6798ee4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        title: "Modern <span class='text-primary'>Corporate</span> Style",
        description: "Sophisticated and professional environments that reflect your brand's excellence and attention to detail."
    }
];

const Hero = () => {
    return (
        <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-base-300">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <div
                                className="relative h-full w-full bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                {/* Overlay: Very light to keep the 'design picture' clear */}
                                <div className="absolute inset-0 bg-black/25" />

                                <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
                                    <AnimatePresence mode="wait">
                                        {isActive && (
                                            <motion.div
                                                key={`hero-text-${index}`}
                                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 1.05, y: -30 }}
                                                transition={{ duration: 0.8, ease: "circOut" }}
                                                className="max-w-3xl"
                                            >
                                                <h1
                                                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl"
                                                    dangerouslySetInnerHTML={{ __html: slide.title }}
                                                />
                                                <p className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                                                    {slide.description}
                                                </p>

                                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                    <Link
                                                        to="/services"
                                                        className="btn btn-primary btn-lg rounded-full px-12 text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all border-none"
                                                    >
                                                        Explore Services
                                                    </Link>
                                                    <Link
                                                        to="/about"
                                                        className="btn btn-outline btn-lg rounded-full px-12 border-white text-white hover:bg-white hover:text-black transition-all"
                                                    >
                                                        Our Story
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-medium"></span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-white/80"
                >
                    <FiChevronDown size={28} />
                </motion.div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
        </section>
    );
};

export default Hero;
