import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import homeImage1 from '../assets/images/imagehome1.png';
import homeImage2 from '../assets/images/imagehome2.png';
import homeImage3 from '../assets/images/imagehome3.png';
const AboutUs = () => {
  return (
    <>
      <h1
        style={{ fontSize: '3.5rem', fontWeight: 'bold' }}
        className="my-5"
        id="about"
      >
        About us
      </h1>
      <Row className="mb-5">
        <Col md="6">
          <img src={homeImage1} alt="homeImage1" className="img-fluid" />
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          <h2 className="fw-semibold">Fully automated scanner</h2>
          <p className="fs-5">
            Just enter your smart contract address and our system will take care
            of the rest. Automated scanning saves time and lets your security
            team focus on the vulnerabilities that really matter.
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="d-flex flex-column justify-content-center">
          <h2 className="fw-semibold">Reliable results</h2>
          <p className="fs-5">
            CrowChain Scan can detect all vulnerabilities in the SWC Registry
            and common bugs in Solidity. We use the latest technologies to
            identify more vulnerabilities and minimize false positives. Also,
            our reports are thoroughly checked by the security experts.
          </p>
        </Col>
        <Col md="6">
          <img src={homeImage2} alt="homeImage2" className="img-fluid" />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md="6">
          <img src={homeImage3} alt="homeImage3" className="img-fluid" />
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          <h2 className="fw-semibold">Detailed analysis report</h2>
          <p className="fs-5">
            CrowChain Scan provides a detailed analysis report that includes all
            vulnerabilities and the severity of each. Such a report enables
            businesses to prioritize the vulnerabilities that pose the biggest
            risk and protect themselves from automated attacks.
          </p>
        </Col>
      </Row>
    </>
  );
};

export default AboutUs;
