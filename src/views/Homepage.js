import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
const Homepage = () => {
  return (
    <>
      <header>
        <NavBar />
        <Hero />
      </header>
      <Footer />
    </>
  );
};

export default Homepage;
