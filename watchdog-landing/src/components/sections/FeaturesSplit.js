import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'How it all works',
    paragraph: 'Discover the inner workings of our system and how it keeps you and your home safe and secure.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>

            {/* Live Streaming */}
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8"> Understanding the system </div> */}
                <h3 className="mt-0 mb-12"> Live Streaming </h3>
                <p className="m-0">Placeholder text</p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Carousel>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/live_streaming_what_2.png")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>View your detected images</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/live_streaming_how.png")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>

            {/* Intruder Detection */}
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8"> Understanding the system </div> */}
                <h3 className="mt-0 mb-12">
                  Intruder Detection
                  </h3>
                <p className="m-0">
                  Our cameras constantly sweep the environment for any movement or stimuli. Once any has been detected on our finely calibrated hardware, we use artificial intelligence to scope in on the movement and attempt to detect any visual of a face present. Once a face is detected, an image is captured and loaded into an appropriate storage site for further analysis.
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                {/* <Image
                  src={require('./../../assets/images/IntruderDetection.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} /> */}
                <Carousel>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/intruder_analysis_what_2.png")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>View your detected images</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/intruder_analysis_how.gif")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>

            {/* Tag Detected Image */}
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8"> Understanding the system </div> */}
                <h3 className="mt-0 mb-12">Tag Detected Image</h3>
                <p className="m-0">Placeholder text</p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Carousel>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/tag_detected_image_what_2.png")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>View your detected images</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/tag_detected_image_how.gif")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>

            {/* Custom Notifications */}
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8"> Understanding the system </div> */}
                <h3 className="mt-0 mb-12">Custom Notifications</h3>
                <p className="m-0">Placeholder text</p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Carousel>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/custom_notifications_what.png")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>View your detected images</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/custom_notifications_how.gif")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>


            {/* Owner Analytics */}
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8"> Understanding the system </div> */}
                <h3 className="mt-0 mb-12">Owner Analytics</h3>
                <p className="m-0">Placeholder text</p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Carousel>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/owner_analytics_what_time_scale.png")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>View your detected images</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/owner_analytics_what_view_images.png")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>

            {/* Video Highlights */}
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8"> Understanding the system </div> */}
                <h3 className="mt-0 mb-12">Video Highlights</h3>
                <p className="m-0">Placeholder text</p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Carousel>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/video_highlights_what.png")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>View your detected images</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item

                    style={{ "width": 528, "height": 396 }}
                  >
                    <img
                      // className="d-block w-100"
                      // height={396}
                      // width={528}
                      src={require("./../../assets/images/video_highlights_what_2.png")}
                      // src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>



          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;