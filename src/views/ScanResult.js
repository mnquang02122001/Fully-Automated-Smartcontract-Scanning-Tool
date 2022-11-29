import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ScanSummary from '../components/ScanSummary';
import ScanTable from '../components/ScanTable';
const ScanResult = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      if (!decoded.exp || decoded.exp < Date.now() / 1000) {
        localStorage.clear();
        navigate('/');
      }
      setUser(decoded);
    } else {
      navigate('/');
    }
    if (
      !localStorage.getItem('scan_summary') ||
      !localStorage.getItem('vul_summary')
    ) {
      navigate('/homepage');
    }
  }, []);
  return (
    <>
      <NavBar user={user} />
      <Container className="my-4 px-4">
        <ScanSummary />
        <ScanTable />
      </Container>
      <Footer />
    </>
  );
};

export default ScanResult;
