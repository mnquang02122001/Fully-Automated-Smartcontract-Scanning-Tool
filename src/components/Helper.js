import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import iconScan from "../assets/images/icon-scan.png";
import iconKeyboard from "../assets/images/icon-keyboard.png";
import iconCheck from "../assets/images/icon-check.png";
const Helper = () => {
    return (
        <>
            <h1
                style={{ fontSize: "3.5rem", fontWeight: "bold" }}
                className="my-5"
                id="help"
            >
                How it works?
            </h1>
            <Row>
                <Col md="4" className="d-flex flex-column align-items-center">
                    <img src={iconKeyboard} alt="iconKeyboard" width={50} />
                    <p className="fw-bold mt-3 mb-1 fs-5">
                        Enter your smart contract address
                    </p>
                    <p className="text-center fs-5">
                        Choose your platform and paste the address of your smart
                        contract into the field.
                    </p>
                </Col>
                <Col md="4" className="d-flex flex-column align-items-center">
                    <img src={iconScan} alt="iconScan" width={50} />
                    <p className="fw-bold mt-3 mb-1 fs-5">Initiate the scan</p>
                    <p className="text-center fs-5">
                        Click on the search button. Our system will run an
                        automated scan to identify vulnerabilities in your smart
                        contract.
                    </p>
                </Col>
                <Col md="4" className="d-flex flex-column align-items-center">
                    <img src={iconCheck} alt="iconCheck" width={50} />
                    <p className="fw-bold mt-3 mb-1 fs-5">Check the results</p>
                    <p className="text-center fs-5">
                        When the scan completes, the system will produce a
                        detailed analysis report. Check the report to see all
                        vulnerabilities that need remediation in your code.
                    </p>
                </Col>
            </Row>
        </>
    );
};

export default Helper;
