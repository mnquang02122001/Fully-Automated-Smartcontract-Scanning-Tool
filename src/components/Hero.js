import React from 'react';
import bgScanImage from '../assets/images/bg-scan.svg';
import { MDBBtn } from 'mdb-react-ui-kit';
import '../index.css';
const Header = () => {
  return (
    <div
      id="intro-example"
      className="d-flex bg-image md:mb-4 mb-4"
      style={{
        backgroundImage: `url(${bgScanImage})`,
        height: '640px',
      }}
    >
      <div className="container mx-auto mt-5">
        <div className="md:mt-10">
          <h1 className="lg:text-7xl text-3xl text-white fw-semibold lg:w-3/6 md:mb-4">
            Fully Automated Smart-contract Scanning Tool
          </h1>
          <span className="text-lg text-white lg:w-2/5 mb-3 inline-block">
            The fastest way to identify vulnerabilities and secure your smart
            contract.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
