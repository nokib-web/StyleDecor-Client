import React from 'react';
import Hero from '../Hero/Hero';
import FeaturedServices from '../FeaturedServices/FeaturedServices';
import TopDecorators from '../TopDecorators/TopDecorators';
import HomeMap from '../HomeMap/HomeMap';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero />
            <FeaturedServices />
            <TopDecorators />
            <HomeMap />
        </div>
    );
};

export default Home;