import React from 'react';
import bgScanImage from '../assets/images/bg-scan.svg';
import ScanInput from './ScanInput';
const Header = () => {
  return (
    <div
      id="scan"
      className="d-flex bg-image mb-5"
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
          <span className="text-lg text-white lg:w-2/5 mb-3 d-inline-block">
            The fastest way to identify vulnerabilities and secure your smart
            contract.
          </span>
          <ScanInput />
        </div>
      </div>
    </div>
  );
};

export default Header;
