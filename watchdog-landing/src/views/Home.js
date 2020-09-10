import React, {useEffect}from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';




const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  });
  return (
    <>
      {/* <Hero className="illustration-section-01" /> */}
      {/* <FeaturesTiles /> */}
      <Testimonial topDivider className="illustration-section-01" />
      <FeaturesSplit invertMobile  imageFill className="illustration-section-02" />
      <div><br/></div>
    
      
      {/* <Cta split /> */}
    </>
  );
}

export default Home;