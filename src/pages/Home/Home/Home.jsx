import React from 'react';
import Hero from '../Hero/Hero';
import FeaturedServices from '../FeaturedServices/FeaturedServices';
import TopDecorators from '../TopDecorators/TopDecorators';
import HomeMap from '../HomeMap/HomeMap';
import Brand from '../Brand/Brand';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero />
            <FeaturedServices />
            <TopDecorators />
             <Brand />
            <HomeMap />
        </div>
    );
};

export default Home;