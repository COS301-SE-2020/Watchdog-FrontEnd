import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';


const Home = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
      {/* <FeaturesTiles /> */}
      <Testimonial topDivider />
      <FeaturesSplit invertMobile  imageFill className="illustration-section-02" />
      
      {/* <Cta split /> */}
    </>
  );
}

export default Home;