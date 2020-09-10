import React, {useEffect} from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import { Link } from 'react-router-dom';
import Wave from 'react-wavify'


const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const MemberPage = ({
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
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Our Team',
    paragraph: 'Our team has a very diverse skill set which when combined with the fact that we have all worked together extensively in the past makes for a robust, well-rounded and efficient team that produces results. We work as a cross-functional group that has the ability to be self-organizing. Since the beginning we have approached each problem at hand with a positive attitude to achieve at our best ability. All members are motivated to ensure that the client’s needs are fulfilled end to end. We take pride in being able to apply ourselves to problem solving in a clear and in-depth way. It can be noted that we do not have much experience integrating with AWS, however, through our persistence and motivation, we are determined to learn and expand our knowledge thereof We understand the potential that Watchdog has and the impact that it can have on our fellow South Africans. Security in South Africa is a constant concern that is never promised. Hence, by providing  a surveillance system that has the ability to identify intruders and notify security companies in real-time, will improve the rate of response by security companies. This has the ability to revolutionize the way that security is carried out and it is only the beginning.'
  };
  useEffect(() => {
    window.scrollTo(0, 0)
});

  return (
    <section
      {...props}
      className={outerClasses}
    >
            <div className="wave"><Wave fill="#169de0"  options={{ points: 40, speed: 0.2, amplitude: 40 }}></Wave> </div>

      <div className="container">
      {/* <Link to={"/"} className="button button-primary button-wide-mobile button-sm" >Home</Link> */}
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content container-md" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/jono.png')}
                      alt="Features tile icon 01"
                      width={128}
                      height={128} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Jonathen Sundy
                    </h4>
                  <p className="m-0 text-sm">                   
I have been exposed to an event-driven system that adopted modern cloud architecture that 
was hosted on Heroku and used a subset of AWS. I will use this knowledge gained to pioneer 
the system to be loosely coupled that promotes independent events triggering different parts 
of the system. Hence, I am certain that I will be of great value to the development of the 
serverless architecture. I am not too coherent with AWS but am motivated and inspired to 
expand my knowledge! 
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/Rishi.png')}
                      alt="Features tile icon 02"
                      width={128}
                      height={128} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Ushir Raval
                    </h4>
                  <p className="m-0 text-sm">
                  My exposure varies greatly from desktop applications to web based technologies, all in mostly a corporate “fintech” focused development environment. My skillset ranges from python development to web-based desktop applications using full stack technologies and my personal motto is “measure twice, cut once”. I prize scalable, robust and portable code above all else and intend to primarily contribute to the integration of various technologies such as the front-end to back-end communication etcetera
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/jordan.png')}
                      alt="Features tile icon 03"
                      width={128}
                      height={128} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Jordan Manas
                    </h4>
                  <p className="m-0 text-sm">
                  An avid student of the numerous fields found within Computer Science, with a concentration in the field of Artificial Intelligence. Also being well-versed in Web Development, I recognize that I am capable of fulfilling important roles in the given project. I have experience in developing projects that use almost all of the proposed technologies and am very confident that our final product will be one of quality.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/luqi.png')}
                      alt="Features tile icon 04"
                      width={128}
                      height={128} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Luqmaan Badat
                    </h4>
                  <p className="m-0 text-sm">
                  I am a final year computer science student. I am adaptable, reliable and keen to learn new programming technologies. My interests are software engineering, artificial intelligence and web development. My skills range include web development, full stack development, Java development and using full stack development technologies like docker and circleci. I’ve been exposed to and worked on cloud-based solutions in the medical field. 
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/abu.png')}
                      alt="Features tile icon 05"
                      width={128}
                      height={128} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Aboobacker Kharbai
                    </h4>
                  <p className="m-0 text-sm">
                  My exposure ranges between desktop applications and web-based technologies. I am very reliable as well as trustworthy. I have a broad range of experience in backend development which includes database management systems, as well as experience in java development. I am one who is always steadfast in deadlines set out and will do anything in my capacity to ensure the work done is before the deadline and also of an industry standard. 
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/armin.png')}
                      alt="Features tile icon 06"
                      width={128}
                      height={128} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Armin van Wyk
                    </h4>
                  <p className="m-0 text-sm">
                  I have been involved in a multitude of projects inside and outside of the EBIT faculty. I have particular interest in front-end multimedia design to back-end REST API and hosting tasks. I have familiarity in databases both with and without SQ. I can use these skills in the request handling and data handling of our three projects and ensure validated, 
clean and lightweight data. I have little experience in Python or neural networks and it may take time to adjust to and grasp new concepts that will be necessary in the development of the projects, but I am more than capable and willing to learn. 
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

MemberPage.propTypes = propTypes;
MemberPage.defaultProps = defaultProps;

export default MemberPage;