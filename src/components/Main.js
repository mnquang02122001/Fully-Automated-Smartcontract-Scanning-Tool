import React from 'react';
import CoinTable from './CoinTable';
import Helper from './Helper';
import AboutUs from './AboutUs';
const Main = () => {
  return (
    <>
      <div className="container">
        <CoinTable />
        <Helper />
        <AboutUs />
      </div>
    </>
  );
};

export default Main;
