import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';

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
    className
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
    title: 'A little introduction',
    paragraph: 'Everything you need to know about Watchdog concisely and easily explained.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-right" data-reveal-delay="200">
              <div className="tiles-item-inner">
              <div className="testimonial-item-footer center-content text-md mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">What is Watchdog?</span>
                  
                </div>
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — Watchdog is a fully integrated, state-of-the-art security system designed to protect your home and its residents any time, anywhere. 
                      </p>
                </div>
                
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
              <div className="testimonial-item-footer center-content text-md mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">Our mission</span>
                  
                </div>
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — We aim to serve our clients to the best of our abilities, instill a reinforced sense of security and enforce a zero tolerance policy for crimes against our clients and their property. 
                      </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-left" data-reveal-delay="200">
              <div className="tiles-item-inner">
              <div className="testimonial-item-footer center-content text-md mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">Why choose us?</span>
                  
                </div>
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — We use a simple-to-use but effective home control panel camera management system, intelligent intruder detection software, fully personalised and customisable notifications, alerts and settings to put your security back in your own hands. 
                      </p>
                </div>
        
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;