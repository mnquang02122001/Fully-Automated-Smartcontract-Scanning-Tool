import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
const ScanDetail = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
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
      <Container className="my-4 px-4"></Container>
      <Footer />
    </>
  );
};

export default ScanDetail;
