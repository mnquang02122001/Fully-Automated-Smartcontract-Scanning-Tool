import React, { useState, useEffect } from "react";
import logoToken from "../assets/images/logo-token-default.svg";
import { Row, Col } from "react-bootstrap";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import BadgeModal from "../components/BadgeModal";
import ExportButton from "./ExportButton";
import MyPieChart from "./MyPieChart";
import MyProgressBar from "./MyProgressBar";
import axios from "axios";
const ScanSummary = () => {
    const scan_summary = JSON.parse(localStorage.getItem("scan_summary"));
    const scanSummary = {
        id: scan_summary ? scan_summary.scan.id : "",
        platform: scan_summary ? scan_summary.platform.id : "",
        address: scan_summary ? scan_summary.address : "",
        name: scan_summary
            ? scan_summary.name
                ? scan_summary.name
                : "Not found"
            : "Not found",
        symbol: scan_summary ? scan_summary.symbol : "",
        totalSupply: scan_summary
            ? scan_summary.total_supply
                ? scan_summary.total_supply
                : "Not found"
            : "Not found",
        website: scan_summary
            ? scan_summary.website
                ? scan_summary.website
                : "Not found"
            : "Not found",
        scanTime: scan_summary ? scan_summary.latest_scan.substring(0, 10) : "",
        status: scan_summary ? scan_summary.scan.status : "",
        vulOverview: scan_summary ? scan_summary.vuln_overview : "",
    };
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
            <Row className="mb-3">
                <Col
                    md="6"
                    className="d-flex align-items-center mb-sm-2 mb-md-0 mb-lg-0 mb-xxl-0"
                >
                    <img src={logoToken} alt="logo" />
                    <span className="mx-2 fs-3 fw-bold">
                        {scanSummary.name}
                    </span>
                    <span
                        className="text-muted"
                        style={{ color: "rgba(156, 163, 175, 1)" }}
                    >
                        {scanSummary.symbol}
                    </span>
                </Col>
                <Col md="6" className="d-flex justify-content-md-end">
                    <BadgeModal />
                    <ExportButton />
                </Col>
            </Row>
            <Row className="mb-5">
                <Col lg="4" md="6" className="border-end-first-gray">
                    <h5
                        className="mb-3"
                        style={{ color: "rgba(156, 163, 175, 1)" }}
                    >
                        Overview
                    </h5>
                    <Row>
                        <Row>
                            <Col className="fw-bold" xs="6">
                                <p>Token name</p>
                            </Col>
                            <Col className="text-break" xs="6">
                                <p>{scanSummary.name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="fw-bold" xs="6">
                                <p>Max Total Supply</p>
                            </Col>
                            <Col className="text-break" xs="6">
                                <p>
                                    {scanSummary.totalSupply}{" "}
                                    {scanSummary.symbol}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="fw-bold" xs="6">
                                <p>Platform</p>
                            </Col>
                            <Col className="text-break" xs="6">
                                <p>{scanSummary.platform}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="fw-bold" xs="6">
                                <p>Contract</p>
                            </Col>
                            <Col className="text-break" xs="6">
                                <p>{scanSummary.address}</p>
                            </Col>
                        </Row>
                    </Row>
                </Col>

                <Col lg="3" md="6" className="border-end-second-gray">
                    <h5
                        className="mb-3"
                        style={{ color: "rgba(156, 163, 175, 1)" }}
                    >
                        Scan
                    </h5>
                    <Row>
                        <Row>
                            <Col className="fw-bold" xs="6">
                                Scan time
                            </Col>
                            <Col className="text-break" xs="6">
                                <p>{scanSummary.scanTime}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="fw-bold" xs="6">
                                Status
                            </Col>
                            <Col className="text-break" xs="6">
                                <p
                                    style={{
                                        backgroundColor: "rgba(16, 185, 129,1)",
                                        color: "white",
                                        width: "70%",
                                        padding: "0.3rem",
                                        textAlign: "center",
                                        borderRadius: "0.5rem",
                                    }}
                                >
                                    {scanSummary.status.toLowerCase()}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="fw-bold" xs="6">
                                ID
                            </Col>
                            <Col className="text-break" xs="6">
                                <p>{scanSummary.id}</p>
                            </Col>
                        </Row>
                        {/* <Col className="fw-bold" xs="6">
                            <p>Scan time</p>
                            <p>Status</p>
                            <p>ID</p>
                        </Col>
                        <Col className="text-break" xs="6">
                            <p>{Math.round(scanSummary.scanTime)} s</p>
                            <p
                                style={{
                                    backgroundColor: "rgba(16, 185, 129,1)",
                                    color: "white",
                                    width: "70%",
                                    padding: "0.3rem",
                                    textAlign: "center",
                                    borderRadius: "0.5rem",
                                }}
                            >
                                {scanSummary.status}
                            </p>
                            <p>{scanSummary.id}</p>
                        </Col> */}
                    </Row>
                </Col>
                <Col lg="4" md="12">
                    <h5
                        className="mb-3"
                        style={{ color: "rgba(156, 163, 175, 1)" }}
                    >
                        Finding summary
                    </h5>
                    <Row className="align-items-center">
                        <Col lg="6" sm="4">
                            <MyPieChart vulOverview={scanSummary.vulOverview} />
                        </Col>
                        <Col lg="6" sm="8">
                            <MyProgressBar
                                vulOverview={scanSummary.vulOverview}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default ScanSummary;
