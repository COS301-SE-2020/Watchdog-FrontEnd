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
    title: 'What makes Watchdog unique?',
    paragraph: 'Discover the hidden truths of our system that differentiates itself from modern day surveillance.'
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
                <p className="m-0">
                Get the validation that your home is secure by being able to view the current state of your surveillance system, anytime, anywhere.
                </p>
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
                      {/* <h3>Second slide label</h3> */}
                      <p>View multiple IP camera feeds that are connected in different Local Area Networks through the use of industry standard WebRTC technology.</p>
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
                      {/* <h3>Third slide label</h3> */}
                      {/* <p>View multiple IP cameras that are connected to different Local Area Networks in multiple browsers at the same time through the use of industry standard WebRTC technology.</p> */}
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
                A stand-alone program that runs locally on the home owners computer machine aggregates the IP streams in real-time to reduce the latency in identifying possible intruders, and ensure the safety of our home owners is of highest priority.
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
                      {/* <h3>Second slide label</h3> */}
                      <p>
                        View the possible intruder images on your user interface at your convenience.
                      </p>
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
                      {/* <h3>Third slide label</h3> */}
                      <p>Facial detection is used in the stand alone program to identify possible faces, which is then uploaded to the cloud to run further intruder analysis that notifies the home owner if the face detected is a possible intruder.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>

            {/* Tag Detected Image */}
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8"> Understanding the system </div> */}
                <h3 className="mt-0 mb-12">Add owners on the fly</h3>
                <p className="m-0">Not everyone identified in your camera feed is a possible intruder. These detected people may be added to your home owner list on the fly, making it easier than ever to register new known identities in the system.</p>
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
                      {/* <h3>Second slide label</h3> */}
                      <p></p>
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
                      {/* <h3>Third slide label</h3> */}
                      <p>Adding a detected person as a known profile will intelligently search similar images in the detected list and flag them as detected owner images, saving you the effort of tagging each similar image.</p>
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
                <p className="m-0">Be alerted with a custom message of your choice when certain home owners have been identified in your system.</p>
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
                      {/* <h3></h3> */}
                      <p>Enable the system to notify you with a custom message when certain known profiles are identified in the system.</p>
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
                      {/* <h3>Third slide label</h3> */}
                      <p>An extra step in the intruder analysis is used such that if the face detected is a known identity in the system, it further checks to see if you are to receive a custom notification that was set in the user interface.</p>
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
                <p className="m-0">View at a glance when the different known profiles have been identifies by the system on a time series graph.</p>
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
                      {/* <h3>Second slide label</h3> */}
                      <p>View the different owner activity in your system on either a daily, weekly, or monthly time scale.</p>
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
                      {/* <h3>Third slide label</h3> */}
                      <p>Expand the points in the graph to view the detected image(s) of the owner.</p>
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
                <p className="m-0">View a backlog of IP camera footage that are periodically uploaded by the stand-alone program to provide the home owner with historical video footage.</p>
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
                      {/* <h3>Second slide label</h3> */}
                      {/* <p></p> */}
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
                      {/* <h3>Third slide label</h3> */}
                      <p>Filter your videos based on the date and time, type of video, and IP camera location.</p>
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