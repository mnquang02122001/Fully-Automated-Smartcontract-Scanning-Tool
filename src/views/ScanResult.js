import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const ScanResult = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      if (!decoded.exp || decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        navigate('/');
      }
      setUser(decoded);
    } else {
      navigate('/');
    }
    if (!localStorage.getItem('scanInfo')) {
      navigate('/homepage');
    }
  }, []);
  return (
    <>
      <NavBar user={user} />
      <div>ScanResult</div>
      <Footer />
    </>
  );
};

export default ScanResult;
