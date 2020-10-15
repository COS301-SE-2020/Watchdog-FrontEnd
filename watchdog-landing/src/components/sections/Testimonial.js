import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Wave from 'react-wavify';
import Image from 'react-bootstrap/Image';
import { motion } from "framer-motion";

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className,
    'illustration-section-02'
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'WATCHDOG',
    // paragraph: 'The Security System that will protect you and your family from intruders, Always!'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      {/* <div className="wave"><Wave fill="#3f6a8094" options={{ points: 100, speed: 0.3, amplitude: 100 }}></Wave> </div> */}


      <div className="container ">

        <div className={innerClasses}>

      <div className="center-content">
        <motion.div
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"]
          }}
          transition={{
            duration: 4,
            ease: "circInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            loop: Infinity,
            repeatDelay: 10
          }}
          style={{marginBottom: "2rem"}}
          >

          <Image src={require("../../assets/images/Watchdog.png")}></Image>
        </motion.div>
      </div >


          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-right" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="testimonial-item-footer center-content text-md mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">Security in South Africa</span>

                </div>
                <div className="testimonial-item-content">
                  <p className="text-sm mb-3">
                    Household break-ins was rated the <a href="http://www.statssa.gov.za/publications/P0341/P03412018.pdf">number one crime in South Africa</a> during the 2018/2019 period by the Governance, Public Safety and Justice Servey.
                  </p>
                  <p className="text-sm mb-3">
                    There are about <a href="http://www.statssa.gov.za/?p=12614 ">1.3 million incidences of househol break-ins affecting 5.8%</a> of <a href="https://africa.com/home-ownership-in-south-africa/">15 million households</a> in South Africa. 
                  </p>
                  <p className="text-sm mb-0">
                    Of those household crimes, approximately <a href="http://www.statssa.gov.za/?p=12614">48% of affected households reported incidences to the police</a>.
                  </p>
                </div>

              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="testimonial-item-footer center-content text-md mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">Watchdog Mission</span>
                </div>
                <div className="testimonial-item-content">
                  <p className="text-sm mb-3">
                    Watchdog provides a simple solution to increase the number of reported household crimes in order to protect and possibly save lives of our fellow South Africans.
                  </p>
                  <p className="text-sm mb-0">
                    By providing the home owner with real time images of possible intruders, Watchdog enables our home owners to be able to present tangible information to the police.
                  </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-left" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="testimonial-item-footer center-content text-md mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">What is Watchdog?</span>

                </div>
                <div className="testimonial-item-content">
                  <p className="text-sm mb-3">
                      Watchdog is an intelligent security surveillance system that notifies home owners in real-time when possible intruders are identified in their IP camera feed.
                  </p>
                  <p className="text-sm mb-0">
                      Watchdog is also an owner tracking system that intelligently keeps track of when known home owner profiles have been identified in the system.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section >
  );
}

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;