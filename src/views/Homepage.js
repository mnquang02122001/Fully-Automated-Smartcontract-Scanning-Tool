import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Main from '../components/Main';
import Footer from '../components/Footer';
const Homepage = () => {
  return (
    <>
      <header>
        <NavBar />
        <Hero />
      </header>
      <main>
        <Main />
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
