import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import AWS from "aws-sdk";
const ScanDetail = () => {
    const [user, setUser] = useState({});
    const [contractSourceCode, setContractSourceCode] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            if (!decoded.exp || decoded.exp < Date.now() / 1000) {
                localStorage.clear();
                navigate("/");
            }
            setUser(decoded);
        } else {
            navigate("/");
        }
        if (
            !localStorage.getItem("scan_summary") ||
            !localStorage.getItem("vul_summary")
        ) {
            navigate("/homepage");
        }
        if (!localStorage.getItem("vul_detail")) {
            navigate("/scan-result");
        }
    }, []);
    const scan_summary = JSON.parse(localStorage.getItem("scan_summary"));
    const vul_detail = JSON.parse(localStorage.getItem("vul_detail")) || {
        id: 0,
        title: "",
        severity: "",
        description: "",
        recommendation: "",
        locations: [
            {
                file: "",
                lines: [],
            },
        ],
    };
    const scanSummary = {
        platform: scan_summary ? scan_summary.platform.id : "",
        address: scan_summary ? scan_summary.address : "",
    };
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
        region: process.env.REACT_APP_AWS_S3_REGION_NAME,
    });
    const s3 = new AWS.S3();
    const contractFolder =
        scanSummary.platform === "ethereum"
            ? scan_summary.address
            : `${scanSummary.platform}:${scan_summary.address}`;
    s3.getObject(
        {
            Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
            Key: `smart_contracts/${contractFolder}/${vul_detail.locations[0]?.file}`,
        },
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                setContractSourceCode(data.Body.toString());
            }
        }
    );
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
                    <MDBBreadcrumbItem>{vul_detail.id}</MDBBreadcrumbItem>
                </MDBBreadcrumb>
                <h2 className="fw-bold mt-5">{vul_detail.title}</h2>
                <Row className="mt-5">
                    <Col md={7}>
                        <h5 className="fw-bold">Description</h5>
                        <p>{vul_detail.description}</p>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={4}>
                        <h5 className="fw-bold">Severity</h5>
                        <div className="d-flex align-items-center">
                            {vul_detail.severity === "Critical" ? (
                                <span
                                    className="square rounded-pill me-3"
                                    style={{
                                        width: "0.5rem",
                                        height: "0.5rem",
                                        backgroundColor: "#550808",
                                    }}
                                ></span>
                            ) : vul_detail.severity === "High" ? (
                                <span
                                    className="square rounded-pill me-3"
                                    style={{
                                        width: "0.5rem",
                                        height: "0.5rem",
                                        backgroundColor: "#ec672c",
                                    }}
                                ></span>
                            ) : vul_detail.severity === "Medium" ? (
                                <span
                                    className="square rounded-pill me-3"
                                    style={{
                                        width: "0.5rem",
                                        height: "0.5rem",
                                        backgroundColor: "#add832",
                                    }}
                                ></span>
                            ) : vul_detail.severity === "Low" ? (
                                <span
                                    className="square rounded-pill me-3"
                                    style={{
                                        width: "0.5rem",
                                        height: "0.5rem",
                                        backgroundColor: "#68c88e",
                                    }}
                                ></span>
                            ) : (
                                <span
                                    className="square rounded-pill me-3"
                                    style={{
                                        width: "0.5rem",
                                        height: "0.5rem",
                                        backgroundColor: "#b9c9dc",
                                    }}
                                ></span>
                            )}
                            <span className="text-capitalize">
                                {vul_detail.severity}
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="mt-5">
                    <h5 className="fw-bold">Recommendation</h5>
                    <p>{vul_detail.recommendation}</p>
                </div>
                <div className="mt-5">
                    <h5 className="fw-bold">Vulnerable code</h5>
                    <p className="fst-italic">
                        {vul_detail.locations[0]?.file}
                    </p>
                    <SyntaxHighlighter
                        language="solidity"
                        style={vscDarkPlus}
                        showLineNumbers={true}
                        wrapLines={true}
                        lineProps={(lineNumber) => {
                            let style = { display: "block" };
                            if (
                                vul_detail.locations[0]?.lines.includes(
                                    lineNumber
                                )
                            ) {
                                style.backgroundColor = "#550808";
                            }
                            return { style };
                        }}
                    >
                        {contractSourceCode}
                    </SyntaxHighlighter>
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default ScanDetail;
