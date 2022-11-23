import React, { useState } from 'react';
import logoToken from '../assets/images/logo-token-default.svg';
import { Row, Col } from 'react-bootstrap';
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import BadgeModal from '../components/BadgeModal';
import ExportButton from './ExportButton';
const ScanSummary = () => {
  const scan_summary = JSON.parse(localStorage.getItem('scan_summary'));
  const [scanSummary, setScanSummary] = useState({
    id: scan_summary.scan.id || '',
    platform: scan_summary.platform.id || '',
    address: scan_summary.address || '',
    name: scan_summary.name || '',
    symbol: scan_summary.symbol || '',
    totalSupply: scan_summary.totalSupply || '',
    website: scan_summary.website || '',
    scanTime: scan_summary.scan.end_time - scan_summary.scan.start_time || '',
    status: scan_summary.scan.status || '',
    vulOverview: scan_summary.vul_overview || '',
  });
  return (
    <>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>
          <Link to="/homepage">Scan</Link>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem>
          <Link to="/scan-result">{`${scanSummary.platform}/${scanSummary.address}`}</Link>
        </MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <Row>
        <Col md="6" className="d-flex align-items-center">
          <img src={logoToken} alt="logo" />
          <span className="mx-2 fs-3 fw-bold">{scanSummary.name}</span>
          <span className="text-muted fw-light">{scanSummary.symbol}</span>
        </Col>
        <Col md="6" className="d-flex justify-content-md-end">
          <BadgeModal />
          <ExportButton />
        </Col>
      </Row>
    </>
  );
};

export default ScanSummary;
