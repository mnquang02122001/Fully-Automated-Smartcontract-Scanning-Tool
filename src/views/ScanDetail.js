import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
const ScanDetail = () => {
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
    if (!localStorage.getItem('vul_details')) {
      navigate('/scan-result');
    }
  }, []);
  const scan_summary = JSON.parse(localStorage.getItem('scan_summary'));
  const vul_details = JSON.parse(localStorage.getItem('vul_details')) || {
    id: 0,
    title: '',
    severity: '',
    description: '',
    recommendation: '',
    location: {
      file: '',
      lines: [],
    },
  };
  const scanSummary = {
    platform: scan_summary ? scan_summary.platform.id : '',
    address: scan_summary ? scan_summary.address : '',
  };
  return (
    <>
      <NavBar user={user} />
      <Container className="my-4 px-4">
        <MDBBreadcrumb>
          <MDBBreadcrumbItem>
            <Link to="/homepage">Scan</Link>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem>
            <Link to="/scan-result">{`${scanSummary.platform}/${scanSummary.address}`}</Link>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem>{vul_details.id}</MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <h2 className="fw-bold mt-5">{vul_details.title}</h2>
        <Row className="mt-5">
          <Col md={7}>
            <h5 className="fw-bold">Description</h5>
            <p>{vul_details.description}</p>
          </Col>
          <Col md={1}></Col>
          <Col md={4}>
            <h5 className="fw-bold">Severity</h5>
            <div className="d-flex align-items-center">
              {vul_details.severity === 'critical' ? (
                <span
                  className="square rounded-pill me-3"
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: '#550808',
                  }}
                ></span>
              ) : vul_details.severity === 'high' ? (
                <span
                  className="square rounded-pill me-3"
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: '#ec672c',
                  }}
                ></span>
              ) : vul_details.severity === 'medium' ? (
                <span
                  className="square rounded-pill me-3"
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: '#add832',
                  }}
                ></span>
              ) : vul_details.severity === 'low' ? (
                <span
                  className="square rounded-pill me-3"
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: '#68c88e',
                  }}
                ></span>
              ) : (
                <span
                  className="square rounded-pill me-3"
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: '#b9c9dc',
                  }}
                ></span>
              )}
              <span className="text-capitalize">{vul_details.severity}</span>
            </div>
          </Col>
        </Row>
        <div className="mt-5">
          <h5 className="fw-bold">Recommendation</h5>
          <p>{vul_details.recommendation}</p>
        </div>
        <div className="mt-5">
          <h5 className="fw-bold">Vulnerable code</h5>
          <p className="fst-italic">{vul_details.location.file}</p>
          {vul_details.location.lines.map((line) => {
            return <p>{line}</p>;
          })}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ScanDetail;
