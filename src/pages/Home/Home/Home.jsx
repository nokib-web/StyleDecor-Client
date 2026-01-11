import React from 'react';
import Hero from '../Hero/Hero';
import FeaturedServices from '../FeaturedServices/FeaturedServices';
import TopDecorators from '../TopDecorators/TopDecorators';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import HomeMap from '../HomeMap/HomeMap';
import Brand from '../Brand/Brand';
import OurProcess from '../OurProcess/OurProcess';
import Stats from '../Stats/Stats';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero />
            {/* <Stats /> */}
            <FeaturedServices />
            <OurProcess />
            <WhyChooseUs />
            <Testimonials />
            <TopDecorators />
            <Brand />
            <HomeMap />
        </div>
    );
};

export default Home;